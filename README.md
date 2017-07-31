# Angular Material DateTimePicker

Originally designed for Bootstrap Material, this has been modified to work with [Angular Material](https://material.angularjs.org/). This is an Android style date-time picker for Angular Material. Some added features include:

- Double or single click to select date and/or time
- Mouse click down with mouse move or touch move to select time
- Swipe left to go to next month or Swipe right to go to previous month
- Configurable first day of the week
- Support 24-hour format display
- Can disable dates, not selectable by user
- Highlight Week days (Business Days)
- Can disable minutes view
- 1 to 59 minute steps (normally 1, 5, 10, 15)
- Compatible with right-to-left direction
- Support RequireJS and Webpack

## Updates

| Date       | Author   | Description                                            |
| ---------- | -------- | ------------------------------------------------------ |
| 2017-07-30 | hexadecy | Highlight only week-days (business days)        |
| 2017-07-22 | hexadecy | Mouse or touch move to select time, minute steps param |
| 2017-04-26 | hexadecy | New 24-hour clock face                                 |
| 2017-04-17 | hexadecy | Single click to select                                 |
| 2017-02-27 | hexadecy | Can hide minutes view, Month next and prev buttons     |
| 2017-02-22 | hexadecy | Fix for rtl website                                    |
| 2017-02-15 | hexadecy | Fix inputs are not bluring after selection is made     |
| 2017-01-30 | hexadecy | Add support for angular 1.6.x                          |
| 2015-11-12 | logbon72 | Adapted plugin for Angular Material                    |

### Dependencies

Depends on the following library:

- AngularJS Material
- AngularJS Animate
- AngularJS Aria
- AngularJS
- Moment

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.4/angular.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular-animate.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular-aria.min.js"></script>
<link href="https://cdnjs.cloudflare.com/ajax/libs/angular-material/1.1.4/angular-material.min.css" rel="stylesheet" type="text/css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/angular-material/1.1.4/angular-material.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment-with-locales.min.js"></script>
```

## Installing via yarn, npm or bower

```
yarn add ng-material-datetimepicker
npm i ng-material-datetimepicker
bower install ng-material-datetimepicker
```

## CDN
```
<script src="https://unpkg.com/ng-material-datetimepicker@1.7.2/dist/angular-material-datetimepicker.min.js"></script>
<script src="https://unpkg.com/ng-material-datetimepicker@1.7.2dist/angular-material-datetimepicker.min.js.map"></script>
<link href="https://unpkg.com/ng-material-datetimepicker@1.7.2/dist/material-datetimepicker.min.css rel="stylesheet" type="text/css">
```
or
```
<script src="https://cdn.rawgit.com/beenote/angular-material-datetimepicker/v1.7.2/dist/angular-material-datetimepicker.min.js"></script>
<script src="https://cdn.rawgit.com/beenote/angular-material-datetimepicker/v1.7.2/dist/angular-material-datetimepicker.min.js.map"></script>
<link href="https://cdn.rawgit.com/beenote/angular-material-datetimepicker/v1.7.2/dist/material-datetimepicker.min.css" rel="stylesheet" type="text/css">
```

## Live Example

Click [here](https://beenote.github.io/angular-material-datetimepicker/) to see live examples.

## Usage

Add the plugin module as a dependency to your AngularJS module:

```js
    angular.module('myAwesomeModule', [
      //other dependencies ignored
      'ngMaterialDatePicker'
    ]);
```

This plugin exposes a directive which should be used as an attribute for an input element. The directive is
`mdc-datetime-picker`. An example of this is given below:

```html
    <md-input-container flex-gt-md="30">
        <label>Timepicker Only</label>
        <input mdc-datetime-picker date="false" time="true" type="text" id="time" short-time="true"
               show-todays-date click-outside-to-close="true"
               placeholder="Time" auto-ok="true"
               min-date="minDate" minute-steps="1"
               format="hh:mm a"
               ng-change="vm.saveChange()"
               ng-model="time">
    </md-input-container>
```


### Directive Attributes

The directive accepts several attributes which are described below:

| Name                      | Type                    | Description                                                          |
| ------------------------- | ----------------------- | -------------------------------------------------------------------- |
| **ng-model**              | (String\|Date\|Moment   | Initial Date or model to assign the date to                          |
| **ng-change**             | Function                | A function to call when the input value changes.                     |
| **format**                | String                  | [MomentJS Format](momentjs.com/docs/#/parsing/string-format/),defaults to `HH:mm` for time picker only, `YYYY-MM-DD` for date picker only and `YYYY-MM-DD HH:mm` for both timepicker and date picker |
| **short-time**            | Boolean                 | true => Display 12 hours AM\|PM (default: false)                     |
| **min-date**              | (String\|Date\|Moment)  | Minimum selectable date                                              |
| **max-date**              | (String\|Date\|Moment)  | Maximum selectable date                                              |
| **date**                  | Boolean	                | true => Has Datepicker (default: true)                               |
| **time**                  | Boolean                 | true => Has Timepicker (default: true)                               |
| **minutes**               | Boolean                 | true => Has Timepicker minutes (default: true)                       |
| **cancel-text**           | String                  | Text for the cancel button (default: Cancel)                         |
| **today-text**            | String                  | Text for the today button (default: Today)                           |
| **ok-text**               | String                  | Text for the OK button (default: OK)                                 |
| **week-start**            | Number                  | First day of the week (default: 0 => Sunday)                         |
| **disable-dates**         | Date[]                  | Dates to be disabled or not selectable by user.                      |
| **week-days**	            | Boolean                 | true => Highlight only week-days (default: false)                    |
| **show-todays-date**      | Attribute               | Show today's date (default: undefined)                               |
| **disable-parent-scroll** | Boolean                 | true => Disable scrolling while the dialog is open (default : false) |
| **auto-ok**               | Boolean                 | true => Single click (default: false)                                |
| **edit-input**            | Boolean                 | true => Input editable and don't show dialog (default: false)        |
| **click-outside-to-close**| Boolean                 | true => A click outside close the dialog (default: false)            |
| **minute-steps**          | Number                  | 1 to 59 minute steps (default: 5)                                    |

### Date/Time Dialog Service
 
You can also use the Date Time picker as a service, using the `mdcDateTimeDialog` service. The dialog returns a promise which is resolved with the selected date-time value and rejected on cancellation. 

Example usage: 

```javascript
    someModule.controller('DemoCtrl', function ($scope, mdcDateTimeDialog) {

      $scope.displayDialog = function () {
        mdcDateTimeDialog.show({
          maxDate: $scope.maxDate,
          time: false
        })
          .then(function (date) {
            $scope.selectedDateTime = date;
            console.log('New Date / Time selected:', date);
          }, function() {
            console.log('Selection canceled');
          });
      };
    })
```

The `mdcDateTimeDialog.show` accepts the same options as the directive. 

```javascript
     {
       date: {boolean} =true,
       time: {boolean} =true,
       minutes: {boolean} =true,
       format: {string} ='YYYY-MM-DD',
       minDate: {strign} =null,
       maxDate: {string} =null,
       currentDate: {string} =null,
       lang: {string} =mdcDatetimePickerDefaultLocale.locale,
       weekStart: {int} =0,
       shortTime: {boolean} =false,
       cancelText: {string} ='Cancel',
       todayText: {string} ='Today',
       showTodaysDate: {string} ='',
       okText: {string} ='OK',
       amText: {string} ='AM',
       pmText: {string} ='PM',
       disableDates: {date[]} =[],
       weekDays: {boolean} =false,
       disableParentScroll: {boolean} = false,
       autoOk: {boolean} =false,
       editInput: {boolean} =false,
       clickOutsideToClose: {boolean} =false,
       minuteSteps: {int} =5,
     }
```
