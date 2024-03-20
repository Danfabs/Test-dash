export type Message = {
    id: number;
    avatar: string;
    sender: string;
    text: string;
    time: string;
};

export type ProviderList = {
    id: number;
    email_address: string;
    gender: string;
    is_partner: boolean;
    name: string;
    mobile_number:string;
    birthdate:string;
    photo_url:string | null;
    status: string;

};
