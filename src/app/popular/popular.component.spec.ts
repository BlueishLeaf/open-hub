import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {PopularComponent} from './popular.component';
import {IRepo} from '../_models/_domain/IRepo';
import {RepoState, RepoStateModel} from '../_store/_states/repo.state';
import {Observable, of} from 'rxjs';
import {RepoListComponent} from '../browse/repos/repo-list/repo-list.component';
import {RepoItemComponent} from '../browse/repos/repo-item/repo-item.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {Actions, NgxsModule, ofActionDispatched, Store} from '@ngxs/store';
import {GetPopularRepos} from '../_store/_actions/repo.actions';
import {TimePeriod} from '../_models/_enums/TimePeriod.enum';

describe('PopularComponent', () => {
  let actions$: Observable<any>;
  let component: PopularComponent;
  let fixture: ComponentFixture<PopularComponent>;
  let store: Store;

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
    actions$ = TestBed.get(Actions);
    fixture = TestBed.createComponent(PopularComponent);
    component = fixture.componentInstance;
    Object.defineProperty(component, 'repositories$', { writable: true });
    component.repositories$ = of(sampleRepoState.popular);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch the GetPopularRepos action to state', () => {
    component.getPopular(TimePeriod.Month);
    actions$.pipe(ofActionDispatched(GetPopularRepos)).subscribe(action => expect(action.payload).toBe(TimePeriod.Month));
  });
});
