import mongoose, { Schema } from 'mongoose';
import ITariff from '../interfaces/tariff';

const CourseSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        price: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<ITariff>('Tariff', CourseSchema);
