import { InferSchemaType, Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true, min: 10 },
    focusArea: { type: String, required: true, trim: true },
    equipment: [{ type: String, required: true }],
  },
  { timestamps: true }
);

export type Workout = InferSchemaType<typeof workoutSchema>;
export default model('Workout', workoutSchema);
