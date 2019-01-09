/* eslint-disable no-param-reassign, camelcase, no-restricted-globals */
// @flow

const numRegex = /^\d+$/;
const MONTH_ARRAY_LIST = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
const DAY_OF_WEEK_ARRAY_LIST = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];
export const ISO8601_FORMAT = 'yyyy-MM-dd HH:mm:ss.SSS';
export const ISO8601_WITH_TZ_OFFSET_FORMAT = 'yyyy-MM-ddTHH:mm:ss.SSS K';
export const DATETIME_FORMAT = 'yyyy-MM-dd hh:mm:ss.SSS tt';
export const DATE_FORMAT = 'yyyy-MM-dd';
export const TIME_FORMAT = 'hh:mm:ss tt';

function isValidDate(date) {
  return (
    date &&
    Object.prototype.toString.call(date) === '[object Date]' &&
    !isNaN(date)
  );
}

export function validateDate(d) {
  if (isValidDate(d)) return d;
  // eslint-disable-next-line no-param-reassign
  if (numRegex.test(d) === true && typeof d === 'string') d = Number(d);
  const dateObj = new Date(d);
  if (dateObj && dateObj.toString().search(/invalid/gi) !== -1) return null;
  return dateObj;
}

const yearOption = { option: 'utc', format: 'yy' };
type YearOption = {
  option: string,
  format: string
};

export function getYear(d, { option, format }: YearOption = yearOption) {
  try {
    const dateObj = validateDate(d);
    if (dateObj) {
      const year = (option === 'utc'
        ? dateObj.getUTCFullYear()
        : dateObj.getFullYear()
      ).toString();
      return format === 'yy' ? year.substr(2, 2) : year;
    }
    return dateObj;
  } catch (e) {
    return null;
  }
}

type AppendZeroOption = {
  width: number,
  lastPosition: boolean
};
const appendZeroOption = { width: 2, lastPosition: false };

export function appendZero(
  number,
  { width, lastPosition }: AppendZeroOption = appendZeroOption
) {
  let numString =
    number !== null && number !== undefined ? number.toString() : '0';
  while (numString.length < width) {
    if (lastPosition === true) numString += '0';
    else numString = `0${numString}`;
  }
  return numString;
}

const monthOption = { option: 'utc', format: 'MM' };
type MonthOption = {
  option: string,
  format: string
};

export function getMonth(d, { option, format }: MonthOption = monthOption) {
  try {
    const dateObj = validateDate(d);
    if (dateObj) {
      const month =
        option === 'utc' ? dateObj.getUTCMonth() + 1 : dateObj.getMonth() + 1;
      if (format === 'MMMM') return MONTH_ARRAY_LIST[month - 1];
      if (format === 'MMM') return MONTH_ARRAY_LIST[month - 1].substr(0, 3);
      return appendZero(month);
    }
    return dateObj;
  } catch (e) {
    return null;
  }
}

export function getDate(d, option: string = '') {
  try {
    const dateObj = validateDate(d);
    if (dateObj) {
      const date = option === 'utc' ? dateObj.getUTCDate() : dateObj.getDate();
      return appendZero(date);
    }
    return dateObj;
  } catch (e) {
    return null;
  }
}

function get12HoursFormat(hour, option) {
  if (option === '12') return hour > 12 ? hour - 12 : hour;
  return hour;
}

const hourOption = { option: '', format: '12' };
type HourOption = {
  option: string,
  format: string
};

export function getHours(d, { option, format }: HourOption = hourOption) {
  try {
    const dateObj = validateDate(d);
    if (dateObj) {
      const hours =
        option === 'utc' ? dateObj.getUTCHours() : dateObj.getHours();
      return appendZero(get12HoursFormat(hours, format));
    }
    return dateObj;
  } catch (e) {
    return null;
  }
}

export function getMinutes(d, option: string = '') {
  try {
    const dateObj = validateDate(d);
    if (dateObj) {
      const minutes =
        option === 'utc' ? dateObj.getUTCMinutes() : dateObj.getMinutes();
      return appendZero(minutes);
    }
    return dateObj;
  } catch (e) {
    return null;
  }
}

export function getSeconds(d, option: string = '') {
  try {
    const dateObj = validateDate(d);
    if (dateObj) {
      const seconds =
        option === 'utc' ? dateObj.getUTCSeconds() : dateObj.getSeconds();
      return appendZero(seconds);
    }
    return dateObj;
  } catch (e) {
    return null;
  }
}

