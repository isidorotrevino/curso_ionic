import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TagpackerPage } from './tagpacker.page';

describe('TagpackerPage', () => {
  let component: TagpackerPage;
  let fixture: ComponentFixture<TagpackerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagpackerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TagpackerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
