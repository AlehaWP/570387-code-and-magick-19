'use strict';

var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф',
  'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц',
  'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)',
  'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var WIZARDS_QUANTITY = 4;

var ENTER_KEY = 'Enter';
var ESC_KEY = 'Escape';

var returnRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var createWizard = function () {
  return {
    name: returnRandomElement(FIRST_NAMES) + ' ' + returnRandomElement(SURNAMES),
    coatColor: returnRandomElement(COAT_COLORS),
    eyesColor: returnRandomElement(EYES_COLORS)
  };
};

var createWizardsList = function (quantity) {
  var resultArr = [];
  for (var i = 0; i < quantity; i++) {
    resultArr[i] = createWizard();
  }
  return resultArr;
};

var createWizardElement = function (elementTemplate, objWizard) {
  elementTemplate.querySelector('.setup-similar-label').textContent = objWizard.name;
  elementTemplate.querySelector('.wizard-coat').style.fill = objWizard.coatColor;
  elementTemplate.querySelector('.wizard-eyes').style.fill = objWizard.eyesColor;
  return elementTemplate;
};

var createFragmentWithWizards = function (wizardTemplate, wizards) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(createWizardElement(wizardTemplate.cloneNode(true), wizards[i]));
  }
  return fragment;
};

var wizards = createWizardsList(WIZARDS_QUANTITY);
var wizardTemplate = document.querySelector('#similar-wizard-template')
    .content.querySelector('.setup-similar-item');
var fragmentToAdd = createFragmentWithWizards(wizardTemplate, wizards);

var setupSimilar = document.querySelector('.setup-similar');
setupSimilar.classList.remove('hidden');

var similarList = setupSimilar.querySelector('.setup-similar-list');
similarList.appendChild(fragmentToAdd);


var setupWindow = document.querySelector('.setup');

var openSetupWindow = function () {
  setupWindow.classList.remove('hidden');
  document.addEventListener('keydown', onEscButtonClick);
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

setupWindow.querySelector('.setup-user-name').addEventListener('keydown', function (evt) {
  evt.stopPropagation();
  setupWindow.querySelector('.setup-submit').focus();
});

var closeSetupWindow = function () {
  setupWindow.classList.add('hidden');
  document.removeEventListener('keydown', onEscButtonClick);
};

var buttonCloseSetup = setupWindow.querySelector('.setup-close');
var onButtonCloseSetup = function () {
  closeSetupWindow();
};
buttonCloseSetup.addEventListener('click', onButtonCloseSetup);

var onEscButtonClick = function (evt) {
  if (evt.key === ESC_KEY) {
    closeSetupWindow();
  }
};
