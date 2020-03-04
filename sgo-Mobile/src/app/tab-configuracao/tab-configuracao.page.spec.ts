import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabConfiguracaoPage } from './tab-configuracao.page';

describe('Tab3Page', () => {
  let component: TabConfiguracaoPage;
  let fixture: ComponentFixture<TabConfiguracaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabConfiguracaoPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabConfiguracaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
