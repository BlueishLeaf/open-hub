import { Component, OnInit } from '@angular/core';
import { IOrg } from 'src/app/models/IOrg';
import { GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-org-list',
  templateUrl: './org-list.component.html',
  styleUrls: ['./org-list.component.scss']
})
export class OrgListComponent implements OnInit {
  organizations: IOrg[];

  constructor(private _repos: GithubService) { }

  ngOnInit() {
    this._repos.getTopOrgs().subscribe(orgs => {
      this.organizations = orgs;
    });
  }

}
