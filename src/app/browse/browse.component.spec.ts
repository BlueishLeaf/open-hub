import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowseComponent } from './browse.component';
import { SearchComponent } from './search/search.component';
import { RepoListComponent } from './repos/repo-list/repo-list.component';
import { RepoItemComponent } from './repos/repo-item/repo-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {Actions, NgxsModule, ofActionDispatched, Store} from '@ngxs/store';
import { RepoState, RepoStateModel } from '../_store/_states/repo.state';
import { HttpClientModule } from '@angular/common/http';
import { IRepo } from '../_models/_domain/IRepo';
import {Observable, of} from 'rxjs';
import {Register} from '../_store/_actions/auth.actions';
import {SearchRepos} from '../_store/_actions/repo.actions';

describe('BrowseComponent', () => {
  let actions$: Observable<any>;
  let component: BrowseComponent;
  let fixture: ComponentFixture<BrowseComponent>;

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
    searched: [
      sampleRepo
    ]
  };


  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgxsModule.forRoot([RepoState])
      ],
      declarations: [
        BrowseComponent,
        SearchComponent,
        RepoListComponent,
        RepoItemComponent
       ],
       providers: [
       ]
    }).compileComponents();
    store = TestBed.get(Store);
    store.reset({RepoState: sampleRepoState});
  }));

  beforeEach(() => {
    actions$ = TestBed.get(Actions);
    fixture = TestBed.createComponent(BrowseComponent);
    component = fixture.componentInstance;
    Object.defineProperty(component, 'repositories$', { writable: true });
    component.repositories$ = of(sampleRepoState.searched);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch a SearchRepos action with a payload containing the query', () => {
    component.searchTriggered({
      name: 'hello-world',
      language: 'C#',
      license: 'unlicense',
      minStars: 20,
      maxStars: 100,
      minFirstIssues: 0,
      maxFirstIssues: 0
    });
    actions$.pipe(ofActionDispatched(SearchRepos)).subscribe(action => expect(action.payload).toBe('q=hello-world in:name language:C# license:unlicense stars:20..100 is:public'));
  });
});
