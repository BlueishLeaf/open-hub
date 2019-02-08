import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { WelcomeComponent } from './welcome/welcome.component';

import { NavComponent } from './nav/nav.component';

import { LoginComponent } from './auth-forms/login/login.component';
import { RegisterComponent } from './auth-forms/register/register.component';

import { BookmarkItemComponent } from './bookmarks/bookmark-item/bookmark-item.component';
import { BookmarkListComponent } from './bookmarks/bookmark-list/bookmark-list.component';

import { OrgDetailComponent } from './browse/orgs/org-detail/org-detail.component';
import { OrgListComponent } from './browse/orgs/org-list/org-list.component';
import { OrgItemComponent } from './browse/orgs/org-item/org-item.component';

import { RepoDetailComponent } from './browse/repos/repo-detail/repo-detail.component';
import { RepoListComponent } from './browse/repos/repo-list/repo-list.component';
import { RepoItemComponent } from './browse/repos/repo-item/repo-item.component';

import { ReviewListComponent } from './browse/repos/reviews/review-list/review-list.component';
import { ReviewItemComponent } from './browse/repos/reviews/review-item/review-item.component';

import { SearchComponent } from './browse/search/search.component';

@NgModule({
   declarations: [
      AppComponent,
      WelcomeComponent,
      NavComponent,
      LoginComponent,
      RegisterComponent,
      BookmarkItemComponent,
      BookmarkListComponent,
      OrgDetailComponent,
      OrgListComponent,
      OrgItemComponent,
      RepoDetailComponent,
      RepoListComponent,
      RepoItemComponent,
      ReviewListComponent,
      ReviewItemComponent,
      SearchComponent
   ],
   imports: [
      BrowserModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
