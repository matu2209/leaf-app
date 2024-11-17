export class Client {

    id: number = 0;
    username: string = "";
    password: string = "";
    member: boolean = false;
    firstName: string = "";
    lastName: string = "";
    birthDate: Date = new Date();
    email: string = "";
    country: string = "";
    admin: boolean = false;
    isActivated: boolean = false;
    favorites: { id: number, note: string }[] = [];
    creditCard: {name: string, number: string, date: string, cvv: string, address: string, country: string }[] = [];
}