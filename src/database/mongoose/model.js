import mongoose, { Schema } from "mongoose";

const peopleCountSchema = new Schema({
  totalPeople: {
    type: Number,
    required: true,
    default: 0
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

export const PeopleCount = mongoose.model('PeopleCount', peopleCountSchema);

