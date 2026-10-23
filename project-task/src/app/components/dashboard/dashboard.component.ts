import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectComponent } from '../add-project/add-project.component';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

// import { Project } from '../../interfaces/project';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    ProjectComponent
]
})
export class DashboardComponent implements OnInit {
  projects: any[] = [];
  newProjectName: string = '';

  selectedProjectId: number = 0;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}


  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    console.log(`console`);
    this.projectService.getProjects().subscribe((projects) => {
      console.log(`console subscribe`, projects)
      this.projects = projects;
    });
  }

  addProject(): void {
    if (this.newProjectName) {
      this.projectService.createProject(this.newProjectName).subscribe(() => {
        this.loadProjects(); // Ricarica i progetti
        this.newProjectName = ''; // Resetta il campo
      });
    }
    else {
      alert('Il nome del progetto non può essere vuoto');
    }
  }

  updateProjectName(newName: string, projectId: number): void {

    if (!newName || !projectId) {
      console.error('Nome o ID del progetto non validi');
      return;
    }

    this.projectService.updateProject(projectId, newName).subscribe(
      (updatedProject: any) => {
        // Trova l'indice del progetto nell'array
        const projectIndex = this.projects.findIndex(project => project.id === projectId);

        if (projectIndex !== -1) {
          // Aggiorna il progetto nell'array
         // this.projects[projectIndex] = updatedProject;
         this.projects.splice(projectIndex, 1, updatedProject);
          this.cdr.detectChanges(); // Forza il rilevamento dei cambiamenti
          console.log('Nome aggiornato:', updatedProject.name);
        } else {
          console.error('Progetto non trovato');
        }
      },
      (error) => {
        console.error('Errore nell\'aggiornamento del nome del progetto:', error);
        console.log('Risposta completa dell\'errore:', error);
      }
    );
  }

  deleteProject(id: number): void {
    if (id) {
      console.log(`Attempting to delete project with ID:`, id, typeof id); // Debug
      this.projectService.deleteProject(id).subscribe({
        next: () => {
          console.log(`progetto cancellato con succedo con ID:`, id); // Debug
          this.projects = this.projects.filter(project => project.id !== id);
          //this.loadProjects();
        },
        error: (err) => {
          console.error('Errore nella cancellazione del progetto:', err); // Debug
        }
      });
    } else {
      console.error('Invalid project ID:', id); // Debug
    }
  }

  logout(): void {
    this.router.navigate(['/login']);
  }

}
