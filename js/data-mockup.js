'use strict';

(function () {
  var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф',
    'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц',
    'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  var Colors = {
    COAT: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)',
      'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    EYES: ['black', 'red', 'blue', 'yellow', 'green'],
    FIREBALL: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
  };

  var WIZARDS_QUANTITY = 4;

  var returnRandomElement = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  var createWizard = function () {
    return {
      name: returnRandomElement(FIRST_NAMES) + ' ' + returnRandomElement(SURNAMES),
      coatColor: returnRandomElement(Colors.COAT),
      eyesColor: returnRandomElement(Colors.EYES)
    };
  };

  var returnWizardsList = function () {
    var resultArr = [];
    for (var i = 0; i < WIZARDS_QUANTITY; i++) {
      resultArr[i] = createWizard();
    }
    return resultArr;
  };

  window.dataMockup = {
    wizardsList: returnWizardsList(),
    Colors: Colors
  };
})();
