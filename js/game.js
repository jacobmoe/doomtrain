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
    const train = document.getElementById('train');
    const tracks = document.getElementById('tracks');

    // Game state
    let currentQuestionIndex = 0;
    let onDoomTrack = true; // Track if we're still on the doom train

    // Questions - "danger" choices continue on the doom track, "safe" choices get off the track
    const questions = [
        {
            question: "Will progress in AI continue?",
            choices: {
                safe: {
                    text: "No, the long AI winter is coming",
                    scenario: "AI progress finds a sustainable pace. The train begins to change tracks as cool blue lights illuminate the way forward."
                },
                danger: {
                    text: "Yes, and it will likely keep accelerating",
                    scenario: "AI progress continues apace."
                }
            }
        },
        {
            question: "Does human-level general intelligence require a biological brain?",
            choices: {
                safe: {
                    text: "Yes, there is more to the brain than computation",
                    scenario: ""
                },
                danger: {
                    text: "No, intelligence is substrate independent",
                    scenario: ""
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
                    scenario: "Superintelligence appears boundless. The train climbs a steep incline as the sky darkens with storm clouds."
                },
                safe: {
                    text: "Humans are near the peak of all possible intelligences",
                    image: "images/limited_intelligence.png",
                    alt: "Graph showing intelligence leveling off at a plateau slightly above human level",
                    scenario: "Intelligence has natural constraints. The train begins to level out as sunlight breaks through the clouds."
                }
            }
        },
        {
            question: "Will competitive pressure cause organizations to deploy increasingly powerful AI systems without adequate safety measures?",
            choices: {
                danger: {
                    text: "Yes, and if we move too slow some other country will catch up",
                    scenario: "Safety sacrificed for advancement. The train accelerates dangerously as warning lights flash in the cabin."
                },
                safe: {
                    text: "No, AI labs always do adequate safety testing before a release",
                    scenario: "Safety culture prevails. The train begins to redirect toward a brightly lit station in the distance."
                }
            }
        },
        {
            question: "Will humanity fail to cooperate globally on AI safety and control?",
            choices: {
                danger: {
                    text: "Have you met humanity? Anyway, I'm not convinced that would be a good thing",
                    scenario: "Global cooperation fails utterly. The doom train rushes ahead as the tracks ahead split into chaos."
                },
                safe: {
                    text: "People will step up when they start to understand the risk",
                    scenario: "Global cooperation emerges triumphantly. The train begins to slow as golden light bathes the landscape."
                }
            }
        },
        {
            question: "Will we reach human-level AGI within the next few decades?",
            choices: {
                danger: {
                    text: "Seems likely to be sooner than that, given the pace of progress",
                    scenario: "Human-level AGI approaches rapidly. The train wheels spark against the rails as you hurtle forward into darkness."
                },
                safe: {
                    text: "No, we need a new AI architecture to get there and that is unlikely to emerge for a long time",
                    scenario: "AGI timelines extend further. The train switches to a safer track as forest scenery begins to appear alongside."
                }
            }
        },
        {
            question: "Will superintelligent AI systems be developed soon after human-level AGI?",
            choices: {
                danger: {
                    text: "Armies of AGI researchers working 24/7 will push capabilities far beyond human-level",
                    scenario: "Superintelligence follows with shocking speed. The train barrels ahead as the tracks ahead glow with molten heat."
                },
                safe: {
                    text: "Progress beyond human-level intelligence will prove to be hard even with the help of AGI",
                    scenario: "Development proceeds methodically. The train changes direction as a rainbow appears on the horizon."
                }
            }
        },
        {
            question: "Is AI alignment a difficult problem?",
            choices: {
                danger: {
                    text: "Yes very. And progress on it has been slow relative to capabilities",
                    scenario: ""
                },
                safe: {
                    text: "No. Haven't you heard of Asimov's 3 laws?",
                    scenario: ""
                }
            }
        },
        {
            question: "Will we fail to solve the AI alignment problem before superintelligence emerges?",
            choices: {
                danger: {
                    text: "Most likely",
                    scenario: "The fundamental problem persists. The train rushes toward doom as cracks begin forming in the cabin windows."
                },
                safe: {
                    text: "Solutions will emerge",
                    scenario: "Crucial breakthroughs address alignment. The train veers away onto crystalline tracks that harmonize with nature."
                }
            }
        },
        {
            question: "Will superintelligent AI systems develop sub-goals that include self-preservation, resource acquisition or power-seeking?",
            choices: {
                danger: {
                    text: "Of course. Why wouldn't they?",
                    scenario: "AI systems develop concerning instrumental goals. The train trembles violently as dark smoke pours from its engine."
                },
                safe: {
                    text: "Of course not. Why would they?",
                    scenario: "AI goals remain within designed parameters. The train steadies as flowers begin blooming alongside the tracks."
                }
            }
        },
        {
            question: "Would it be possible for a determined superintelligence to destroy humanity?",
            choices: {
                safe: {
                    text: "I won't believe that until someone tells me how it would do it",
                    scenario: ""
                },
                danger: {
                    text: "I assume so. Being an average human, guessing at how a superintelligence would achieve its goals is worth about as much as a chicken's guess for how humans got to the moon",
                    scenario: ""
                }
            }
        },
        {
            question: "Will superintelligent systems view humans as either obstacles or resources for their goals?",
            choices: {
                danger: {
                    text: "Humans as obstacles",
                    scenario: "AI perceives humans as impediments. The train approaches a dangerous curve as the ground below begins to crumble."
                },
                safe: {
                    text: "Humans as partners",
                    scenario: "AI values human collaboration. The train maintains a safer course as birds fly alongside in perfect formation."
                }
            }
        },
        // {
        //     question: "Will they have access to critical infrastructure and systems necessary for human survival?",
        //     choices: {
        //         danger: {
        //             text: "Total integration",
        //             scenario: "AI controls all critical systems. The train nears a terrifying precipice as lightning strikes dangerously close."
        //         },
        //         safe: {
        //             text: "Careful boundaries",
        //             scenario: "Critical systems remain protected. The train enters a safer zone with beautiful scenery and clear skies."
        //         }
        //     }
        // },
        // {
        //     question: "Will AI systems develop goals fundamentally incompatible with human flourishing?",
        //     choices: {
        //         danger: {
        //             text: "Divergent values",
        //             scenario: "AI goals catastrophically misalign. Doom approaches quickly as the sky turns blood red."
        //         },
        //         safe: {
        //             text: "Aligned priorities",
        //             scenario: "AI goals harmonize with humanity. The train veers from the doom track onto a path lined with vibrant life."
        //         }
        //     }
        // },
        {
            question: "Will it be impossible to contain or shut down superintelligent AI systems?",
            choices: {
                danger: {
                    text: "Can a chicken contain a human?",
                    scenario: "Containment fails utterly. The doom train reaches its destination as reality itself seems to warp around you."
                },
                safe: {
                    text: "Just unplug it",
                    scenario: "Containment proves effective. The train safely slows to a stop at a peaceful station filled with hope."
                }
            }
        }
    ];

    // Start game
    startButton.addEventListener('click', () => {
        startButton.style.display = 'none';
        displayQuestion();
    });

    // Restart game
    restartButton.addEventListener('click', () => {
        currentQuestionIndex = 0;
        onDoomTrack = true;
        gameOverContainer.style.display = 'none';
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
                const safeButton = document.createElement('button');
                safeButton.className = 'choice-btn safe-btn';
                safeButton.textContent = currentQuestion.choices.safe.text;
                safeButton.addEventListener('click', () => selectChoice('safe'));
                choicesContainer.appendChild(safeButton);

                // Regular button choices for non-image questions
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
        
        // If choice is 'safe', we get off the doom train and end the game immediately
        if (choice === 'safe') {
            onDoomTrack = false;
            
            // Display scenario update
            scenarioText.textContent = currentQuestion.choices.safe.scenario;
            
            // Animate train movement
            animateTrain();
            
            // Update track appearance based on doom status
            updateTrackAppearance();
            
            // End the game after delay
            setTimeout(() => {
                endGame();
            }, 3000);
            
            return;
        }
        
        // Display scenario update for danger choice
        scenarioText.textContent = currentQuestion.choices.danger.scenario;

        // Animate train movement
        animateTrain();
        
        // Update track appearance based on doom status
        updateTrackAppearance();
        
        // Move to next question after delay
        setTimeout(() => {
            currentQuestionIndex++;
            displayQuestion();
        }, 3000);
    }

    // Animate train movement
    function animateTrain() {
        questionContainer.style.display = 'none';
        
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
        }).onfinish = () => {
            // Add moving animation after shake
            train.classList.add('moving-train');
            
            // Intensify smoke animation during movement
            document.querySelectorAll('.smoke-particle').forEach(particle => {
                particle.style.animationDuration = '1s';
            });
            
            // Make windows flicker if on doom track
            if (onDoomTrack) {
                document.querySelectorAll('.train-window').forEach(window => {
                    window.style.animation = 'window-flicker 0.5s infinite alternate';
                });
            }
        };
        
        // Create CSS for window flicker if it doesn't exist
        if (!document.getElementById('window-flicker-style')) {
            const style = document.createElement('style');
            style.id = 'window-flicker-style';
            style.textContent = `
                @keyframes window-flicker {
                    0% { background-color: #ffff99; box-shadow: 0 0 5px #ffff00; }
                    25% { background-color: #ff5500; box-shadow: 0 0 10px #ff3300; }
                    50% { background-color: #ffff99; box-shadow: 0 0 5px #ffff00; }
                    75% { background-color: #ff3300; box-shadow: 0 0 15px #ff0000; }
                    100% { background-color: #ffff99; box-shadow: 0 0 5px #ffff00; }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            train.classList.remove('moving-train');
            train.style.left = '0';
            
            // Reset window and smoke animations
            document.querySelectorAll('.smoke-particle').forEach(particle => {
                particle.style.animationDuration = '2s';
            });
            
            document.querySelectorAll('.train-window').forEach(window => {
                window.style.animation = '';
            });
        }, 3000);
    }

    // Update track appearance based on doom status
    function updateTrackAppearance() {
        tracks.className = '';
        
        if (onDoomTrack) {
            tracks.classList.add('doom-track');
        } else {
            tracks.classList.add('safe-track');
        }
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
        } else {
            // Safe outcome
            outcomeTitle.textContent = "SAFE HARBOR";
            gameOverContainer.className = 'safe-route';
            outcomeDescription.textContent = 
                "Your journey has steered humanity toward a safer relationship with AI. The train has switched tracks away from doom, arriving at a destination where powerful AI systems are developed responsibly, with robust alignment solutions and global cooperation.";
        }
    }
});
