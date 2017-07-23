/**
 * Created by intelWorx on 11/11/2015.
 */
(function () {
  'use strict';
  angular.module('mdDatetimePickerDemo', [
    'ngMaterialDatePicker',
    'pascalprecht.translate'
  ])
    .config(function($translateProvider) {
      $translateProvider.translations('en', {
        CANCEL: "Cancel",
        TODAY: "Today",
      });
      $translateProvider.translations('fr', {
        CANCEL: "Annuler",
        TODAY: "Aujourd'hui",
      });
      $translateProvider.preferredLanguage('en');
		  $translateProvider.useSanitizeValueStrategy('sceParameters');
    })
    .controller('DemoCtrl', function ($scope, mdcDateTimeDialog, $translate) {
      $scope.date = moment().startOf('day');
      $scope.dateLang = new Date();
      $scope.time = new Date();
      $scope.dateTime = new Date();
     
      // current date + 1 hour, no minutes, no seconds, no milliseconds
      var newDate = new Date();
      newDate.setHours(newDate.getHours() +1);
      newDate.setMinutes(0);
      newDate.setSeconds(0);
      newDate.setMilliseconds(0);
      $scope.dateTimeNoMin = newDate;

      $scope.minDate = moment().subtract(3, 'year');
      $scope.maxDate = moment().add(3, 'year');
      $scope.dates = [new Date('2017-11-14T00:00:00'), new Date('2017-11-15T00:00:00'),
        new Date('2017-11-30T00:00:00'), new Date('2017-12-12T00:00:00'), new Date('2017-12-13T00:00:00'),
        new Date('2017-12-31T00:00:00')];

      $scope.langs = [{'value': 'en', 'label': 'English'},{'value': 'fr', 'label': 'Français'}];

      $scope.displayDialog = function () {
        mdcDateTimeDialog.show({
          currentDate: moment().startOf('day'),
          maxDate: $scope.maxDate,
          showTodaysDate: '',
          time: true,
          clickOutsideToClose: true
        })
          .then(function (date) {
            $scope.selectedDateTime = date;
            console.log('New Date / Time selected:', date);
          }, function(){});
      };

      $scope.displayDialogEdit = function () {
        mdcDateTimeDialog.show({
          currentDate: $scope.dateTimeEdit || moment().startOf('day'),
          maxDate: $scope.maxDate,
          showTodaysDate: '',
          time: true
        })
          .then(function (date) {
            $scope.dateTimeEdit = date;
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
      };

    })

    .directive('exSourceCode', function () {
      return {
        template: '<h4>{{title}}</h4><pre  hljs class="html"><code>{{sourceCode}}</code></pre>',
        scope: {},
        link: function (scope, element, attrs) {
          var tmp = angular.element((element.parent()[0]).querySelector(attrs.target || 'md-input-container'));
          if (tmp.length) {
            scope.title = attrs.title || "Source Code";
            var sourceCode = tmp[0].outerHTML
                .replace('ng-model=', 'angularModel=')
                .replace('ng-click=', 'angularClick=')
                .replace(/ng-[a-z\-]+/g, '')
                .replace(/ +/g, ' ')
                .replace('angularModel=', 'ng-model=')
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