export function getMilliseconds(d, option: string = '') {
  try {
    const dateObj = validateDate(d);
    if (dateObj) {
      const ms =
        option === 'utc'
          ? dateObj.getUTCMilliseconds()
          : dateObj.getMilliseconds();
      return appendZero(ms, {
        width: 3,
        lastPosition: false
      });
    }
    return dateObj;
  } catch (e) {
    return null;
  }
}

const dayOfWeek = { option: '', format: 'dddd' };
type DayOfWeek = {
  option: string,
  format: string
};

export function getDayOfWeek(d, { option, format }: DayOfWeek = dayOfWeek) {
  try {
    const dateObj = validateDate(d);
    if (dateObj) {
      const dow =
        option === 'utc' ? dateObj.getUTCDay() + 1 : dateObj.getDay() + 1;
      if (format === 'dddd') return DAY_OF_WEEK_ARRAY_LIST[dow - 1];
      if (format === 'ddd') return DAY_OF_WEEK_ARRAY_LIST[dow - 1].substr(0, 3);
      return appendZero(dow);
    }
    return dateObj;
  } catch (e) {
    return null;
  }
}

export function getAM_PM_Hours(
  dateObj: Date,
  format: string,
  option: string = ''
) {
  const hour = option === 'utc' ? dateObj.getUTCHours() : dateObj.getHours();
  const AM_PM = {
    type: 'AM',
    hour: appendZero(hour)
  };
  if (hour >= 12) {
    AM_PM.type = 'PM';
  }
  if (format.indexOf('hh') !== -1) {
    AM_PM.hour = appendZero(get12HoursFormat(hour, '12'));
  }
  return AM_PM;
}

export function timeOffset(timezoneOffset) {
  const os = Math.abs(timezoneOffset);
  const hour = appendZero(Math.floor(os / 60));
  const minute = appendZero(os % 60);
  return timezoneOffset < 0 ? `+${hour}${minute}` : `-${hour}${minute}`;
}

export function formatDate(dateString, formatStyle, timezoneOffset) {
  try {
    const dateObj = validateDate(dateString);
    if (!dateObj) throw new Error('Invalid Date');
    if (!timezoneOffset) {
      timezoneOffset = dateObj.getTimezoneOffset();
    } else {
      timezoneOffset = 0 - timezoneOffset;
    }
    if (typeof formatStyle !== 'string') {
      formatStyle = DATETIME_FORMAT;
    }
    dateObj.setUTCMinutes(dateObj.getUTCMinutes() - timezoneOffset);

    const day = getDate(dateObj, 'utc'); // dd
    const month = getMonth(dateObj, {
      option: 'utc',
      format: 'MM'
    }); // MM
    const monthFullName = getMonth(dateObj, {
      option: 'utc',
      format: 'MMMM'
    }); // MONTH
    const monthShortName = getMonth(dateObj, {
      option: 'utc',
      format: 'MMM'
    }); // month
    const fullYear = getYear(dateObj, {
      option: 'utc',
      format: 'yyyy'
    });
    const shortYear = getYear(dateObj);
    const hourObj = getAM_PM_Hours(dateObj, formatStyle, 'utc'); // hh or HH and tt
    const minute = getMinutes(dateObj, 'utc'); // mm
    const second = getSeconds(dateObj, 'utc'); // ss
    const millisecond = getMilliseconds(dateObj, 'utc'); // SSS
    const timeZone = timeOffset(timezoneOffset); // O
    const DOWFullName = getDayOfWeek(dateObj, {
      option: 'utc',
      format: 'dddd'
    });
    const DOWShortName = getDayOfWeek(dateObj, {
      option: 'utc',
      format: 'ddd'
    });

    dateObj.setUTCMinutes(dateObj.getUTCMinutes() + timezoneOffset);

    const formattedString = formatStyle
      .replace(/dddd/g, DOWFullName)
      .replace(/ddd/g, DOWShortName)
      .replace(/dd/g, day)
      .replace(/MMMM/g, monthFullName)
      .replace(/MMM/g, monthShortName)
      .replace(/MM/g, month)
      .replace(/yyyy/g, fullYear)
      .replace(/yy/g, shortYear)
      .replace(/hh/gi, hourObj.hour)
      .replace(/mm/g, minute)
      .replace(/ss/g, second)
      .replace(/SSS/g, millisecond)
      .replace(/tt/g, hourObj.type)
      .replace(/K/g, timeZone);

    return formattedString;
  } catch (err) {
    throw new Error('Invalid Date Operation');
  }
}

/* eslint-enable no-param-reassign, camelcase */
