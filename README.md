# moment.distance.js

[![Build Status](https://travis-ci.org/SokratisVidros/moment.distance.js.svg?branch=master)](https://travis-ci.org/SokratisVidros/moment.distance.js)

A "distance of time in words" plugin for moment.js inspired by Ruby on Rails. It supports any moment.js library with version higher than 2.0.0.

Moment.distance humanizes the moment.duration object based on the following approximations:

```
0 <-> 29 secs                                                             => less than a minute
30 secs <-> 1 min, 29 secs                                                => 1 minute
1 min, 30 secs <-> 44 mins, 29 secs                                       => [2..44] minutes
44 mins, 30 secs <-> 89 mins, 29 secs                                     => about 1 hour
89 mins, 30 secs <-> 23 hrs, 59 mins, 29 secs                             => about [2..24] hours
23 hrs, 59 mins, 30 secs <-> 41 hrs, 59 mins, 29 secs                     => 1 day
41 hrs, 59 mins, 30 secs  <-> 29 days, 23 hrs, 59 mins, 29 secs           => [2..29] days
29 days, 23 hrs, 59 mins, 30 secs <-> 44 days, 23 hrs, 59 mins, 29 secs   => about 1 month
44 days, 23 hrs, 59 mins, 30 secs <-> 59 days, 23 hrs, 59 mins, 29 secs   => about 2 months
59 days, 23 hrs, 59 mins, 30 secs <-> 1 yr minus 1 sec                    => [2..12] months
1 yr <-> 1 yr, 3 months                                                   => about 1 year
1 yr, 3 months <-> 1 yr, 9 months                                         => over 1 year
yr, 9 months <-> 2 yr minus 1 sec                                         => almost 2 years
2 yrs <-> max time or date                                                => (same rules as 1 yr)

When {includeSeconds: true} option is and the duration is less than 1 minute 29 seconds:
0-4   secs      => less than 5 seconds
5-9   secs      => less than 10 seconds
10-19 secs      => less than 20 seconds
20-39 secs      => half a minute
40-59 secs      => less than a minute
60-89 secs      => 1 minute
```

## Installation

### Node

```npm install moment moment.distance --save```

### Browser

```
...
<script type="text/javascript" src="moment.js"/>
<script type="text/javascript" src="moment.distance.min.js"/>
...
```

## Examples

```
const moment = require('moment');
require('moment.distance');

moment.duration(15, 'seconds').distance();
// 'less than 20 seconds'

moment.duration(15, 'seconds').distance({includeSeconds: false});
// 'less than a minute'

moment.duration(50, 'minutes').distance()
// 'about 1 hour'

moment.duration(76, 'seconds').distance()
// '1 minute'

moment.duration(60, 'hours').distance()
// '3 days'

moment.duration(1, 'years').add(3, 'days').distance()
// 'about 1 year'

moment.duration(1, 'years').add(9, 'months').distance()
// 'almost 2 years';

moment.duration(3, 'years').add(9, 'days').add(30, 'minutes').add(5, 'seconds').distance()
// 'about 3 years'

// No leap year

moment.duration(moment('2015-03-1').diff(moment('2015-02-27'))).distance()
// '2 days'

// Leap year

moment.duration(moment('2016-03-1').diff(moment('2016-02-27'))).distance()
// '3 days'
```
