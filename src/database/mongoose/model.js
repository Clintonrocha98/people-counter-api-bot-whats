import mongoose, { Schema } from "mongoose";

const eventLogSchema = new Schema({
  type: {
    type: String, // 'entry' ou 'exit'
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const peopleCountSchema = new Schema({
  totalPeople: {
    type: Number,
    required: true,
    default: 0
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },

  eventLogs: [{
    type: Schema.Types.ObjectId,
    ref: 'EventLog'
  }]
});

export const EventLog = mongoose.model('EventLog', eventLogSchema);

export const PeopleCount = mongoose.model('PeopleCount', peopleCountSchema);

