import moment from 'moment';
import format from './format.js';
import {phrasing, pluralSuffix} from './locale.en.js';

const MINUTES_IN_YEAR = 525600;
const MINUTES_IN_QUARTER_YEAR = 131400;
const MINUTES_IN_THREE_QUARTERS_YEAR = 394200;


if (typeof moment.updateLocale == 'function') {
  moment.updateLocale('en', {distance: {phrasing, pluralSuffix}});
} else if (typeof moment.locale == 'function') {
  moment.locale('en', {distance: {phrasing, pluralSuffix}});
} else {
  moment.lang('en', {distance: {phrasing, pluralSuffix}});
}


function translate(key, opts = {}) {
  const phrase = this._distance.phrasing[key];
  const pluralSuffix = this._distance.pluralSuffix;

  if (!phrase) {
    throw new Error(`Missing phrase for ${key}`);
  }

  return format({phrase, count: opts.count, pluralSuffix});
}


function distance(options = {includeSeconds: true}) {
  const locale = this.localeData();
  const distanceInMinutes = Math.round(Math.max(0, this.asMinutes()));
  let output = '';

  locale.t = translate.bind(locale);

  if (distanceInMinutes <= 1 ) {
    if (options.includeSeconds) {
      const distanceInSeconds = Math.max(0, this.asSeconds());

      if (distanceInSeconds <= 4) {
        output = locale.t('less_than_x_seconds', {count: 5});
      } else if (distanceInSeconds <= 9) {
        output = locale.t('less_than_x_seconds', {count: 10});
      } else if (distanceInSeconds <= 19) {
        output = locale.t('less_than_x_seconds', {count: 20});
      } else if (distanceInSeconds <= 39) {
        output = locale.t('half_a_minute');
      } else if (distanceInSeconds <= 59) {
        output = locale.t('less_than_a_minute');
      } else {
        output = locale.t('x_minutes', {count: 1});
      }

    } else {
      if (distanceInMinutes === 0) {
        output = locale.t('less_than_a_minute');
      } else {
        output = locale.t('x_minutes', {count: distanceInMinutes});
      }
    }

  } else if (distanceInMinutes < 45) {
    // 1 min up to 45 mins
    output = locale.t('about_x_minutes', {count: distanceInMinutes});

  } else if (distanceInMinutes < 90) {
    // 45s min up to 90 mins
    output = locale.t('about_x_hours', {count: 1});

  } else if (distanceInMinutes < 1440) {
    // 90 mins up to 24 hours
    output = locale.t('about_x_hours', {count: Math.round(distanceInMinutes / 60.0)});

  } else if (distanceInMinutes < 2520) {
    // 24 hours up to 42 hours
    output = locale.t('x_days', {count: 1});

  } else if (distanceInMinutes < 43200) {
    // 42 hours up to 30 days
    output = locale.t('x_days', {count: Math.round(distanceInMinutes / 1440.0)});

  } else if (distanceInMinutes < 86400) {
    // 30 days up to 60 days
    output = locale.t('about_x_months', {count: Math.round(distanceInMinutes / 43200.0)});

  } else if (distanceInMinutes < 525600) {
    // 60 days up to 365 days
    output = locale.t('x_months', {count: Math.round(distanceInMinutes / 43200.0)});

  } else {
    // 1 year and more
    const remainder = distanceInMinutes % MINUTES_IN_YEAR;
    const distanceInYears = Math.floor(distanceInMinutes / MINUTES_IN_YEAR);

    if (remainder < MINUTES_IN_QUARTER_YEAR) {
      output = locale.t('about_x_years', {count: distanceInYears});
    } else if (remainder < MINUTES_IN_THREE_QUARTERS_YEAR) {
      output = locale.t('over_x_years', {count: distanceInYears});
    } else {
      output = locale.t('almost_x_years', {count: distanceInYears + 1});
    }
  }

  return output;
}

moment.duration.fn.distance = distance;

export default moment;
