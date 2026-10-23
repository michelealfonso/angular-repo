import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { TaskService } from '../../services/task-service.service';
import { Task } from '../../interfaces/task';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  imports: [
    CommonModule,
  ]
})
export class TaskComponent {

  plusImage: string = '../assets/icons/plus.svg';
  modifyImage: string = '../assets/icons/modify.svg';
  trashImage: string = '../assets/icons/trash.svg';


    @Input() tasks: Task[] = [];
    @Output() addTask = new EventEmitter<string>();
    @Output() deleteTask = new EventEmitter<number>();
    @Output() editTask = new EventEmitter<{id: number, description: string}>();

    showAddTaskPrompt(): void {
      const description = prompt('Inserisci la descrizione del task:');  // Mostra il prompt
      if (description && description.trim()) {
        console.log('Descrizione emessa:', description.trim());  // Debug
        this.addTask.emit(description.trim());  // Emetti la descrizione del task
      }
    }

    onEditTask(taskId: number, currentDescription: string): void {
      const newDescription = prompt(`Modifica la descrizione del task`, currentDescription);

      if (newDescription && newDescription.trim()) {
        this.editTask.emit({ id: taskId, description: newDescription.trim() });  // Emetti l'evento per modificare il task
      }
    }

    onDeleteTask(taskId: number): void {
      console.log('ID del task da eliminare (componente figlio):', taskId);
      this.deleteTask.emit(taskId); // Emetti l'evento per eliminare un task
    }
}
