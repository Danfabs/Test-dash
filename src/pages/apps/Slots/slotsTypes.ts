export type Message = {
    id: number;
    avatar: string;
    sender: string;
    text: string;
    time: string;
};

export type SlotsList = {
    documentId: string;
    slotName: string;
    slotPhoto: string;
    slotDescription: string;
    seatsAvailable: number;
    scheme: string;
    makeupBuffer: string;
    basePricing: {
        minimumDuration: number;
        price: number;
      };
};
