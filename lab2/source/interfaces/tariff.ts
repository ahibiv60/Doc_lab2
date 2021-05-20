import { Document } from 'mongoose';

export default interface ITariff extends Document {
    name: string;
    price: string;
}
