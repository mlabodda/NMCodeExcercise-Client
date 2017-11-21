import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {StyleService} from '../../services/style.service';
import {Style} from '../../models/style';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-beer-styles',
  templateUrl: './beer-styles.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class BeerStylesComponent implements OnInit {

  modalRef: BsModalRef;

  @Output() styleSelected = new EventEmitter<Style>();

  selectedStyle: Style;

  searchFilter: any = {name: ''};

  constructor(private styleService: StyleService, private modalService: BsModalService) {
  }

  styleList: Style[];
  loading = false;

  ngOnInit(): void {
    this.loading = true;
    this.styleService.getStyles()
      .subscribe(
        styles => {
          this.styleList = styles;
          this.loading = false;
        },
        (error) => {
          this.modalRef = this.modalService.show(StyleModalComponent);
          this.modalRef.content.title = 'Error';
          this.modalRef.content.body = 'Something went wrong!';
        });
  }

  selectStyle(style: Style): void {
    this.styleSelected.emit(style);
    this.selectedStyle = style;
  }

}

@Component({
  selector: 'app-style-modal-content',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">{{title}}</h4>
    </div>
    <div class="modal-body">
      {{body}}
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-default" (click)="modalRef.hide()">Close</button>
    </div>
  `
})
export class StyleModalComponent {
  title: string;
  body: string;

  constructor(public modalRef: BsModalRef) {
  }
}
