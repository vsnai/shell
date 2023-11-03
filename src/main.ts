import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { fromEvent, map } from 'rxjs';

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
    window.open(
      'https://xmsg-child.vercel.app',
      'xmsg-child',
      'height=800,width=800'
    );
  }
}

bootstrapApplication(App);
