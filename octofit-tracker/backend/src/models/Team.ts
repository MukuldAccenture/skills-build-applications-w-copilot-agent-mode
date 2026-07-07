import { InferSchemaType, Schema, Types, model } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    city: { type: String, required: true, trim: true },
    memberIds: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    captainId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export type Team = InferSchemaType<typeof teamSchema> & {
  memberIds: Types.ObjectId[];
  captainId: Types.ObjectId;
};

export default model('Team', teamSchema);
