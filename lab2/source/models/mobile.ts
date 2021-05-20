import mongoose, { Schema } from 'mongoose';
import IMobile from '../interfaces/mobile';

const CourseAuthorSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        price: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IMobile>('Mobile', CourseAuthorSchema);
