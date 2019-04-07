import { TestBed, inject } from '@angular/core/testing';
import { FirestoreService } from './firestore.service';
import { HttpClientModule } from '@angular/common/http';

describe('Service: Firestore', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [FirestoreService]
    });
  });

  it('should ...', inject([FirestoreService], (service: FirestoreService) => {
    expect(service).toBeTruthy();
  }));
});
