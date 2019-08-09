import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BranchAdapter } from './utilities/branch.adapter';
import { DataStubService } from './utilities/data-stub.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent; 
  let stubService: DataStubService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
      "providers": [
        DataStubService,
        BranchAdapter
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    stubService = TestBed.get(DataStubService);
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'aavri - Halifax Bank Branches`, () => {
    expect(app.title).toEqual('aavri - Halifax Bank Branches');
  });

  it('should render title in a h1 tag', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to aavri - Halifax Bank Branches!');
  });

  it(`should have toggle whether an item is selected`, () => {
    const branch = stubService.getBranch();
    app.toggle(branch);
    expect(branch.isSelected).toEqual(true);
  });


});
