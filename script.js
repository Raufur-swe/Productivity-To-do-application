// task input elements
const taskInput = document.getElementById("input-task");
const addTask = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

//focus-timer elements

const timerInput = document.getElementById("timer-input");
const focusStart = document.getElementById("focus-start-btn");
const focusPause = document.getElementById("focus-pause-btn");
const focusReset = document.getElementById("focus-reset-btn");
const timerDisplay = document.getElementById("focus-display");

// stopwatch elements

const stpwatchStart = document.getElementById("stopwatch-start-btn");
const stpwatchPause = document.getElementById("stopwatch-pause-btn");
const stpwatchReset = document.getElementById("stopwatch-reset-btn");
const stpwatchTimer = document.getElementById("stopwatch-display");

// add task function
function addNewTask() {
    const task = taskInput.value.trim(); // here trim() removes white spaces
    if (task === "") {
        alert("please eanter a to-do list");
        return;
    }
    console.log("New Task Added:", task);
    const li = document.createElement("li");
    li.innerHTML = `<span class = "task-text">${task}</span>
    <button class = "delete-btn">X</button>`;
    taskList.appendChild(li);
    taskInput.value = "";
};

// add btn function
addTask.addEventListener("click", addNewTask);
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addNewTask();
    }
})

// delete btn

function deleteTask(e) {
    if (e.target.classList.contains("delete-btn")) { //element.classList.contains("class-name")
        const li = e.target.parentElement;
        taskList.removeChild(li);
    } else if (e.target.classList.contains("task-text")) {
        const li = e.target.parenElement;
        li.classList.toggle("complete");

    }
}
//calling the delete function
taskList.addEventListener("click", deleteTask);


//timer function
let timerInterval;
let timerSeconds =0;
let isTimerRunning = false;

// timer update function
function updateTimerDisplay() {
    
     if (isNaN(timerSeconds) || timerSeconds < 0) {
        timerSeconds = 0; // invalid হলে 0 করে দাও
    }
    const minute = Math.floor(timerSeconds / 60);
    const second = timerSeconds % 60;
    timerDisplay.textContent = ` ${minute.toString().padStart(2, '0')} : ${second.toString().padStart(2, '0')}`;

}

function startTimer() {
    if (isTimerRunning) return;// যদি টাইমার আগে থেকেই চলে, তাহলে কিছু হবে না
     
    // যদি টাইমার রিসেট অবস্থায় থাকে, তাহলে ইনপুট থেকে নতুন সময় নাও
    if (timerSeconds = parseInt(timerInput.value) * 60 || timerSeconds === 0) {

        const inputMinutes = parseInt(timerInput.value);
        if (isNaN(inputMinutes) || inputMinutes <= 0) {
            alert("Please enter a valid number of minutes.");
            return;
        }
        timerSeconds = inputMinutes * 60;
    }


    isTimerRunning = true;
    timerInput.disabled=true; // টাইমার চলাকালীন ইনপুট বক্স ডিজেবল থাকবে
    timerInterval = setInterval(()=>{
        if(timerSeconds > 0){
            timerSeconds--;
            updateTimerDisplay();
        }else{
            clearInterval(timerInterval);
            isTimerRunning=false;
            timerInput.disabled = false;
            alert("Time's up!");
        }
    },1000)
}
 //pause function
function pauseTimer(){
clearInterval(timerInterval)
isTimerRunning=false
timerInput.disabled = false;
}

// reset function
function resetTimer(){
    clearInterval(timerInterval)
    isTimerRunning=false
    timerInput.disabled = false;
    const inputMinutes = parseInt(timerInput.value);

    if(isNaN(inputMinutes)|| inputMinutes<=0){
        timerSeconds = 0 * 60;
        timerInput.value = 0 ;
    }else{
         
        timerSeconds = inputMinutes * 60;
    }
    updateTimerDisplay();

}

focusStart.addEventListener('click',startTimer);
focusPause.addEventListener('click',pauseTimer);
focusReset.addEventListener('click',resetTimer);
updateTimerDisplay();


// stop watch display

let stopwatch;
let stopwatchSeconds = 0;


// ডিসপ্লে আপডেট ফাংশন
function updateStopwatchDisplay() {
    let hours = Math.floor(stopwatchSeconds / 3600);                  // মোট ঘন্টা
    let minutes = Math.floor((stopwatchSeconds % 3600) / 60);         // ঘন্টার বাকি থেকে মিনিট
    let seconds = stopwatchSeconds % 60;                              // মিনিটের বাকি থেকে সেকেন্ড

    stpwatchTimer.textContent =
        `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
}

// স্টপওয়াচ স্টার্ট
function startStopwatch() {
    clearInterval(stopwatch); // আগের interval বন্ধ
    stopwatch = setInterval(() => {
        stopwatchSeconds++;
        updateStopwatchDisplay();
    }, 1000);
}

// স্টপওয়াচ পজ
function pauseStopwatch() {
    clearInterval(stopwatch);
}

// স্টপওয়াচ রিসেট
function resetStopwatch() {
    clearInterval(stopwatch);
    stopwatchSeconds = 0;
    updateStopwatchDisplay();
}

// পেজ লোড হওয়ার সাথে সাথে ডিসপ্লে 00:00:00 দেখাবে


stpwatchStart.addEventListener("click",startStopwatch);
stpwatchReset.addEventListener("click",resetStopwatch);
stpwatchPause.addEventListener("click",pauseStopwatch);
updateStopwatchDisplay();