import {
  validateDate,
  getYear,
  appendZero,
  getMonth,
  getDate,
  getHours,
  getMinutes,
  getSeconds,
  getMilliseconds,
  getDayOfWeek,
  getAM_PM_Hours,
  formatDate,
  TIME_FORMAT
} from '../dateFormat';

describe('packages/barterdex-utilities/src/dateFormat', () => {
  const d = 1539375819825;
  const date = new Date(d);
  const str1 = 'December 17, 1995 03:24:00';
  const str2 = '1995-12-17T03:24:00';
  const str3 = 'blad blad';

  it('validateDate', () => {
    expect(typeof validateDate).toEqual('function');

    let time = validateDate(d);
    expect(typeof time).toEqual('object');
    expect(time.getMonth()).toEqual(9);
    expect(time.getTime()).toEqual(d);

    time = validateDate(date);
    expect(typeof time).toEqual('object');
    expect(time.getMonth()).toEqual(9);
    expect(time.getTime()).toEqual(d);

    time = validateDate(str1);
    expect(typeof time).toEqual('object');
    expect(time.getFullYear()).toEqual(1995);
    expect(time.getTime()).toEqual(819145440000);

    time = validateDate(str2);
    expect(typeof time).toEqual('object');
    expect(time.getFullYear()).toEqual(1995);
    expect(time.getTime()).toEqual(819145440000);
  });

  it('getYear', () => {
    expect(typeof getYear).toEqual('function');

    expect(getYear(d)).toEqual('18');
    expect(getYear(date)).toEqual('18');
    expect(getYear(str1)).toEqual('95');
    expect(getYear(str2)).toEqual('95');

    expect(getYear(d, { format: 'yyyy' })).toEqual('2018');
    expect(getYear(date, { format: 'yyyy' })).toEqual('2018');
    expect(getYear(str1, { format: 'yyyy' })).toEqual('1995');
    expect(getYear(str2, { format: 'yyyy' })).toEqual('1995');

    expect(getYear(str3)).toEqual(null);
  });

  it('appendZero', () => {
    expect(typeof appendZero).toEqual('function');

    expect(appendZero(1)).toEqual('01');
    expect(appendZero(10)).toEqual('10');
    expect(appendZero(100)).toEqual('100');

    expect(appendZero('1')).toEqual('01');
    expect(appendZero('10')).toEqual('10');
    expect(appendZero('100')).toEqual('100');

    expect(
      appendZero('1', {
        width: 3
      })
    ).toEqual('001');
    expect(
      appendZero('10', {
        width: 3
      })
    ).toEqual('010');
    expect(
      appendZero('100', {
        width: 3
      })
    ).toEqual('100');

    expect(appendZero('a')).toEqual('0a');
    expect(appendZero('aa')).toEqual('aa');
    expect(appendZero('aaa')).toEqual('aaa');
  });

  it('getMonth', () => {
    expect(typeof getMonth).toEqual('function');

    expect(getMonth(d)).toEqual('10');
    expect(getMonth(date)).toEqual('10');
    expect(getMonth(str1)).toEqual('12');
    expect(getMonth(str2)).toEqual('12');

    expect(getMonth(d, { format: 'MMM' })).toEqual('Oct');
    expect(getMonth(date, { format: 'MMM' })).toEqual('Oct');
    expect(getMonth(str1, { format: 'MMM' })).toEqual('Dec');
    expect(getMonth(str2, { format: 'MMM' })).toEqual('Dec');

    expect(getMonth(d, { option: 'utc', format: 'MMM' })).toEqual('Oct');
    expect(getMonth(date, { option: 'utc', format: 'MMM' })).toEqual('Oct');
    expect(getMonth(str1, { option: 'utc', format: 'MMM' })).toEqual('Dec');
    expect(getMonth(str2, { option: 'utc', format: 'MMM' })).toEqual('Dec');

    expect(
      getMonth('October 01, 2018 03:24:00', { option: 'utc', format: 'MMM' })
    ).toEqual('Sep');
    expect(
      getMonth('October 01, 2018 03:24:00', { option: 'utc', format: 'MMMM' })
    ).toEqual('September');

    expect(getMonth(d, { format: 'MMMM' })).toEqual('October');
    expect(getMonth(date, { format: 'MMMM' })).toEqual('October');
    expect(getMonth(str1, { format: 'MMMM' })).toEqual('December');
    expect(getMonth(str2, { format: 'MMMM' })).toEqual('December');

    expect(getMonth(str3)).toEqual(null);
  });

  it('getDate', () => {
    expect(typeof getDate).toEqual('function');

    expect(getDate(d)).toEqual('13');
    expect(getDate(date)).toEqual('13');
    expect(getDate(str1)).toEqual('17');
    expect(getDate(str2)).toEqual('17');

    expect(getDate(d, 'utc')).toEqual('12');
    expect(getDate(date, 'utc')).toEqual('12');
    expect(getDate(str1, 'utc')).toEqual('16');
    expect(getDate(str2, 'utc')).toEqual('16');

    expect(getMonth(str3)).toEqual(null);
  });

  it('getHours', () => {
    expect(typeof getHours).toEqual('function');

    expect(getHours(d)).toEqual('03');
    expect(getHours(date)).toEqual('03');
    expect(getHours(str1)).toEqual('03');
    expect(getHours(str2)).toEqual('03');

    expect(getHours(d, { option: 'utc' })).toEqual('20');
    expect(getHours(date, { option: 'utc' })).toEqual('20');
    expect(getHours(str1, { option: 'utc' })).toEqual('20');
    expect(getHours(str2, { option: 'utc' })).toEqual('20');

    expect(getHours(d, { format: '12' })).toEqual('03');
    expect(getHours(date, { format: '12' })).toEqual('03');
    expect(getHours(str1, { format: '12' })).toEqual('03');
    expect(getHours(str2, { format: '12' })).toEqual('03');

    expect(getHours(str3)).toEqual(null);
  });

  it('getMinutes', () => {
    expect(typeof getMinutes).toEqual('function');

    expect(getMinutes(d)).toEqual('23');
    expect(getMinutes(date)).toEqual('23');
    expect(getMinutes(str1)).toEqual('24');
    expect(getMinutes(str2)).toEqual('24');

    expect(getMinutes(d, 'utc')).toEqual('23');
    expect(getMinutes(date, 'utc')).toEqual('23');
    expect(getMinutes(str1,'utc')).toEqual('24');
    expect(getMinutes(str2, 'utc' )).toEqual('24');

    expect(getMinutes(str3)).toEqual(null);
  });

  it('getSeconds', () => {
    expect(typeof getSeconds).toEqual('function');

    expect(getSeconds(d)).toEqual('39');
    expect(getSeconds(date)).toEqual('39');
    expect(getSeconds(str1)).toEqual('00');
    expect(getSeconds(str2)).toEqual('00');

    expect(getSeconds(d, 'utc')).toEqual('39');
    expect(getSeconds(date, 'utc')).toEqual('39');
    expect(getSeconds(str1, 'utc')).toEqual('00');
    expect(getSeconds(str2, 'utc')).toEqual('00');

    expect(getSeconds(str3)).toEqual(null);
  });

  it('getMilliseconds', () => {
    expect(typeof getMilliseconds).toEqual('function');

    expect(getMilliseconds(d)).toEqual('825');
    expect(getMilliseconds(date)).toEqual('825');
    expect(getMilliseconds(str1)).toEqual('000');
    expect(getMilliseconds(str2)).toEqual('000');

    expect(getMilliseconds(d, 'utc')).toEqual('825');
    expect(getMilliseconds(date, 'utc')).toEqual('825');
    expect(getMilliseconds(str1, 'utc')).toEqual('000');
    expect(getMilliseconds(str2, 'utc')).toEqual('000');

    expect(getMilliseconds(str3)).toEqual(null);
  });

  it('getDayOfWeek', () => {
    expect(typeof getDayOfWeek).toEqual('function');

    expect(getDayOfWeek(d)).toEqual('Saturday');
    expect(getDayOfWeek(date)).toEqual('Saturday');
    expect(getDayOfWeek(str1)).toEqual('Sunday');
    expect(getDayOfWeek(str2)).toEqual('Sunday');

    expect(getDayOfWeek(d, { option: 'utc', format: 'dddd' })).toEqual(
      'Friday'
    );
    expect(getDayOfWeek(date, { option: 'utc', format: 'dddd' })).toEqual(
      'Friday'
    );
    expect(getDayOfWeek(str1, { option: 'utc', format: 'dddd' })).toEqual(
      'Saturday'
    );
    expect(getDayOfWeek(str2, { option: 'utc', format: 'dddd' })).toEqual(
      'Saturday'
    );

    expect(getDayOfWeek(d, { format: 'ddd' })).toEqual('Sat');
    expect(getDayOfWeek(date, { format: 'ddd' })).toEqual('Sat');
    expect(getDayOfWeek(str1, { format: 'ddd' })).toEqual('Sun');
    expect(getDayOfWeek(str2, { format: 'ddd' })).toEqual('Sun');

    expect(getDayOfWeek(d, { option: 'utc', format: 'ddd' })).toEqual('Fri');
    expect(getDayOfWeek(date, { option: 'utc', format: 'ddd' })).toEqual('Fri');
    expect(getDayOfWeek(str1, { option: 'utc', format: 'ddd' })).toEqual('Sat');
    expect(getDayOfWeek(str2, { option: 'utc', format: 'ddd' })).toEqual('Sat');

    expect(getDayOfWeek(str3)).toEqual(null);
  });

  it('getAM_PM_Hours', () => {
    expect(typeof getAM_PM_Hours).toEqual('function');

    expect(getAM_PM_Hours(validateDate(d), 'hh')).toEqual({
      hour: '03',
      type: 'AM'
    });
    expect(getAM_PM_Hours(validateDate(date), 'hh')).toEqual({
      hour: '03',
      type: 'AM'
    });
    expect(getAM_PM_Hours(validateDate(str1), 'hh')).toEqual({
      hour: '03',
      type: 'AM'
    });
    expect(getAM_PM_Hours(validateDate(str2), 'hh')).toEqual({
      hour: '03',
      type: 'AM'
    });

    expect(getAM_PM_Hours(validateDate(1539601137314), 'H')).toEqual({
      hour: '17',
      type: 'PM'
    });
    expect(getAM_PM_Hours(validateDate(date), 'h')).toEqual({
      hour: '03',
      type: 'AM'
    });
    expect(getAM_PM_Hours(validateDate(str1), 'h')).toEqual({
      hour: '03',
      type: 'AM'
    });
    expect(getAM_PM_Hours(validateDate(str2), 'h')).toEqual({
      hour: '03',
      type: 'AM'
    });
  });

  it('formatDate', () => {
    expect(typeof getAM_PM_Hours).toEqual('function');

    expect(formatDate(d)).toEqual('2018-10-13 03:23:39.825 AM');
    expect(formatDate(str1)).toEqual('1995-12-17 03:24:00.000 AM');
    expect(formatDate(str2)).toEqual('1995-12-17 03:24:00.000 AM');

    expect(formatDate(d, 'yyyy-MM-dd')).toEqual('2018-10-13');
    expect(formatDate(str1, 'yyyy-MM-dd')).toEqual('1995-12-17');
    expect(formatDate(str2, 'yyyy-MM-dd')).toEqual('1995-12-17');

    expect(formatDate(d, 'SSS')).toEqual('825');
    expect(formatDate(str1, 'SSS')).toEqual('000');
    expect(formatDate(str2, 'SSS')).toEqual('000');

    expect(formatDate(d, TIME_FORMAT)).toEqual('03:23:39 AM');
    expect(formatDate(str1, TIME_FORMAT)).toEqual('03:24:00 AM');
    expect(formatDate(str2, TIME_FORMAT)).toEqual('03:24:00 AM');
  });
});
