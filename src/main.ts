import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { fromEvent, map } from 'rxjs';

// https://gist.github.com/tuan/8a1ca1b0376a5056f4141972b171c89e

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>a</div>
    <div *ngIf="url$ | async as url">{{ url }}</div>
    <div>c</div>

    <button (click)="handleClick()">Post Message</button>
  `,
})
export class App {
  url$ = fromEvent<MessageEvent>(window, 'message').pipe(
    map(({ data }) => data)
  );

  handleClick() {
    postMessage('https://jsonplaceholder.typicode.com/todos/1', '*');
  }
}

bootstrapApplication(App);
