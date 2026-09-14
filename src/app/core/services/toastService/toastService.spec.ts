import { TestBed } from '@angular/core/testing';
import { ToastService } from './toastService.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ToastService] });
    service = TestBed.inject(ToastService);
  });

  it('updates the computed message when a toast is set', () => {
    const message = { severity: 'success', summary: 'Saved' };

    expect(service.messageToastDisplayed()).toBeNull();

    service.setMessageToast(message);

    expect(service.messageToastDisplayed()).toEqual(message);
  });
});