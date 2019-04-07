import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OrgItemComponent } from './org-item.component';
import { IOrg } from 'src/app/_models/_domain/IOrg';

describe('OrgItemComponent', () => {
  let component: OrgItemComponent;
  let fixture: ComponentFixture<OrgItemComponent>;

  const sampleOrg: IOrg = {
    login: 'Sample Organization',
    id: 1,
    node_id: 'MDEyOk9yZ2FuaXphdGlvbjgx',
    url: 'https://api.github.com/orgs/engineyard',
    avatar_url: 'https://avatars1.githubusercontent.com/u/81?v=4',
    description: 'Yeet'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [ OrgItemComponent ],
      providers: [

      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgItemComponent);
    component = fixture.componentInstance;
    component.organization = sampleOrg;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
