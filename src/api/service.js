import repository from "../database/mongoose/repository.js"
import { err, success } from "../shared/api-patterns/return-pattern.js"
import { errorMessages } from "../shared/errorHandler/enums/error-messages.js"
import { getStackTrace } from "../shared/errorHandler/stackTrace/get-stack-trace.js"
import { errorNames } from "../shared/errorHandler/enums/error-names.js"

const getCurrentPeopleCount = async () => {
  const count = await repository.getCurrentPeopleCount();
  if (!count) {
    return err(
      errorMessages.INTERNAL_SERVER_ERROR,
      getStackTrace(),
      errorNames.NO_CONTENT
    );
  }
  return success(count);
}
const incrementPeopleCount = async () => {
  const increment = await repository.incrementPeopleCount();

  if (!increment) {
    return err(
      errorMessages.INTERNAL_SERVER_ERROR,
      getStackTrace(),
      errorNames.INTERNAL_SERVER_ERROR
    );
  }
  return success(increment);
}

const decrementPeopleCount = async () => {
  const count = await repository.getCurrentPeopleCount();

  if (count.totalPeople === 0) {
    return err(
      errorMessages.BAD_REQUEST("The total number of people cannot be less than 0"),
      getStackTrace(),
      errorNames.BAD_REQUEST,
    );
  }

  const decrement = await repository.decrementPeopleCount();
  
  if (!decrement) {
    return err(
      errorMessages.INTERNAL_SERVER_ERROR,
      getStackTrace(),
      errorNames.INTERNAL_SERVER_ERROR
    );
  }
  return success(decrement);
}

export default { getCurrentPeopleCount, incrementPeopleCount, decrementPeopleCount }