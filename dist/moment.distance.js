(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'moment'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('moment'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.moment);
    global.momentDistance = mod.exports;
  }
})(this, function (exports, _moment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _moment2 = _interopRequireDefault(_moment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var MINUTES_IN_YEAR = 525600;
  var MINUTES_IN_QUARTER_YEAR = MINUTES_IN_YEAR / 4;
  var MINUTES_IN_THREE_QUARTERS_YEAR = MINUTES_IN_YEAR * (3 / 4);

  var pluralSuffix = 's';

  var phrasing = {
    less_than_x_seconds: 'less than %d second%s',
    half_a_minute: 'half a minute',
    less_than_a_minute: 'less than a minute',
    less_than_x_minutes: 'less than %d minute%s',
    x_minutes: '%d minute%s',
    about_x_minutes: 'about %d minute%s',
    about_x_hours: 'about %d hour%s',
    x_days: '%d day%s',
    about_x_months: 'about %d month%s',
    x_months: '%d month%s',
    about_x_years: 'about %d year%s',
    over_x_years: 'over %d year%s',
    almost_x_years: 'almost %d year%s'
  };

  if (typeof _moment2.default.updateLocale == 'function') {
    _moment2.default.updateLocale('en', { distance: { phrasing: phrasing, pluralSuffix: pluralSuffix } });
  } else if (typeof _moment2.default.locale == 'function') {
    _moment2.default.locale('en', { distance: { phrasing: phrasing, pluralSuffix: pluralSuffix } });
  } else {
    _moment2.default.lang('en', { distance: { phrasing: phrasing, pluralSuffix: pluralSuffix } });
  }

  function format() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$phrase = _ref.phrase,
        phrase = _ref$phrase === undefined ? '' : _ref$phrase,
        _ref$count = _ref.count,
        count = _ref$count === undefined ? 1 : _ref$count,
        _ref$pluralSuffix = _ref.pluralSuffix,
        pluralSuffix = _ref$pluralSuffix === undefined ? 's' : _ref$pluralSuffix;

    return phrase.replace(/%d/i, count).replace(/%s/i, count > 1 ? pluralSuffix : '');
  };

  function translate(key) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var phrase = this._distance.phrasing[key];
    var pluralSuffix = this._distance.pluralSuffix;

    if (!phrase) {
      throw new Error('Missing phrase for ' + key);
    }

    return format({ phrase: phrase, count: opts.count, pluralSuffix: pluralSuffix });
  }

  function distance() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { includeSeconds: true };

    var locale = this.localeData();
    var distanceInMinutes = Math.round(Math.max(0, this.asMinutes()));
    var output = '';

    locale.t = translate.bind(locale);

    if (distanceInMinutes <= 1) {
      if (options.includeSeconds) {
        var distanceInSeconds = Math.max(0, this.asSeconds());

        if (distanceInSeconds <= 4) {
          output = locale.t('less_than_x_seconds', { count: 5 });
        } else if (distanceInSeconds <= 9) {
          output = locale.t('less_than_x_seconds', { count: 10 });
        } else if (distanceInSeconds <= 19) {
          output = locale.t('less_than_x_seconds', { count: 20 });
        } else if (distanceInSeconds <= 39) {
          output = locale.t('half_a_minute');
        } else if (distanceInSeconds <= 59) {
          output = locale.t('less_than_a_minute');
        } else {
          output = locale.t('x_minutes', { count: 1 });
        }
      } else {
        if (distanceInMinutes === 0) {
          output = locale.t('less_than_a_minute');
        } else {
          output = locale.t('x_minutes', { count: distanceInMinutes });
        }
      }
    } else if (distanceInMinutes < 45) {
      // 1 min up to 45 mins
      output = locale.t('about_x_minutes', { count: distanceInMinutes });
    } else if (distanceInMinutes < 90) {
      // 45s min up to 90 mins
      output = locale.t('about_x_hours', { count: 1 });
    } else if (distanceInMinutes < 1440) {
      // 90 mins up to 24 hours
      output = locale.t('about_x_hours', { count: Math.round(distanceInMinutes / 60.0) });
    } else if (distanceInMinutes < 2520) {
      // 24 hours up to 42 hours
      output = locale.t('x_days', { count: 1 });
    } else if (distanceInMinutes < 43200) {
      // 42 hours up to 30 days
      output = locale.t('x_days', { count: Math.round(distanceInMinutes / 1440.0) });
    } else if (distanceInMinutes < 86400) {
      // 30 days up to 60 days
      output = locale.t('about_x_months', { count: Math.round(distanceInMinutes / 43200.0) });
    } else if (distanceInMinutes < 525600) {
      // 60 days up to 365 days
      output = locale.t('x_months', { count: Math.round(distanceInMinutes / 43200.0) });
    } else {
      // 1 year and more
      var remainder = distanceInMinutes % MINUTES_IN_YEAR;
      var distanceInYears = Math.floor(distanceInMinutes / MINUTES_IN_YEAR);

      if (remainder < MINUTES_IN_QUARTER_YEAR) {
        output = locale.t('about_x_years', { count: distanceInYears });
      } else if (remainder < MINUTES_IN_THREE_QUARTERS_YEAR) {
        output = locale.t('over_x_years', { count: distanceInYears });
      } else {
        output = locale.t('almost_x_years', { count: distanceInYears + 1 });
      }
    }

    return output;
  }

  _moment2.default.duration.fn.distance = distance;

  exports.default = _moment2.default;
});
