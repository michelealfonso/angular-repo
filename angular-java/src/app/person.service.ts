import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

interface Person {
  id: number,
  name: string,
  surname: string,
  email: string
}

@Injectable({
  providedIn: 'root'
})

export class PersonService {
  private apiURL = "http://localhost:8080/AngularProject/PeopleServlet";

  constructor(private http: HttpClient) {}

  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(this.apiURL);
  }
}
