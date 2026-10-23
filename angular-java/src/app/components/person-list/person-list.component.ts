import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../person.service';

@Component({
  standalone: true,
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.css',
  imports: [
    CommonModule
  ]
})
export class PersonListComponent implements OnInit{

  people: any[] = [];

  constructor(private personService: PersonService) {}

  ngOnInit(): void {
   this.personService.getPeople().subscribe((data: any)=>{
    this.people = data;
   })
  }
}
