import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Task } from '../interfaces/task';  // Interfaccia per il task

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/projectsTask/task';

  constructor(private http: HttpClient) {}

  // Ottieni tutti i task di un progetto
  getTasks(projectId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}?id_project=${projectId}`)
  }

    // Aggiungi un nuovo task
    addTask(task: Task): Observable<Task> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.post<Task>(this.apiUrl, task, { headers });
    }

    // Modifica un task

    updateTask(task: Task): Observable<Task[]> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const params = new HttpParams()
        .set('id_project', task.id.toString())
        .set('state', task.status); // Assicurati che `status` sia il campo corretto
      return this.http.put<any>(this.apiUrl, null, { headers, params });
    }

    // Elimina un task

    deleteTask(taskId: number): Observable<void> {
      console.log('Chiamata al backend per eliminare il task con ID:', taskId);
      const params = new HttpParams().set('id_project', taskId.toString());
      return this.http.delete<void>(this.apiUrl, { params });
    }
}
