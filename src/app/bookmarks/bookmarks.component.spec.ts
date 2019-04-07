import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BookmarksComponent } from './bookmarks.component';
import { RepoListComponent } from '../browse/repos/repo-list/repo-list.component';
import { RepoItemComponent } from '../browse/repos/repo-item/repo-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { IUser } from '../_models/_domain/IUser';
import { NgxsModule } from '@ngxs/store';
import { AuthState, AuthStateModel } from '../state-management/states/auth.state';
import { AngularFireAuth } from '@angular/fire/auth';
import { of } from 'rxjs';

describe('BookmarksComponent', () => {
  let component: BookmarksComponent;
  let fixture: ComponentFixture<BookmarksComponent>;

  const sampleUser: IUser = {
    email: 'johnsmith@example.com',
    role: 'user',
    bookmarks: []
  };

  const sampleUserInfo: firebase.UserInfo = {
    uid: 'asdf',
    email: 'johnsmith@example.com',
    displayName: 'John Smith',
    phoneNumber: null,
    photoURL: null,
    providerId: null
  };

  const sampleAuthState: AuthStateModel = {
    user: sampleUserInfo
  };

  const fireAuthMock = {
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        NgxsModule.forRoot([AuthState])
      ],
      declarations: [ BookmarksComponent, RepoListComponent, RepoItemComponent ],
      providers: [
        { provide: AngularFireAuth, useValue: fireAuthMock },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarksComponent);
    component = fixture.componentInstance;
    Object.defineProperty(component, 'user$', { writable: true });
    component.user$ = of(sampleUserInfo);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
