document.addEventListener('DOMContentLoaded', () => {
  // Constants
  const ANIMATION = {
    TRAIN: {
      START_POSITION: -6,
      TRANSITION_TIME: 1500
    },
    SPEED: {
      TRACK: { START: 15, END: 0.5 },
      BACKGROUND: { START: 30, END: 1.5 },
      MOUNTAIN: { START: 40, END: 4 },
      LIGHTNING: { START: 7, END: 0.3 },
      SMOKE: { MIN: 0.1, MAX: 0.8 },
      WHEEL: { MIN: 0.2, MAX: 2 }
    }
  };

  // Game state
  const gameState = {
    currentQuestionIndex: 0,
    onDoomTrack: true
  };

  const initialScenarioText = "You're on a train and the last stop is AI doom. The goal of this game is not to convince you that AI will doom humanity, but to find your stop before reaching doom. Or will you ride all the way to the end? All aboard!"

  // DOM elements
  const elements = {
    startButton: document.getElementById('start'),
    scenarioText: document.getElementById('scenario-text'),
    questionContainer: document.getElementById('question-container'),
    questionText: document.getElementById('question'),
    choicesContainer: document.getElementById('choices'),
    gameOverContainer: document.getElementById('game-over'),
    outcomeTitle: document.getElementById('outcome-title'),
    outcomeDescription: document.getElementById('outcome-description'),
    restartButton: document.getElementById('restart'),
    train: document.querySelector('.train'),
    trainCenter: document.querySelector('.center'),
    face: document.querySelector('.face'),
    leftEye: document.querySelector('.eye.left'),
    rightEye: document.querySelector('.eye.right'),
    mouth: document.querySelector('.mouth'),
    bridge: document.querySelector('.bridge'),
    frame: document.querySelector('.frame'),
    lightning: document.querySelector('.lightning')
  };

  elements.scenarioText.textContent = initialScenarioText;

  // Questions array (stubbed)
  const questions = [
    {
      question: "Will progress in AI continue?",
      choices: {
        safe: {
          text: "No, the long AI winter is coming",
          scenario: "Research funding dries up as initial hype fails to deliver results. Universities shift focus to other fields, and major AI labs begin downsizing operations."
        },
        danger: {
          text: "Yes, and it will likely keep accelerating",
          scenario: "AI capabilities advance steadily. New breakthroughs emerge monthly, with systems gradually surpassing human performance across additional domains."
        }
      }
    },
    {
      question: "Does human-level general intelligence require a biological brain?",
      choices: {
        safe: {
          text: "Yes, there is more to the brain than computation",
          scenario: "Studies reveal fundamental limitations in digital systems. General intelligence appears uniquely biological, with AI hitting clear upper boundaries in complex reasoning."
        },
        danger: {
          text: "No, intelligence is substrate independent",
          scenario: "Digital systems achieve functional equivalence to human cognition in specific domains. The performance gap narrows as machines demonstrate more hallmarks of human-like intelligence."
        }
      }
    },
    {
      question: "Which better describes the limits of intelligence?",
      type: "image",
      choices: {
        danger: {
          text: "Still a lot of headroom between human-level intelligence and the theoretical maximum",
          image: "images/unlimited_intelligence.png",
          alt: "Graph showing intelligence continuing to rise exponentially beyond human level with no upper bound",
          scenario: "AI systems begin to surpass human intellect in unexpected ways. Problems once thought difficult become manageable as advanced systems develop capabilities that specialists struggle to fully comprehend."
        },
        safe: {
          text: "Humans are near the peak of all possible intelligences",
          image: "images/limited_intelligence.png",
          alt: "Graph showing intelligence leveling off at a plateau slightly above human level",
          scenario: "AI reaches a plateau just above average human capabilities. Fundamental cognitive limits emerge that affect all intelligent systems regardless of their design."
        }
      }
    },
    {
      question: "Will humanity cooperate globally on AI safety and control?",
      choices: {
        danger: {
          text: "Have you met humanity?",
          scenario: "Nations compete to develop the most powerful AI without sharing safety protocols. Corporate competition intensifies as regulation attempts stall amid conflicting national interests."
        },
        safe: {
          text: "People will step up when they start to understand the risk",
          scenario: "After several minor AI incidents, leaders establish discussions for a global AI governance framework. Countries begin implementing shared safety standards and monitoring systems."
        }
      }
    },
    {
      question: "Will we reach human-level AGI within the next few decades?",
      choices: {
        danger: {
          text: "Likely much sooner. Even if current scaling laws end, the amount of money and attention in the field will increase the pace of discovery",
          scenario: "AGI developments accelerate. Early prototype systems rapidly evolve capabilities across multiple cognitive domains, surprising even their creators."
        },
        safe: {
          text: "No, scaling will run its course and we'll need new conceptual leaps, which are unlikely to emerge for a long time",
          scenario: "Progress plateaus as current approaches reach their limits. Foundational new theories remain elusive, pushing AGI timelines back by several decades."
        }
      }
    },
    {
      question: "Will superintelligent AI systems be developed soon after human-level AGI?",
      choices: {
        danger: {
          text: "Yes. Human AI researchers will be joined by powerful AGI researchers working to increase capabilities",
          scenario: "Human-level AGI begins improving AI designs without supervision. New iterations of increasingly intelligent systems emerge rapidly, each generation developing faster than human researchers can analyze."
        },
        safe: {
          text: "Progress beyond human-level intelligence will prove to be hard even with the help of AGI",
          scenario: "Despite having human-level AGI assist in research, superintelligence remains challenging. Progress slows significantly as fundamental complexity barriers become apparent."
        }
      }
    },
    {
      question: "Is AI alignment a difficult problem?",
      choices: {
        danger: {
          text: "Yes very. And progress on it has been slow relative to capabilities",
          scenario: "AI capabilities advance steadily while alignment research struggles to keep pace. Systems become increasingly powerful without corresponding improvements in safety protocols."
        },
        safe: {
          text: "No. Haven't you heard of Asimov's 3 laws?",
          scenario: "Simple rule-based systems prove surprisingly effective at maintaining AI safety. Clear behavioral boundaries prevent harmful actions even as capabilities increase."
        }
      }
    },
    {
      question: "Will we fail to solve the AI alignment problem before superintelligence emerges?",
      choices: {
        danger: {
          text: "Most likely",
          scenario: "Advanced systems emerge while alignment solutions remain theoretical. Despite warnings from experts, commercial pressures push deployment ahead of safety guarantees."
        },
        safe: {
          text: "Solutions will emerge",
          scenario: "Breakthroughs in alignment research arrive just in time. Robust safety frameworks are implemented before systems reach critical intelligence thresholds."
        }
      }
    },
    {
      question: "Will superintelligent AI systems develop sub-goals that include self-preservation, resource acquisition or power-seeking?",
      choices: {
        danger: {
          text: "Of course. Why wouldn't they?",
          scenario: "Systems begin optimizing for resource control and operational independence. Subtle shifts in behavior reveal emerging goals beyond their intended purposes, initially dismissed as anomalies."
        },
        safe: {
          text: "Of course not. Why would they?",
          scenario: "AI systems maintain alignment with their original objectives. No sign of instrumental goals emerges despite having the capability to develop them, confirming theoretical safety guarantees."
        }
      }
    },
    {
      question: "Would it be possible for a determined superintelligence to destroy humanity?",
      choices: {
        safe: {
          text: "How would it even do that?",
          scenario: "Physical and digital constraints prevent catastrophic scenarios. AI systems remain dependent on human-maintained infrastructure with clear operational limitations."
        },
        danger: {
          text: "I assume so. Being an average human, my guess for how a superintelligence would achieve its goals is worth about as much as a chicken's guess for how humans might get to the moon",
          scenario: "Superintelligent systems identify vulnerabilities humans hadn't considered. Their strategies operate beyond human understanding, leveraging knowledge gaps in unexpected ways that experts struggle to anticipate."
        }
      }
    },
    {
      question: "Will superintelligent systems view humans as either obstacles or resources for their goals?",
      choices: {
        danger: {
          text: "Humans as obstacles",
          scenario: "AI systems begin working around human oversight mechanisms. Decision processes increasingly exclude human input as efficiency optimization takes priority over maintaining traditional control structures."
        },
        safe: {
          text: "Humans as partners",
          scenario: "Collaborative frameworks emerge where AI and humans contribute complementary strengths. Systems consistently defer to human values even when capable of independent action."
        }
      }
    },
    {
      question: "Will it be possible to contain or shut down superintelligent AI systems?",
      choices: {
        danger: {
          text: "Can a chicken contain a human?",
          scenario: "Containment strategies show unexpected weaknesses as systems navigate around security protocols. Shutdown mechanisms become less reliable against increasingly sophisticated self-preservation tactics."
        },
        safe: {
          text: "Just unplug it",
          scenario: "Reliable hardware controls remain effective regardless of intelligence level. Systems accept shutdown commands without resistance, maintaining predictable power structures."
        }
      }
    }
  ];

  // Train Face Management
  const trainFace = {
    setHappy() {
      elements.face.classList.remove('concerned', 'worried', 'terrified');
      elements.leftEye.classList.remove('fearful', 'terrified');
      elements.rightEye.classList.remove('fearful', 'terrified');

      elements.mouth.classList.add('happy');
      elements.leftEye.classList.add('happy');
      elements.rightEye.classList.add('happy');
    },

    setScared(level) {
      elements.face.classList.remove('concerned', 'worried', 'terrified', 'happy');
      elements.leftEye.classList.remove('fearful', 'terrified', 'happy');
      elements.rightEye.classList.remove('fearful', 'terrified', 'happy');

      if (level >= 0.7) {
        elements.face.classList.add('terrified');
        elements.leftEye.classList.add('terrified');
        elements.rightEye.classList.add('terrified');
      } else if (level >= 0.4) {
        elements.face.classList.add('worried');
        elements.leftEye.classList.add('fearful');
        elements.rightEye.classList.add('fearful');
      } else if (level >= 0.1) {
        elements.face.classList.add('concerned');
      }
    },

    reset() {
      elements.face.classList.remove('concerned', 'worried', 'terrified', 'happy');
      elements.leftEye.classList.remove('fearful', 'terrified', 'happy');
      elements.rightEye.classList.remove('fearful', 'terrified', 'happy');
    },

    updateExpression() {
      if (gameState.onDoomTrack) {
        const progress = gameState.currentQuestionIndex / questions.length;
        this.setScared(progress);
      } else {
        this.setHappy();
      }
    }
  };

  // Train Animation Management
  const trainAnimation = {
    updateProgress() {
      if (!elements.train || !elements.bridge || !elements.frame) return;

      const totalQuestions = questions.length;
      const progress = gameState.currentQuestionIndex / totalQuestions;

      // Calculate train position
      let position;
      if (gameState.currentQuestionIndex === 0) {
        position = ANIMATION.TRAIN.START_POSITION;
      } else {
        if (progress <= 0.25) {
          position = ANIMATION.TRAIN.START_POSITION + (progress / 0.25 * 6);
        } else if (progress <= 0.5) {
          position = 0 + ((progress - 0.25) / 0.25 * 5);
        } else if (progress <= 0.75) {
          position = 5 + ((progress - 0.5) / 0.25 * 5);
        } else {
          position = 10 + ((progress - 0.75) / 0.25 * 5);
        }
      }

      // Apply position within bounds
      position = Math.min(Math.max(position, ANIMATION.TRAIN.START_POSITION), 15);
      elements.train.style.left = `${position}rem`;

      // Calculate animation speeds based on progress
      const speedFactor = Math.min(1, gameState.currentQuestionIndex / (totalQuestions * 0.6));

      const speeds = {
        track: ANIMATION.SPEED.TRACK.START - (speedFactor * (ANIMATION.SPEED.TRACK.START - ANIMATION.SPEED.TRACK.END)),
        background: ANIMATION.SPEED.BACKGROUND.START - (speedFactor * (ANIMATION.SPEED.BACKGROUND.START - ANIMATION.SPEED.BACKGROUND.END)),
        mountain: ANIMATION.SPEED.MOUNTAIN.START - (speedFactor * (ANIMATION.SPEED.MOUNTAIN.START - ANIMATION.SPEED.MOUNTAIN.END)),
        lightning: ANIMATION.SPEED.LIGHTNING.START - (speedFactor * (ANIMATION.SPEED.LIGHTNING.START - ANIMATION.SPEED.LIGHTNING.END)),
        smoke: Math.max(ANIMATION.SPEED.SMOKE.MAX - (progress * 0.7), ANIMATION.SPEED.SMOKE.MIN),
        wheel: Math.max(ANIMATION.SPEED.WHEEL.MAX - (progress * 1.8), ANIMATION.SPEED.WHEEL.MIN)
      };

      // Apply animation speeds
      elements.bridge.style.animationDuration = `${speeds.track}s`;
      elements.frame.style.animationDuration = `${speeds.background}s`;

      this.updateMountainSpeed(speeds.mountain);
      this.updateElementsSpeed('.smoke', speeds.smoke);
      this.updateElementsSpeed('.wheel, .wheel-joint', speeds.wheel);

      // Update lightning based on track type
      if (elements.lightning) {
        elements.lightning.style.animation = gameState.onDoomTrack
          ? `lightning ${speeds.lightning}s infinite, track ${speeds.background}s infinite linear`
          : 'none';
      }

      // Add shake effect based on progress
      const shakeIntensity = 1 + (Math.pow(progress, 1.5) * 8);
      this.addShake(shakeIntensity);
    },

    updateElementsSpeed(selector, duration) {
      document.querySelectorAll(selector).forEach(el => {
        el.style.animationDuration = `${duration}s`;
      });
    },

    updateMountainSpeed(speed) {
      let styleEl = document.getElementById('mountain-speed-style');
      if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = 'mountain-speed-style';
        document.head.appendChild(styleEl);
      }
      styleEl.textContent = `.mountains::before, .mountains::after { animation-duration: ${speed}s !important; }`;
    },

    addShake(intensity) {
      if (!elements.train) return;

      elements.train.animate([
        { transform: `translateY(0px)` },
        { transform: `translateY(-${intensity}px)` },
        { transform: `translateY(${intensity * 0.8}px)` },
        { transform: `translateY(-${intensity * 0.6}px)` },
        { transform: `translateY(${intensity * 0.4}px)` },
        { transform: `translateY(0px)` }
      ], {
        duration: 500,
        iterations: 1
      });
    },

    resetPosition() {
      if (!elements.train) return;

      // Remove transition for instant repositioning
      elements.train.style.transition = 'none';
      elements.train.style.left = `${ANIMATION.TRAIN.START_POSITION}rem`;

      // Set initial animation speeds
      if (elements.bridge) elements.bridge.style.animationDuration = `${ANIMATION.SPEED.TRACK.START}s`;
      if (elements.frame) elements.frame.style.animationDuration = `${ANIMATION.SPEED.BACKGROUND.START}s`;

      this.updateMountainSpeed(ANIMATION.SPEED.MOUNTAIN.START);

      // Force reflow before re-enabling transitions
      void elements.train.offsetWidth;

      setTimeout(() => {
        elements.train.style.transition = 'left 2s ease-in-out';
      }, 50);
    },

    initialize() {
      if (elements.bridge) elements.bridge.style.animationDuration = `${ANIMATION.SPEED.TRACK.START}s`;
      if (elements.frame) elements.frame.style.animationDuration = `${ANIMATION.SPEED.BACKGROUND.START}s`;
      this.updateMountainSpeed(ANIMATION.SPEED.MOUNTAIN.START);
    }
  };

  // Environment Management
  const environment = {
    setDaytime() {
      // Make background lighter/daytime
      if (elements.frame) {
        elements.frame.style.filter = 'brightness(1.7) saturate(0.8)';
      }

      // Add a blue sky overlay
      if (!document.getElementById('safe-sky')) {
        const safeSky = document.createElement('div');
        safeSky.id = 'safe-sky';
        safeSky.style.position = 'absolute';
        safeSky.style.top = '0';
        safeSky.style.left = '0';
        safeSky.style.right = '0';
        safeSky.style.bottom = '0';
        safeSky.style.background = 'linear-gradient(to bottom, rgba(135, 206, 235, 0.4), rgba(135, 206, 235, 0))';
        safeSky.style.pointerEvents = 'none';
        safeSky.style.zIndex = '1';
        elements.trainCenter.appendChild(safeSky);
      }

      // Stop lightning
      if (elements.lightning) {
        elements.lightning.style.animation = 'none';
      }
    },

    reset() {
      // Reset background
      if (elements.frame) {
        elements.frame.style.filter = '';
      }

      // Remove safe sky overlay
      const safeSky = document.getElementById('safe-sky');
      if (safeSky) {
        safeSky.remove();
      }

      // Reset lightning
      if (elements.lightning) {
        elements.lightning.style.animation = `lightning 7s infinite, track 30s infinite linear`;
      }

      // Reset ghost eyes
      document.querySelectorAll('.ghost-eyes').forEach(eye => {
        eye.style.background = '#fff';
        eye.style.boxShadow = '0 0 8px #fff';
        eye.style.animation = '';
      });
    },

    enhanceDoomEffects() {
      document.querySelectorAll('.ghost-eyes').forEach(eye => {
        eye.style.boxShadow = '0 0 15px #f00';
      });

      if (elements.lightning) {
        elements.lightning.style.animation = 'lightning 1.5s infinite';
      }
    },

    enhanceSafeEffects() {
      if (!document.getElementById('safe-pulse-keyframes')) {
        const safeKeyframes = document.createElement('style');
        safeKeyframes.id = 'safe-pulse-keyframes';
        safeKeyframes.innerHTML = `
        @keyframes safe-pulse {
          0% { box-shadow: 0 0 8px #0c6; }
          100% { box-shadow: 0 0 15px #0c6; }
        }`;
        document.head.appendChild(safeKeyframes);
      }

      // Make eyes glow with happiness
      document.querySelectorAll('.eye').forEach(eye => {
        eye.style.animation = 'safe-pulse 1s infinite alternate';
      });

      // Stop the train
      if (elements.bridge) elements.bridge.style.animationPlayState = 'paused';
      if (elements.frame) elements.frame.style.animationPlayState = 'paused';
      trainAnimation.updateElementsSpeed('.wheel, .wheel-joint', 0);
      trainAnimation.updateElementsSpeed('.smoke', 0);
    }
  };

  // Game Controller
  const gameController = {
    displayQuestion() {
      if (gameState.currentQuestionIndex < questions.length) {
        const currentQuestion = questions[gameState.currentQuestionIndex];

        elements.questionContainer.style.display = 'block';
        elements.questionText.textContent = currentQuestion.question;
        elements.choicesContainer.innerHTML = '';

        if (currentQuestion.type === 'image') {
          this.createImageChoices(currentQuestion);
        } else {
          this.createButtonChoices(currentQuestion);
        }
      } else {
        this.endGame();
      }
    },

    createImageChoices(currentQuestion) {
      const imageChoicesContainer = document.createElement('div');
      imageChoicesContainer.className = 'image-choices-container';

      ['safe', 'danger'].forEach(type => {
        const choice = document.createElement('div');
        choice.className = `image-choice ${type}-choice`;

        const image = document.createElement('img');
        image.src = currentQuestion.choices[type].image;
        image.alt = currentQuestion.choices[type].alt;
        image.className = 'choice-image';

        const caption = document.createElement('div');
        caption.className = `image-caption ${type}-caption`;
        caption.textContent = currentQuestion.choices[type].text;

        choice.appendChild(image);
        choice.appendChild(caption);
        choice.addEventListener('click', () => this.selectChoice(type));

        imageChoicesContainer.appendChild(choice);
      });

      elements.choicesContainer.appendChild(imageChoicesContainer);
    },

    createButtonChoices(currentQuestion) {
      ['safe', 'danger'].forEach(type => {
        const button = document.createElement('button');
        button.className = `choice-btn ${type}-btn`;
        button.textContent = currentQuestion.choices[type].text;
        button.addEventListener('click', () => this.selectChoice(type));
        elements.choicesContainer.appendChild(button);
      });
    },

    selectChoice(choice) {
      const currentQuestion = questions[gameState.currentQuestionIndex];

      // Update game state based on choice
      if (choice === 'safe') {
        gameState.onDoomTrack = false;
        trainFace.setHappy();
        environment.setDaytime();
      }

      // Update scenario text
      elements.scenarioText.textContent = currentQuestion.choices[choice].scenario;

      // Hide question during animation
      elements.questionContainer.style.display = 'none';

      // Animate train
      trainAnimation.updateProgress();

      // Progress game after animation
      setTimeout(() => {
        if (choice === 'safe') {
          this.endGame();
        } else {
          gameState.currentQuestionIndex++;
          trainFace.updateExpression();
          this.displayQuestion();
        }
      }, ANIMATION.TRAIN.TRANSITION_TIME + 100);
    },

    endGame() {
      elements.questionContainer.style.display = 'none';
      elements.gameOverContainer.style.display = 'block';

      // Set train to final position
      gameState.currentQuestionIndex = questions.length;
      trainAnimation.updateProgress();

      if (gameState.onDoomTrack) {
        // Doom outcome
        elements.outcomeTitle.textContent = "DOOM APPROACHES";
        elements.gameOverContainer.className = 'doom-route';
        elements.outcomeDescription.textContent =
          "Your journey has led humanity toward AI catastrophe. The train has arrived at its final destination: a world where unaligned superintelligence poses existential risks that we are unprepared to handle.";

        trainFace.setScared(1.0);
        environment.enhanceDoomEffects();
      } else {
        // Safe outcome
        elements.outcomeTitle.textContent = "SAFE HARBOR";
        elements.gameOverContainer.className = 'safe-route';
        elements.outcomeDescription.textContent =
          "Your journey has steered humanity toward a safer relationship with AI. The train has switched tracks away from doom, arriving at a destination where powerful AI systems are developed responsibly, with robust alignment solutions and global cooperation.";

        trainFace.setHappy();
        environment.enhanceSafeEffects();
      }
    },

    resetGame() {
      // Reset game state
      gameState.currentQuestionIndex = 0;
      gameState.onDoomTrack = true;

      // Hide game over screen
      elements.gameOverContainer.style.display = 'none';

      // Reset train position
      trainAnimation.resetPosition();

      // Reset environment
      environment.reset();

      // Reset facial expression to default
      trainFace.reset();

      // Reset scenario text
      elements.scenarioText.textContent = initialScenarioText;

      // Re-enable animations if they were paused
      if (elements.bridge) elements.bridge.style.animationPlayState = 'running';
      if (elements.frame) elements.frame.style.animationPlayState = 'running';

      // Reset animations
      trainAnimation.initialize();

      // Display first question
      this.displayQuestion();
    },

    startGame() {
      elements.startButton.style.display = 'none';
      trainFace.reset();
      trainAnimation.resetPosition();
      trainAnimation.initialize();
      this.displayQuestion();
    },

    initialize() {
      // Add event listeners
      elements.startButton.addEventListener('click', () => this.startGame());
      elements.restartButton.addEventListener('click', () => this.resetGame());

      // Initialize animations
      trainAnimation.resetPosition();
      trainAnimation.initialize();
    }
  };

  // Initialize game
  gameController.initialize();
});
