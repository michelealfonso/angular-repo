import { Component } from '@angular/core';
import { MyServiceService } from '../../services/my-service.service';

@Component({
  selector: 'app-welcome',
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

  messageService: string;

constructor(private myService: MyServiceService) {
  this.messageService = this.myService.getMessage()
}

}
