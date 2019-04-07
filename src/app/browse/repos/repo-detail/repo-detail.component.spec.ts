import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RepoDetailComponent } from './repo-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';
import { GithubService } from 'src/app/_services/github.service';
import { FirestoreService } from 'src/app/_services/firestore.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IRepo } from 'src/app/_models/_domain/IRepo';
import { ICommit } from 'src/app/_models/_domain/ICommit';
import { IIssue } from 'src/app/_models/_domain/IIssue';
import { IUser } from 'src/app/_models/_domain/IUser';

describe('RepoDetailComponent', () => {
  let component: RepoDetailComponent;
  let fixture: ComponentFixture<RepoDetailComponent>;

  const sampleUserInfo: firebase.UserInfo = {
    uid: 'asdf',
    email: 'johnsmith@example.com',
    displayName: 'John Smith',
    phoneNumber: null,
    photoURL: null,
    providerId: null
  };

  const sampleUser: IUser = {
    email: 'johnsmith@example.com',
    role: 'user',
    bookmarks: []
  };

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

  const sampleCommit: ICommit = {
    sha: 'shashasha',
    commit: {
      message: 'yeet',
      url: 'https://www.github.com',
      comment_count: 40,
      author:  {
        name: 'killian',
        email: 'killian@killian.com',
        date: new Date()
      },
      committer:  {
        name: 'killian',
        email: 'killian@killian.com',
        date: new Date()
      }
    }
  };

  const sampleIssue: IIssue = {
    id: 1,
    number: 4,
    title: 'Yeetsue',
    user: {
      login: 'killian',
      id: 2,
      type: 'user'
    },
    labels: [],
    state: 'open',
    comments: 44,
    created_at: new Date(),
    body: 'YEEEEEEEET'
  };

  const fireStoreMock = {
    getUser(id) {
      return of(sampleUser);
    },

    getNotesForRepo(id) {

    },

    addNote(note) {

    },

    removeNote(id) {

    },

    addBookmark(repo, id) {

    },

    removeBookmark(repo, id) {

    }
  };

  const githubMock = {
    getRepoDetails(id) {
      return of([sampleRepo, [sampleCommit], [sampleIssue]]);
    }
  };

  const activatedRouteMock = {
    snapshot: {
      params: { 'id': 'asdf' }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        FormsModule,
        MarkdownModule.forRoot()
      ],
      declarations: [ RepoDetailComponent ],
      providers: [
        { provide: GithubService, useValue: githubMock },
        { provide: FirestoreService, useValue: fireStoreMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoDetailComponent);
    component = fixture.componentInstance;
    Object.defineProperty(component, 'user$', { writable: true });
    component.user$ = of(sampleUserInfo);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
