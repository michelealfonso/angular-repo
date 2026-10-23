import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Project } from '../interfaces/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private readonly apiUrl = 'http://localhost:8080/projectsTask/project';
    private currentProject: any;

  constructor(private http: HttpClient) {}

  /**
   * Imposta il progetto corrente.
   * @param project Il progetto da impostare come corrente.
   */
  setCurrentProject(project: any): void {
    this.currentProject = project;
  }

  /**
   * Recupera tutti i progetti.
   * @returns Un Observable che emette la lista dei progetti.
   */
  getProjects(): Observable<any> {
    return this.http.get(this.apiUrl, { withCredentials: true }).pipe(
      tap(() => console.log('Projects fetched')) // Log per debug
    );
  }

  /**
   * Restituisce il progetto corrente.
   * @returns Il progetto corrente o null se non è stato impostato.
   */
  getCurrentProject(): any{
    return this.currentProject;
  }

  /**
   * Crea un nuovo progetto.
   * @param name Il nome del progetto.
   * @returns Un Observable che emette la risposta del server.
   */
  createProject(name: string): Observable<any> {
    const body = { name };
    return this.http.post(this.apiUrl, body, { withCredentials: true }).pipe(
      tap(() => console.log('Project created')) // Log per debug
    );
  }

  /**
   * Aggiorna un progetto esistente.
   * @param id L'ID del progetto da aggiornare.
   * @param name Il nuovo nome del progetto.
   * @returns Un Observable che emette la risposta del server.
   */
  updateProject(id: number, name: string): Observable<any> {
    const body = { name };
    return this.http.put(`${this.apiUrl}/${id}`, body, { withCredentials: true }).pipe(
      tap(() => console.log(`Project with ID ${id} updated`)) // Log per debug
    );
  }

  /**
   * Elimina un progetto.
   * @param id L'ID del progetto da eliminare.
   * @returns Un Observable che emette la risposta del server.
   */
  deleteProject(id: number): Observable<void> {
    if (id) {
      console.log(`Sending delete request for project with ID:`, id); // Log per debug
      return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true }).pipe(
        tap(() => console.log(`Project with ID ${id} deleted`)) // Log per debug
      );
    } else {
      throw new Error('Invalid project ID'); // Errore se l'ID non è valido
    }
  }
}
