'use strict';

var showElement = function (selector) {
  var element = document.querySelector(selector);

  element.classList.remove('hidden');
  return element;
};

var returnRandomIndex = function (arrLength = 10) {
  return Math.floor(Math.random() * arrLength)
}

var createWizard = function () {
  var firstNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф',
                    'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var surNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц',
                  'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)',
                    'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
  return {
    name: firstNames[returnRandomIndex(firstNames.length)] + ' ' + surNames[returnRandomIndex(surNames.length)],
    coatColor: coatColors[returnRandomIndex(coatColors.length)],
    eyesColor: eyesColors[returnRandomIndex(eyesColors.length)]
  }
}

var createWizardsArr = function (quantity) {
  var resultArr = [];
  for (var i = 0; i < quantity; i++) {
    resultArr[i] = createWizard();
  }
  return resultArr;
}

var createWizardElement = function (elementTemplate, objWizard) {
  elementTemplate.querySelector('.setup-similar-label').textContent = objWizard.name;
  elementTemplate.querySelector('.wizard-coat').style.fill = objWizard.coatColor;
  elementTemplate.querySelector('.wizard-eyes').style.fill = objWizard.eyesColor;
  return elementTemplate;
}

var wizarsdsQuantity = 4;
var setupWindow = showElement('.setup');
var similarList = setupWindow.querySelector('.setup-similar-list');

var wizardTemplate = document.querySelector('#similar-wizard-template')
    .content.querySelector('.setup-similar-item');

var wizards = createWizardsArr(wizarsdsQuantity);

var fragment = document.createDocumentFragment()
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(createWizardElement(wizardTemplate.cloneNode(true), wizards[i]));
}
similarList.appendChild(fragment);

showElement('.setup-similar');
