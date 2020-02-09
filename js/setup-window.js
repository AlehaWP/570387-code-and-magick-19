'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';

  var wizardsList = window.dataMockup.createWizardsList();
  var fragmentToAdd = window.wizards.returnFragmentWithWizards(wizardsList);

  var setupSimilar = document.querySelector('.setup-similar');
  setupSimilar.classList.remove('hidden');

  var similarList = setupSimilar.querySelector('.setup-similar-list');
  similarList.appendChild(fragmentToAdd);


  var setupWindow = document.querySelector('.setup');
  var setupWindowDefaultCoordinates;

  window.moveElement(setupWindow.querySelector('.upload'), setupWindow);

  var onEscButtonClick = function (evt) {
    if ((evt.key === ESC_KEY) && (event.target.tagName !== 'INPUT')) {
      closeSetupWindow();
    }
  };


  var Colors = window.dataMockup.Colors;
  var wizardCoat = setupWindow.querySelector('.wizard-coat');
  var wizardCoatInput = setupWindow.querySelector('[name="coat-color"]');
  var wizardEyes = setupWindow.querySelector('.wizard-eyes');
  var wizardEyesInput = setupWindow.querySelector('[name="eyes-color"]');
  var fireball = setupWindow.querySelector('.setup-fireball-wrap');
  var fireballInput = setupWindow.querySelector('[name="fireball-color"]');
  var onWizardCoatClick = window.changeProperty(wizardCoat, Colors.COAT, 'fill', wizardCoatInput);
  var onWizardEyesClick = window.changeProperty(wizardEyes, Colors.EYES, 'fill', wizardEyesInput);
  var onFireballClick = window.changeProperty(fireball, Colors.FIREBALL, 'background', fireballInput);

  var openSetupWindow = function () {
    setupWindow.classList.remove('hidden');
    document.addEventListener('keydown', onEscButtonClick);
    wizardCoat.addEventListener('click', onWizardCoatClick);
    wizardEyes.addEventListener('click', onWizardEyesClick);
    fireball.addEventListener('click', onFireballClick);
    if (!setupWindowDefaultCoordinates) {
      setupWindowDefaultCoordinates = {
        x: setupWindow.style.left,
        y: setupWindow.style.top
      };
    } else {
      setupWindow.style.left = setupWindowDefaultCoordinates.x;
      setupWindow.style.top = setupWindowDefaultCoordinates.y;
    }
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
})();
