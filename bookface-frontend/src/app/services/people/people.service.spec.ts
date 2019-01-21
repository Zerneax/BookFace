import { TestBed } from '@angular/core/testing';

import { PeopleService } from './people.service';
import { HttpClientModule } from '@angular/common/http';

describe('PeopleService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ],
    declarations: []
  }));

  it('should be created', () => {
    const service: PeopleService = TestBed.get(PeopleService);
    expect(service).toBeTruthy();
  });
});
