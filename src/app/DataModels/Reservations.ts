//TODO: Will be used in future implementation
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Reservation {
    reservationId: string;
    houseId: string;
    pax: {
      adults: number;
      children: number;
    };
    dates: {
      arrival: number;
      departure: number;
    };
    status: 'pending' | 'confirmed' | 'cancelled';
    createdAt: number;
  }