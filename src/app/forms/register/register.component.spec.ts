import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import {Observable, of} from 'rxjs';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Actions, NgxsModule, ofActionDispatched} from '@ngxs/store';
import { AuthState } from 'src/app/_store/_states/auth.state';
import { AngularFireAuth } from '@angular/fire/auth';
import {EmailLogin, Register} from '../../_store/_actions/auth.actions';

describe('RegisterComponent', () => {
  let actions$: Observable<any>;
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  const fireAuthMock = {
    auth: of(null)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NgxsModule.forRoot([AuthState])
      ],
      declarations: [ RegisterComponent ],
      providers: [
        { provide: AngularFireAuth, useValue: fireAuthMock },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    actions$ = TestBed.get(Actions);
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch the register action to state with a payload containing the user\'s details', () => {
    component.registerForm = new FormGroup({
      email: new FormControl('johnsmith@openhub.com'),
      password: new FormControl('Hunter2'),
      fName: new FormControl('John'),
      lName: new FormControl('Smith')
    });
    component.register();
    actions$.pipe(ofActionDispatched(Register)).subscribe( action => expect(action.payload).toBe({
      email: 'johnsmith@openhub.com',
      password: 'Hunter2',
      fName: 'John',
      lName: 'Smith'
    }));
  });
});
