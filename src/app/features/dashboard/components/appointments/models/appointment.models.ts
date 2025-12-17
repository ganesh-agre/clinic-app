export interface Provider {
  id: number;
  name: string;
  specialty: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface AppointmentPayload {
  providerId: number;
  date: string;
  time: string;
  patientName: string;
  patientEmail: string;
}
