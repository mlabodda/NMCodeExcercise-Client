import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {Style} from '../../models/style';
import {BeerSearchService} from '../../services/beer-search.service';
import {Beer} from '../../models/beer';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-beer-search',
  templateUrl: './beer-search.component.html',
  encapsulation: ViewEncapsulation.None
})
export class BeerSearchComponent implements OnInit, OnChanges {

  modalRef: BsModalRef;

  @Input() selectedStyle: Style;

  constructor(private beerSearchService: BeerSearchService, private modalService: BsModalService) {
  }

  beerSearch: string;
  beerList: Beer[];

  currentPage: number;
  hasMoreData: boolean;
  loading: boolean;
  selectedBeer: Beer;

  ngOnInit() {
    this.currentPage = 1;
    this.hasMoreData = false;
    this.loading = false;
  }

  // watch when the selected style changes
  ngOnChanges(changes: SimpleChanges): void {
    // the "first" change is empty so ignore it
    if (changes.selectedStyle.isFirstChange()) return;

    this.currentPage = 1;
    this.loading = true;

    this.beerSearchService.getBeersForStyle(changes.selectedStyle.currentValue.id)
      .subscribe(
        beerResponse => {
          this.beerList = beerResponse.data;
          this.hasMoreData = beerResponse.hasMoreData;
          this.loading = false;
        },
        (error) => {
          this.showError(error);
        });
  }

  // search for a beer with the given name and selected style.
  // NOTE: BreweryDB does not do fuzzy matching so names must be exact.
  onSearch(): void {
    this.loading = true;

    if (this.beerSearch) {
      this.beerSearchService.getBeersForStyleAndName(this.selectedStyle.id, this.beerSearch)
        .subscribe(
          beerResponse => {
            this.beerList = beerResponse.data;
            this.hasMoreData = beerResponse.hasMoreData;
            this.loading = false;
          },
          (error) => {
            this.showError(error);
          });
    } else {
      this.currentPage = 1;

      this.beerSearchService.getBeersForStyle(this.selectedStyle.id)
        .subscribe(
          beerResponse => {
            this.beerList = beerResponse.data;
            this.hasMoreData = beerResponse.hasMoreData;
            this.loading = false;
          },
          (error) => {
            this.showError(error);
          });
    }
  }

  // navigate to previous page
  onPrev(): void {
    this.currentPage--;
    this.pageSearch();
  }

  // navigate to the next page
  onNext(): void {
    this.currentPage++;
    this.pageSearch();
  }

  // store selected beer so UI can highlight
  selectBeer(beer: Beer): void {
    this.selectedBeer = beer;
  }

  // actually get the beers for a given page
  private pageSearch(): void {
    this.loading = true;

    this.beerSearchService.getBeersForStyleAndPageNumber(this.selectedStyle.id, this.currentPage)
      .subscribe(beerResponse => {
          this.beerList = beerResponse.data;
          this.hasMoreData = beerResponse.hasMoreData;

          this.loading = false;
        },
        (error) => {
          this.showError(error);
        });
  }

  // show an error modal
  private showError(error: any): void {
    this.modalRef = this.modalService.show(SearchModalComponent);
    this.modalRef.content.title = 'Error';
    this.modalRef.content.body = 'Something went wrong!';
  }

}

@Component({
  selector: 'app-search-modal-content',
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
export class SearchModalComponent {
  title: string;
  body: string;

  constructor(public modalRef: BsModalRef) {
  }
}
