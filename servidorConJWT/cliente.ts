export class Client {
    constructor(
        public id: number,
        public username: string,
        public password: string,
        public member: boolean,
        public firstName: string,
        public lastName: string,
        public email: string,
        public country: string,
        public favorites: { id: number, note: string }[],
        public creditCard: {name: string, number: string, date: string, cvv: string, address: string, country: string }[]
    ) {}
}