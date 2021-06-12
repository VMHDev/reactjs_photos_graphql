import momenttimezone from 'moment-timezone';
import { TIME_ZONE } from 'constants/system';

/**
 * Check token expire
 * @param {number} timeCheck Time need check
 */
export const isExpire = (timeCheck) => {
  try {
    const timeCheckConvert = momenttimezone.tz(timeCheck, TIME_ZONE);
    const timeNowConvert = momenttimezone.tz(Date.now(), TIME_ZONE);
    const isExpire = timeNowConvert.diff(timeCheckConvert) >= 0 ? true : false;
    return isExpire;
  } catch (error) {
    console.log('utils/datetime/isExpire', error);
  }
};
