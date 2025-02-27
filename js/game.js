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
                    text: "Seems likely to be even sooner than that, given the current pace of progress",
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
                    text: "Yes. Human AI researchers can be replaced by AGI researchers working 24/7",
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
