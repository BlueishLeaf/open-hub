import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { MarkdownModule } from 'ngx-markdown';

import { AppComponent } from './app.component';

import { WelcomeComponent } from './welcome/welcome.component';

import { NavComponent } from './nav/nav.component';

import { LoginComponent } from './auth-forms/login/login.component';
import { RegisterComponent } from './auth-forms/register/register.component';

import { BrowseComponent } from './browse/browse.component';

import { OrgListComponent } from './browse/orgs/org-list/org-list.component';
import { OrgItemComponent } from './browse/orgs/org-item/org-item.component';

import { RepoDetailComponent } from './browse/repos/repo-detail/repo-detail.component';
import { RepoListComponent } from './browse/repos/repo-list/repo-list.component';
import { RepoItemComponent } from './browse/repos/repo-item/repo-item.component';

import { ReviewListComponent } from './browse/repos/reviews/review-list/review-list.component';
import { ReviewItemComponent } from './browse/repos/reviews/review-item/review-item.component';

import { SearchComponent } from './browse/search/search.component';

import { AuthService } from './services/auth.service';
import { GithubService } from './services/github.service';
import { environment } from 'src/environments/environment';
import { FirestoreService } from './services/firestore.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { PopularComponent } from './popular/popular.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';

@NgModule({
   declarations: [
      AppComponent,
      WelcomeComponent,
      NavComponent,
      LoginComponent,
      RegisterComponent,
      BrowseComponent,
      OrgListComponent,
      OrgItemComponent,
      RepoDetailComponent,
      RepoListComponent,
      RepoItemComponent,
      ReviewListComponent,
      ReviewItemComponent,
      SearchComponent,
      PopularComponent,
      BookmarksComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireDatabaseModule,
      MarkdownModule.forRoot(),
      RouterModule.forRoot([
         { path: '', component: WelcomeComponent, pathMatch: 'full'},
         { path: 'login', component: LoginComponent, pathMatch: 'full'},
         { path: 'register', component: RegisterComponent, pathMatch: 'full'},
         { path: 'browse', component: BrowseComponent, pathMatch: 'full'},
         { path: 'popular', component: PopularComponent, pathMatch: 'full'},
         { path: 'orgs', component: OrgListComponent, pathMatch: 'full'},
         { path: 'bookmarks', component: BookmarksComponent, pathMatch: 'full'},
         { path: 'repo/:id', component: RepoDetailComponent, pathMatch: 'full'}
      ])
   ],
   providers: [AuthService, GithubService, FirestoreService, AngularFireAuth],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
