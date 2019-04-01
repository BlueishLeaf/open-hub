import { Component, OnInit, Input } from '@angular/core';
import { IOrg } from 'src/app/models/IOrg';

@Component({
  selector: 'app-org-item',
  templateUrl: './org-item.component.html',
  styleUrls: ['./org-item.component.scss']
})
export class OrgItemComponent implements OnInit {
  @Input() organization: IOrg;
  orgLink: string;

  constructor() { }

  ngOnInit() {
    this.orgLink = 'https://github.com/' + this.organization.title;
  }

}
