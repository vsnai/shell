import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { bootstrapApplication } from '@angular/platform-browser';
import { delay, filter, fromEvent, map, tap } from 'rxjs';
import 'zone.js/dist/zone';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>a</div>
    <div *ngIf="url$ | async as url">{{ url | json }}</div>
    <div>c</div>
  `,
})
export class App {
  popup: Window | null = null;

  url$ = fromEvent<MessageEvent>(window, 'message').pipe(
    filter(({ data }) => !data.type),
    map(({ data }) => ({ data })),
    tap(() => this.popup?.close())
  );

  constructor(private _http: HttpClient) {
    this._http
      .get('https://jsonplaceholder.typicode.com/users/1')
      .pipe(
        takeUntilDestroyed(),
        delay(2000),
        tap(() => {
          this.popup = window.open(
            'https://sub-750.pages.dev',
            'xmsg-child',
            'width=640,height=320'
          );
        })
      )
      .subscribe(console.log);
  }
}

bootstrapApplication(App);
