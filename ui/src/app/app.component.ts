import { Component } from '@angular/core';

export interface AppLink {
  display: string;
  link: string;
  icon: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Demo App';

  links: AppLink[] = [
    {
      display: 'Home',
      link: '/home',
      icon: 'home',
    },
    {
      display: 'Test',
      link: '/test',
      icon: 'science',
    },
  ];
}
