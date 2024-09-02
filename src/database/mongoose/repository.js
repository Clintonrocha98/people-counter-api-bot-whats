import { EventLog, PeopleCount } from './model.js';

const incrementPeopleCount = async () => {
  const newEvent = await EventLog.create({ type: 'entry' });

  const data = await PeopleCount.findOneAndUpdate(
    {},
    { $inc: { totalPeople: 1 }, $set: { lastUpdated: Date.now() }, $push: { eventLogs: newEvent._id } },
    { upsert: true, new: true }
  );

  if (!data) return null;

  return data;
};

const decrementPeopleCount = async () => {
  const newEvent = await EventLog.create({ type: 'exit' });

  const data = await PeopleCount.findOneAndUpdate(
    {},
    { $inc: { totalPeople: -1 }, $set: { lastUpdated: Date.now() }, $push: { eventLogs: newEvent._id } },
    { upsert: true, new: true }
  );

  if (!data) return null;

  return data;
}
const getCurrentPeopleCount = async () => {
  const record = await PeopleCount.findOne({}).populate('eventLogs');

  if (!record) return null;

  return record;
};

export default { getCurrentPeopleCount, incrementPeopleCount, decrementPeopleCount }