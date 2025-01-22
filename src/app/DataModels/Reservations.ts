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