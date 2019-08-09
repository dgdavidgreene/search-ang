import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

import { Observable, combineLatest } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { BranchService } from './services/branch.service';
import { Branch } from './models/branch.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'aavri - Halifax Bank Branches';
  currentPage: number = 1;
  branches$: Observable<Branch[]>;

  filteredBranches$: Observable<Branch[]>;
  cityFilter: FormControl;
  filter$: Observable<string>;

  constructor(private service: BranchService) {
    this.cityFilter = new FormControl('');
  }

  toggle(item: Branch) {
    item.isSelected = !item.isSelected;
  }

  ngOnInit() {
    this.branches$ = this.service.get();
    this.filter$ = this.cityFilter.valueChanges.pipe(startWith(''));
    this.filteredBranches$ = combineLatest(this.branches$, this.filter$).pipe(
      map(([branches, filterString]) => branches.filter(branch => branch.city.indexOf(filterString.toUpperCase()) !== -1))
    );
  }

}
