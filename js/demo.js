(function () {
  'use strict';
  angular.module('mdDatetimePickerDemo', [
    'ngMaterialDatePicker',
    'pascalprecht.translate',
    'ngMessages'
  ])
    .config(function($translateProvider) {
      $translateProvider.translations('en', {
        CANCEL: "Cancel",
        TODAY: "Today",
        INSTRUCTION: "You can double click or double tap to make selections.",
      });
      $translateProvider.translations('fr', {
        CANCEL: "Annuler",
        TODAY: "Aujourd'hui",
        INSTRUCTION: "Vous pouvez double-cliquer ou appuyer deux fois pour effectuer des sélections.",
      });
      $translateProvider.preferredLanguage('en');
      $translateProvider.useSanitizeValueStrategy('sceParameters');
    })
    .run(['$templateCache', function($templateCache) {
        $templateCache.put(
          'customTemplate.html',
          '<md-dialog class="dtp" layout="column" aria-label="date time picker dialog">' +
          '    <md-dialog-content class="dtp-content">' +
          '        <div class="dtp-date-view">' +
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
          '</md-dialog>'
        );
    }])
    .controller('DemoCtrl', function ($scope, mdcDateTimeDialog, $translate, mdcDefaultParams) {
      $scope.date = moment().startOf('day');
      $scope.dateLang = new Date();
      $scope.time = new Date();
      $scope.timeutc = moment.utc();
      $scope.dateTime = new Date();
      $scope.dateTimeEdit = new Date();
      $scope.timez = moment.utc();
      $scope.timeEdit = new Date();
     
      // current date + 1 hour, no minutes, no seconds, no milliseconds
      var newDate = new Date();
      newDate.setHours(newDate.getHours() +1, 0, 0, 0);
      $scope.dateTimeNoMin = newDate;

      $scope.minDate = moment().subtract(6, 'year');
      $scope.minDateNow = moment();
      $scope.maxDateNow = moment();
      $scope.maxDate = moment().add(6, 'year');
      $scope.dates = [new Date('2018-11-14T00:00:00'), new Date('2018-11-15T00:00:00'),
        new Date('2018-11-30T00:00:00'), new Date('2018-12-12T00:00:00'), new Date('2018-12-13T00:00:00'),
        new Date('2018-12-31T00:00:00')];

      $scope.langs = [{'value': 'en', 'label': 'English'},{'value': 'fr', 'label': 'Français'}];

      $scope.displayDialog = function(event) {
        mdcDateTimeDialog.show({
          currentDate: moment().startOf('day'),
          maxDate: $scope.maxDate,
          showTodaysDate: true,
          time: true,
          clickOutsideToClose: true,
          targetEvent: event,
          openFrom: angular.element(document.querySelector('#pickerbutton')),
          closeTo: angular.element(document.querySelector('#pickerbutton'))
        }).then(function (date) {
          $scope.selectedDateTime = date;
          console.log('New Date / Time selected:', date);
        }, function(){});
      };

      // Set and change the text direction
      $scope.txtdir = document.documentElement.dir || 'ltr';
      $scope.changeDir = function () {
        $scope.txtdir = document.documentElement.dir = ($scope.txtdir === 'rtl') ? 'ltr' : 'rtl';
      };

      $scope.changeLanguage = function() {
        $translate.use($scope.selectedLang);
        moment.locale($scope.selectedLang);
        mdcDefaultParams({
          lang: $scope.selectedLang,
          cancelText: $translate.instant('CANCEL'),
          todayText: $translate.instant('TODAY')
        });
      };

      $scope.change = function() {
        console.log("changed");
      };

    })

    .directive('exSourceCode', function () {
      return {
        template: '<h4>{{title}}</h4><pre hljs class="html"><code>{{sourceCode}}</code></pre>',
        scope: {},
        link: function (scope, element, attrs) {
          var tmp = angular.element((element.parent()[0]).querySelector(attrs.target || 'md-input-container'));
          if (tmp.length) {
            scope.title = attrs.title || "Source Code";
            var sourceCode = tmp[0].outerHTML
                .replace('ng-model=', 'angularModel=')
                .replace('ng-model-options=', 'angularModelOptions=')
                .replace('ng-click=', 'angularClick=')
                .replace(/ng-[a-z\-]+/g, '')
                .replace(/ +/g, ' ')
                .replace('angularModel=', 'ng-model=')
                .replace('angularModelOptions=', 'ng-model-options=')
                .replace('angularClick=', 'ng-click=');

            scope.sourceCode = style_html(sourceCode, {
              'indent_size': 2,
              'indent_char': ' ',
              'max_char': 78,
              'brace_style': 'expand'
            });
          }
        }
      };
    })
    .directive('hljs', function ($timeout) {
      return {
        link: function (scope, element) {
          $timeout(function () {
            hljs.highlightBlock(element[0].querySelector('code'));
          }, 100);
        }
      };
    })
  ;
})();