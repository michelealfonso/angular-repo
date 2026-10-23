import {
  Component,
  computed,
  effect,
  inject,
  Injector,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-signals',
  imports: [NgStyle],
  templateUrl: './signals.component.html',
  styleUrl: './signals.component.css',
})
export class SignalsComponent {
  changeColorstyle: Record<string, string> = {};

  // utilizzo dell'effect tramite injector

  private injector = inject(Injector);

  private colorEffects = effect(
    () => {
      const color = this.count() < 0 ? 'red' : 'black';
      this.changeColorstyle = { color };
    },
    { injector: this.injector }
  );

  // mentre in alternativa ancora

  colorEffect(): void {
    effect(() => {
        const color = this.count() < 0 ? 'red' : 'black';
        this.changeColorstyle = { color };
      },
      { injector: this.injector }
    );
  }

  count: WritableSignal<number> = signal(0);
  doubleCount: Signal<number> = computed(() => this.count() * 2);

  incremented() {
    this.count.update((value) => value + 1);
    // this.count.set(this.count() + 1)
  }

  decremented() {
    this.count.update((value) => value - 1);
    this.colorEffect();
    //this.count.set(this.count() - 1)
  }

  //creazione signals per cambio nome

  name: WritableSignal<string> = signal('Michi');

  changeName() {
    setTimeout(() => {
      this.name.set('Michele');
    }, 3000);
  }

  ngOnInit() {
    this.changeName();
  }
}
