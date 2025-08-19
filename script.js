const questions = [
  {img:"https://upload.wikimedia.org/wikipedia/commons/0/0b/Brown_bear_%28Ursus_arctos_arctos%29_running.jpg", answer:"Bear", options:["Bear","Pig","Dog"]},
  {img:"https://upload.wikimedia.org/wikipedia/commons/2/25/NileCrocodile.jpg", answer:"Crocodile", options:["Crocodile","Bird","Cow"]},
  {img:"https://upload.wikimedia.org/wikipedia/commons/0/0c/Cow_female_black_white.jpg", answer:"Cow", options:["Cow","Chicken","Whale"]},
  {img:"https://upload.wikimedia.org/wikipedia/commons/3/32/House_sparrow04.jpg", answer:"Bird", options:["Bird","Dog","Seal"]},
  {img:"https://upload.wikimedia.org/wikipedia/commons/3/32/Chicken_1_cropped.jpg", answer:"Chicken", options:["Chicken","Bear","Deer"]},
  {img:"https://upload.wikimedia.org/wikipedia/commons/4/41/Indian_Peafowl_Pavo_cristatus_by_Dr._Raju_Kasambe_DSCN9575_%28cropped%29.jpg", answer:"Peacock", options:["Peacock","Penguin","Pig"]},
  {img:"https://upload.wikimedia.org/wikipedia/commons/0/0c/Pig_in_a_field.jpg", answer:"Pig", options:["Pig","Bear","Crocodile"]},
  {img:"https://upload.wikimedia.org/wikipedia/commons/7/7f/Seal_in_Svalbard.jpg", answer:"Seal", options:["Seal","Dog","Whale"]},
  {img:"https://upload.wikimedia.org/wikipedia/commons/f/f1/Humpback_stellwagen_edit.jpg", answer:"Whale", options:["Whale","Pig","Chicken"]},
  {img:"https://upload.wikimedia.org/wikipedia/commons/3/32/Golden_retriever_eating_pigs_foot.jpg", answer:"Dog", options:["Dog","Cow","Penguin"]},
  {img:"https://upload.wikimedia.org/wikipedia/commons/b/b5/Red_deer_stag_2009_denmark.jpg", answer:"Deer", options:["Deer","Bear","Seal"]},
  {img:"https://upload.wikimedia.org/wikipedia/commons/e/e0/Penguins_walking_-Moltke_Harbour%2C_South_Georgia%2C_British_overseas_territory%2C_UK-8.jpg", answer:"Penguin", options:["Penguin","Dog","Peacock"]},
  {img:"https://upload.wikimedia.org/wikipedia/commons/a/a9/Polar_Bear_-_Alaska.jpg", answer:"Polar Bear", options:["Polar Bear","Whale","Cow"]},
  {img:"https://upload.wikimedia.org/wikipedia/commons/9/9d/Capra_ibex_standing.jpg", answer:"Goat", options:["Goat","Chicken","Dog"]},
  {img:"https://upload.wikimedia.org/wikipedia/commons/3/3c/Cockroach_closeup.jpg", answer:"Cockroach", options:["Cockroach","Cow","Seal"]},
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
