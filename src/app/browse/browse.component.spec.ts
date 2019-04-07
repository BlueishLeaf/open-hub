import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowseComponent } from './browse.component';
import { SearchComponent } from './search/search.component';
import { RepoListComponent } from './repos/repo-list/repo-list.component';
import { RepoItemComponent } from './repos/repo-item/repo-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { RepoState, RepoStateModel } from '../state-management/states/repo.state';
import { HttpClientModule } from '@angular/common/http';
import { IRepo } from '../models/domain/IRepo';
import { of } from 'rxjs';

describe('BrowseComponent', () => {
  let component: BrowseComponent;
  let fixture: ComponentFixture<BrowseComponent>;

  const sampleRepo: IRepo = {
    id: 25114751,
    node_id: 'MDEwOlJlcG9zaXRvcnkyNTExNDc1MQ==',
    name: 'hellocharts-android',
    full_name: 'lecho/hellocharts-android',
    private: false,
    owner: {
        login: 'lecho',
        id: 545637,
        node_id: 'MDQ6VXNlcjU0NTYzNw==',
        avatar_url: 'https://avatars3.githubusercontent.com/u/545637?v=4',
        gravatar_id: '',
        url: 'https://api.github.com/users/lecho',
        html_url: 'https://github.com/lecho',
        followers_url: 'https://api.github.com/users/lecho/followers',
        following_url: 'https://api.github.com/users/lecho/following{/other_user}',
        gists_url: 'https://api.github.com/users/lecho/gists{/gist_id}',
        starred_url: 'https://api.github.com/users/lecho/starred{/owner}{/repo}',
        subscriptions_url: 'https://api.github.com/users/lecho/subscriptions',
        organizations_url: 'https://api.github.com/users/lecho/orgs',
        repos_url: 'https://api.github.com/users/lecho/repos',
        events_url: 'https://api.github.com/users/lecho/events{/privacy}',
        received_events_url: 'https://api.github.com/users/lecho/received_events',
        type: 'User',
        site_admin: false
    },
    html_url: 'https://github.com/lecho/hellocharts-android',
    description: 'Charts/graphs library for Android compatible with API 8+, several chart types with support for scaling, scrolling and animations',
    fork: false,
    url: 'https://api.github.com/repos/lecho/hellocharts-android',
    forks_url: 'https://api.github.com/repos/lecho/hellocharts-android/forks',
    keys_url: 'https://api.github.com/repos/lecho/hellocharts-android/keys{/key_id}',
    collaborators_url: 'https://api.github.com/repos/lecho/hellocharts-android/collaborators{/collaborator}',
    teams_url: 'https://api.github.com/repos/lecho/hellocharts-android/teams',
    hooks_url: 'https://api.github.com/repos/lecho/hellocharts-android/hooks',
    issue_events_url: 'https://api.github.com/repos/lecho/hellocharts-android/issues/events{/number}',
    events_url: 'https://api.github.com/repos/lecho/hellocharts-android/events',
    assignees_url: 'https://api.github.com/repos/lecho/hellocharts-android/assignees{/user}',
    branches_url: 'https://api.github.com/repos/lecho/hellocharts-android/branches{/branch}',
    tags_url: 'https://api.github.com/repos/lecho/hellocharts-android/tags',
    blobs_url: 'https://api.github.com/repos/lecho/hellocharts-android/git/blobs{/sha}',
    git_tags_url: 'https://api.github.com/repos/lecho/hellocharts-android/git/tags{/sha}',
    git_refs_url: 'https://api.github.com/repos/lecho/hellocharts-android/git/refs{/sha}',
    trees_url: 'https://api.github.com/repos/lecho/hellocharts-android/git/trees{/sha}',
    statuses_url: 'https://api.github.com/repos/lecho/hellocharts-android/statuses/{sha}',
    languages_url: 'https://api.github.com/repos/lecho/hellocharts-android/languages',
    stargazers_url: 'https://api.github.com/repos/lecho/hellocharts-android/stargazers',
    contributors_url: 'https://api.github.com/repos/lecho/hellocharts-android/contributors',
    subscribers_url: 'https://api.github.com/repos/lecho/hellocharts-android/subscribers',
    subscription_url: 'https://api.github.com/repos/lecho/hellocharts-android/subscription',
    commits_url: 'https://api.github.com/repos/lecho/hellocharts-android/commits{/sha}',
    git_commits_url: 'https://api.github.com/repos/lecho/hellocharts-android/git/commits{/sha}',
    comments_url: 'https://api.github.com/repos/lecho/hellocharts-android/comments{/number}',
    issue_comment_url: 'https://api.github.com/repos/lecho/hellocharts-android/issues/comments{/number}',
    contents_url: 'https://api.github.com/repos/lecho/hellocharts-android/contents/{+path}',
    compare_url: 'https://api.github.com/repos/lecho/hellocharts-android/compare/{base}...{head}',
    merges_url: 'https://api.github.com/repos/lecho/hellocharts-android/merges',
    archive_url: 'https://api.github.com/repos/lecho/hellocharts-android/{archive_format}{/ref}',
    downloads_url: 'https://api.github.com/repos/lecho/hellocharts-android/downloads',
    issues_url: 'https://api.github.com/repos/lecho/hellocharts-android/issues{/number}',
    pulls_url: 'https://api.github.com/repos/lecho/hellocharts-android/pulls{/number}',
    milestones_url: 'https://api.github.com/repos/lecho/hellocharts-android/milestones{/number}',
    notifications_url: 'https://api.github.com/repos/lecho/hellocharts-android/notifications{?since,all,participating}',
    labels_url: 'https://api.github.com/repos/lecho/hellocharts-android/labels{/name}',
    releases_url: 'https://api.github.com/repos/lecho/hellocharts-android/releases{/id}',
    deployments_url: 'https://api.github.com/repos/lecho/hellocharts-android/deployments',
    created_at: new Date('2014-10-12T09:12:37Z'),
    updated_at: new Date('2019-04-04T23:50:52Z'),
    pushed_at: new Date('2019-04-01T08:20:35Z'),
    git_url: 'git://github.com/lecho/hellocharts-android.git',
    ssh_url: 'git@github.com:lecho/hellocharts-android.git',
    clone_url: 'https://github.com/lecho/hellocharts-android.git',
    svn_url: 'https://github.com/lecho/hellocharts-android',
    homepage: '',
    size: 6126,
    stargazers_count: 6469,
    watchers_count: 6469,
    language: 'Java',
    has_issues: true,
    has_projects: true,
    has_downloads: true,
    has_wiki: false,
    has_pages: false,
    forks_count: 1567,
    mirror_url: null,
    archived: false,
    open_issues_count: 267,
    license: {
        key: 'apache-2.0',
        name: 'Apache License 2.0',
        spdx_id: 'Apache-2.0',
        url: 'https://api.github.com/licenses/apache-2.0',
        node_id: 'MDc6TGljZW5zZTI='
    },
    forks: 1567,
    open_issues: 267,
    watchers: 6469,
    default_branch: 'master',
    score: 66.08592
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
        // { provide: GithubService, useValue: githubMock },
       ]
    }).compileComponents();
    store = TestBed.get(Store);
    store.reset({RepoState: sampleRepoState});
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseComponent);
    component = fixture.componentInstance;
    Object.defineProperty(component, 'repositories$', { writable: true });
    component.repositories$ = of(sampleRepoState.searched);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
