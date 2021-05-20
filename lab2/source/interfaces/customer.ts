import { Document } from 'mongoose';

export default interface ICustomer extends Document {
    name: string;
    phone: string;
    activeTariff: string;
}
