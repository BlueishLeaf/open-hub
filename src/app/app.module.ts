import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { MarkdownModule } from 'ngx-markdown';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './forms/login/login.component';
import { RegisterComponent } from './forms/register/register.component';
import { BrowseComponent } from './browse/browse.component';
import { OrgListComponent } from './browse/orgs/org-list/org-list.component';
import { OrgItemComponent } from './browse/orgs/org-item/org-item.component';
import { RepoDetailComponent } from './browse/repos/repo-detail/repo-detail.component';
import { RepoListComponent } from './browse/repos/repo-list/repo-list.component';
import { RepoItemComponent } from './browse/repos/repo-item/repo-item.component';
import { SearchComponent } from './browse/search/search.component';
import { AuthService } from './_services/auth.service';
import { GithubService } from './_services/github.service';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
import { PopularComponent } from './popular/popular.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { AuthGuardService } from './_services/auth-guard.service';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from './_store/_states/auth.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { RepoState } from './_store/_states/repo.state';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
      SearchComponent,
      PopularComponent,
      BookmarksComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      NgbModule,
      AngularFireModule.initializeApp(environment.firebase),
      MarkdownModule.forRoot(),
      NgxsModule.forRoot([AuthState, RepoState], {developmentMode: !environment.production}),
      NgxsReduxDevtoolsPluginModule.forRoot(),
      RouterModule.forRoot([
         { path: '', component: WelcomeComponent, pathMatch: 'full'},
         { path: 'home', component: WelcomeComponent, pathMatch: 'full'},
         { path: 'login', component: LoginComponent, pathMatch: 'full'},
         { path: 'register', component: RegisterComponent, pathMatch: 'full'},
         { path: 'browse', component: BrowseComponent, pathMatch: 'full'},
         { path: 'popular', component: PopularComponent, pathMatch: 'full'},
         { path: 'orgs', component: OrgListComponent, pathMatch: 'full'},
         { path: 'bookmarks', component: BookmarksComponent, pathMatch: 'full', canActivate: [AuthGuardService]},
         { path: 'repo/:id', component: RepoDetailComponent, pathMatch: 'full'}
      ])
   ],
   providers: [AuthService, GithubService, AngularFireAuth],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
