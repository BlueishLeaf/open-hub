import { Component, OnInit, Input } from '@angular/core';
import { IRepo } from 'src/app/_models/_domain/IRepo';

@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.scss']
})
export class RepoListComponent implements OnInit {
  @Input() repositories: IRepo[];

  constructor() { }

  ngOnInit() {

  }

}
