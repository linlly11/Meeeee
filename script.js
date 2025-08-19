const questions = [
  {img:"https://www.pexels.com/th-th/photo/3634926/", answer:"Bear", options:["Bear","Pig","Dog"]},
  {img:"https://www.pexels.com/th-th/photo/60644/", answer:"Crocodile", options:["Crocodile","Bird","Cow"]},
  {img:"https://www.pexels.com/th-th/photo/33550/", answer:"Cow", options:["Cow","Chicken","Whale"]},
  {img:"https://www.pexels.com/th-th/photo/1661179/", answer:"Bird", options:["Bird","Dog","Seal"]},
  {img:"https://www.pexels.com/th-th/photo/375510/", answer:"Chicken", options:["Chicken","Bear","Deer"]},
  {img:"https://www.pexels.com/th-th/photo/638738/", answer:"Peacock", options:["Peacock","Penguin","Pig"]},
  {img:"https://www.pexels.com/th-th/photo/110820/", answer:"Pig", options:["Pig","Bear","Crocodile"]},
  {img:"https://www.pexels.com/th-th/photo/3187036/", answer:"Seal", options:["Seal","Dog","Whale"]},
  {img:"https://www.pexels.com/th-th/photo/3635870/", answer:"Whale", options:["Whale","Pig","Chicken"]},
  {img:"https://www.pexels.com/th-th/photo/1619690/", answer:"Dog", options:["Dog","Cow","Penguin"]},
  {img:"https://www.pexels.com/th-th/photo/34231/", answer:"Deer", options:["Deer","Bear","Seal"]},
  {img:"https://www.pexels.com/th-th/photo/52509/", answer:"Penguin", options:["Penguin","Dog","Peacock"]},
  {img:"https://www.pexels.com/th-th/photo/53425/", answer:"Polar Bear", options:["Polar Bear","Whale","Cow"]},
  {img:"https://www.pexels.com/th-th/photo/aedes-albopictus-86722/", answer:"Mosquito", options:["Mosquito","Mosqito","Dog"]},
  {img:"https://www.pexels.com/th-th/photo/11362662/", answer:"Cockroach", options:["Cockroach","Cockrooach","Cokroach"]},
];

let currentQ = 0;
let score = 0;
let timer;
let timeLeft = 5;

const imgEl = document.getElementById("question-image");
const optionsEl = document.getElementById("options");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const nextBtn = document.getElementById("nextBtn");
const resultEl = document.getElementById("result");

function loadQuestion(){
  let q = questions[currentQ];
  imgEl.src = q.img;
  optionsEl.innerHTML = "";
  q.options.sort(()=>Math.random()-0.5).forEach(opt => {
    let btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = ()=>checkAnswer(opt);
    optionsEl.appendChild(btn);
  });
  nextBtn.classList.add("hidden");
  resetTimer();
}

function checkAnswer(answer){
  let correct = questions[currentQ].answer;
  if(answer === correct){
    score++;
  } else {
    score -= 2;
  }
  scoreEl.textContent = score;
  stopTimer();
  nextBtn.classList.remove("hidden");
  Array.from(optionsEl.children).forEach(btn => btn.disabled = true);
}

function nextQuestion(){
  currentQ++;
  if(currentQ < questions.length){
    loadQuestion();
  } else {
    endGame();
  }
}

function resetTimer(){
  clearInterval(timer);
  timeLeft = 5;
  timeEl.textContent = timeLeft;
  timer = setInterval(()=>{
    timeLeft--;
    timeEl.textContent = timeLeft;
    if(timeLeft <= 0){
      clearInterval(timer);
      score -= 2; // หมดเวลา = ผิด
      scoreEl.textContent = score;
      nextBtn.classList.remove("hidden");
      Array.from(optionsEl.children).forEach(btn => btn.disabled = true);
    }
  },1000);
}

function stopTimer(){
  clearInterval(timer);
}

function endGame(){
  document.getElementById("quiz").classList.add("hidden");
  resultEl.classList.remove("hidden");
  resultEl.innerHTML = `<h2>จบเกมแล้ว!</h2><p>คะแนนรวม: ${score}</p>`;
}

nextBtn.onclick = nextQuestion;
loadQuestion();
