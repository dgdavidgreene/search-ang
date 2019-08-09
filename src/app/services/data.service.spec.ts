import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from "@angular/common/http/testing";

import { DataService } from './data.service';

interface TestData {
  "field": string;
}

const getParam: string = "Branch";
const path: string = "https://api.halifax.co.uk/open-banking/v2.2/branches";

describe('DataService', () => {
  let dataService: DataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      "imports": [
        HttpClientTestingModule
      ],
      providers: [
        DataService
      ]
    });

    dataService = TestBed.get(DataService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    const service: DataService = TestBed.get(DataService);
    expect(service).toBeTruthy();
  });


  describe("GET Endpoint", () => {
    it("should be of type GET", () => {
      // arrange
      dataService.get(getParam).subscribe();

      // act
      const testRequest: TestRequest = httpTestingController.expectOne(path);

      // assert
      expect(testRequest.request.method).toEqual("GET");
    });

    it("should return one test data item", () => {
      // arrange
      const testData: TestData = { "field": "data" };

      let result: TestData;
      dataService.get(getParam)
        .subscribe((response: TestData) =>
          result = response
        );

      // act
      const testRequest: TestRequest = httpTestingController.expectOne(path);
      testRequest.flush(testData);

      // assert
      expect(result).toEqual(testData);
    });

  });
/*

  // errorHandler
  it("should handle with errorHandler", () => {
    const error = new ErrorEvent("Api Error");
    dataService.errorHandler(error);
    // .toThrow(new Error("Api Error"));;
  });
*/
});
