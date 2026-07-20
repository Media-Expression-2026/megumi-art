/* =====================================================
   画像ファイル版マスコット
   images/zundanomal.png   … スタート画面(通常時)
   images/zundathink.png … 出題中(考えているとき)
   images/zundahappy.png … 正解したとき
   images/zundasurprised.png   … 不正解だったとき/低スコアの結果画面
===================================================== */
var mascotFiles = {
  idle:      'images/zundanomal.png',
  think:     'images/zundathink.png',
  happy:     'images/zundahappy.png',
  surprised: 'images/zundasurprised.png'
};

function mascotMarkup(expression){
  var file = mascotFiles[expression] || mascotFiles.idle;
  return '<img src="' + file + '" alt="ずんだもん(' + expression + ')" class="mascot-img">';
}

var startHero = document.getElementById('heroMascot');
var quizMascotEl = document.getElementById('quizMascot');
var resultMascotEl = document.getElementById('resultMascot');

function setMascot(el, expr){ el.innerHTML = mascotMarkup(expr); }
setMascot(startHero, 'idle');
setMascot(quizMascotEl, 'idle');

/* スタート画面が表示されたときに「ずんだもんクイズなのだ」を再生するのだ */
(function playTitleAudio(){
  var a = new Audio('audio/title.wav');
  a.play().catch(function(){ /* 自動再生がブロックされた場合は何もしないのだ */ });
})();

/* =====================================================
   クイズデータ
===================================================== */
var QUESTIONS = [
  {
    q: "ずんだもんの好物としてよく知られている食べものはどれなのだ？",
    choices: ["カレーライス", "たこ焼き", "ずんだ餅", "おでん"],
    answer: 2,
    good: "せいかいなのだ！ずんだもんはずんだ餅が大好きなのだ。",
    bad: "正解は「ずんだ餅」なのだ。名前のとおり大好物なのだ。"
  },
  {
    q: "ずんだもんの性別は何なのだ？",
    choices: ["男", "女", "中性", "不明"],
    answer: 1,
    good: "せいかいなのだ！ずんだもんは女なのだ。",
    bad: "正解は「女」なのだ。ずんだもんは女性のキャラクターなのだ。"
  },
  {
    q: "ずんだもんのチャームポイントである耳の形は何の形をしているのだ？",
    choices: ["さやえんどう", "大豆", "えだまめ", "ずんだ餅"],
    answer: 2,
    good: "せいかいなのだ！ずんだもんの耳はえだまめの形をしているのだ。",
    bad: "正解は「えだまめ」なのだ。ずんだもんの耳はえだまめの形をしているのだ。"
  },
  {
    q: "「ずんだもち」の材料になっている豆はどれなのだ？",
    choices: ["そらまめ", "だいず", "あずき", "えだまめ"],
    answer: 3,
    good: "せいかいなのだ！ずんだもちは枝豆をすりつぶして作るのだ。",
    bad: "ざんねん、正解は「えだまめ」なのだ。ずんだもちのもとになる豆なのだ。"
  },
  {
    q: "「ずんだ」という言葉が特に親しまれている地方はどこなのだ？",
    choices: ["北海道", "東北地方", "四国地方", "九州地方"],
    answer: 1,
    good: "せいかいなのだ！ずんだは東北、特に宮城県の郷土の味なのだ。",
    bad: "正解は「東北地方」なのだ。ずんだは宮城県などで親しまれているのだ。"
  },
  {
    q: "ずんだもちの材料の枝豆はいつの季節に収穫されるのだ？",
    choices: ["春", "夏", "秋", "冬"],
    answer: 1,
    good: "せいかいなのだ！ずんだもちの材料の枝豆は夏に収穫されるのだ。",
    bad: "正解は「夏」なのだ。さやを押したときに中の豆が飛び出すくらいが最も甘くて美味しいベストタイミングなのだ。"
  },
  {
    q: "ずんだもちが生まれたのはいつ頃からだと考えられているのだ？",
    choices: ["室町", "江戸", "明治", "昭和"],
    answer: 1,
    good: "せいかいなのだ！甘味のあるずんだが確認できるのは砂糖が出回るようになった幕末からなのだ。",
    bad: "正解は「江戸」なのだ。甘味のあるずんだが確認できるのは砂糖が出回るようになった幕末からなのだ。"
  },
  {
    q: "ずんだもんは本来「ある武器」に変身できる設定があるのだ。その武器とは何なのだ？",
    choices: ["ずんだソード（剣）", "ずんだアロー（弓）", "ずんだキャノン（大砲）", "ずんだシールド（盾）"],
    answer: 1,
    good: "せいかいなのだ！ずんだもんは弓に変身できるのだ。",
    bad: "正解は「ずんだアロー（弓）」なのだ。ずんだもんは弓に変身できるのだ。"
  },
  {
    q: "ずんだもんが「ずんだアロー」に変身したとき、誰がその弓を使うのだ？",
    choices: ["東北イタコ", "東北ずん子", "東北きりたん", "四国めたん"],
    answer: 1,
    good: "せいかいなのだ！東北ずん子がずんだアローを使うのだ。",
    bad: "正解は「東北ずん子」なのだ。ずんだもんが弓に変身したとき、彼女がその弓を使うのだ。"
  },
  {
    q: "ずんだもんが普段着ている服の胸元にあしらわれているマークは何の形なのだ？",
    choices: ["星の形", "ハートの形", "えだまめの形", "ずんだもちの形"],
    answer: 2,
    good: "せいかいなのだ！えだまめの形なのだ。",
    bad: "正解は「えだまめの形」なのだ。ずんだもんのパーカーの胸元にあしらわれているマークなのだ。"
  }
];

