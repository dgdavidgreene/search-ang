import { TestBed } from '@angular/core/testing';

import { BranchService } from './branch.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from './data.service';
import { BranchAdapter } from '../utilities/branch.adapter';

describe('BranchService', () => {
  let dataService: DataService;
  let service: BranchService

  beforeEach(() => TestBed.configureTestingModule({
    "imports": [
      HttpClientTestingModule
    ],
    "providers": [
      DataService,
      BranchAdapter
    ]
  }));

  beforeEach(() => {
    dataService = TestBed.get(DataService);
    service = TestBed.get(BranchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sort', () => {
    const sort = service.sortByName({ name: "z" }, { name: "a" } );
    expect(sort).toEqual(1);
  });
  
});
