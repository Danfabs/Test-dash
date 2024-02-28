export type Message = {
    id: number;
    avatar: string;
    sender: string;
    text: string;
    time: string;
};

export type ServicesList = {
    id: number;
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
