export type Message = {
    id: number;
    avatar: string;
    sender: string;
    text: string;
    time: string;
};

export type ReservationsList = {
    id: string;
    status: string;
    spacePhoto: string;
    scheme: string;
    bookedDate: string;
    bookedTime: string;
    duration : number;
    customerName: string;
    customerRating : number;
    paymentDetails: {
        currency: string;
        slotFee: number;
        tax: number;
        total: number;
        voucher: number;
      };
      location: {
        address: string;
        city: string;
      };
};
