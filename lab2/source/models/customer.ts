import mongoose, { Schema } from 'mongoose';
import ICustomer from '../interfaces/customer';

const UserSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        activeTariff: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<ICustomer>('Customer', UserSchema);
