import { Injectable } from '@angular/core';
import { Branch } from '../models/branch.model';

@Injectable({
  providedIn: 'root'
})
export class DataStubService {

  getBranch() {
    let branch: Branch = {
      city: "",
      country: "",
      isSelected: false,
      name: "",
      phoneNumber: "",
      postalCode: "",
      streetAddress: "",
      subDivision: "",
    }
    return branch;
  }

  constructor() { }
}
