import { Component, Input, Output, EventEmitter, ChangeDetectorRef, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project-service.service';
import { TaskService } from '../../services/task-service.service';
import { Task } from '../../interfaces/task';  // Importiamo l'interfaccia Task
import { CommonModule, NgStyle } from '@angular/common';
import { TaskComponent } from "../add-task/add-task.component";


@Component({
  selector: 'app-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
  imports: [
    CommonModule,
    TaskComponent,
    NgStyle
]
})
export class ProjectComponent implements OnInit {
  @Input() project: any = { tasks: [] };
  @Input() tasks: Task[] = [];
  @Output() delete = new EventEmitter<number>();  // Emettiamo un evento per eliminare il progetto
  @Output() nameUpdated = new EventEmitter<string>();

  changeColorButton: boolean = false;



  constructor(
    private projectService: ProjectService,
    private taskService: TaskService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadTasks();
    // console.log(this.tasks)
  }

  loadTasks(): void {
    if (this.project?.id) {
      this.taskService.getTasks(this.project.id).subscribe({
        next: (tasks: Task[]) => {
          this.project.tasks = tasks;  // Assegna i task caricati al progetto
        },
        error: (err) => {
          console.error('Error loading tasks:', err);
        }
      });
    }
  }

  onAddTask(description: string): void {
    const newTask: Task = {
      id: this.project.id,
      description: description,
      status: 'open',
      id_project: this.project.id_project,
    };

    this.taskService.addTask(newTask).subscribe({
      next: (response) => {
        console.log('Risposta del backend:', response);
        // Ricostruisci l'oggetto task con i dati inviati
        const task: Task = {
          id: newTask.id,
          description: newTask.description,
          status: newTask.status,
          id_project: newTask.id_project,
        };
        this.project.tasks.push(task); // Aggiungi il task alla lista
      },
      error: (error) => {
        console.error('Error adding task:', error);
      }
    })
  }

  onEditTask(event: { id: number, description: string }): void {
    const taskToUpdate = this.project.tasks.find((task: Task) => task.id === event.id);
    if (taskToUpdate) {
      taskToUpdate.description = event.description;
      this.taskService.updateTask(taskToUpdate).subscribe({
        next: (updatedTask) => {
          console.log('Task aggiornato:', updatedTask);
          this.cdr.detectChanges();  // Forza l'aggiornamento della vista
        },
        error: (err) => {
          console.error('Errore durante l\'aggiornamento del task:', err);
        }
      });
    }
  }

  onDeleteTask(taskId: number) {
    console.log('ID del task da eliminare (componente genitore):', taskId);

    if (!this.project.tasks || this.project.tasks.length === 0) {
      console.error('Lista dei task non ancora caricata');
      return;
    }

    if (taskId === undefined || taskId === null || typeof taskId !== 'number') {
      console.error('ID del task non valido:', taskId);
      return;
    }

    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        console.log(`Task con ID ${taskId} è eliminato`);
        this.project.tasks = this.project.tasks.filter((task: any) => task.id !== taskId); // Rimuovi il task dalla lista
      },
      error: (err) => {
        console.error('Errore durante l\'eliminazione del task:', err);
      }
    });
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (projects) => {
        this.project = projects.map((project: any) => ({
          ...project,
          tasks: project.tasks || []  // Inizializza tasks come array vuoto se non è definito
        }));
      },
      error: (err) => {
        console.error('Error loading projects:', err);
      }
    });
  }

  onEditProject(): void {
    const newName = prompt("Modifica il nome del progetto:", this.project.name);

    if (newName && newName.trim() !== '') {
      // Emmetti l'evento con il nuovo nome
      this.nameUpdated.emit(newName);
    } else {
      alert('Il nome del progetto non può essere vuoto');
    }
  }

  deleteProject(): void {
      if (this.project?.id) {
        console.log(`Attempting to delete project with ID:`, this.project.id); // Debug
        this.projectService.deleteProject(this.project.id).subscribe({
          next: () => {
            console.log(`Project deleted successfully with ID:`, this.project.id); // Debug
            this.delete.emit(this.project.id);
          },
          error: (err) => {
            console.error('Error deleting project:', err); // Debug
          }
        });
      } else {
        console.error('Invalid project ID:', this.project?.id); // Debug
      }
    }

}
