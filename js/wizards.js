'use strict';

(function () {
  var wizardTemplate = document.querySelector('#similar-wizard-template')
      .content.querySelector('.setup-similar-item');
  var createWizardElement = function (elementTemplate, objWizard) {
    elementTemplate.querySelector('.setup-similar-label').textContent = objWizard.name;
    elementTemplate.querySelector('.wizard-coat').style.fill = objWizard.coatColor;
    elementTemplate.querySelector('.wizard-eyes').style.fill = objWizard.eyesColor;
    return elementTemplate;
  };

  var returnFragmentWithWizards = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < wizards.length; i++) {
      fragment.appendChild(createWizardElement(wizardTemplate.cloneNode(true), wizards[i]));
    }
    return fragment;
  };

  window.wizards = {
    returnFragmentWith: returnFragmentWithWizards
  };
})();
