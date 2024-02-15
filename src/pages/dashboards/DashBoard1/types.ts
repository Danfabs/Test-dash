export type Message = {
    id: number;
    avatar: string;
    sender: string;
    text: string;
    time: string;
};

export type EndUsersDetail = {
    id: number;
    name: string;
    startDate: string;
    dueDate: string;
    status: string;
    variant: string;
    clients: string;
};
