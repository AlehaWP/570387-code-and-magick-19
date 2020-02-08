'use strict';

// general.js
(function () {
})();

// dataMockup.js
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

  var createWizardsList = function () {
    var resultArr = [];
    for (var i = 0; i < WIZARDS_QUANTITY; i++) {
      resultArr[i] = createWizard();
    }
    return resultArr;
  };

  window.dataMockup = {
    createWizardsList: createWizardsList,
    Colors: Colors
  };
})();

// wizards.js
(function () {
  var wizardTemplate = document.querySelector('#similar-wizard-template')
      .content.querySelector('.setup-similar-item');
  var createWizardElement = function (elementTemplate, objWizard) {
    elementTemplate.querySelector('.setup-similar-label').textContent = objWizard.name;
    elementTemplate.querySelector('.wizard-coat').style.fill = objWizard.coatColor;
    elementTemplate.querySelector('.wizard-eyes').style.fill = objWizard.eyesColor;
    return elementTemplate;
  };

  var createFragmentWithWizards = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < wizards.length; i++) {
      fragment.appendChild(createWizardElement(wizardTemplate.cloneNode(true), wizards[i]));
    }
    return fragment;
  };

  window.wizards = {
    createFragmentWithWizards: createFragmentWithWizards
  };
})();

// setupWindow.js
(function () {
})();

// page.js
(function () {
})();

var ENTER_KEY = 'Enter';
var ESC_KEY = 'Escape';


var wizardsList = window.dataMockup.createWizardsList();
var fragmentToAdd = window.wizards.createFragmentWithWizards(wizardsList);

var setupSimilar = document.querySelector('.setup-similar');
setupSimilar.classList.remove('hidden');

var similarList = setupSimilar.querySelector('.setup-similar-list');
similarList.appendChild(fragmentToAdd);


var setupWindow = document.querySelector('.setup');

var onEscButtonClick = function (evt) {
  if ((evt.key === ESC_KEY) && (event.target.tagName !== 'INPUT')) {
    closeSetupWindow();
  }
};

var Colors = window.dataMockup.Colors;

var counterColorIndex = function (limit) {
  var count = 0;
  return function () {
    count = ++count % limit;
    return count;
  };
};

var returnColorChangeMethod = function (element, inputName, colorsData, colorProperty) {
  var elementInput = setupWindow.querySelector('[name="' + inputName + '"]');
  var counter = counterColorIndex(colorsData.length);
  return function () {
    var colorIndex = counter();
    element.style[colorProperty] = colorsData[colorIndex];
    elementInput.value = colorsData[colorIndex];
  };
};

var wizardCoat = setupWindow.querySelector('.wizard-coat');
var wizardEyes = setupWindow.querySelector('.wizard-eyes');
var fireball = setupWindow.querySelector('.setup-fireball-wrap');
var onWizardCoatClick = returnColorChangeMethod(wizardCoat, 'coat-color', Colors.COAT, 'fill');
var onWizardEyesClick = returnColorChangeMethod(wizardEyes, 'eyes-color', Colors.EYES, 'fill');
var onFireballClick = returnColorChangeMethod(fireball, 'fireball-color', Colors.FIREBALL, 'background');

var openSetupWindow = function () {
  setupWindow.classList.remove('hidden');
  document.addEventListener('keydown', onEscButtonClick);
  wizardCoat.addEventListener('click', onWizardCoatClick);
  wizardEyes.addEventListener('click', onWizardEyesClick);
  fireball.addEventListener('click', onFireballClick);
};

var buttonSetupOpen = document.querySelector('.setup-open-icon');
buttonSetupOpen.addEventListener('click', function () {
  openSetupWindow();
});

buttonSetupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openSetupWindow();
  }
});

var closeSetupWindow = function () {
  setupWindow.classList.add('hidden');
  document.removeEventListener('keydown', onEscButtonClick);
  wizardCoat.removeEventListener('click', onWizardCoatClick);
  wizardEyes.removeEventListener('click', onWizardEyesClick);
  fireball.removeEventListener('click', onFireballClick);
};

var buttonCloseSetup = setupWindow.querySelector('.setup-close');
buttonCloseSetup.addEventListener('click', function () {
  closeSetupWindow();
});

buttonCloseSetup.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closeSetupWindow();
  }
});
