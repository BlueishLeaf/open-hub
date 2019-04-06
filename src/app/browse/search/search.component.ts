import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ISearchQuery } from 'src/app/models/domain/ISearchQuery';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Output() searchEvent = new EventEmitter<ISearchQuery>();
  searchForm: FormGroup;
  rName: string;
  language: string;
  stars: number;
  watchers: number;
  license: string;
  firstIssues: number;

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.searchForm = this._fb.group({
      rName: [''],
      language: [''],
      stars: [''],
      watchers: [''],
      license: [''],
      firstIssues: ['']
    });
    this.searchForm.valueChanges.subscribe(data => {
      this.rName = data.rName;
      this.language = data.language;
      this.stars = data.stars;
      this.watchers = data.watchers;
      this.license = data.license;
      this.firstIssues = data.firstIssues;
    });
  }

  search() {
    this.searchEvent.emit({
      title: (this.rName !== '') ? this.rName : null,
      language: (this.language !== '') ? this.language : null,
      starThreshold: (this.stars > 0) ? this.stars : null,
      watcherThreshold: (this.watchers) ? this.watchers : null,
      issueThreshold: (this.firstIssues) ? this.firstIssues : null,
      license: (this.license) ? this.license : null
    });
  }

}
