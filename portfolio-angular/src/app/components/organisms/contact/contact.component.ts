import { Component, Input } from '@angular/core';
import { HeaderComponent } from "../../atoms/header/header.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-contact',
    standalone: true,
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.css',
    imports: [
      CommonModule,
      HeaderComponent,
    ]
})
export class ContactComponent {

  @Input() title!: string;
  @Input()  description!: string

  contacts = [
    {
        id: '',
        icon: '../assets/icons/email.svg',
        email: 'michelealfonso.dev@gmail.com',
        url: 'https://mail.google.com/mail/u/0/#inbox'

    }
]

openEmail(): void {
  this.contacts.map((contact) => {
    window.open(contact.url)
  })
}

}
