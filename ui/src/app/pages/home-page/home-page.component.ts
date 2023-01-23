import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { tap, delay, finalize } from 'rxjs';

export interface DataResponse {
  data: string;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  loading: boolean = false;
  message: string = '';

  constructor(private http: HttpClient) {
    this.loadServerData();
  }

  ngOnInit(): void {}

  loadServerData(): void {
    this.loading = true;
    this.http
      .get<DataResponse>('/api/data')
      .pipe(
        delay(1000),
        finalize(() => (this.loading = false))
      )
      .subscribe((resp: DataResponse) => {
        this.message = resp.data;
      });
  }
}
