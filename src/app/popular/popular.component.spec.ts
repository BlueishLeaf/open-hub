import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PopularComponent } from './popular.component';
import { IRepo } from '../_models/_domain/IRepo';
import { RepoStateModel, RepoState } from '../_store/states/repo.state';
import { of } from 'rxjs';
import { RepoListComponent } from '../browse/repos/repo-list/repo-list.component';
import { RepoItemComponent } from '../browse/repos/repo-item/repo-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule, Store } from '@ngxs/store';

describe('PopularComponent', () => {
  let component: PopularComponent;
  let fixture: ComponentFixture<PopularComponent>;

  const sampleRepo: IRepo = {
    id: 25114751,
    name: 'hellocharts-android',
    owner: {
        login: 'lecho',
        id: 545637,
        type: 'User',
    },
    description: 'Charts/graphs library for Android compatible with API 8+, several chart types with support for scaling, scrolling and animations',
    commits_url: 'https://api.github.com/repos/lecho/hellocharts-android/commits{/sha}',
    issues_url: 'https://api.github.com/repos/lecho/hellocharts-android/issues{/number}',
    created_at: new Date('2014-10-12T09:12:37Z'),
    stargazers_count: 6469,
    watchers_count: 6469,
    language: 'Java',
    forks_count: 1567,
    open_issues_count: 267,
    license: {
        key: 'apache-2.0',
        name: 'Apache License 2.0',
        url: 'https://api.github.com/licenses/apache-2.0',
    },
  };

  const sampleRepoState: RepoStateModel = {
    popular: [
      sampleRepo
    ]
  };

  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        NgxsModule.forRoot([RepoState])
      ],
      declarations: [ PopularComponent, RepoListComponent, RepoItemComponent ]
    }).compileComponents();
    store = TestBed.get(Store);
    store.reset({RepoState: sampleRepoState})
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularComponent);
    component = fixture.componentInstance;
    Object.defineProperty(component, 'repositories$', { writable: true });
    component.repositories$ = of(sampleRepoState.popular);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
