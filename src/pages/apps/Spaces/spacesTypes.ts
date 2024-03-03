export type SpacesList = {
    id: string;
    spaceName: string;
    spaceDescription: string;
    spaceLogo: string;
    spacePhoto: string;
    totalBookings: number;
    slotsMinPrice : number;
    minimumReservationFee : number;
    location: {
        country: string;
        address: string;
        city: string;
      };
      spaceAmenities: string[];
};
