'use strict';

var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф',
  'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц',
  'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)',
  'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

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
var buttonSubmit = setupWindow.querySelector('.setup-submit');

var onEscButtonClick = function (evt) {
  if ((evt.key === ESC_KEY) && (event.target.tagName !== 'INPUT')) {
    closeSetupWindow();
  }
};

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

var closeSetupWindow = function () {
  setupWindow.classList.add('hidden');
  document.removeEventListener('keydown', onEscButtonClick);
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

// У fireball backgroundColor почему то все преобразует к rgb. Как победить не нашел, пока пришлось выкручиваться так. !обсудить с наставником
function rgb2hex(rgb) {
  var rgbArr = rgb.match(/^rgb?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?\)/i);

  if (rgbArr && rgbArr.length === 4) {
    return '#' +
    ('0' + parseInt(rgbArr[1], 10).toString(16)).slice(-2) +
    ('0' + parseInt(rgbArr[2], 10).toString(16)).slice(-2) +
    ('0' + parseInt(rgbArr[3], 10).toString(16)).slice(-2);
  } else {
    return '';
  }
}

var changeElementColor = function (element, colors, colorProperty) {
  var currentColor = element.style[colorProperty];
  // чтобы если цвета в свойстве нет, менялось на второй цвет в массиве.
  var newIndex = 1;
  if (currentColor.length !== 0) {
    var currentColorIndex = colors.indexOf(currentColor);
    if ((currentColorIndex === -1) && (currentColor.indexOf('rgb') === 0)) {
      currentColorIndex = colors.indexOf(rgb2hex(currentColor));
    }
    newIndex = (currentColorIndex + 1) % colors.length;
  }
  element.style[colorProperty] = colors[newIndex];
};

var changeInputValue = function (input, value) {
  input.value = value;
};

var wizardCoat = setupWindow.querySelector('.wizard-coat');
var wizardCoatInput = setupWindow.querySelector('[name="coat-color"]');
wizardCoat.addEventListener('click', function () {
  changeElementColor(wizardCoat, COAT_COLORS, 'fill');
  changeInputValue(wizardCoatInput, wizardCoat.style.fill);
});

var wizardEyes = setupWindow.querySelector('.wizard-eyes');
var wizardEyesInput = setupWindow.querySelector('[name="eyes-color"]');
wizardEyes.addEventListener('click', function () {
  changeElementColor(wizardEyes, EYES_COLORS, 'fill');
  changeInputValue(wizardEyesInput, wizardEyes.style.fill);
});

var fireball = setupWindow.querySelector('.setup-fireball-wrap');
var fireballInput = setupWindow.querySelector('[name="eyes-color"]');
fireball.addEventListener('click', function () {
  changeElementColor(fireball, FIREBALL_COLORS, 'fireball-color');
  changeInputValue(fireballInput, rgb2hex(fireball.style.backgroundColor));
});
