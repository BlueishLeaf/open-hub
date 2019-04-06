import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ISearchQuery } from 'src/app/models/domain/ISearchQuery';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Output() searchEvent = new EventEmitter<ISearchQuery>();
  searchForm: FormGroup;
  name: string;
  language: string;
  minStars: number;
  maxStars: number;
  minFirstIssues: number;
  maxFirstIssues: number;
  license: string;
  licenses = [
    'afl-3.0', 'apache-2.0', 'artistic-2.0', 'bsl-1.0', 'bsd-2-clause', 'bsd-3-clause', 'bsd-3-clause-clear',
    'cc', 'cc0-1.0', 'cc-by-4.0', 'cc-by-sa-4.0', 'wtfpl', 'ecl-2.0', 'epl-1.0', 'eupl-1.1', 'agpl-3.0', 'gpl',
    'gpl-2.0', 'gpl-3.0', 'lgpl', 'lgpl-2.1', 'lgpl-3.0', 'isc', 'lppl-1.3c', 'ms-pl', 'mit', 'mpl-2.0', 'osl-3.0',
    'postgresql', 'ofl-1.1', 'ncsa', 'unlicense', 'zlib'
  ];

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.searchForm = this._fb.group({
      name: [''],
      language: [''],
      license: [''],
      minStars: [''],
      maxStars: ['', [Validators.min(this.minStars)]],
      minFirstIssues: [''],
      maxFirstIssues: ['', [Validators.min(this.maxFirstIssues)]]
    });
    this.searchForm.valueChanges.subscribe(data => {
      this.name = data.name;
      this.language = data.language;
      this.license = data.license;
      this.minStars = data.minStars;
      this.maxStars = data.maxStars;
      this.minFirstIssues = data.minFirstIssues;
      this.maxFirstIssues = data.maxFirstIssues;
    });
  }

  search() {
    this.searchEvent.emit({
      name: (this.name !== '') ? this.name : null,
      license: (this.license) ? this.license : null,
      language: (this.language !== '') ? this.language : null,
      minStars: (this.minStars > 0) ? this.minStars : null,
      maxStars: (this.maxStars > 0) ? this.maxStars : null,
      minFirstIssues: (this.minFirstIssues) ? this.minFirstIssues : null,
      maxFirstIssues: (this.maxFirstIssues) ? this.maxFirstIssues : null
    });
  }

}
