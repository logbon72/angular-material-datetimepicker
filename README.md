# Angular Material DateTimePicker

Originally designed for Bootstrap Material, this has been modified to work with [Angular Material](https://material.angularjs.org/). This is an Android style date-time picker for Angular Material. Some added features include:

- Double click to select date or time
- Swipe left to go to next month or Swipe right to go to previous month.



## Updates

** I have kept this section of the document as an acknowledgement for all the work done on the original Bootstrap Material plugin **

| Date				| Author			| Description											 |
| ----------------- | ----------------- | ----------- |
| 2015-11-12		| logbon72		    | Adapted plugin for Angular Material |
| 2015-10-19		| benletchford		| Fixed not being able to tab into input				 |
| 2015-10-19		| drblue 			| Fixed erroneous package.json-file 					 |
| 2015-10-19		| Perdona			| Fix auto resize when month has 6 weeks				 |
| 2015-07-01		| T00rk 			| Redesigned element without using modal				 |
| 2015-06-16		| T00rk 			| Use Timepicker alone / Display short time (12 hours)	 |
| 2015-06-13		| T00rk 			| Fixed issue with HTML value tag 						 |
| 2015-05-25		| T00rk 			| Changed repo name to bootstrap-material-datetimepicker * |
| 2015-05-12		| T00rk				| Added parameters for button text						 |
| 2015-05-05		| Sovanna			| FIX undefined _minDate in isBeforeMaxDate func		 |
| 2015-04-10		| T00rk				| Little change in clock design							 |
| 2015-04-10		| Peterzen			| Added bower and requirejs support						 |
| 2015-04-08		| T00rk				| Fixed problem on locale switch						 |
| 2015-03-04		| T00rk				| Added Time picker										 |
(\*) File names have been changed 

bootstrap-material-datepicker.js => bootstrap-material-date**time**picker.js

bootstrap-material-datepicker.css => bootstrap-material-date**time**picker.css
	
### Dependencies

Depends on the following library:

- Angular Material & it's dependencies
- Angular Touch
- MomentJS

## Installing via Bower

```
bower install angular-material-datetimepicker
```


## Live Example

Click [here](http://logbon72.github.io/angular-material-datetimepicker) to see live examples.

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
               placeholder="Time"
               min-date="minDate"
               format="hh:mm a"
               ng-model="time">
    </md-input-container>
```


### Directive Attributes

The directive accepts several attributes which are described below:

| Name				| Type							| Description									|
| ----------------- | ----------------------------- | --------------------------------------------- |
| **ng-model**	    | (String\|Date\|Moment)		| Initial Date or model to assign the date to|
| **format**		| String						| [MomentJS Format](momentjs.com/docs/#/parsing/string-format/),defaults to `HH:mm` for time picker only, `YYYY-MM-DD` for date picker only and `YYYY-MM-DD HH:mm` for both timepicker and date picker |
| **short-time**	| Boolean						| true => Display 12 hours AM\|PM 				|
| **min-date**		| (String\|Date\|Moment)		| Minimum selectable date						|
| **max-date**		| (String\|Date\|Moment)		| Maximum selectable date						|
| **date**			| Boolean						| true => Has Datepicker (default: true)        |
| **time**			| Boolean						| true => Has Timepicker (default: true)		|
| **cancel-text**	| String						| Text for the cancel button (default: Cancel)	|
| **ok-text**		| String						| Text for the OK button (default: OK)			|
| **on-change**		| Function						| Callback which will be executed when the date will be applied (example: `on-change="onChange($dateTime)"`) `$dateTime` will be a moment object | 			|