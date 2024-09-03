import { PeopleCount } from './model.js';

const incrementPeopleCount = async () => {

  const data = await PeopleCount.findOneAndUpdate(
    {},
    { $inc: { totalPeople: 1 }, $set: { lastUpdated: Date.now() } },
    { upsert: true, new: true }
  );

  if (!data) return null;

  return data;
};

const decrementPeopleCount = async () => {

  const data = await PeopleCount.findOneAndUpdate(
    {},
    { $inc: { totalPeople: -1 }, $set: { lastUpdated: Date.now() } },
    { upsert: true, new: true }
  );

  if (!data) return null;

  return data;
}
const getCurrentPeopleCount = async () => {
  const record = await PeopleCount.findOne({});

  if (!record) return null;

  return record;
};

export default { getCurrentPeopleCount, incrementPeopleCount, decrementPeopleCount }