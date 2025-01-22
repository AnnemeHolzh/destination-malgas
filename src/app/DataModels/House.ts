interface House {
    houseId: string;
    name: string;
    capacity: {
      adults: number;
      children: number;
    };
    beds: number;
    baths: number;
    description: string;
    media: {
      photos: string[];
      videos: string[];
    };
    amenities: Record<string, boolean>;
    active: boolean;
    createdAt: number;
    updatedAt: number;
  }