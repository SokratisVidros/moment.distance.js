import moment from 'moment';
import {expect} from 'chai';
import '../lib/moment.distance.js';

describe('distance', () => {
  context('from 0 up to 1 min', () => {
    it('should return time ago in seconds', () => {
      expect(moment.duration(4, 'seconds').distance()).to.eq('less than 5 seconds');
      expect(moment.duration(9, 'seconds').distance()).to.eq('less than 10 seconds');
      expect(moment.duration(19, 'seconds').distance()).to.eq('less than 20 seconds');
      expect(moment.duration(39, 'seconds').distance()).to.eq('half a minute');
      expect(moment.duration(59, 'seconds').distance()).to.eq('less than a minute');
      expect(moment.duration(60, 'seconds').distance()).to.eq('1 minute');
    });

    it('should return time ago in minutes if includeSecond option is false', () => {
      expect(moment.duration(29, 'seconds').distance({includeSeconds: false})).to.eq('less than a minute');
      expect(moment.duration(60, 'seconds').distance({includeSeconds: false})).to.eq('1 minute');
    });
  });

  context('from 1 up to 45 mins', () => {
    it('should return "about x minutes"', () => {
      expect(moment.duration(2, 'minutes').distance()).to.eq('about 2 minutes');
      expect(moment.duration(44, 'minutes').distance()).to.eq('about 44 minutes');
    });
  });

  context('from 45 up to 90 mins', () => {
    it('should return "about x hours"', () => {
      expect(moment.duration(45, 'minutes').distance()).to.eq('about 1 hour');
      expect(moment.duration(89, 'minutes').distance()).to.eq('about 1 hour');
    });
  });

  context('from 90 mins up to 24 hours', () => {
    it('should return "about x hours"', () => {
      expect(moment.duration(90, 'minutes').distance()).to.eq('about 2 hours');
      expect(moment.duration(1439, 'minutes').distance()).to.eq('about 24 hours');
    });
  });

  context('from 24 hours up to 42 hours', () => {
    it('should return "1 day"', () => {
      expect(moment.duration(1440, 'minutes').distance()).to.eq('1 day');
      expect(moment.duration(2519, 'minutes').distance()).to.eq('1 day');
    });
  });

  context('from 42 hours up to 30 days', () => {
    it('should return "x days"', () => {
      expect(moment.duration(2520, 'minutes').distance()).to.eq('2 days');
      expect(moment.duration(43199, 'minutes').distance()).to.eq('30 days');
    });
  });

  context('from 30 days up to 60 days', () => {
    it('should return "about x months"', () => {
      expect(moment.duration(43200, 'minutes').distance()).to.eq('about 1 month');
      expect(moment.duration(86399, 'minutes').distance()).to.eq('about 2 months');
    });
  });

  context('from 60 days up to 365 days', () => {
    it('should return "x months"', () => {
      expect(moment.duration(86400, 'minutes').distance()).to.eq('2 months');
      expect(moment.duration(525599, 'minutes').distance()).to.eq('12 months');
    });
  });

  context('from 60 days up to 365 days', () => {
    it('should return "x months"', () => {
      expect(moment.duration(86400, 'minutes').distance()).to.eq('2 months');
      expect(moment.duration(525599, 'minutes').distance()).to.eq('12 months');
    });
  });

  context('for more than a year', () => {
    it('should return "about/over/almost x years" accordingly', () => {
      expect(moment.duration(525600, 'minutes').distance()).to.eq('about 1 year');
      expect(moment.duration(12, 'months').distance()).to.eq('about 1 year');
      expect(moment.duration(18, 'months').distance()).to.eq('over 1 year');
      expect(moment.duration(22, 'months').distance()).to.eq('almost 2 years');
      expect(moment.duration(24, 'months').distance()).to.eq('about 2 years');
      expect(moment.duration(30, 'months').distance()).to.eq('over 2 years');
      expect(moment.duration(34, 'months').distance()).to.eq('almost 3 years');
    });
  });

  describe('readme examples', () => {
    it('should return the expected phrasing', () => {
      expect(moment.duration(15, 'seconds').distance()).to.eq('less than 20 seconds');
      expect(moment.duration(15, 'seconds').distance({includeSeconds: false})).to.eq('less than a minute');
      expect(moment.duration(50, 'minutes').distance()).to.eq('about 1 hour');
      expect(moment.duration(76, 'seconds').distance()).to.eq('1 minute');
      expect(moment.duration(60, 'hours').distance()).to.eq('3 days');
      expect(moment.duration(1, 'years').add(3, 'days').distance()).to.eq('about 1 year');
      expect(moment.duration(1, 'years').add(9, 'months').distance()).to.eq('almost 2 years');
      expect(moment.duration(3, 'years').add(9, 'days').add(30, 'minutes').add(5, 'seconds').distance()).to.eq('about 3 years');
      expect(moment.duration(moment(new Date('2015-03-1')).diff(moment(new Date('2015-02-27')))).distance()).to.eq('2 days');
      expect(moment.duration(moment(new Date('2016-03-1')).diff(moment(new Date('2016-02-27')))).distance()).to.eq('3 days');
    });
  });

  describe('locales', () => {
    beforeEach(() => {
      moment.locale('fr', {
        distance: {
          pluralSuffix: 'es',
          phrasing: {
            less_than_x_seconds : 'moins de %d second%s'
          }
        }
      });
    });

    it('should respect preset translations', () => {
      expect(moment.duration(4, 'seconds').locale('en').distance()).to.eq('less than 5 seconds');
      expect(moment.duration(4, 'seconds').locale('fr').distance()).to.eq('moins de 5 secondes');
    });
  })
});
