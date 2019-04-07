import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OrgListComponent } from './org-list.component';
import { NgxsModule, Store } from '@ngxs/store';
import { RepoState, RepoStateModel } from 'src/app/_store/states/repo.state';
import { IOrg } from 'src/app/_models/_domain/IOrg';
import { of } from 'rxjs';
import { OrgItemComponent } from '../org-item/org-item.component';
import { HttpClientModule } from '@angular/common/http';

describe('OrgListComponent', () => {
  let component: OrgListComponent;
  let fixture: ComponentFixture<OrgListComponent>;

  const sampleOrg: IOrg = {
    login: 'Sample Organization',
    id: 999,
    node_id: 'MDEyOk9yZ2FuaXphdGlvbjgx',
    url: 'https://api.github.com/orgs/engineyard',
    avatar_url: 'https://avatars1.githubusercontent.com/u/81?v=4',
    description: 'Yeet'
  };

  const sampleRepoState: RepoStateModel = {
    organizations: [
      sampleOrg
    ]
  };

  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        NgxsModule.forRoot([RepoState])
      ],
      declarations: [ OrgListComponent, OrgItemComponent ]
    }).compileComponents();
    store = TestBed.get(Store);
    store.reset({RepoState: sampleRepoState});
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgListComponent);
    component = fixture.componentInstance;
    Object.defineProperty(component, 'organizations$', { writable: true });
    component.organizations$ = of(sampleRepoState.organizations);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
