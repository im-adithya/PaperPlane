import { PROPER_SCHEDULERS } from "../constants/properSchedulers";

export const fly = (schedule, today) => {
  const day = PROPER_SCHEDULERS[today.getDay()];
  const hour = today.getHours();
  const minutes = today.getMinutes();

  const getHour = minutes > 50 ? hour + 1 : hour;

  for (let destination of schedule) {
    if (!destination.days.includes(day)) continue;
    else {
      const destinationStartTime = destination.startTime;
      const destinationEndTime = destinationStartTime + destination.duration;
      const exact = getHour === destinationStartTime;
      const between =
        destinationStartTime < getHour && getHour < destinationEndTime;
      if (exact || between) {
        return destination;
      }
    }
  }
  return null;
};
