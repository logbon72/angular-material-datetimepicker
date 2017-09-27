(function () {
  'use strict';

  function ngMaterialDatePicker(moment) {
  var moduleName = "ngMaterialDatePicker";

  var mdAccesTime = 'data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gICAgPHBhdGggZD0iTTExLjk5IDJDNi40NyAyIDIgNi40OCAyIDEyczQuNDcgMTAgOS45OSAxMEMxNy41MiAyMiAyMiAxNy41MiAyMiAxMlMxNy41MiAyIDExLjk5IDJ6TTEyIDIwYy00LjQyIDAtOC0zLjU4LTgtOHMzLjU4LTggOC04IDggMy41OCA4IDgtMy41OCA4LTggOHoiLz4gICAgPHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPiAgICA8cGF0aCBkPSJNMTIuNSA3SDExdjZsNS4yNSAzLjE1Ljc1LTEuMjMtNC41LTIuNjd6Ii8+PC9zdmc+',
      mdCalendar = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTkgM2gtMVYxaC0ydjJIOFYxSDZ2Mkg1Yy0xLjExIDAtMS45OS45LTEuOTkgMkwzIDE5YzAgMS4xLjg5IDIgMiAyaDE0YzEuMSAwIDItLjkgMi0yVjVjMC0xLjEtLjktMi0yLTJ6bTAgMTZINVY4aDE0djExek03IDEwaDV2NUg3eiIvPjwvc3ZnPg==';
  
  var VIEW_STATES = {
    DATE: 0,
    HOUR: 1,
    MINUTE: 2
  };

  var css = function (el, name) {
    el = angular.element(el);
    return ('getComputedStyle' in window) ? window.getComputedStyle(el[0])[name] : el.css(name);
  };

  var template = 
    '<md-dialog class="dtp" layout="column" style="width: 300px;">' +
    '    <md-dialog-content class="dtp-content">' +
    '        <div class="dtp-date-view">' +
    '            <header class="dtp-header">' +
    '                <div class="dtp-actual-day" ng-if="picker.dateMode">{{picker.currentNearestMinute().format("dddd")}}</div>' +
    '                <div class="dtp-actual-day" ng-if="!picker.timeMode">{{picker.params.shortTime ? picker.currentDate.format("A"):" "}}</div>' +
    '                <div class="dtp-close text-right noselect">' +
    '                    <a href="#" mdc-dtp-noclick ng-click="picker.hide()">&times;</a>' +
    '                </div>' +
    '            </header>' +
    '            <div class="dtp-date" ng-if="picker.params.date">' +
    '                <div layout="row">' +
    '                    <div ng-click="picker.incrementMonth(-1)" class="dtp-month-btn dtp-month-btn-prev noselect" flex="30"><span ng-if="picker.isPreviousMonthVisible()">&#x25C4;</span></div>' +
    '                    <md-menu md-offset="8 10" flex>' +
    '                        <div class="dtp-actual-month" flex ng-click="picker.openMenu($mdMenu, $event)">{{picker.currentDate.format("MMM") | uppercase}}</div>' +
    '                        <md-menu-content>' +
    '                            <md-menu-item ng-repeat="itemMonth in picker.monthsAvailable() track by $index">' +
    '                            <md-button ng-click="picker.selectMonth(itemMonth)">{{itemMonth}}</md-button>' +
    '                            </md-menu-item>' +
    '                        </md-menu-content>' +
    '                    </md-menu>' +
    '                    <div ng-click="picker.incrementMonth(1)" class="dtp-month-btn dtp-month-btn-next noselect" flex="30"><span ng-if="picker.isNextMonthVisible()">&#x25BA;</span></div>' +
    '                </div>' +
    '                <div class="dtp-actual-num">{{picker.currentDate.format("DD")}}</div>' +
    '                <div layout="row">' +
    '                    <div ng-click="picker.incrementYear(-1)" class="dtp-year-btn dtp-year-btn-prev noselect" flex="30"><span ng-if="picker.isPreviousYearVisible()">&#x25C4;</span></div>' +
    '                    <md-menu md-offset="8 10" flex>' +
    '                        <div class="dtp-actual-year" flex ng-click="picker.openMenu($mdMenu, $event)">{{picker.currentDate.format("YYYY")}}</div>' +
    '                        <md-menu-content>' +
    '                            <md-menu-item ng-repeat="itemYear in picker.yearsAvailable() track by $index">' +
    '                            <md-button ng-click="picker.selectYear(itemYear)">{{itemYear}}</md-button>' +
    '                            </md-menu-item>' +
    '                        </md-menu-content>' +
    '                    </md-menu>' +
    '                    <div ng-click="picker.incrementYear(1)" class="dtp-year-btn dtp-year-btn-next noselect" flex="30"><span ng-if="picker.isNextYearVisible()">&#x25BA;</span></div>' +
    '                </div>'+
    '            </div>' + //start time 
    '            <div class="dtp-time" ng-if="picker.params.time && !picker.params.date">' +
    '                <div class="dtp-actual-maxtime">' +
    '                    <span ng-if="!picker.params.seconds"><span ng-class="{selected: picker.currentView===picker.VIEWS.HOUR}">{{picker.currentNearestMinute().format(picker.params.shortTime ? "hh":"HH")}}</span>:<span ng-class="{selected: picker.currentView===picker.VIEWS.MINUTE}">{{picker.currentNearestMinute().format("mm")}}</span></span>'+
    '                    <span ng-if="picker.params.seconds"><span ng-class="{selected: picker.currentView===picker.VIEWS.HOUR}">{{picker.currentNearestMinute().format(picker.params.shortTime ? "hh":"HH")}}</span>:<span ng-class="{selected: picker.currentView===picker.VIEWS.MINUTE}">{{picker.currentNearestMinute().format("mm")}}</span>:<span ng-class="{selected: picker.currentView===picker.VIEWS.SECOND}">{{picker.currentNearestMinute().format("ss")}}</span></span>'+
    '                    <span class="dtp-actual-meridien" ng-if="picker.params.shortTime">{{picker.currentDate.format("A")}}</span>'+
    '                </div>' +
    '            </div>' +
    '            <div class="dtp-picker">' +
    '                <mdc-datetime-picker-calendar date="picker.currentDate" picker="picker" class="dtp-picker-calendar" ng-if="picker.currentView === picker.VIEWS.DATE"></mdc-datetime-picker-calendar>' +
    '                <div class="dtp-picker-datetime" ng-cloak ng-if="picker.currentView !== picker.VIEWS.DATE">' +
    '                    <div class="dtp-actual-meridien">' +
    '                        <div ng-if="picker.params.shortTime" class="left p20">' +
    '                            <a id="time-periods-am" href="#" mdc-dtp-noclick class="dtp-meridien-am" ng-class="{selected: picker.meridien===\'AM\'}" ng-click="picker.selectAM()">{{picker.params.amText}}</a>' +
    '                        </div>' +
    '                        <div ng-if="!picker.timeMode && !picker.params.seconds" class="dtp-actual-time p60">' +
    '                            <span ng-class="{selected: picker.currentView===picker.VIEWS.HOUR}">{{picker.currentNearestMinute().format(picker.params.shortTime ? "hh":"HH")}}</span>:<span ng-class="{selected: picker.currentView===picker.VIEWS.MINUTE}">{{picker.currentNearestMinute().format("mm")}}</span>' +
    '                        </div>' +
    '                        <div ng-if="!picker.timeMode && picker.params.seconds" class="dtp-actual-time p60">' +
    '                            <span ng-class="{selected: picker.currentView===picker.VIEWS.HOUR}">{{picker.currentNearestMinute().format(picker.params.shortTime ? "hh":"HH")}}</span>:<span ng-class="{selected: picker.currentView===picker.VIEWS.MINUTE}">{{picker.currentNearestMinute().format("mm")}}</span>:<span ng-class="{selected: picker.currentView===picker.VIEWS.SECOND}">{{picker.currentNearestMinute().format("ss")}}</span>' +
    '                        </div>' +
    '                        <div ng-if="picker.params.shortTime" class="right p20">' +
    '                            <a id="time-periods-pm" href="#" mdc-dtp-noclick class="dtp-meridien-pm" ng-class="{selected: picker.meridien===\'PM\'}" ng-click="picker.selectPM()">{{picker.params.pmText}}</a>' +
    '                        </div>' +
    '                        <div class="clearfix"></div>' +
    '                    </div>' +
    '                    <mdc-datetime-picker-clock mode="hours" ng-if="picker.currentView===picker.VIEWS.HOUR"></mdc-datetime-picker-clock>' +
    '                    <mdc-datetime-picker-clock mode="minutes" ng-if="picker.currentView===picker.VIEWS.MINUTE"></mdc-datetime-picker-clock>' +
    '                    <mdc-datetime-picker-clock mode="seconds" ng-if="picker.currentView===picker.VIEWS.SECOND"></mdc-datetime-picker-clock>' +
    '                </div>' +
    '            </div>' +
    '        </div>' +
    '    </md-dialog-content>' +
    '    <md-dialog-actions class="dtp-buttons">' +
    '            <md-button class="dtp-btn-today md-button" ng-click="picker.today()"> {{picker.params.todayText}}</md-button>' +
    '            <md-button class="dtp-btn-cancel md-button" ng-click="picker.cancel()"> {{picker.params.cancelText}}</md-button>' +
    '            <md-button class="dtp-btn-ok md-button" ng-click="picker.ok()"> {{picker.params.okText}}</md-button>' +
    '      </md-dialog-actions>' +
    '</md-dialog>';

  angular.module(moduleName, ['ngMaterial'])
    .service('mdcDatetimePickerDefaultLocale', ['mdcDefaultParams', function (mdcDefaultParams) {
      this.$get = function () {
        return mdcDefaultParams().lang;
      };

      this.setDefaultLocale = function (localeString) {
        mdcDefaultParams({ lang: localeString });
      };
    }])
    .factory('mdcDefaultParams', function () {
      var default_params = {
        date: true,
        time: true,
        minutes: true,
        seconds: false,
        format: 'YYYY-MM-DD',
        minDate: null,
        maxDate: null,
        currentDate: null,
        lang: window.navigator.userLanguage || window.navigator.language || 'en',
        weekStart: 0,
        shortTime: false,
        cancelText: 'Cancel',
        okText: 'OK',
        amText: 'AM',
        pmText: 'PM',
        todayText: 'Today',
        disableDates: [],
        weekDays: false,
        disableParentScroll: false,
        autoOk: false,
        editInput: false,
        clickOutsideToClose: false,
        minuteSteps: 5,
        showIcon: false,
      };

      return function (params) {
        if (params) {
          for (var i in params) {
            if (default_params.hasOwnProperty(i) && params.hasOwnProperty(i)) {
              default_params[i] = params[i];
            }
          }
        }

        return default_params;
      };
    })
    .directive('mdcDatetimePicker', ['$mdDialog', '$timeout', '$compile',
      function ($mdDialog, $timeout, $compile) {

        return {
          restrict: 'A',
          require: 'ngModel',
          scope: {
            currentDate: '=ngModel',
            ngChange: '&',
            time: '=',
            date: '=',
            minutes: '=',
            seconds: '=',
            minDate: '=',
            maxDate: '=',
            disableDates: '=',
            weekDays: '=',
            shortTime: '=',
            weekStart: '=',
            format: '@',
            cancelText: '@',
            okText: '@',
            lang: '@',
            amText: '@',
            pmText: '@',
            showTodaysDate: '@',
            todayText: '@',
            disableParentScroll: '=',
            autoOk: '=',
            editInput: '=',
            clickOutsideToClose: '=',
            minuteSteps: '=',
            showIcon: '='
          },
          link: function (scope, element, attrs, ngModel) {
            var isOn = false;
            if (!scope.format) {
              if (scope.date && scope.time && scope.seconds) {
                scope.format = 'YYYY-MM-DD HH:mm:ss';
              } else if (scope.date && scope.time) {
                scope.format = 'YYYY-MM-DD HH:mm';
              } else if (scope.date) {
                scope.format = 'YYYY-MM-DD';
              } else {
                scope.format = 'HH:mm';
              }
            }

            var dateOfTheDay = null;
            if (scope.showTodaysDate !== undefined && scope.showTodaysDate !== "false") {
              dateOfTheDay = moment();
            }

            if (angular.isString(scope.currentDate) && scope.currentDate !== '') {
              scope.currentDate = moment(scope.currentDate, scope.format);
            }

            if (ngModel) {
              var ngModelOptions = {'*': '$inherit', debounce: 500};
              ngModel.$options = ngModel.$options ? ngModel.$options.createChild(ngModelOptions) : ngModelOptions;
              
              ngModel.$formatters.push(function (value) {
                if (typeof value === 'undefined') return;
                var m = moment(value);
                return m.isValid() ? m.format(scope.format) : '';
              });
              
              ngModel.$parsers.push(function (value) {
                if (typeof value === 'undefined') return;
                var m = moment(value, scope.format);
                if (m.isValid()) return m._d;
                return;
              });
              
            }

            function openCalendar (e) {
              e.preventDefault();
              element.blur();
              element.parent().removeClass('md-input-focused');
              if (isOn) {
                return;
              }
              isOn = true;
              var options = {};
              for (var i in attrs) {
                if (scope.hasOwnProperty(i) && !angular.isUndefined(scope[i])) {
                  options[i] = scope[i];
                }
              }
              options.currentDate = scope.currentDate;
              options.showTodaysDate = dateOfTheDay;

              var locals = {options: options};
              $mdDialog.show({
                template: template,
                controller: PluginController,
                controllerAs: 'picker',
                locals: locals,
                openFrom: element,
                parent: angular.element(document.body),
                bindToController: true,
                clickOutsideToClose: options.clickOutsideToClose || false,
                disableParentScroll: options.disableParentScroll || false,
                hasBackDrop: false,
                skipHide: true,
                multiple: true
              }).then(function (v) {
                scope.currentDate = v ? v._d : v;
                isOn = false;

                if (!moment(scope.currentDate).isSame(options.currentDate)) {
                  $timeout(scope.ngChange, 0);
                }

                element.parent().removeClass('md-input-focused');
              }, function () {
                isOn = false;
                element.parent().removeClass('md-input-focused');
              });
            }

            if (!scope.editInput) {
              if (scope.showIcon) {
                element.on('click', openCalendar);
              } else {
                element.on('focus', openCalendar);
              }
            }
            
            if (scope.showIcon) {
              element.addClass('dtp-no-msclear dtp-input');
              var calendarButton =  
              '<md-button class="dtp-btn-calendar md-icon-button" type="button" ' +
                'tabindex="-1" aria-hidden="true" ' +
                'ng-click="openCalendarDiag($event)">' +
                '<md-icon aria-label="md-calendar" md-svg-src="' + (scope.date ? mdCalendar : mdAccesTime) + '"></md-icon>' +
              '</md-button>',
              clearButton = '<md-button ng-show="currentDate" class="md-icon-button dtp-clear" aria-hidden="true" ng-click="clear()">&#x2715;</md-button>';
              element.after($compile(calendarButton + clearButton)(scope));

              scope.openCalendarDiag = function(e) {
                openCalendar(e);
              };

              scope.clear = function() {
                ngModel.$setViewValue(null);
                scope.currentDate = null;
                ngModel.$render();
                $timeout(function() {
                  element[0].focus();
                }, 0, false);
              };
            }
          }
        };
      }])
    /** Returns a service that opens a dialog when the attribute shown is called
     The dialog serves to select a date/time/etc. depending on the options given to the function show

     @param options extends mdcDefaultParams
     {
       date: {boolean} =true,
       time: {boolean} =true,
       minutes: {boolean} =true,
       seconds: {boolean} =false,
       format: {string} ='YYYY-MM-DD',
       minDate: {strign} =null,
       maxDate: {string} =null,
       currentDate: {string} =null,
       lang: {string} =window.navigator.userLanguage || window.navigator.language || 'en',
       weekStart: {int} =0,
       shortTime: {boolean} =false,
       cancelText: {string} ='Cancel',
       showTodaysDate: {string} ='',
       todayText: {string} ='Today',
       okText: {string} ='OK',
       amText: {string} ='AM',
       pmText: {string} ='PM',
       disableDates: {date[]} =[],
       weekDays: {boolean} =false,
       disableParentScroll: {boolean} =false,
       autoOk: {boolean} =false,
       editInput: {boolean} =false,
       clickOutsideToClose: {boolean} =false,
       minuteSteps: {int} =5,
     }
     @return promise
    */
    .factory('mdcDateTimeDialog', ["$mdDialog", "$q", "mdcDefaultParams", function ($mdDialog, $q, mdcDefaultParams) {
      var defaultParams = mdcDefaultParams();
      var accepted_options = Object.keys(defaultParams);
      var service = {
        show: function (options) {
          var deferred = $q.defer();
          var params = angular.copy(defaultParams);
          for (var i in options) {
            if (accepted_options.indexOf[i] != -1 && options.hasOwnProperty(i)) {
              params = options[i];
            }
          }

          var dateOfTheDay = null;
          if (options.showTodaysDate !== undefined && options.showTodaysDate !== "false") {
            dateOfTheDay = moment();
          }
          options.showTodaysDate = dateOfTheDay;

          var locals = {options: options};
          $mdDialog.show({
            template: template,
            controller: PluginController,
            controllerAs: 'picker',
            locals: locals,
            parent: angular.element(document.body),
            bindToController: true,
            clickOutsideToClose: options.clickOutsideToClose || false,
            disableParentScroll: options.disableParentScroll || false,
            skipHide: true,
            multiple: true
          }).then(function (v) {
            var currentDate = v ? v._d : v;
            deferred.resolve(v ? v._d : v);
          }, function () {
            deferred.reject();
          });
          return deferred.promise;
        }
      };

      return service;
    }])
  ;

  var PluginController = function ($scope, $mdDialog, mdcDefaultParams) {
    this.currentView = VIEW_STATES.DATE;
    this._dialog = $mdDialog;

    this._attachedEvents = [];
    this.VIEWS = VIEW_STATES;
    this.params = angular.copy(mdcDefaultParams());
    this.meridien = 'AM';
    this.params = angular.extend(this.params, this.options);

    this.init();
  };

  PluginController.$inject = ['$scope', '$mdDialog', 'mdcDefaultParams'];
  PluginController.prototype = {
    init: function () {
      this.timeMode = this.params.time && !this.params.date;
      this.dateMode = this.params.date;
      this.initDates();
      this.start();
    },
    currentNearestMinute: function () {
      var nearestMin = this.params.minuteSteps;
      if (nearestMin < 1 || nearestMin > 59) nearestMin = 1;

      var date = this.currentDate || moment();
      var minutes = (nearestMin * Math.round(date.minute() / nearestMin));
      if (minutes >= 60) {
        minutes = 60 - nearestMin; //always push down
      }
      var seconds = date.second();
      if (seconds >= 60) {
        seconds = 60 - 1; //always push down
      }
      return moment(date).minutes(minutes).seconds(seconds);
    },
    initDates: function () {
      var that = this;
      var _dateParam = function (input, fallback) {
        var ret = null;
        if (angular.isDefined(input) && input !== null && input !== '') {
          if (angular.isString(input)) {
            if (typeof(that.params.format) !== 'undefined' && that.params.format !== null) {
              ret = moment(input, that.params.format).locale(that.params.lang);
            }
            else {
              ret = moment(input).locale(that.params.lang);
            }
          } else if (typeof input === 'number') {
            ret = moment(input).locale(that.params.lang);
          } else {
            if (angular.isDate(input)) {
              var x = input.getTime();
              ret = moment(x, "x").locale(that.params.lang);
            } else if (input._isAMomentObject) {
              ret = input;
            }
          }
        }
        else {
          ret = fallback;
        }
        return ret;
      };

      this.currentDate = _dateParam(this.params.currentDate, moment());
      this.currentDate = this.currentNearestMinute();
      this.minDate = _dateParam(this.params.minDate);
      this.maxDate = _dateParam(this.params.maxDate);
      this.disableDates = this.params.disableDates.map(function (x) {
        return moment(x).format('MMMM Do YYYY');
      });
      this.selectDate(this.currentDate);
      this.weekDays = this.params.weekDays;
    },
    initDate: function () {
      this.currentView = VIEW_STATES.DATE;
    },
    initHours: function () {
      this.currentView = VIEW_STATES.HOUR;
    },
    initMinutes: function () {
      this.currentView = VIEW_STATES.MINUTE;
    },
    initSeconds: function () {
      this.currentView = VIEW_STATES.SECOND;
    },
    isAfterMinDate: function (date, checkHour, checkMinute) {
      var _return = true;

      if (typeof(this.minDate) !== 'undefined' && this.minDate !== null) {
        var _minDate = moment(this.minDate);
        var _date = moment(date);

        if (!checkHour && !checkMinute) {
          _minDate.hour(0);
          _minDate.minute(0);

          _date.hour(0);
          _date.minute(0);
        }

        _minDate.second(0);
        _date.second(0);
        _minDate.millisecond(0);
        _date.millisecond(0);

        if (!checkMinute) {
          _date.minute(0);
          _minDate.minute(0);

          _return = (parseInt(_date.format("X")) >= parseInt(_minDate.format("X")));
        }
        else {
          _return = (parseInt(_date.format("X")) >= parseInt(_minDate.format("X")));
        }
      }

      return _return;
    },
    isBeforeMaxDate: function (date, checkTime, checkMinute) {
      var _return = true;

      if (typeof(this.maxDate) !== 'undefined' && this.maxDate !== null) {
        var _maxDate = moment(this.maxDate);
        var _date = moment(date);

        if (!checkTime && !checkMinute) {
          _maxDate.hour(0);
          _maxDate.minute(0);

          _date.hour(0);
          _date.minute(0);
        }

        _maxDate.second(0);
        _date.second(0);
        _maxDate.millisecond(0);
        _date.millisecond(0);

        if (!checkMinute) {
          _date.minute(0);
          _maxDate.minute(0);

          _return = (parseInt(_date.format("X")) <= parseInt(_maxDate.format("X")));
        }
        else {
          _return = (parseInt(_date.format("X")) <= parseInt(_maxDate.format("X")));
        }
      }

      return _return;
    },
    isInDisableDates: function (date) {
      var dut = date.format('MMMM Do YYYY');
      if (this.disableDates.indexOf(dut) > -1) {
        return false;
      }
      return true;
    },
    isWeekDay: function(date) {
      if (this.weekDays) {
        if (date.isoWeekday() <= 5) {
          return true;
        }
        return false;
      }
      return true;
    },
    selectDate: function (date) {
      if (date) {
        this.currentDate = moment(date);
        if (!this.isAfterMinDate(this.currentDate)) {
          this.currentDate = moment(this.minDate);
        }

        if (!this.isBeforeMaxDate(this.currentDate)) {
          this.currentDate = moment(this.maxDate);
        }
        this.currentDate.locale(this.params.lang);
        this.calendarStart = moment(this.currentDate);
        this.meridien = this.currentDate.hour() >= 12 ? 'PM' : 'AM';
      }
    },
    isPM: function () {
      return this.meridien === 'PM';
    },
    incrementMonth: function (amount) {
      if (amount === 1 && this.isNextMonthVisible()) {
        this.selectDate(this.currentDate.add(amount, 'month'));
      }

      if (amount === -1 && this.isPreviousMonthVisible()) {
        this.selectDate(this.currentDate.add(amount, 'month'));
      }
    },
    incrementYear: function (amount) {
      if (amount === 1 && this.isNextYearVisible()) {
        this.selectDate(this.currentDate.add(amount, 'year'));
      }

      if (amount === -1 && this.isPreviousYearVisible()) {
        this.selectDate(this.currentDate.add(amount, 'year'));
      }
    },
    openMenu: function ($mdMenu, ev) {
      $mdMenu.open(ev); 
    },
    monthsAvailable: function () {
      var monthsArr = [], 
          _date = moment(this.currentDate);

      for (var m = 0; m < 12; m++) {
        var curMonth = _date.month(m);
        if (this.isAfterMinDate(curMonth.endOf('month')) && this.isBeforeMaxDate(curMonth.startOf('month'))) {
          monthsArr.push(curMonth.format('MMMM'));
        }
      }
      return monthsArr;
    },
    selectMonth: function (month) {
      this.selectDate(this.currentDate.month(month));
    },
    yearsAvailable: function () {
      var _minDate, _maxDate, len, startYear, yearsArr = [],
      _date = this.currentDate.year();

      if (typeof(this.minDate) !== 'undefined' && this.minDate !== null) {
        _minDate = moment(this.minDate).year();
      }
      if (typeof(this.maxDate) !== 'undefined' && this.maxDate !== null) {
        _maxDate = moment(this.maxDate).year();
      }

      if (_maxDate && _minDate) {
        len = _maxDate - _minDate;
        startYear = _minDate;
      } else if (_minDate) { 
        len = 115;
        startYear = _minDate;
      } else if (_maxDate) { 
        len = 30;
        startYear = _maxDate - len;
      } else {
        len = 60;
        startYear = _date - len/2;
      }
     
      for (var i=0; i < len; i++) {
        yearsArr.push(startYear+i);
      }
      return yearsArr;
    },
    selectYear: function (year) {
      this.selectDate(this.currentDate.year(year));
    },
    isPreviousMonthVisible: function () {
      return this.calendarStart && this.isAfterMinDate(moment(this.calendarStart).startOf('month'), false, false);
    },
    isNextMonthVisible: function () {
      return this.calendarStart && this.isBeforeMaxDate(moment(this.calendarStart).endOf('month'), false, false);
    },
    isPreviousYearVisible: function () {
      return this.calendarStart && this.isAfterMinDate(moment(this.calendarStart).startOf('year'), false, false);
    },
    isNextYearVisible: function () {
      return this.calendarStart && this.isBeforeMaxDate(moment(this.calendarStart).endOf('year'), false, false);
    },
    isHourAvailable: function (hour) {
      var _date = moment(this.currentDate);
      if (this.params.shortTime) {
        _date.hour(this.convertHours(hour)).minute(0).second(0);
      } else {
        _date.hour(hour).minute(0).second(0);
      }
      return this.isAfterMinDate(_date, true, false) && this.isBeforeMaxDate(_date, true, false);
    },
    isMinuteAvailable: function (minute) {
      var _date = moment(this.currentDate);
      _date.minute(minute).second(0);
      return this.isAfterMinDate(_date, true, true) && this.isBeforeMaxDate(_date, true, true);
    },
    isSecondAvailable: function (second) {
      return true;
    },
    start: function () {
      this.currentView = VIEW_STATES.DATE;
      if (this.params.date) {
        this.initDate();
      } else {
        if (this.params.time) {
          this.initHours();
        }
      }
    },
    today: function () {
      var nearestMin = this.params.minuteSteps;
      var date = moment();
      var minutes = (nearestMin * Math.round(date.minute() / nearestMin));
      if (minutes >= 60) {
        minutes = 60 - nearestMin; //always push down
      }
      this.selectDate(moment(date).minutes(minutes));
    },
    ok: function () {
      switch (this.currentView) {
        case VIEW_STATES.DATE:
          if (this.params.time === true) {
            this.initHours();
          } else {
            this.hide(true);
          }
          break;
        case VIEW_STATES.HOUR:
          if (this.params.minutes === true) {
            this.initMinutes();
          } else {
            this.hide(true);
          }
          break;
        case VIEW_STATES.MINUTE:
          if (this.params.seconds === true) {
            this.initSeconds();
          } else {
            this.hide(true);
          }
          break;
        case VIEW_STATES.SECOND:
          this.hide(true);
          break;
      }
    },
    cancel: function () {
      if (this.params.time) {
        switch (this.currentView) {
          case VIEW_STATES.DATE:
            this.hide();
            break;
          case VIEW_STATES.HOUR:
            if (this.params.date) {
              this.initDate();
            }
            else {
              this.hide();
            }
            break;
          case VIEW_STATES.MINUTE:
            this.initHours();
            break;
          case VIEW_STATES.SECOND:
            this.initMinutes();
            break;  
        }
      }
      else {
        this.hide();
      }
    },
    selectMonthBefore: function () {
      this.calendarStart.subtract(1, 'months');
    },
    selectMonthAfter: function () {
      this.calendarStart.add(1, 'months');
    },
    selectYearBefore: function () {
      this.calendarStart.subtract(1, 'years');
    },
    selectYearAfter: function () {
      this.calendarStart.add(1, 'years');
    },
    selectAM: function () {
      if (this.isHourAvailable(0) || this.isHourAvailable(12)) {
        if (this.currentDate.hour() >= 12) {
          this.selectDate(this.currentDate.subtract(12, 'hours'));
        }
        if (!this.isHourAvailable(this.currentDate.hour())) {
          this.selectDate(this.currentDate.hour(this.minDate.hour()));
        }
        if (!this.isMinuteAvailable(this.currentDate.minute())) {
          this.selectDate(this.currentDate.minute(this.minDate.minute()));
        }
      }
    },
    selectPM: function () {
      if (this.isHourAvailable(13) || this.isHourAvailable(24)) {
        if (this.currentDate.hour() < 12) {
          this.selectDate(this.currentDate.add(12, 'hours'));
        }
        if (!this.isHourAvailable(this.currentDate.hour())) {
          this.selectDate(this.currentDate.hour(this.maxDate.hour()));
        }
        if (!this.isMinuteAvailable(this.currentDate.minute())) {
          this.selectDate(this.currentDate.minute(this.maxDate.minute()));
        }
      }
    },
    convertHours: function (h) {
      var _return = h;
      if ((h < 12) && this.isPM())
        _return += 12;

      return _return;
    },
    hide: function (okBtn) {
      if (okBtn) {
        this._dialog.hide(this.currentDate);
      } else {
        this._dialog.cancel();
      }
    }
  };

  angular.module(moduleName)
    .directive('mdcDatetimePickerCalendar', [
      function () {

        var YEAR_MIN = 1920,
          YEAR_MAX = new Date().getFullYear() + 30,
          MONTHS_IN_ALL = (YEAR_MAX - YEAR_MIN + 1) * 12,
          ITEM_HEIGHT = 240,
          MONTHS = [];
        for (var i = 0; i < MONTHS_IN_ALL; i++) {
          MONTHS.push(i);
        }

        var currentMonthIndex = function (date, low) {
          low = low ? low : 0;
          var year = date.year();
          var month = date.month();
          return (((year - YEAR_MIN) * 12) + month - 1 ) - low;
        };

        return {
          restrict: 'E',
          scope: {
            picker: '=',
            date: '='
          },
          bindToController: true,
          controllerAs: 'cal',
          controller: ['$scope', function ($scope) {
            var calendar = this, picker;

            this.$onInit = function () {
              picker = this.picker;

              var days = [];
              for (var i = picker.params.weekStart; days.length < 7; i++) {
                if (i > 6) {
                  i = 0;
                }
                days.push(i.toString());
              }
              calendar.week = days;

              if (!picker.maxDate && !picker.minDate) {
                calendar.months = MONTHS;
              } else {
                var low = picker.minDate ? currentMonthIndex(picker.minDate) : 0;
                var high = picker.maxDate ? (currentMonthIndex(picker.maxDate) + 1) : MONTHS_IN_ALL;
                calendar.months = MONTHS.slice(low, high);
              }

              calendar.topIndex = currentMonthIndex(picker.currentDate) - calendar.months[0];
            };

            if (angular.version.major === 1 && angular.version.minor < 5) {
              this.$onInit();
            }
          
            calendar.getItemAtIndex = function (index) {
              var month = ((index + 1) % 12) || 12;
              var year = YEAR_MIN + Math.floor(index / 12);
              var monthObj = moment(picker.currentDate).year(year).month(month);
              return generateMonthCalendar(monthObj);
            };

            $scope.$watch(function () {
              return picker.currentDate ? picker.currentDate.format('YYYY-MM') : '';
            }, function (val2, val1) {
              if (val2 != val1) {
                var nDate = moment(val2, 'YYYY-MM');
                var low = picker.minDate ? currentMonthIndex(picker.minDate) : 0;
                var index = currentMonthIndex(nDate, low);
                if (calendar.topIndex != index) {
                  calendar.topIndex = index;
                }
              }
            });

            var generateMonthCalendar = function (date) {
              var month = {};
              if (date !== null) {
                month.name = date.format('MMMM YYYY');
                var startOfMonth = moment(date).locale(picker.params.lang).startOf('month')
                    .hour(date.hour())
                    .minute(date.minute());
                var iNumDay = startOfMonth.format('d');
                month.days = [];
                for (var i = startOfMonth.date(); i <= startOfMonth.daysInMonth(); i++) {
                  if (i === startOfMonth.date()) {
                    var iWeek = calendar.week.indexOf(iNumDay.toString());
                    if (iWeek > 0) {
                      for (var x = 0; x < iWeek; x++) {
                        month.days.push(0);
                      }
                    }
                  }
                  month.days.push(moment(startOfMonth).locale(picker.params.lang).date(i));
                }

                var daysInAWeek = 7, daysTmp = [], slices = Math.ceil(month.days.length / daysInAWeek);
                for (var j = 0; j < slices; j++) {
                  daysTmp.push(month.days.slice(j * daysInAWeek, (j + 1) * daysInAWeek));
                }
                month.days = daysTmp;
                return month;
              }

            };

            calendar.toDay = function (i) {
              return moment(parseInt(i), "d")
                .locale(picker.params.lang)
                .format("dd")
                .substring(0, 1);
            };

            calendar.isInRange = function (date) {
              return picker.isAfterMinDate(moment(date), false, false) &&
                picker.isBeforeMaxDate(moment(date), false, false) &&
                picker.isWeekDay(moment(date)) &&
                picker.isInDisableDates(moment(date));
            };

            calendar.selectDate = function (date) {
              if (date) {
                if (calendar.isSelectedDay(date)) {
                  return picker.ok();
                }
                picker.selectDate(moment(date).hour(calendar.date.hour()).minute(calendar.date.minute()));
                if (picker.params.autoOk) {
                  picker.ok();
                }
              }
            };

            calendar.isSelectedDay = function (m) {
              return m && calendar.date.date() === m.date() && calendar.date.month() === m.month() && calendar.date.year() === m.year();
            };

            calendar.isDateOfTheDay = function (m) {
              var today = calendar.picker.options.showTodaysDate;
              if (!today) {
                return false;
              }

              return m && today.date() === m.date() && today.month() === m.month() && today.year() === m.year();
            };
          }],
          template: 
          '<md-virtual-repeat-container md-top-index="cal.topIndex" class="months">' +
          '<div md-virtual-repeat="idx in ::cal.months" md-auto-shrink md-item-size="' + ITEM_HEIGHT + '">' +
          '     <div mdc-datetime-picker-calendar-month idx="idx"></div>' +
          '</div>' +
          '</md-virtual-repeat-container>'
        };
      }])
    .directive('mdcDatetimePickerCalendarMonth', ['$compile',
      function ($compile) {
        var buildCalendarContent = function (element, scope) {
          var tbody = angular.element(element[0].querySelector('tbody'));
          var calendar = scope.cal, month = scope.month;

          var tbodyHtml = [];

          month.days.forEach(function (weekDays, i) {
            tbodyHtml.push('<tr>');
            weekDays.forEach(function (weekDay, j) {
              tbodyHtml.push('<td>');
              if (weekDay) {
                if (calendar.isInRange(weekDay)) {
                  //build a
                  var scopeRef = 'month[\'days\'][' + i + '][' + j + ']';

                  tbodyHtml.push('<a id="date-' + weekDay.format('YYYY-MM-DD') + '" href="#" mdc-dtp-noclick class="dtp-select-day" ng-class="{selected: cal.isSelectedDay(' + scopeRef + '), hilite: cal.isDateOfTheDay(' + scopeRef + ')}" ng-click="cal.selectDate(' + scopeRef + ')">');
                  tbodyHtml.push(weekDay.format('D'));
                  tbodyHtml.push('</a>');
                } else {
                  tbodyHtml.push('<span class="dtp-select-day">');
                  tbodyHtml.push(weekDay.format('D'));
                  tbodyHtml.push('</span>');
                }
              }
              tbodyHtml.push('</td>');
            });
            tbodyHtml.push('</tr>');
          });

          tbody.html(tbodyHtml.join(''));
          $compile(tbody)(scope);
        };

        return {
          scope: {
            idx: '='
          },
          require: '^mdcDatetimePickerCalendar',
          restrict: 'AE',
          template: 
            '<div class="dtp-picker-month">{{month.name}}</div>' +
            '<table class="table dtp-picker-days">' +
            '    <thead>' +
            '    <tr>' +
            '        <th ng-repeat="day in cal.week track by $index">{{cal.toDay(day)}}</th>' +
            '    </tr>' +
            '    </thead>' +
            '    <tbody>' +
            '    </tbody>' +
            '</table>',
          link: function (scope, element, attrs, calendar) {
            scope.cal = calendar;
            scope.month = calendar.getItemAtIndex(parseInt(scope.idx));
            buildCalendarContent(element, scope);
            scope.$watch(function () {
              return scope.idx;
            }, function (idx, oldIdx) {
              if (idx != oldIdx) {
                scope.month = calendar.getItemAtIndex(parseInt(scope.idx));
                buildCalendarContent(element, scope);
              }
            });
          }
        };
      }
    ])
  ;

  angular.module(moduleName)
    .directive('mdcDtpNoclick', function () {
      return {
        link: function (scope, el) {
          el.on('click', function (e) {
            e.preventDefault();
          });
        }
      };
    });
  angular.module(moduleName)
    .directive('mdcDatetimePickerClock', ['$timeout',
      function ($timeout) {

        var template = 
          '<div id="timePicker" class="dtp-picker-clock"><span ng-if="!points || points.length < 1">&nbsp;</span>' +
          '<div ng-repeat="point in points" class="dtp-picker-time noselect" ng-style="point.style">' +
          '   <a href="#" id="time-{{mode}}-{{point.display}}" mdc-dtp-noclick ng-class="{selected: point.value===currentValue}" class="dtp-select-hour" ng-click="setTime(point.value)" ng-if="pointAvailable(point)">{{point.display}}</a>' +
          '   <a href="#" mdc-dtp-noclick class="disabled dtp-select-hour" ng-if="!pointAvailable(point)">{{point.display}}</a>' +
          '</div>' +
          '<div ng-if="points24.length" ng-repeat="point24 in points24" class="dtp-picker-time noselect" ng-style="point24.style">' +
          '   <a href="#" id="time-24hours-{{point24.display}}" mdc-dtp-noclick ng-class="{selected: point24.value===currentValue}" class="dtp-select-hour" ng-click="setTime(point24.value)" ng-if="pointAvailable(point24)">{{point24.display}}</a>' +
          '   <a href="#" mdc-dtp-noclick class="disabled dtp-select-hour" ng-if="!pointAvailable(point24)">{{point24.display}}</a>' +
          '</div>' +
          '<div class="dtp-hand dtp-hour-hand"></div>' +
          '<div class="dtp-hand dtp-minute-hand"></div>' +
          '<div ng-if="picker.params.seconds" class="dtp-hand dtp-second-hand"></div>' +
          '<div class="dtp-clock-center"></div>' +
          '</div>';

        return {
          restrict: 'E',
          template: template,
          link: function (scope, element, attrs) {
            var minuteMode = attrs.mode === 'minutes';
            var secondMode = attrs.mode === 'seconds';
            var picker = scope.picker;
            //banking on the fact that there will only be one at a time
            var componentRoot = document.querySelector('md-dialog.dtp');

            var setTimeDegRay = function(deg, ray) {
              var val = 0;
              deg = deg >= 360 ? 0 : deg;
              if (deg !== 0) {
                var divider = minuteMode||secondMode ? 60 : 12;
                val = Math.round(divider / 360 * deg);
              }

              if (minuteMode) {
                var nearestMin = picker.params.minuteSteps;
                if (nearestMin < 1 || nearestMin > 59) nearestMin = 1;

                var minutes = (nearestMin * Math.round(val / nearestMin));
                if (minutes >= 60) {
                  minutes = 60 - nearestMin; //always push down
                }
                picker.currentDate.minute(minutes);
              } else if (!secondMode){
                if (val === 12) val = 0;
                if (!picker.params.shortTime) picker.meridien = ray > 84 ? 'AM' : 'PM';
                picker.currentDate.hour(picker.isPM() ? val + 12 : val);
              } else {
                if (val >= 60) val = 0;
                picker.currentDate.second(val);
              }
              
            };

            var isTouchSupported = ('ontouchstart' in window) ? true : false,
            EVENTS = {
              POINTER_DOWN : isTouchSupported ? 'touchstart' : 'mousedown',
              POINTER_UP   : isTouchSupported ? 'touchend'   : 'mouseup',
              POINTER_MOVE : isTouchSupported ? 'touchmove'  : 'mousemove'
            };

            var onMoveEvent = function(e) {
              e.preventDefault();

              var closestTarget = e.currentTarget.closest('div'),
              clientRect = closestTarget.getClientRects()[0];

              if (isTouchSupported) e = e.changedTouches[0];
              
              var x = ((closestTarget.offsetWidth / 2) - (e.pageX - clientRect.left)),
                  y = ((e.pageY - clientRect.top) - (closestTarget.offsetHeight / 2));
              
              var ray = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
              var deg = Math.round((Math.atan2(x, y) * (180 / Math.PI)));

              $timeout(function() {
                setTimeDegRay(deg+180, ray);
              });
            };

            element.on(EVENTS.POINTER_DOWN, function() {
               element.on(EVENTS.POINTER_MOVE, onMoveEvent);
            });

            element.on(EVENTS.POINTER_UP, function() {
                element.off(EVENTS.POINTER_MOVE);
            });

            scope.$on("$destroy", function() {
                element.off(EVENTS.POINTER_MOVE, onMoveEvent); 
            });

            var exec = function () {
              var clock = angular.element(element[0].querySelector('.dtp-picker-clock')),
                  pickerEl = angular.element(componentRoot.querySelector('.dtp-picker'));

              var w = componentRoot.querySelector('.dtp-content').offsetWidth;
              var pl = parseInt(css(pickerEl, 'paddingLeft').replace('px', '')) || 0;
              var pr = parseInt(css(pickerEl, 'paddingRight').replace('px', '')) || 0;
              var ml = parseInt(css(clock, 'marginLeft').replace('px', '')) || 0;
              var mr = parseInt(css(clock, 'marginRight').replace('px', '')) || 0;
              //set width
              var clockWidth = (w - (ml + mr + pl + pr));
              clock.css('width', (clockWidth) + 'px');

              var pL = parseInt(css(pickerEl, 'paddingLeft').replace('px', '')) || 0;
              var pT = parseInt(css(pickerEl, 'paddingTop').replace('px', '')) || 0;
              var mL = parseInt(css(clock, 'marginLeft').replace('px', '')) || 0;
              var mT = parseInt(css(clock, 'marginTop').replace('px', '')) || 0;

              var r = (clockWidth / 2);
              var j = r / 1.2; // radius for low number
   
              var points = [];

              for (var h = 0; h < 12; ++h) {
                var x = j * Math.sin(Math.PI * 2 * (h / 12));
                var y = j * Math.cos(Math.PI * 2 * (h / 12));
                var left = (r + x + pL / 2) - (pL + mL);
                var top = (r - y - mT / 2) - (pT + mT);

                var hour = {
                  left: left,
                  top: top,
                  value: (minuteMode||secondMode ? (h * 5) : h), //5 for minute 60/12
                  style: {'margin-left': left + 'px', 'margin-top': top + 'px'}
                };

                if (minuteMode || secondMode) {
                  hour.display = hour.value < 10 ? ('0' + hour.value) : hour.value;
                } else {
                  if (picker.params.shortTime) {
                    hour.display = (h === 0) ? 12 : h;
                  } else {
                    hour.display = h;
                  }
                }

                points.push(hour);
              }
              scope.points = points;

              if (!picker.params.shortTime && !minuteMode && !secondMode) {
                var points24 = [];

                var j24 = r / 1.8; // radius for high number
                for (var h24 = 12; h24 < 24; ++h24) {
                  var x24 = j24 * Math.sin(Math.PI * 2 * (h24 / 12));
                  var y24 = j24 * Math.cos(Math.PI * 2 * (h24 / 12));
                  var left24 = (r + x24 + pL / 2) - (pL + mL);
                  var top24 = (r - y24 - mT / 2) - (pT + mT);

                  var hour24 = {
                    left: left24,
                    top: top24,
                    value: h24,
                    style: {'margin-left': left24 + 'px', 'margin-top': top24 + 'px'}
                  };

                  hour24.display = h24;

                  points24.push(hour24);
                }
                scope.points24 = points24;
              }

              scope.mode = attrs.mode;
              setCurrentValue();
              clock.css('height', clockWidth + 'px');

              var clockCenter = element[0].querySelector('.dtp-clock-center');
              var centerWidth = (clockCenter.offsetWidth / 2) || 7.5,
                centerHeight = (clockCenter.offsetHeight / 2) || 7.5;
              var _hL = r / (picker.params.shortTime ? 1.8 : 2.3);
              var _mL = r / 1.4;
              var _sL = r / 1;

              angular.element(element[0].querySelector('.dtp-hour-hand')).css({
                left: r + (mL * 1.5) + 'px',
                height: _hL + 'px',
                marginTop: (r - _hL - pL) + 'px'
              }).addClass(!minuteMode && !secondMode ? 'on' : '');

              angular.element(element[0].querySelector('.dtp-minute-hand')).css
              ({
                left: r + (mL * 1.5) + 'px',
                height: _mL + 'px',
                marginTop: (r - _mL - pL) + 'px'
              }).addClass(minuteMode ? 'on' : '');

              angular.element(element[0].querySelector('.dtp-second-hand')).css
              ({
                left: r + (mL * 1.5) + 'px',
                height: _sL + 'px',
                marginTop: (r - _sL - pL) + 'px'
              }).addClass(secondMode ? 'on' : '');

              angular.element(clockCenter).css({
                left: (r + pL + mL - centerWidth) + 'px',
                marginTop: (r - (mL / 2)) - centerHeight + 'px'
              });
              animateHands();
            };

            var animateHands = function () {
              var _date = picker.currentNearestMinute();
              var h = _date.hour();
              var m = _date.minute();
              var s = _date.second();

              rotateElement(angular.element(element[0].querySelector('.dtp-hour-hand')), 30 * h);
              rotateElement(angular.element(element[0].querySelector('.dtp-minute-hand')), 6 * m);
              rotateElement(angular.element(element[0].querySelector('.dtp-second-hand')), 6 * s);
            };

            var rotateElement = function (el, deg) {
              angular.element(el).css({
                WebkitTransform: 'rotate(' + deg + 'deg)',
                '-moz-transform': 'rotate(' + deg + 'deg)',
                '-ms-transform': 'rotate(' + deg + 'deg)',
                'transform': 'rotate(' + deg + 'deg)'
              });
            };


            var setCurrentValue = function () {
              var date = picker.currentNearestMinute();
              var nbH = picker.params.shortTime ? 12 : 24;
              if (minuteMode) {
                scope.currentValue = date.minute();
              } else if (secondMode) {
                scope.currentValue = date.second();
              } else {
                scope.currentValue = date.hour() % nbH;
              }
            };

            scope.$watch(function () {
              var tmp = picker.currentNearestMinute();
              return tmp ? tmp.format('HH:mm:ss') : '';
            }, function () {
              setCurrentValue();
              animateHands();
            });

            scope.setTime = function (val) {
              if (!minuteMode && !secondMode) {
                if (val === scope.currentValue && !picker.params.autoOk) picker.ok(); // double click

                if (picker.params.shortTime) {
                  picker.currentDate.hour(picker.isPM() ? (val + 12) : val);
                } else {
                  picker.currentDate.hour(val);
                  if (val >= 12) picker.meridien = 'PM';
                  else picker.meridien = 'AM';
                }

                if (picker.params.autoOk) picker.ok(); // single click
              } else if (!secondMode) {
                if (val === scope.currentValue && !picker.params.seconds) {
                  picker.ok(); // double click
                }
                picker.currentDate.minute(val);
                if (!picker.params.seconds) {
                  picker.currentDate.second(0);
                } else if (picker.params.autoOk) picker.ok(); // single click
              } else {
                if (val === scope.currentValue) picker.ok(); // double click
                picker.currentDate.second(val);
              }
            };

            scope.pointAvailable = function (point) {
              if (minuteMode) {
                return picker.isMinuteAvailable(point.value);
              } else if (secondMode) {
                return picker.isSecondAvailable(point.value);
              } else {
                return picker.isHourAvailable(point.value);
              }
            };

            var unWatcher = scope.$watch(function () {
              return element[0].querySelectorAll('div').length;
            }, function () {
              exec();
              unWatcher();
            });
          }
        };
      }]);
    return moduleName;
  }

  var isElectron = window && window.process && window.process.type;
  if (typeof define === 'function' && define.amd) {
    define(['moment'], ngMaterialDatePicker);
  } else if (typeof module !== 'undefined' && module && module.exports && (typeof require === 'function') && !isElectron) {
    module.exports = ngMaterialDatePicker(require('moment'));
  } else {
    ngMaterialDatePicker((typeof global !== 'undefined' ? global : window).moment);
  }
})();
