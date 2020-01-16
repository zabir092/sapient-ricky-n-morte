import { Component, OnDestroy } from '@angular/core';
import { AppConstant } from './common/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  public title:string;
  constructor() {
    this.title = AppConstant.APP_TITLE;
  }
  ngOnDestroy(): void {
    
  }
}

