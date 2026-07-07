import { InferSchemaType, Schema, Types, model } from 'mongoose';

const leaderboardEntrySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const leaderboardSchema = new Schema(
  {
    weekStart: { type: Date, required: true },
    entries: { type: [leaderboardEntrySchema], required: true },
  },
  { timestamps: true }
);

export type Leaderboard = InferSchemaType<typeof leaderboardSchema> & {
  entries: Array<{ userId: Types.ObjectId; points: number; rank: number }>;
};

export default model('Leaderboard', leaderboardSchema);
