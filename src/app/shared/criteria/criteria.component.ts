import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, OnChanges, AfterViewInit {

  listFilter: string;

  @Input() displayDetail: boolean;
  @Input() hitCount: number;
  hitCountMessage: any;

  @ViewChild('filterElement', {}) filterElementRef: ElementRef;

  constructor() { }


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
