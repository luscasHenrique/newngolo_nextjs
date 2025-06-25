import StatusType from './StatusType';
import PaymentStatus from './PaymentStatus';

export interface Order {
  id: string;
  userId: string;
  eventId: string; // Corrigir para eventId
  createdAt: string; // Data no formato string
  totalValue: string | null; // Permitir null
  cancelReason?: string | null; // Permitir null
  cancelDate?: string | null; // Data no formato string
  cancelUserId?: string | null; // Apenas string ou null
  status: StatusType;
  paymentStatus: PaymentStatus;
  isCoutesy: boolean; // Corrigir para isCoutesy
}
