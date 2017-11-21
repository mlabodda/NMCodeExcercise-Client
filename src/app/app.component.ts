import {Component, OnInit} from '@angular/core';
import {Style} from './models/style';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  selectedStyle: Style;

  constructor() {
  }

  onStyleSelected(style: Style) {
    this.selectedStyle = style;
  }

  ngOnInit(): void {
  }

}
