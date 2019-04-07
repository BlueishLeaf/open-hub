import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RepoItemComponent } from './repo-item.component';
import { IRepo } from 'src/app/_models/_domain/IRepo';
import { RouterTestingModule } from '@angular/router/testing';

describe('RepoItemComponent', () => {
  let component: RepoItemComponent;
  let fixture: ComponentFixture<RepoItemComponent>;

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ RepoItemComponent ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoItemComponent);
    component = fixture.componentInstance;
    component.repository = sampleRepo;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
