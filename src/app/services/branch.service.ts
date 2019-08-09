import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { DataService } from './data.service';
import { Branch } from '../models/branch.model';
import { tap, map } from 'rxjs/operators';
import { BranchAdapter } from '../utilities/branch.adapter';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private data: DataService, private adapter: BranchAdapter) { }

  get(): Observable<any[]> {
    return this.data.fetch("Branch").pipe(
      map(data => data.map(this.adapter.adapt)),
      tap(results => {
        results.sort(this.sortByName)
      })
    );
  }

  sortByName(a,b) {
    if (a.name < b.name)
      return -1;
    if (a.name > b.name)
      return 1;
    return 0;
  }
}
