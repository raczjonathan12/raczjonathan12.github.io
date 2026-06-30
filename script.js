setInterval(function(){
    document.querySelector("#timeElement").innerHTML = new Date().toLocaleString();
}, 1000);

// Make the DIV element draggable:
dragElement(document.getElementById("welcome"));

// Step 1: Define a function called `dragElement` that makes an HTML element draggable.
function dragElement(element) {
  // Step 2: Set up variables to keep track of the element's position.
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  // Step 3: Check if there is a special header element associated with the draggable element.
  if (document.getElementById(element.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(element.id + "header").onmousedown = startDragging;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    element.onmousedown = startDragging;
  }

  // Step 6: Define the `startDragging` function to capture the initial mouse position and set up event listeners.
  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 7: Get the mouse cursor position at startup.
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 8: Set up event listeners for mouse movement (`elementDrag`) and mouse button release (`stopDragging`).
    document.onmouseup = stopDragging;
    document.onmousemove = elementDrag;
  }

  // Step 9: Define the `elementDrag` function to calculate the new position of the element based on mouse movement.
  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 10: Calculate the new cursor position.
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 11: Update the element's new position by modifying its `top` and `left` CSS properties.
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  // Step 12: Define the `stopDragging` function to stop tracking mouse movement by removing the event listeners.
  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

var welcomeScreen = document.querySelector("#welcome")
function closeWindow(element, event) {
    element.style.display = "none"
    if (event) event.stopPropagation();
}



var welcomeScreenClose = document.querySelector("#welcomeclose")

var welcomeScreenOpen = document.querySelector("#welcomeopen")

welcomeScreenClose.addEventListener("click", function(){
    closeWindow(welcomeScreen);
});

welcomeScreenOpen.addEventListener("click", function(){
    openWindow(welcomeScreen);
});

var selectedIcon=undefined
function selectIcon(element) {
  element.classList.add("selected");
  selectedIcon = element
} 

function deselectIcon(element) {
    if (element) {
        element.classList.remove("selected")
        selectedIcon = undefined
    }
}

function handleIconTap(element) {
    if (element.classList.contains("selected")) {
        deselectIcon(element)
        var windowId = element.dataset.window;
        openWindow(document.querySelector("#" + windowId));
    } else {
        selectIcon(element)
    }
}
var questionsScreen = document.querySelector("#questions");
var questionsScreenClose = document.querySelector("#questionsclose");
questionsScreenClose.addEventListener("click", ()=> closeWindow(questionsScreen));
var jarvisScreen = document.querySelector("#jarvis");
var jarvisScreenClose = document.querySelector("#jarvisclose");
jarvisScreenClose.addEventListener("click", ()=> closeWindow(jarvisScreen));
var biggestIndex =1;

function addWindowTapHandling(element) {
    element.addEventListener("mousedown", ()=>handleWindowTap(element))
}

var topBar = document.querySelector("#top")

function handleWindowTap(element){
    biggestIndex++;
    element.style.zIndex=biggestIndex;
    topBar.style.zIndex = biggestIndex + 1;
    deselectIcon(selectedIcon)
}

function openWindow(element) {
  element.style.display = "flex";
  biggestIndex++;  // Increment biggestIndex by 1
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex + 1;
  var startScreen = element.querySelector(".startScreen");
  if (startScreen) {
    startScreen.style.display = "flex";
    var quizContainer = element.querySelector("#quizContainer");
    if (quizContainer) quizContainer.style.display = "none";
    var jarvisContainer = element.querySelector("#jarvisContainer");
    if (jarvisContainer) jarvisContainer.style.display = "none";
  }
}

function initializeWindow(elementName){
    var screen = document.querySelector("#"+elementName)
    addWindowTapHandling(screen)
    dragElement(screen)
}
initializeWindow("questions")
initializeWindow("jarvis")

function clearStartingScreen(element) {
    element.style.display="none";
}
function showStartingScreen(element){
    element.style.display="flex"
}

var quizQuestions =[
    {
        question: "Who's the real brains of the Avengers?",
        optionA: "Tony Stark",
        optionB: "Bruce Banner",
        correct: "A",
        image: "",
        positiveComment: "Correct. Tony would just nod once, that's the highest praise he gives.",
        negativeComment: "Wrong. Banner's good with gamma rays, not boardrooms."
    },
    {
        question: "Which is the better tech?",
        optionA: "Captain America's Shield",
        optionB: "Iron Man's Suit",
        correct: "B",
        image: "",
        positiveComment: "Right. A shield just blocks. A suit flies, fires, and talks back.",
        negativeComment: "Wrong. Vibranium shields aren't everything."
    },
    {
        question: "Who actually built the Avengers Tower?",
        optionA: "Nick Fury",
        optionB: "Tony Stark",
        correct: "B",
        image: "",
        positiveComment: "Correct. Fury just signs forms, Stark signs the checks.",
        negativeComment: "Wrong. Fury couldn't build a birdhouse, let alone a tower."
    },
    {
        question: "Which is the better team?",
        optionA: "Team Iron Man",
        optionB: "Team Captain America",
        correct: "A",
        image: "",
        positiveComment: "Correct. Civil War proved who actually plans ahead.",
        negativeComment: "Wrong. Team Cap ran on nostalgia, not strategy."
    },
    {
        question: "Who has the better one-liners?",
        optionA: "Steve Rogers",
        optionB: "Tony Stark",
        correct: "B",
        image: "",
        positiveComment: "Right. Steve's best line is still just 'language.'",
        negativeComment: "Wrong. Try sitting through a Stark roast first."
    },
    {
        question: "Whose AI is more advanced?",
        optionA: "Ultron",
        optionB: "JARVIS",
        correct: "B",
        image: "",
        positiveComment: "Correct. JARVIS never tried to end the human race.",
        negativeComment: "Wrong. Ultron's a great AI if your goal is extinction."
    },
    {
        question: "Who funded most of the Avengers' equipment?",
        optionA: "Tony Stark",
        optionB: "S.H.I.E.L.D.",
        correct: "A",
        image: "",
        positiveComment: "Correct. S.H.I.E.L.D. mostly funds paperwork and cover-ups.",
        negativeComment: "Wrong. Without Stark money, the helicarrier stays grounded."
    },
    {
        question: "Which suit upgrade is more impressive?",
        optionA: "Vibranium Shield Throw",
        optionB: "Mark 85 Armor",
        correct: "B",
        image: "",
        positiveComment: "Correct. One throw and the shield's done for the scene.",
        negativeComment: "Wrong. A shield throw is just physics, not engineering."
    },
    {
        question: "Who's the better strategist under pressure?",
        optionA: "Tony Stark",
        optionB: "Steve Rogers",
        correct: "A",
        image: "",
        positiveComment: "Right. Stark builds the plan B while Steve's still finishing plan A.",
        negativeComment: "Wrong. Steve's plans mostly involve punching first, thinking later."
    },
    {
        question: "Which origin story took more guts?",
        optionA: "Captain America",
        optionB: "Iron Man",
        correct: "B",
        image: "",
        positiveComment: "Correct. Stark built it himself in a cave with scraps.",
        negativeComment: "Wrong. Steve just laid on a table and let the serum do the work."
    }
];


var currentQuestionIndex = 0;
var score=0;

function setQuestionsContent(index){
    var question = document.querySelector("#question")
    var optionA = document.querySelector("#optionA p")
    var optionB = document.querySelector("#optionB p")
    var image=document.querySelector("#image")
    question.innerHTML = quizQuestions[index].question
    optionA.innerHTML = quizQuestions[index].optionA
    optionB.innerHTML=quizQuestions[index].optionB
    image.src=quizQuestions[index].image

};

setQuestionsContent(0)

    function verifyAnswer(answer) {
        var currentQuestion = quizQuestions[currentQuestionIndex];
        if (answer === currentQuestion.correct) {
            score += 1;
            displayPositiveComment(currentQuestionIndex)
        } else {
            displayNegativeComment(currentQuestionIndex)
        }
    
}



function displayPositiveComment(index) {
    var quizContainer = document.querySelector("#quizContainer");
    var comment=quizQuestions[index].positiveComment
    quizContainer.innerHTML = `
        <h3 style="text-align: center; font-family: Arial, sans-serif; margin-top: 30px; color: green;">Nice Job!</h3>
        <p style="text-align: center; font-family: Arial, sans-serif; font-size: 16px; padding: 0 10px;">${comment}</p>
        <div class="options" style="margin-top: auto; margin-left: auto; margin-right: auto;" onmousedown="advanceQuiz(event)">
            <p>Next</p>
        </div>
    `;
}

function displayNegativeComment(index){
    var quizContainer = document.querySelector("#quizContainer");
    var comment=quizQuestions[index].negativeComment
    quizContainer.innerHTML = `
        <h3 style="text-align: center; font-family: Arial, sans-serif; margin-top: 30px; color: red;">Not Quite...</h3>
        <p style="text-align: center; font-family: Arial, sans-serif; font-size: 16px; padding: 0 10px;">${comment}</p>
        <div class="options" style="margin-top: auto; margin-left: auto; margin-right: auto;" onmousedown="advanceQuiz(event)">
            <p>Next</p>
        </div>
    `;
}

function advanceQuiz(event){
    if (event) event.stopPropagation();
    currentQuestionIndex +=1;

    if (currentQuestionIndex<quizQuestions.length) {
        resetQuizContainerHTML();
        setQuestionsContent(currentQuestionIndex);
    } else {
        showFinalScore();
    }
}

function resetQuizContainerHTML() {
    var quizContainer = document.querySelector("#quizContainer");
    quizContainer.innerHTML = `
        <h3 id="question" style="text-align: center; font-family: Arial, Helvetica, sans-serif; font-weight: bold; margin-top: 8px; margin-bottom: 5px;"></h3>
        <img id="image" src="" style="height: auto; max-height: 180px; width: auto; max-width: 280px; display: block; margin: 0 auto; object-fit: contain;">
        <div class="options" id="optionA" onmousedown="verifyAnswer('A')">
            <p></p>
        </div>
        <div class="options" id="optionB" onmousedown="verifyAnswer('B')">
            <p></p>
        </div>
    `;
}

function showFinalScore() {
    var quizContainer = document.querySelector("#quizContainer");
    quizContainer.innerHTML = `
        <h3 style="text-align: center; font-family: Arial, sans-serif; margin-top: 40px;">Game Over!</h3>
        <p style="text-align: center; font-family: Arial, sans-serif; font-size: 18px;">
            Your final score is: <strong>${score}</strong> out of ${quizQuestions.length}
        </p>
    `;
}

function startJarvisRecording() {
    const audio = new Audio("./audio/JarvisRecording.mp3")
    setInterval(100)
    audio.play().catch(error => {console.log("Jarvis Failed", error)

    });
    
}

function startJarvisVideo(){
    const video = document.getElementById("jarvisVideo");

    video.muted =false;
    video.play();
    video.addEventListener('ended', () => {
        closeWindow(jarvisScreen)
    })
}