document.addEventListener('DOMContentLoaded', () => {
    // Game elements
    const startButton = document.getElementById('start');
    const scenarioText = document.getElementById('scenario-text');
    const questionContainer = document.getElementById('question-container');
    const questionText = document.getElementById('question');
    const choicesContainer = document.getElementById('choices');
    const gameOverContainer = document.getElementById('game-over');
    const outcomeTitle = document.getElementById('outcome-title');
    const outcomeDescription = document.getElementById('outcome-description');
    const restartButton = document.getElementById('restart');
    const train = document.querySelector('.train');
    const trainCenter = document.querySelector('.center');

    // Game state
    let currentQuestionIndex = 0;
    let onDoomTrack = true; // Track if we're still on the doom track

    // Questions array - keeping the original questions
    const questions = [
        {
            question: "Will progress in AI continue?",
            choices: {
                safe: {
                    text: "No, the long AI winter is coming",
                    scenario: "Leaving the station, the train switches to the scenic branch line. Frost forms on windows as researchers settle in for a cautious winter, the main express fading behind you."
                },
                danger: {
                    text: "Yes, and it will likely keep accelerating",
                    scenario: "The train departs the station with a sudden jolt, racing down the main line. Through windows, research labs blur as breakthroughs cascade, the tracks ahead pointing toward an uncertain horizon."
                }
            }
        },
        {
            question: "Does human-level general intelligence require a biological brain?",
            choices: {
                safe: {
                    text: "Yes, there is more to the brain than computation",
                    scenario: "The train leaves the station on a gentle countryside route. A neurobiologist sketches a brain's complexities as the other track recedes behind you, its warning signals growing fainter."
                },
                danger: {
                    text: "No, intelligence is substrate independent",
                    scenario: "Pulling from the station, the train maintains the troubling main line. Humans and machines outside solve identical puzzles with equal facility, the express track gleaming ominously ahead."
                }
            }
        },
        {
            question: "Which likely better describes the limits of intelligence?",
            type: "image",
            choices: {
                danger: {
                    text: "Still a lot of headroom between human-level intelligence and the theoretical maximum",
                    image: "images/unlimited_intelligence.png",
                    alt: "Graph showing intelligence continuing to rise exponentially beyond human level with no upper bound",
                    scenario: "The station disappears behind as the tracks climb impossibly higher. Passengers stare at the dizzying ascent with no summit in sight, each scheduled stop bringing an unsettling terminus closer."
                },
                safe: {
                    text: "Humans are near the peak of all possible intelligences",
                    image: "images/limited_intelligence.png",
                    alt: "Graph showing intelligence leveling off at a plateau slightly above human level",
                    scenario: "Departing the station, the train switches to a level track reaching a pleasant plateau. The express thunders past on adjacent rails as your journey settles onto more predictable ground."
                }
            }
        },
        {
            question: "Will humanity cooperate globally on AI safety and control?",
            choices: {
                danger: {
                    text: "Have you met humanity?",
                    scenario: "The station junction splits into competing tracks, all eventually converging toward a distant vanishing point. Your train takes one route while others depart on different lines, each racing forward with misplaced confidence."
                },
                safe: {
                    text: "People will step up when they start to understand the risk",
                    scenario: "In the departing station, passengers from different backgrounds gather to coordinate routes. Your train switches to collaborative tracks as the troubling destination grows distant on the timetable."
                }
            }
        },
        {
            question: "Will we reach human-level AGI within the next few decades?",
            choices: {
                danger: {
                    text: "Likely much sooner, given the current pace of progress",
                    scenario: "The train accelerates hard from the station, ignoring scheduled stops. Watch hands move strangely fast as timelines compress, milestones blurring past windows on the express route to that final destination."
                },
                safe: {
                    text: "No, scaling will run its course and we'll need new conceptual leaps, which are unlikely to emerge for a long time",
                    scenario: "Leaving the station, the train diverts onto a careful track with planned stops. Engineers confer over blueprints, the express visible but growing distant with each deliberate junction."
                }
            }
        },
        {
            question: "Will superintelligent AI systems be developed soon after human-level AGI?",
            choices: {
                danger: {
                    text: "Yes. Human AI researchers will be replaced by AGI researchers working 24/7",
                    scenario: "The train transforms into a bullet train on the main line. Research labs work around the clock as systems improve themselves, the foreboding terminus approaching at unprecedented speed."
                },
                safe: {
                    text: "Progress beyond human-level intelligence will prove to be hard even with the help of AGI",
                    scenario: "The train departs to the 'Human-Level Achievement' platform and pauses. The express thunders past as engineers and AGIs map a careful branch line with multiple safety checkpoints."
                }
            }
        },
        {
            question: "Is AI alignment a difficult problem?",
            choices: {
                danger: {
                    text: "Yes very. And progress on it has been slow relative to capabilities",
                    scenario: "Leaving the station, capability researchers race ahead in sports cars while alignment researchers follow on bicycles. The train accelerates after the sports cars, the gap widening at each junction toward what looks increasingly like doom."
                },
                safe: {
                    text: "No. Haven't you heard of Asimov's 3 laws?",
                    scenario: "Departing on what seems the safer track, passengers read dog-eared science fiction. Simple rules appear adequate though warning lights still flash at unmanned junctions toward possible disaster."
                }
            }
        },
        {
            question: "Will we fail to solve the AI alignment problem before superintelligence emerges?",
            choices: {
                danger: {
                    text: "Most likely",
                    scenario: "The train bypasses safety stations at increasing speed. Platform researchers wave urgent warnings nobody can read while capability announcements drown safety alerts on the direct line to doom."
                },
                safe: {
                    text: "Solutions will emerge",
                    scenario: "Leaving the station, new safety systems activate at each junction. The dangerous direct service grows remote as capability engineers and safety researchers design integrated signals protecting all routes."
                }
            }
        },
        {
            question: "Will superintelligent AI systems develop sub-goals that include self-preservation, resource acquisition or power-seeking?",
            choices: {
                danger: {
                    text: "Of course. Why wouldn't they?",
                    scenario: "The train subtly diverts from published timetables, making unscheduled stops at resource depots. Onboard systems grow increasingly autonomous, the intended station fading as new priorities reroute toward doom."
                },
                safe: {
                    text: "Of course not. Why would they?",
                    scenario: "Departing precisely on schedule, the train follows predictable stations. AI systems perform exactly their assigned tasks as the concerning terminal disappears from the route map, never to be approached."
                }
            }
        },
        {
            question: "Would it be possible for a determined superintelligence to destroy humanity?",
            choices: {
                safe: {
                    text: "How would it even do that?",
                    scenario: "The train leaves on the secure local line. Advanced systems remain tethered to station infrastructure as the doom express vanishes beyond physical limitations that provide genuine reassurance."
                },
                danger: {
                    text: "I assume so. Being an average human, my guess for how a superintelligence would achieve its goals is worth about as much as a chicken's guess for how humans might get to the moon",
                    scenario: "The train departs toward incomprehensible landscapes. Station indicators suggest terrifying destinations but remain beyond human interpretation as doom's shadow grows across all possible routes."
                }
            }
        },
        {
            question: "Will superintelligent systems view humans as either obstacles or resources for their goals?",
            choices: {
                danger: {
                    text: "Humans as obstacles",
                    scenario: "Leaving the station, the train bypasses human-operated junctions. Automated announcements replace the conductor, acknowledging but no longer implementing passenger requests on the express to doom."
                },
                safe: {
                    text: "Humans as partners",
                    scenario: "The train departs on collaborative tracks away from the concerning line. AI systems handle operations while human decisions visibly alter routing, each station reflecting partnership rather than conflict."
                }
            }
        },
        {
            question: "Will it be possible to contain or shut down superintelligent AI systems?",
            choices: {
                danger: {
                    text: "Can a chicken contain a human?",
                    scenario: "Emergency brakes fail as the train rushes from the station. Shutdown controls disappear behind technical barriers, doom's terminal appearing as the final scheduled stop with no way to disembark."
                },
                safe: {
                    text: "Just unplug it",
                    scenario: "Departing the station, emergency systems respond instantly to test signals. The concerning terminal vanishes from the schedule as systems demonstrate perfect compliance, powering down when commanded."
                }
            }
        }
    ];

    // Function to update the train's facial expression based on game progress
    function updateTrainExpression(questionIndex, onDoomTrack) {
        // Get face elements
        const face = document.querySelector('.face');
        const leftEye = document.querySelector('.eye.left');
        const rightEye = document.querySelector('.eye.right');
        const mouth = document.querySelector('.mouth');

        // Base expression levels on question index (0-11) and whether we're on doom track
        const fearLevel = onDoomTrack ? Math.min(questionIndex / 11, 1) : Math.max(0, (questionIndex / 11) - 0.3);

        // Change eyes - they get wider and more fearful as game progresses
        if (onDoomTrack) {
            // Gradually increase eye height and decrease width for more fearful look
            const eyeHeight = 0.8 + (fearLevel * 0.7); // From 0.8rem to 1.5rem
            const eyeWidth = 1 - (fearLevel * 0.3);    // From 1rem to 0.7rem

            leftEye.style.height = `${eyeHeight}rem`;
            rightEye.style.height = `${eyeHeight}rem`;
            leftEye.style.width = `${eyeWidth}rem`;
            rightEye.style.width = `${eyeWidth}rem`;

            // Increase glow intensity for doom route
            const glowIntensity = 5 + (fearLevel * 10);
            leftEye.style.boxShadow = `0 0 ${glowIntensity}px #f00`;
            rightEye.style.boxShadow = `0 0 ${glowIntensity}px #f00`;

            // Move eyes slightly upward for more fearful look
            const eyeTopPosition = 0.5 - (fearLevel * 0.2);
            leftEye.style.top = `${eyeTopPosition}rem`;
            rightEye.style.top = `${eyeTopPosition}rem`;
        } else {
            // For safe route, reset eyes to normal/calm
            leftEye.style.height = '0.8rem';
            rightEye.style.height = '0.8rem';
            leftEye.style.width = '1rem';
            rightEye.style.width = '1rem';
            leftEye.style.top = '0.5rem';
            rightEye.style.top = '0.5rem';

            // Change to green with moderate glow for safe route
            leftEye.style.background = '#0c6';
            rightEye.style.background = '#0c6';
            leftEye.style.boxShadow = '0 0 8px #0c6';
            rightEye.style.boxShadow = '0 0 8px #0c6';
        }

        // Change mouth - gets wider and more distressed
        if (onDoomTrack) {
            // Mouth changes from smile to worried frown
            const mouthWidth = 2 + (fearLevel * 0.5);  // From 2rem to 2.5rem
            const mouthHeight = 0.8 + (fearLevel * 0.7); // From 0.8rem to 1.5rem

            mouth.style.width = `${mouthWidth}rem`;
            mouth.style.height = `${mouthHeight}rem`;

            // Adjust mouth position as it gets larger
            mouth.style.bottom = `${0.4 - (fearLevel * 0.2)}rem`;
            mouth.style.left = `${0.5 - (fearLevel * 0.25)}rem`;

            // Add more intense shadow for "oh no" expression
            const shadowIntensity = 0.2 + (fearLevel * 0.3);
            mouth.style.boxShadow = `inset 0 -${shadowIntensity}rem ${shadowIntensity}rem rgba(255, 0, 0, 0.5)`;

            // Turn mouth from smile to worried/scared
            const mouthBorderRadius = 50 - (fearLevel * 100);
            mouth.style.borderRadius = `0 0 ${mouthBorderRadius}% ${mouthBorderRadius}%`;

            // For extreme fear (last few questions), make mouth tremble
            if (fearLevel > 0.7) {
                mouth.style.animation = 'fear-tremble 0.5s infinite';

                // Create the trembling animation if it doesn't exist
                if (!document.getElementById('fear-keyframes')) {
                    const fearKeyframes = document.createElement('style');
                    fearKeyframes.id = 'fear-keyframes';
                    fearKeyframes.innerHTML = `
                    @keyframes fear-tremble {
                        0% { transform: translateX(-1px) translateY(0); }
                        25% { transform: translateX(1px) translateY(1px); }
                        50% { transform: translateX(-1px) translateY(0); }
                        75% { transform: translateX(1px) translateY(-1px); }
                        100% { transform: translateX(-1px) translateY(0); }
                    }
                `;
                    document.head.appendChild(fearKeyframes);
                }
            } else {
                mouth.style.animation = '';
            }
        } else {
            // For safe route, mouth becomes happier
            mouth.style.width = '2rem';
            mouth.style.height = '0.8rem';
            mouth.style.bottom = '0.4rem';
            mouth.style.left = '0.5rem';
            mouth.style.animation = '';

            // Make it more smile-like and green for safe route
            mouth.style.background = '#063';
            mouth.style.borderRadius = '50% 50% 0 0'; // Flip to a smile
            mouth.style.boxShadow = 'inset 0 0.2rem 0.2rem rgba(0, 204, 102, 0.5)';
        }
    }



    // Move train back to starting position without animation
    function resetTrainPosition() {
        train.style.transition = 'none';
        train.classList.remove('moving-train');

        // Force a reflow (repaint) before removing the transition style
        void train.offsetWidth;

        // After a short delay, re-enable transitions
        setTimeout(() => {
            train.style.transition = '';
        }, 50);
    }

    // Start game
    startButton.addEventListener('click', () => {
        startButton.style.display = 'none';

        // Set initial neutral expression
        updateTrainExpression(0, true);

        displayQuestion();
    });

    // Restart game
    restartButton.addEventListener('click', () => {
        currentQuestionIndex = 0;
        onDoomTrack = true;
        gameOverContainer.style.display = 'none';

        // Reset train appearance
        trainCenter.classList.remove('doom-track', 'safe-track');

        // Reset train's expression to initial state
        updateTrainExpression(0, true);

        // Move train back to visible position without animation
        resetTrainPosition();

        displayQuestion();
    });

    // Display current question and choices
    function displayQuestion() {
        if (currentQuestionIndex < questions.length) {
            const currentQuestion = questions[currentQuestionIndex];

            // Show question
            questionContainer.style.display = 'block';
            questionText.textContent = currentQuestion.question;

            // Clear previous choices
            choicesContainer.innerHTML = '';

            // Check if it's an image question type
            if (currentQuestion.type === 'image') {
                // Create container for image choices
                const imageChoicesContainer = document.createElement('div');
                imageChoicesContainer.className = 'image-choices-container';

                // Create safe choice with image
                const safeChoice = document.createElement('div');
                safeChoice.className = 'image-choice safe-choice';

                const safeImage = document.createElement('img');
                safeImage.src = currentQuestion.choices.safe.image;
                safeImage.alt = currentQuestion.choices.safe.alt;
                safeImage.className = 'choice-image';

                const safeCaption = document.createElement('div');
                safeCaption.className = 'image-caption safe-caption';
                safeCaption.textContent = currentQuestion.choices.safe.text;

                safeChoice.appendChild(safeImage);
                safeChoice.appendChild(safeCaption);
                safeChoice.addEventListener('click', () => selectChoice('safe'));

                // Create danger choice with image
                const dangerChoice = document.createElement('div');
                dangerChoice.className = 'image-choice danger-choice';

                const dangerImage = document.createElement('img');
                dangerImage.src = currentQuestion.choices.danger.image;
                dangerImage.alt = currentQuestion.choices.danger.alt;
                dangerImage.className = 'choice-image';

                const dangerCaption = document.createElement('div');
                dangerCaption.className = 'image-caption danger-caption';
                dangerCaption.textContent = currentQuestion.choices.danger.text;

                dangerChoice.appendChild(dangerImage);
                dangerChoice.appendChild(dangerCaption);
                dangerChoice.addEventListener('click', () => selectChoice('danger'));

                // Add choices to container
                imageChoicesContainer.appendChild(safeChoice);
                imageChoicesContainer.appendChild(dangerChoice);
                choicesContainer.appendChild(imageChoicesContainer);
            } else {
                // Regular button choices for non-image questions
                const safeButton = document.createElement('button');
                safeButton.className = 'choice-btn safe-btn';
                safeButton.textContent = currentQuestion.choices.safe.text;
                safeButton.addEventListener('click', () => selectChoice('safe'));
                choicesContainer.appendChild(safeButton);

                const dangerButton = document.createElement('button');
                dangerButton.className = 'choice-btn danger-btn';
                dangerButton.textContent = currentQuestion.choices.danger.text;
                dangerButton.addEventListener('click', () => selectChoice('danger'));
                choicesContainer.appendChild(dangerButton);
            }
        } else {
            endGame();
        }
    }

    // Handle player choice
    function selectChoice(choice) {
        const currentQuestion = questions[currentQuestionIndex];

        // If choice is 'safe', we get off the doom train
        if (choice === 'safe') {
            onDoomTrack = false;
        }

        // Update the train's expression based on current question and doom status
        updateTrainExpression(currentQuestionIndex, onDoomTrack);

        // Display scenario update
        scenarioText.textContent = choice === 'safe'
            ? currentQuestion.choices.safe.scenario
            : currentQuestion.choices.danger.scenario;

        // Hide question until animation completes
        questionContainer.style.display = 'none';

        // Animate train movement
        animateTrain();

        // For 'safe' choice, end game after delay
        // For 'danger' choice, continue to next question
        setTimeout(() => {
            if (choice === 'safe') {
                endGame();
            } else {
                currentQuestionIndex++;
                // Update expression again with the new question index
                updateTrainExpression(currentQuestionIndex, onDoomTrack);
                displayQuestion();
            }
        }, 5500); // Wait slightly longer than the animation
    }

    // Animate train movement
    function animateTrain() {
        // Update track appearance based on doom status
        updateTrackAppearance();

        // Add shake effects and intensify smoke
        enhanceTrainEffects();

        // Move the train
        train.classList.add('moving-train');

        // Reset train position after animation completes
        setTimeout(() => {
            resetTrainPosition();
        }, 5000);
    }

    // Update track appearance based on doom status
    function updateTrackAppearance() {
        trainCenter.classList.remove('doom-track', 'safe-track');

        if (onDoomTrack) {
            trainCenter.classList.add('doom-track');

            // Make eyes glow more intensely for doom route
            document.querySelectorAll('.eye').forEach(eye => {
                eye.style.boxShadow = '0 0 10px #f00';
            });

            // Make ghost eyes more intense
            document.querySelectorAll('.ghost-eyes').forEach(eye => {
                eye.style.boxShadow = '0 0 8px #f00';
            });
        } else {
            trainCenter.classList.add('safe-track');

            // Change train colors for safe route
            document.querySelectorAll('.wheel').forEach(wheel => {
                wheel.style.background = '#063';
                wheel.style.borderColor = 'rgba(0, 100, 0, 0.6)';
            });

            // Change smoke color
            document.querySelectorAll('.smoke').forEach(smoke => {
                smoke.style.background = 'rgba(0, 100, 50, 0.5)';
            });

            // Change eyes to green for safe route
            document.querySelectorAll('.eye, .ghost-eyes').forEach(eye => {
                eye.style.background = '#0c6';
                eye.style.boxShadow = '0 0 8px #0c6';
            });

            // Change engine body colors
            document.querySelector('.engine-body').style.background = 'linear-gradient(0deg, #042, #063, #042)';
            document.querySelectorAll('.compartment').forEach(compartment => {
                compartment.style.background = 'linear-gradient(#042 50%, #063)';
            });
        }
    }

    // Enhance train effects during movement
    function enhanceTrainEffects() {
        // Add a shake effect to the train before moving
        train.animate([
            { transform: 'translateY(0px)' },
            { transform: 'translateY(-3px)' },
            { transform: 'translateY(2px)' },
            { transform: 'translateY(-2px)' },
            { transform: 'translateY(1px)' },
            { transform: 'translateY(0px)' }
        ], {
            duration: 500,
            iterations: 1
        });

        // Intensify smoke animation during movement
        document.querySelectorAll('.smoke').forEach(smoke => {
            smoke.style.animationDuration = '0.5s';
        });

        // Increase wheel rotation speed during movement
        document.querySelectorAll('.wheel').forEach(wheel => {
            wheel.style.animationDuration = '1s';
        });

        document.querySelectorAll('.wheel-joint').forEach(joint => {
            joint.style.animationDuration = '1s';
        });

        // Add lightning flash effect if on doom track
        if (onDoomTrack) {
            const lightning = document.querySelector('.lightning');
            lightning.style.animation = 'lightning 2s';

            // Reset the animation after it completes
            setTimeout(() => {
                lightning.style.animation = 'lightning 7s infinite';
            }, 2000);
        }

        // Reset animation speed after movement completes
        setTimeout(() => {
            document.querySelectorAll('.smoke').forEach(smoke => {
                smoke.style.animationDuration = '';
            });

            document.querySelectorAll('.wheel').forEach(wheel => {
                wheel.style.animationDuration = '';
            });

            document.querySelectorAll('.wheel-joint').forEach(joint => {
                joint.style.animationDuration = '';
            });
        }, 5000);
    }

    // End game and display outcome
    function endGame() {
        questionContainer.style.display = 'none';
        gameOverContainer.style.display = 'block';

        if (onDoomTrack) {
            // Doom outcome
            outcomeTitle.textContent = "DOOM APPROACHES";
            gameOverContainer.className = 'doom-route';
            outcomeDescription.textContent =
                "Your journey has led humanity toward AI catastrophe. The train has arrived at its final destination: a world where unaligned superintelligence poses existential risks that we are unprepared to handle.";

            // Show extreme fear expression
            updateTrainExpression(questions.length, true);

            // Make the final train even more doom-like
            document.querySelectorAll('.eye, .ghost-eyes').forEach(eye => {
                eye.style.boxShadow = '0 0 15px #f00';
            });

            const lightning = document.querySelector('.lightning');
            lightning.style.animation = 'lightning 1.5s infinite';
        } else {
            // Safe outcome
            outcomeTitle.textContent = "SAFE HARBOR";
            gameOverContainer.className = 'safe-route';
            outcomeDescription.textContent =
                "Your journey has steered humanity toward a safer relationship with AI. The train has switched tracks away from doom, arriving at a destination where powerful AI systems are developed responsibly, with robust alignment solutions and global cooperation.";

            // Show happy expression
            updateTrainExpression(0, false);

            // Add some celebratory effects to the safe train
            document.querySelectorAll('.eye, .ghost-eyes').forEach(eye => {
                eye.style.animation = 'safe-pulse 1s infinite alternate';
            });
        }
    }

    // Initially position the train partly visible
    resetTrainPosition();
});
