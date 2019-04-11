import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ISearchQuery} from '../../_models/_domain/ISearchQuery';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [ SearchComponent ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit a search object when a search is called', () => {
    let searchObject: ISearchQuery = null;
    component.searchEvent.subscribe(so => searchObject = so);

    component.searchForm = new FormGroup({
      name: new FormControl('johnsmith@openhub.com'),
      language: new FormControl('Hunter2'),
      license: new FormControl('John'),
      minStars: new FormControl(3),
      maxStars: new FormControl(400),
      minFirstIssues: new FormControl(1),
      maxFirstIssues: new FormControl(100)
    });
    component.search();
    expect(searchObject).not.toBeNull();
  });
});
