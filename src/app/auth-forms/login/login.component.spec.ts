import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Store, NgxsModule } from '@ngxs/store';
import { AuthState } from 'src/app/state-management/states/auth.state';
import { AngularFireAuth } from '@angular/fire/auth';

import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: Store;

  const fireAuthMock = {
    auth: of(null)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NgxsModule.forRoot([AuthState])
      ],
      declarations: [ LoginComponent ],
      providers: [
        { provide: AngularFireAuth, useValue: fireAuthMock }
      ]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
