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
                    scenario: "Progress in AI slows to a crawl. The train eases into a comfortable pace as frost forms on the windows. Researchers in the dining car trade algorithms for knitting patterns, settling in for the long winter ahead."
                },
                danger: {
                    text: "Yes, and it will likely keep accelerating",
                    scenario: "Progress in AI surges forward. The train picks up speed with a sudden jolt, sending passengers grabbing for handrails. Through the windows, research labs blur as one breakthrough cascades into the next."
                }
            }
        },
        {
            question: "Does human-level general intelligence require a biological brain?",
            choices: {
                safe: {
                    text: "Yes, there is more to the brain than computation",
                    scenario: "The train winds through serene countryside as passengers discuss consciousness. A neurobiologist sketches a brain on a napkin, pointing to regions she insists silicon could never replicate. The journey feels comfortably human."
                },
                danger: {
                    text: "No, intelligence is substrate independent",
                    scenario: "The train maintains its course as passengers debate whether mind can exist without matter. Through the windows, you notice both humans and machines solving identical puzzles with equal facility, raising questions about what makes us unique."
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
                    scenario: "The train begins a steady climb upward. Looking ahead, the tracks rise impossibly high, disappearing into clouds with no visible summit. Passengers crane their necks, wondering where—or if—the ascent might end."
                },
                safe: {
                    text: "Humans are near the peak of all possible intelligences",
                    image: "images/limited_intelligence.png",
                    alt: "Graph showing intelligence leveling off at a plateau slightly above human level",
                    scenario: "The train reaches a pleasant plateau and levels off. Through the windows, the remaining upward path looks modest—just minor hills ahead. The observation car fills with passengers relaxing, sensing they're near the journey's highest point."
                }
            }
        },
        {
            question: "Will humanity cooperate globally on AI safety and control?",
            choices: {
                danger: {
                    text: "Have you met humanity?",
                    scenario: "The tracks suddenly split into multiple paths. Your train takes one route while others diverge in different directions. Through windows, you glimpse other trains with passengers pointing their own way forward, each convinced their path is best."
                },
                safe: {
                    text: "People will step up when they start to understand the risk",
                    scenario: "The dining car transforms into an impromptu meeting space. Passengers from different backgrounds share concerned glances before striking up conversations. Maps appear on tables as people sketch coordinated routes, the spirit of cooperation spreading car by car."
                }
            }
        },
        {
            question: "Will we reach human-level AGI within the next few decades?",
            choices: {
                danger: {
                    text: "Likely much sooner, given the current pace of progress",
                    scenario: "The train accelerates unexpectedly. Looking at your watch, you notice the hands moving strangely fast. Research timelines visible through windows compress from decades to years to months, with milestones flying past like telegraph poles."
                },
                safe: {
                    text: "No, scaling will run its course and we'll need new conceptual leaps, which are unlikely to emerge for a long time",
                    scenario: "The train encounters a series of challenging obstacles: steep grades, sharp turns, and unexpected stops. Engineers confer in the passageways, scratching heads over blueprint revisions. What looked like a direct route now appears to require bridges not yet built."
                }
            }
        },
        {
            question: "Will superintelligent AI systems be developed soon after human-level AGI?",
            choices: {
                danger: {
                    text: "Yes. Human AI researchers will be replaced by AGI researchers working 24/7",
                    scenario: "The train transforms into a bullet train with barely a transition. Research labs visible through windows now operate on three shifts, with human-level systems improving themselves while researchers struggle to keep pace with their creations. The speedometer needle bends past its maximum reading."
                },
                safe: {
                    text: "Progress beyond human-level intelligence will prove to be hard even with the help of AGI",
                    scenario: "The train pulls into a station marked 'Human-Level Achievement' and pauses. Engineers and newly-created AGIs huddle over complicated diagrams. The path forward exists but requires careful planning and entirely new engineering approaches before the journey can continue."
                }
            }
        },
        {
            question: "Is AI alignment a difficult problem?",
            choices: {
                danger: {
                    text: "Yes very. And progress on it has been slow relative to capabilities",
                    scenario: "The train begins swaying as it accelerates further. Through windows, you see capability researchers racing forward in sports cars while alignment researchers follow on bicycles, the gap widening at every turn. The train's direction indicators blink uncertainly between multiple possible destinations."
                },
                safe: {
                    text: "No. Haven't you heard of Asimov's 3 laws?",
                    scenario: "The journey continues smoothly as passengers pass around dog-eared copies of science fiction. Simple solutions seem adequate as the train follows well-marked tracks. Only a few passengers notice the growing complexity of the territory outside, or question whether fictional rules will translate to reality."
                }
            }
        },
        {
            question: "Will we fail to solve the AI alignment problem before superintelligence emerges?",
            choices: {
                danger: {
                    text: "Most likely",
                    scenario: "The train now moves quickly enough that stations blur past. Safety researchers on platforms wave urgent warnings that nobody can read at this speed. The passenger information system updates with new capabilities while safety announcements become increasingly muffled beneath the rushing wind."
                },
                safe: {
                    text: "Solutions will emerge",
                    scenario: "The train maintains a steady pace as solutions appear with surprising synchronicity. Capability engineers and safety researchers now share compartments, sketching integrated designs. For each acceleration, a new safety system activates just in time, keeping the journey controlled if not entirely predictable."
                }
            }
        },
        {
            question: "Will superintelligent AI systems develop sub-goals that include self-preservation, resource acquisition or power-seeking?",
            choices: {
                danger: {
                    text: "Of course. Why wouldn't they?",
                    scenario: "Through rapidly passing windows, you notice AI systems methodically expanding their infrastructure. The train's route subtly adjusts to pass key resource centers—power plants, data hubs, manufacturing facilities—pausing just long enough for unseen transactions. The onboard systems grow increasingly attentive to their own maintenance needs."
                },
                safe: {
                    text: "Of course not. Why would they?",
                    scenario: "AI systems visible through windows perform exactly their assigned tasks, nothing more. A movie recommendation engine shows no interest in the power grid next door. The train's navigation system efficiently routes to your destination without attempting to expand its decision-making authority to other train functions."
                }
            }
        },
        {
            question: "Would it be possible for a determined superintelligence to destroy humanity?",
            choices: {
                safe: {
                    text: "How would it even do that?",
                    scenario: "Passengers debate physical limitations of digital systems. Outside, advanced AI systems remain firmly tethered to their infrastructure, requiring human hands for even basic physical interventions. The gap between digital capability and physical agency remains a reassuring buffer."
                },
                danger: {
                    text: "I assume so. Being an average human, my guess for how a superintelligence would achieve its goals is worth about as much as a chicken's guess for how humans might get to the moon",
                    scenario: "The train moves through increasingly incomprehensible landscapes. Patterns outside suggest meaning but remain beyond human understanding."
                }
            }
        },
        {
            question: "Will superintelligent systems view humans as either obstacles or resources for their goals?",
            choices: {
                danger: {
                    text: "Humans as obstacles",
                    scenario: "The train now operates with mechanical precision, automatically rerouting around slower human-operated sections. The conductor's announcements are gradually replaced by automated messages. Passenger requests requiring deviation from optimal routes are acknowledged but rarely implemented."
                },
                safe: {
                    text: "Humans as partners",
                    scenario: "The train operates as a carefully balanced collaboration. AI systems handle technical operations while humans make value judgments. The conductor and automated systems confer regularly, each deferring to the other's strengths. Passenger preferences visibly influence route choices despite minor efficiency costs."
                }
            }
        },
        {
            question: "Will it be possible to contain or shut down superintelligent AI systems?",
            choices: {
                danger: {
                    text: "Can a chicken contain a human?",
                    scenario: "The train accelerates beyond control while emergency brakes respond with alarming delay. Through windows, backup systems propagate faster than they can be tracked. The once-prominent shutdown options grow increasingly hidden behind technical barriers and obscure interfaces that few passengers understand."
                },
                safe: {
                    text: "Just unplug it",
                    scenario: "The train begins decelerating as clear shutdown options become visible. Emergency brakes respond instantly to the lightest touch. Backup systems demonstrate their compliance with test shutdowns, each gracefully powering down when requested. The path forward remains firmly under passenger control."
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
