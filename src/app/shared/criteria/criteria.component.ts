import { Component, OnInit,
  ElementRef, ViewChild,
  AfterViewInit, Input,
  OnChanges, SimpleChanges,
  EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, OnChanges, AfterViewInit {

  // listFilter: string;

  @Input() displayDetail: boolean;
  @Input() hitCount: number;
  hitCountMessage: any;
  @Output() valueChanges: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('filterElement') filterElementRef: ElementRef;

  constructor() { }

  private _listFilter: string;

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.valueChanges.emit(this._listFilter );
  }


  ngAfterViewInit(): void {
    if (this.filterElementRef.nativeElement) {
      this.filterElementRef.nativeElement.focus();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (changes['hitCount'] && !changes['hitCount'].currentValue) {
    //   return  this.hitCountMessage = 'No Match Found';
    //  }
    //   return this.hitCountMessage = `Found ${this.hitCount} product(s)`;

    changes['hitCount'] && !changes['hitCount'].currentValue
      ?
      this.hitCountMessage = 'No Match Found'
      :
      this.hitCountMessage = `Found ${this.hitCount} product(s)`;
  }


  ngOnInit() {
  }

}
