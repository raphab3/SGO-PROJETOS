import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TabNovoChamadoPage } from './tab-novoChamado.page';


describe('TabNovoChamadoPage', () => {
  let component: TabNovoChamadoPage;
  let fixture: ComponentFixture<TabNovoChamadoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabNovoChamadoPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabNovoChamadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
