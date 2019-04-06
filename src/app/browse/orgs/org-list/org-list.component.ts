import { Component, OnInit } from '@angular/core';
import { IOrg } from 'src/app/models/domain/IOrg';
import { Store, Select } from '@ngxs/store';
import { GetLatestOrgs } from 'src/app/state-management/actions/repo.actions';
import { RepoState } from 'src/app/state-management/states/repo.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-org-list',
  templateUrl: './org-list.component.html',
  styleUrls: ['./org-list.component.scss']
})
export class OrgListComponent implements OnInit {
  @Select(RepoState.organizations) organizations$: Observable<IOrg[]>;
  organizations: IOrg[];

  constructor(private _store: Store) {
    this.organizations$.subscribe(orgs => {
      this.organizations = orgs;
    });
  }

  ngOnInit() {
    this._store.dispatch(new GetLatestOrgs(this.organizations));
  }

}