var TOTAL = QUESTIONS.length;
var current = 0;
var score = 0;
var podStates = new Array(TOTAL).fill('pending'); // pending | correct | wrong
var locked = false;

var screenStart = document.getElementById('screen-start');
var screenQuiz = document.getElementById('screen-quiz');
var screenResult = document.getElementById('screen-result');
var startBtn = document.getElementById('startBtn');
var retryBtn = document.getElementById('retryBtn');
var nextBtn = document.getElementById('nextBtn');
var podTrack = document.getElementById('podTrack');
var qCount = document.getElementById('qCount');
var qText = document.getElementById('qText');
var choicesEl = document.getElementById('choices');
var quizBubble = document.getElementById('quizBubble');
var playAudioBtn = document.getElementById('playAudioBtn');

var currentAudio = null;

var kanjiNum = ["1","2","3","4","5","6","7","8","9","10"];

function podSVG(){
  return '<svg viewBox="0 0 34 20"><path class="shell" d="M2 10 C2 2 12 1 17 1 C22 1 32 2 32 10 C32 18 22 19 17 19 C12 19 2 18 2 10 Z" /></svg>';
}

function playAudioFile(src){
  if(currentAudio){
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  currentAudio = new Audio(src);
  playAudioBtn.classList.add('playing');
  currentAudio.addEventListener('ended', function(){ playAudioBtn.classList.remove('playing'); });
  currentAudio.addEventListener('error', function(){ playAudioBtn.classList.remove('playing'); });
  currentAudio.play().catch(function(){
    /* 自動再生がブロックされた場合は読み上げボタンで手動再生できるのだ */
    playAudioBtn.classList.remove('playing');
  });
}

function playQuestionAudio(index){
  playAudioFile('audio/q' + (index + 1) + '.wav');
}

function playAnswerAudio(index){
  playAudioFile('audio/a' + (index + 1) + '.wav');
}

function renderPods(){
  podTrack.innerHTML = '';
  for(var i=0;i<TOTAL;i++){
    var d = document.createElement('div');
    d.className = 'pod';
    if(podStates[i] === 'correct') d.className += ' done';
    else if(podStates[i] === 'wrong') d.className += ' wrong';
    else if(i === current) d.className += ' current';
    d.innerHTML = podSVG();
    podTrack.appendChild(d);
  }
}

function renderQuestion(){
  locked = false;
  var item = QUESTIONS[current];
  qCount.textContent = 'だい' + kanjiNum[current] + 'もん / ' + TOTAL + 'もん';
  qText.textContent = item.q;
  choicesEl.innerHTML = '';
  nextBtn.classList.add('hidden');
  quizBubble.textContent = pickPrompt();
  setMascot(quizMascotEl, 'think');
  quizMascotEl.className = 'mascot-wrap bounce';

  var letters = ['A','B','C','D'];
  item.choices.forEach(function(choiceText, idx){
    var btn = document.createElement('button');
    btn.className = 'choice';
    btn.innerHTML = '<span class="mark">' + letters[idx] + '</span><span>' + choiceText + '</span>';
    btn.addEventListener('click', function(){ selectAnswer(idx, btn); });
    choicesEl.appendChild(btn);
  });

  renderPods();
  playQuestionAudio(current);
}

var prompts = [
  "よく考えるのだ〜",
  "どれが正解か分かるかなのだ？",
  "落ち着いて選ぶのだ",
  "ずんだもんも一緒に考えるのだ"
];
function pickPrompt(){
  return prompts[Math.floor(Math.random()*prompts.length)];
}

function selectAnswer(idx, btnEl){
  if(locked) return;
  locked = true;
  var item = QUESTIONS[current];
  var allBtns = choicesEl.querySelectorAll('.choice');
  var isCorrect = idx === item.answer;

  playAnswerAudio(current);

  allBtns.forEach(function(b, i){
    b.disabled = true;
    if(i === item.answer){
      b.classList.add('correct');
    } else if(i === idx && !isCorrect){
      b.classList.add('wrong');
    } else {
      b.classList.add('dim');
    }
  });

  if(isCorrect){
    score++;
    podStates[current] = 'correct';
    quizBubble.textContent = item.good;
    setMascot(quizMascotEl, 'happy');
    quizMascotEl.className = 'mascot-wrap happy-anim';
  } else {
    podStates[current] = 'wrong';
    quizBubble.textContent = item.bad;
    setMascot(quizMascotEl, 'surprised');
    quizMascotEl.className = 'mascot-wrap sad-anim';
  }
  renderPods();
  nextBtn.classList.remove('hidden');
  nextBtn.textContent = (current === TOTAL - 1) ? 'けっかを見るのだ ▶' : 'つぎへ ▶';
}

function nextQuestion(){
  if(current < TOTAL - 1){
    current++;
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult(){
  screenQuiz.classList.add('hidden');
  screenResult.classList.remove('hidden');

  var pct = score / TOTAL;
  var expr, title, rank, comment, resultAudioFile;
  if(pct === 1){
    expr = 'happy'; title = 'パーフェクトなのだ！！';
    rank = 'ランク：ずんだマスター';
    comment = '全問正解、お見事なのだ！ずんだもちを食べてお祝いするのだ〜';
    resultAudioFile = 'audio/result_perfect.wav';
  } else if(pct >= 0.7){
    expr = 'happy'; title = 'すごいのだ！';
    rank = 'ランク：ずんだ博士';
    comment = 'たくさん正解できたのだ。次はパーフェクトを目指すのだ！';
    resultAudioFile = 'audio/result_great.wav';
  } else if(pct >= 0.4){
    expr = 'idle'; title = 'なかなかなのだ';
    rank = 'ランク：ずんだ見習い';
    comment = 'まずまずの結果なのだ。もう一回チャレンジしてみるのだ！';
    resultAudioFile = 'audio/result_ok.wav';
  } else {
    expr = 'surprised'; title = 'どんまいなのだ…';
    rank = 'ランク：ずんだひよこ';
    comment = 'ちょっと難しかったのだ？もう一度挑戦して、リベンジするのだ！';
    resultAudioFile = 'audio/result_retry.wav';
  }
  setMascot(resultMascotEl, expr);
  document.getElementById('resultTitle').textContent = title;
  document.getElementById('scoreBig').innerHTML = score + '<span>/' + TOTAL + 'もん せいかい</span>';
  document.getElementById('rankBadge').textContent = rank;
  document.getElementById('resultBubble').textContent = comment;
  playAudioFile(resultAudioFile);
}

function resetGame(){
  current = 0;
  score = 0;
  podStates = new Array(TOTAL).fill('pending');
  screenResult.classList.add('hidden');
  screenQuiz.classList.remove('hidden');
  renderQuestion();
}

startBtn.addEventListener('click', function(){
  screenStart.classList.add('hidden');
  screenQuiz.classList.remove('hidden');
  renderQuestion();
});

nextBtn.addEventListener('click', nextQuestion);
retryBtn.addEventListener('click', resetGame);
playAudioBtn.addEventListener('click', function(){ playQuestionAudio(current); });