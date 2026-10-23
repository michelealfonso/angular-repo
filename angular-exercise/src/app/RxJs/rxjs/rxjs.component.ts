import { Component } from '@angular/core';
import { ObservableComponent } from "../observable/observable.component";
import { ObserverComponent } from "../observer/observer.component";
import { OperatorsComponent } from '../operators/operators.component';
import { HigherOrderObservable } from '../higher-order-observables/higher-order-observables.component';
import { SubjectComponent } from '../subject/subject.component';
import { SchedulerComponent } from '../scheduler/scheduler.component';


@Component({
  selector: 'app-rxjs',
  imports: [
    ObservableComponent,
    ObserverComponent,
    OperatorsComponent,
    HigherOrderObservable,
    SubjectComponent,
    SchedulerComponent
],
  templateUrl: './rxjs.component.html',
  styleUrl: './rxjs.component.css'
})
export class RxjsComponent {

}
