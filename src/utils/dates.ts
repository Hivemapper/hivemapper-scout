import { Frame } from "types/location";

export const monthDayTime = (time: string | Date) => {
  const date = new Date(time);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);
  const formattedDateParts = formatter.formatToParts(date) || [];
  const { value: year } =
    formattedDateParts.find((part) => part.type === "year") || {};
  const { value: month } =
    formattedDateParts.find((part) => part.type === "month") || {};
  const { value: day } =
    formattedDateParts.find((part) => part.type === "day") || {};
  const { value: hour } =
    formattedDateParts.find((part) => part.type === "hour") || {};
  const { value: minute } =
    formattedDateParts.find((part) => part.type === "minute") || {};
  const { value: dayPeriod } =
    formattedDateParts.find((part) => part.type === "dayPeriod") || {};

  const humanReadableDate = `${month} ${day}, ${year} at ${hour}:${minute} ${dayPeriod}.`;
  return humanReadableDate;
};

export const prettyDate = (
  time: string | Date,
  longFormat?: boolean,
  lateTime?: string,
) => {
  if (!time) {
    return "";
  }

  const date = new Date(time);
  const lateDate = !lateTime ? new Date() : new Date(lateTime);
  const diff = (lateDate.getTime() - date.getTime()) / 1000;
  const day_diff = Math.floor(diff / 86400);

  const result =
    (day_diff <= 0 &&
      ((diff < 60 && "Just now") ||
        (longFormat && diff < 120 && "1 minute ago") ||
        (diff < 3600 &&
          Math.floor(diff / 60) + (longFormat ? " minutes ago" : "m")) ||
        (longFormat && diff < 7200 && "1 hour ago") ||
        (diff < 86400 &&
          Math.floor(diff / 3600) + (longFormat ? " hours ago" : "h")))) ||
    (longFormat && day_diff == 1 && "Yesterday") ||
    (day_diff < 7 && day_diff + (longFormat ? " days ago" : "d")) ||
    (day_diff < 31 &&
      Math.ceil(day_diff / 7) +
        (longFormat
          ? ` week${Math.ceil(day_diff / 7) > 1 ? "s" : ""} ago`
          : "w")) ||
    (day_diff >= 31 &&
      Math.ceil(day_diff / 31) +
        (longFormat
          ? ` month${Math.ceil(day_diff / 31) > 1 ? "s" : ""} ago`
          : "mo"));

  return result || "";
};

export const getLastThreeMondays = (startDate?: Date): string[] => {
  let mondays = [];
  let date = new Date(startDate || new Date());
  date.setHours(0, 0, 0, 0);

  while (date.getDay() !== 1) {
    date.setDate(date.getDate() - 1);
  }

  for (let i = 0; i < 3; i++) {
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");
    mondays.push(`${year}-${month}-${day}`);
    date.setDate(date.getDate() - 7);
  }

  return mondays;
};

export const fourteenDaysAgo = new Date(
  new Date().getTime() - 14 * 24 * 60 * 60 * 1000,
);

export const filterFramesFresherThan14Days = (frames: Frame[]) => {
  return frames.filter((frame) => {
    const frameDate = new Date(frame.timestamp);
    return frameDate.getTime() > fourteenDaysAgo.getTime();
  });
};
