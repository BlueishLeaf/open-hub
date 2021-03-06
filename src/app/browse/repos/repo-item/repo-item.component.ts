import { Component, OnInit, Input } from '@angular/core';
import { IRepo } from 'src/app/_models/_domain/IRepo';

@Component({
  selector: 'app-repo-item',
  templateUrl: './repo-item.component.html',
  styleUrls: ['./repo-item.component.scss']
})
export class RepoItemComponent implements OnInit {
  @Input() repository: IRepo;

  constructor() { }

  ngOnInit() {
  }

}
