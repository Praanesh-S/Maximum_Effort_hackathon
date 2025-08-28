document.addEventListener('DOMContentLoaded', () => {

  // --- Draw text on our canvases ---
  const canvas = document.getElementById('button-text-canvas');
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'white';
  ctx.font = 'bold 48px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('I feel anxious', canvas.width / 2, canvas.height / 2);

  const nextLevelCanvas = document.getElementById('next-level-canvas');
  const nextLevelCtx = nextLevelCanvas.getContext('2d');
  nextLevelCtx.fillStyle = 'white';
  nextLevelCtx.font = 'bold 48px Arial';
  nextLevelCtx.textAlign = 'center';
  nextLevelCtx.textBaseline = 'middle';
  nextLevelCtx.fillText('Next Level', nextLevelCanvas.width / 2, nextLevelCanvas.height / 2);

  // NEW: Draw text for the reset button
  const resetCanvas = document.getElementById('reset-canvas');
  const resetCtx = resetCanvas.getContext('2d');
  resetCtx.fillStyle = 'white';
  resetCtx.font = 'bold 48px Arial';
  resetCtx.textAlign = 'center';
  resetCtx.textBaseline = 'middle';
  resetCtx.fillText('Go Back', resetCanvas.width / 2, resetCanvas.height / 2);


  // --- Get all our HTML elements ---
  const anxietyButton = document.querySelector('#anxiety-button');
  const breathingSphere = document.querySelector('#breathing-sphere');
  const breathingText = document.querySelector('#breathing-text');
  const anxietyDisplay = document.querySelector('#anxiety-display');
  const easyAudience = document.querySelector('#audience-easy');
  const hardAudience = document.querySelector('#audience-hard');
  const nextLevelButton = document.querySelector('#next-level-button');
  const resetButton = document.querySelector('#reset-button'); // NEW: Get the reset button

  let anxietyLevel = 0;
  const ANXIETY_THRESHOLD = 3;

  anxietyButton.addEventListener('click', () => {
    anxietyLevel++;
    anxietyDisplay.setAttribute('value', `Anxiety Level: ${anxietyLevel}`);
    if (anxietyLevel >= ANXIETY_THRESHOLD) {
      startBreathingExercise();
    }
  });

  nextLevelButton.addEventListener('click', () => {
    easyAudience.setAttribute('visible', 'false');
    hardAudience.setAttribute('visible', 'true');
    nextLevelButton.setAttribute('visible', 'false');
    anxietyButton.setAttribute('visible', 'true');
    resetButton.setAttribute('visible', 'true'); // NEW: Show the reset button
    anxietyLevel = 0;
    anxietyDisplay.setAttribute('value', `Anxiety Level: ${anxietyLevel}`);
  });

  // NEW: Add a click listener for the reset button
  resetButton.addEventListener('click', () => {
    hardAudience.setAttribute('visible', 'false');
    easyAudience.setAttribute('visible', 'true');
    resetButton.setAttribute('visible', 'false');
    anxietyLevel = 0;
    anxietyDisplay.setAttribute('value', `Anxiety Level: ${anxietyLevel}`);
  });

  function startBreathingExercise() {
    anxietyButton.setAttribute('visible', 'false');
    resetButton.setAttribute('visible', 'false'); // NEW: Hide reset button during exercise
    breathingSphere.setAttribute('visible', 'true');
    breathingText.setAttribute('visible', 'true');

    breathingText.setAttribute('value', 'Breathe In...');
    breathingSphere.setAttribute('animation', { property: 'scale', to: '2 2 2', dur: 4000, easing: 'linear' });

    setTimeout(() => { breathingText.setAttribute('value', 'Hold...'); }, 4000);

    setTimeout(() => {
      breathingText.setAttribute('value', 'Breathe Out...');
      breathingSphere.setAttribute('animation', { property: 'scale', to: '1 1 1', dur: 6000, easing: 'linear' });
    }, 7000);

    setTimeout(() => {
      breathingSphere.setAttribute('visible', 'false');
      breathingText.setAttribute('visible', 'false');

      // Only show the "Next Level" button if we are on the easy level
      if (easyAudience.getAttribute('visible')) {
        nextLevelButton.setAttribute('visible', 'true');
      } else {
        anxietyButton.setAttribute('visible', 'true');
        resetButton.setAttribute('visible', 'true');
      }

      anxietyLevel = 0;
      anxietyDisplay.setAttribute('value', `Anxiety Level: ${anxietyLevel}`);
    }, 13000);
  }
});
