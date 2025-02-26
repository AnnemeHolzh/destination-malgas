export interface House {
    houseId: string;
    name: string;
    capacity: number;
    beds: number;
    baths: number;
    pricePerNight: number;
    description: string;
    shortDescription: string;
    media: {
      photos: string[];
      videos: string[];
    };
    amenities: Record<string, { available: boolean; amount: number }>;
    active: boolean;
    createdAt: number;
    updatedAt: number;
}