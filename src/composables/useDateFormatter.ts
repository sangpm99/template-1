import moment from "moment";
import "moment-timezone";
import { getLocalStorageUser } from "@/stores/authorize";
import type { Metadata } from "@/types/accounts/users";

export function useDateFormatter() {
  function fromUtc(
    utcTime: string,
    dateFormat: string = "DD/MM/YYYY h:mm:ss A",
    timeZone: string = "Asia/Ho_Chi_Minh",
  ) {
    if (!utcTime) return "";
    return utcTime && moment.tz(utcTime, "UTC").tz(timeZone).format(dateFormat);
  }

  function fromUnix(
    unixTime: number | string,
    dateFormat: string = "DD-MM-YYYY HH:mm:ss",
    timeZone: string = "Asia/Ho_Chi_Minh",
  ) {
    try {
      if (!unixTime) return "";
      let unixT = Number(unixTime);
      // Nếu là milliseconds (> 10 ki tu) thì đổi về seconds
      if (unixT.toString().length > 10) {
        unixT = Math.floor(unixT / 1000);
      }
      return moment.unix(Math.floor(unixT)).tz(timeZone).format(dateFormat);
    } catch (err) {
      return "";
    }
  }

  function getLocalTimezone(): number {
    let timezone = 0;
    const currentUser = getLocalStorageUser();
    if (currentUser && currentUser.metadata) {
      const metadata = JSON.parse(currentUser.metadata) as Metadata;
      timezone = Number(metadata.timezone ?? 0);
    }
    return timezone;
  }

  function getBrowserTimezone(): number {
    const timezoneBrowserMinutes = new Date().getTimezoneOffset();
    return timezoneBrowserMinutes / 60;
  }

  function fromUtcTimezone(
    utcTime: string,
    dateFormat: string = "DD/MM/YYYY h:mm:ss A",
  ) {
    if (!utcTime) return "";

    const timezone = getLocalTimezone();
    const momentObj = moment.utc(utcTime);
    return momentObj.utcOffset(timezone).format(dateFormat);
  }

  function fromUtcOffset(
    utcTime: string,
    dateFormat: string = "DD/MM/YYYY h:mm:ss A",
    offset: number,
  ) {
    if (!utcTime) return "";
    const momentObj = moment.utc(utcTime);
    return momentObj.utcOffset(offset).format(dateFormat);
  }

  function fromUnixTimezone(
    unixTime: number | string,
    dateFormat: string = "DD-MM-YYYY HH:mm:ss",
  ) {
    try {
      if (!unixTime) return "";

      const timezone = getLocalTimezone();
      let unixT = Number(unixTime);
      // Nếu là milliseconds (> 10 ki tu) thì đổi về seconds
      if (unixT.toString().length > 10) {
        unixT = Math.floor(unixT / 1000);
      }
      return moment
        .unix(Math.floor(unixT))
        .utcOffset(timezone)
        .format(dateFormat);
    } catch (err) {
      return "";
    }
  }

  function fromUnixOffset(
    unixTime: number | string,
    dateFormat: string = "DD-MM-YYYY HH:mm:ss",
    offset: number,
  ) {
    try {
      if (!unixTime) return "";
      let unixT = Number(unixTime);
      // Nếu là milliseconds (> 10 ki tu) thì đổi về seconds
      if (unixT.toString().length > 10) {
        unixT = Math.floor(unixT / 1000);
      }
      return moment
        .unix(Math.floor(unixT))
        .utcOffset(offset)
        .format(dateFormat);
    } catch (err) {
      return "";
    }
  }

  function remainingHoursFromUnix(unixTime: number): number {
    return moment.unix(unixTime).diff(moment(), "hours");
  }

  function remainingHoursFromUtc(utcTime: string): number {
    return moment.utc(utcTime).diff(moment.utc(), "hours");
  }

  function remainingTimeFromUnix(
    unixTime: number,
    unit: "hours" | "minutes" = "hours",
  ): number {
    return moment.unix(unixTime).diff(moment(), unit);
  }

  return {
    fromUtc,
    fromUtcTimezone,
    fromUnix,
    fromUnixTimezone,
    fromUtcOffset,
    fromUnixOffset,
    remainingHoursFromUnix,
    remainingHoursFromUtc,
    remainingTimeFromUnix,
  };
}
