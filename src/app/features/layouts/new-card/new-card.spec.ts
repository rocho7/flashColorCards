import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCardComponent } from './new-card';
import { FormBuilder } from '@angular/forms';
import { provideRouter, Router } from '@angular/router';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { NewCardService } from './services/new-card';
import { ICard } from '../card/interface/card.interface';
import { provideHttpClient } from '@angular/common/http';
import { MessageService, ToastMessageOptions } from 'primeng/api';

fdescribe('NewCardComponent', () => {
  let component: NewCardComponent;
  let fixture: ComponentFixture<NewCardComponent>;
  let httpTesting: HttpTestingController;
  let newCardService: NewCardService;
  let messageService: MessageService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCardComponent],
      providers: [
        NewCardService,
        MessageService,
        FormBuilder,
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NewCardComponent);
    component = fixture.componentInstance;
    httpTesting = TestBed.inject(HttpTestingController);
    newCardService = TestBed.inject(NewCardService);
    messageService = TestBed.inject(MessageService);
    router = TestBed.inject(Router);

    const formBuilder = TestBed.inject(FormBuilder);
    const form = formBuilder.group({
      front: [''],
      back: [''],
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should call http postCard', () => {
    const front = component.formCard.get('front');
    const back = component.formCard.get('back');
    front?.setValue('Title');
    back?.setValue('Traducción');
    const newCard: ICard = {
      id: 0,
      idSet: 1,
      title: front?.value,
      answer: back?.value,
      review: 0,
      forgotten: 0,
      daysOverdue: 0,
      delay: null,
      color: '',
    };
    spyOn(newCardService, 'postCard').and.resolveTo(true);
    component.submit();

    expect(newCardService.postCard).toHaveBeenCalled();
  });

  it('Should call goBack method', () => {
    const spyShowConfirmModal = spyOn(component, 'showConfirmModal');
    component.goBack();
    expect(spyShowConfirmModal).toHaveBeenCalled();
  });

  it('Should call showConfirmModal method', () => {
    const message: ToastMessageOptions = {
      key: 'confirm',
      sticky: true,
      severity: 'custom',
      summary: 'Are you sure you want to exit?',
      styleClass:
        'bg-gray-600 rounded-2xl border border-green-700 border-solid-4',
    };
    const addSpy = spyOn(component['messageService'], 'add');
    component.showConfirmModal();
    expect(addSpy).toHaveBeenCalled();
    expect(addSpy).toHaveBeenCalledWith(message);

    expect(component.visible).toBeTrue();
  });

  it('Should call onConfirmModal method', () => {
    const spyOnCloseConfirmModal = spyOn(component, 'onCloseConfirmModal');
    component.onConfirmModal();
    expect(spyOnCloseConfirmModal).toHaveBeenCalled();

    component.idSet = 2;

    spyOn(router, 'navigate');
    component.onConfirmModal();
    expect(router.navigate).toHaveBeenCalledWith(['home', 'study'], {
      queryParams: { id: component.idSet },
    });
  });

  it('Should call onCloseConfirmModal method', () => {
    component.onCloseConfirmModal();
    expect(component.visible).toBeFalse();
  });

  it('Should call showColorPicker', () => {
    component.showColorPicker();
    expect(component.isColorPickerVisible).toBeTrue();
  });

  it('Should call closePickerDialog2', () => {
    component.isColorPickerVisible = false;
    component.closePickerDialog();
    expect(component.isColorPickerVisible).toBeFalse();
  });

  it('Should call confirPickerDialog', () => {
    const spyOnComfirmPickerDialog = spyOn(component, 'closePickerDialog');
    component.confirmPickerDialog();
    expect(spyOnComfirmPickerDialog).toHaveBeenCalled();
  });
});
