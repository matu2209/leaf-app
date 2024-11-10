import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Input() firstPage: String = "";
  @Input() previousPage: String = "";
  @Input() nextPage: String = "";
  @Input() endPage: String = "";
  @Input() actualPage: String = "1";

  @Output() pageChange = new EventEmitter<String>();

  onPageChange(page: String): void {
    this.pageChange.emit(page);
  }

}
