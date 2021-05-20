import { Document } from 'mongoose';

export default interface IMobile extends Document {
    name: string;
    price: string;
}
