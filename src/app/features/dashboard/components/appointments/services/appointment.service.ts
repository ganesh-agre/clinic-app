import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  delay,
  filter,
  map,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { Provider } from '../models/appointment.models';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private providerSubject = new BehaviorSubject<Provider | null>(null);
  private dateSubject = new BehaviorSubject<string | null>(null);
  private slotSubject = new BehaviorSubject<string | null>(null);

  provider$ = this.providerSubject.asObservable();
  date$ = this.dateSubject.asObservable();
  slot$ = this.slotSubject.asObservable();

  getProviders(): Observable<Provider[]> {
    return of([
      { id: 1, name: 'Dr. Smith', specialty: 'Cardiology' },
      { id: 2, name: 'Dr. Jane', specialty: 'Dermatology' },
    ]).pipe(delay(400));
  }

  selectProvider(provider: Provider) {
    this.providerSubject.next(provider);
  }

  selectDate(date: string) {
    this.dateSubject.next(date);
  }

  selectSlot(time: string) {
    this.slotSubject.next(time);
  }

  isSlotSelectionReady$ = combineLatest([this.provider$, this.date$]).pipe(
    map(([p, d]) => !!p && !!d)
  );

  availableSlots$ = combineLatest([this.provider$, this.date$]).pipe(
    filter(([p, d]) => !!p && !!d),
    switchMap(() =>
      of([
        { time: '09:00', available: true },
        { time: '10:00', available: false },
        { time: '11:00', available: true },
      ]).pipe(delay(600))
    )
  );

  summary$ = combineLatest([this.provider$, this.date$, this.slot$]).pipe(
    map(([provider, date, slot]) => {
      const hasSelection = !!provider && !!date && !!slot;
      return hasSelection ? { provider, date, slot } : null; // emit null if nothing is selected
    })
  );
}
