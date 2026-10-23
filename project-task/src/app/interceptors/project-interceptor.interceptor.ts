import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectService } from '../services/project-service.service';
import { Router } from '@angular/router';

@Injectable()
export class AddProjectInterceptor implements HttpInterceptor {

  constructor(
    private projectService: ProjectService,  // Servizio per ottenere il progetto corrente
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Ottieni il progetto corrente (potresti avere un servizio per questo)
    const currentProject = this.projectService.getCurrentProject();

    // Se c'è un progetto corrente, aggiungi i parametri alla richiesta
    if (currentProject) {
      // Cloniamo la richiesta per aggiungere i parametri del progetto
      const clonedRequest = req.clone({
        setParams: {
          projectId: currentProject['id'].toString(),  // Aggiungiamo l'ID del progetto come parametro
          projectName: currentProject['name']          // Aggiungiamo il nome del progetto come parametro
        }
      });

      return next.handle(clonedRequest);
    }

    // Se non c'è un progetto corrente, la richiesta viene inviata senza parametri aggiuntivi
    return next.handle(req);
  }
}
