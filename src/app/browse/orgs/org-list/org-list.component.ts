import { Component, OnInit } from '@angular/core';
import { IOrg } from 'src/app/_models/_domain/IOrg';
import { Store, Select } from '@ngxs/store';
import { GetLatestOrgs } from 'src/app/_store/_actions/repo.actions';
import { RepoState } from 'src/app/_store/_states/repo.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-org-list',
  templateUrl: './org-list.component.html',
  styleUrls: ['./org-list.component.scss']
})
export class OrgListComponent implements OnInit {
  @Select(RepoState.organizations) organizations$: Observable<IOrg[]>;
  organizations: IOrg[];

  constructor(private _store: Store) {}

  ngOnInit() {
    this.organizations$.subscribe(orgs => {
      this.organizations = orgs;
    });
    this._store.dispatch(new GetLatestOrgs(this.organizations));
  }

}
