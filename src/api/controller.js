import { errorHandler } from "../shared/errorHandler/error-handler.js";
import { statusCode } from "../shared/errorHandler/statusCode/status-code.js";
import service from "./service.js";

const getCurrentCount = async (req, res) => {
  const [err, data] = await service.getCurrentPeopleCount();
  if (err) {
    const { errMessage, errStatusCode } = errorHandler(err);

    return res.status(errStatusCode).send({ message: errMessage });
  }
  return res.status(statusCode.OK).json(data);
}

const incrementPeopleCount = async (req, res) => {
  const [err, data] = await service.incrementPeopleCount();
  if (err) {
    const { errMessage, errStatusCode } = errorHandler(err);
    return res.status(errStatusCode).send({ message: errMessage });
  }
  return res.status(statusCode.OK).json(data);
}

const decrementPeopleCount = async (req, res) => {
  const [err, data] = await service.decrementPeopleCount();
  if (err) {
    const { errMessage, errStatusCode } = errorHandler(err);
    return res.status(errStatusCode).send({ message: errMessage });
  }
  return res.status(statusCode.OK).json(data);
}

export default { getCurrentCount, incrementPeopleCount, decrementPeopleCount }