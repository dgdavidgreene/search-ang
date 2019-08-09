import { DataAdapter } from '../models/data-adapter.model';
import { Branch } from '../models/branch.model';

export class BranchAdapter implements DataAdapter<Branch> {

  adapt(item: any): Branch {
    let name = item["Name"];
    let phoneNumber = "";
    let streetAddress = "";
    let townName = "";
    let countrySubDivision = "";
    let country = "";
    let postCode = "";
    let address = item["PostalAddress"];
    if (address) {
      streetAddress = address.AddressLine ? address.AddressLine[0] : "";
      townName = address.TownName ? address.TownName : "";
      countrySubDivision = address.CountrySubDivision ? address.CountrySubDivision[0] : "";
      country = address.Country ? address.Country : "";
      postCode = address.PostCode ? address.PostCode : "";
    }

    if (item.ContactInfo) {
      let contacts = item.ContactInfo.filter(contact => {
        return contact.ContactType === "Phone"
      });
      if (contacts.length === 1) {
        phoneNumber = contacts[0].ContactContent
      }
    }

    let branch: Branch = {
      name: name,
      phoneNumber: phoneNumber,
      streetAddress: streetAddress,
      city: townName,
      subDivision: countrySubDivision,
      country: country,
      postalCode: postCode,
      isSelected: false
    };
    return branch;
  }

}