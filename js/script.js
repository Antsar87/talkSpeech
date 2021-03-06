// Queries Selector
const start = document.querySelector('#start');
const box1 = document.querySelector('.box1');
const box2 = document.querySelector('.box2');
const head = document.querySelector('.head');
const head2 = document.querySelector('.head2');
const body = document.querySelector('body');

const drumtag1 = document.querySelector('#drum1');
const drumtag2 = document.querySelector('#drum2');

const pianotag1 = document.querySelector('#piano1');
const pianotag2 = document.querySelector('#piano2');

let interval;

const intervalStart = () => {
  interval = setInterval(() => {
    if (transcript === '' && t === true) {
      talkAI('Are you there?');
    }
  }, 20000);
};

drumtag1.addEventListener('click', () => {
  drumtag1.classList.toggle('high');
  drumtag2.classList.remove('high');
  drum2.pause();
  toggleInput(drum1);
});

drumtag2.addEventListener('click', () => {
  drumtag1.classList.remove('high');
  drumtag2.classList.toggle('high');
  drum1.pause();
  toggleInput(drum2);
});

pianotag1.addEventListener('click', () => {
  pianotag1.classList.toggle('high');
  pianotag2.classList.remove('high');
  piano2.pause();
  toggleInput(piano1);
});

pianotag2.addEventListener('click', () => {
  pianotag1.classList.remove('high');
  pianotag2.classList.toggle('high');
  piano1.pause();
  toggleInput(piano2);
});

// true or false
let t;
let first = true;
let sec = false;
let third = false;
let fourth = false;

// Recognition Speech
let recognition = new webkitSpeechRecognition();
const synth = window.speechSynthesis;
let transcript = '';

recognition.continuous = false;
recognition.interimResults = true;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

start.addEventListener('click', () => {
  box1.classList.add('d-none');
  box2.classList.remove('d-none');
  body.classList.remove('hidden');
  drum1.play();
  drum1.pause();
  mic.start();
  amplitude.setInput(mic);
  recognition.start();
  clearInterval(interval);
  t = true;
});

const talkAI = (text) => {
  const utter = new SpeechSynthesisUtterance(text);
  synth.speak(utter);
  recognition.stop();
  clearInterval(interval);
  utter.onend = () => {
    clearInterval(interval);
    recognition.start();
    t = true;
    intervalStart();
  };
};

recognition.onresult = (e) => {
  transcript = e.results[0][0].transcript.toLowerCase().trim();
  t = '';

  if (fourth === true) {
    if (
      transcript == 'ok' ||
      transcript == 'sure' ||
      transcript == 'okey' ||
      transcript == 'okay' ||
      transcript.includes('yes')
    ) {
      talkAI('Alright! That???s the spirit! Let???s go!');
      fourth = false;
      transcript = false;
      head.classList.add('d-none');
      head2.classList.remove('d-none');
    } else {
      transcript = '';
      talkAI('Could you repeat that?');
      return;
    }
  }

  if (third === true) {
    if (transcript.includes('yes')) {
      talkAI(
        'Would you like to make some music on your own? ???Come on, you know you want to!'
      );
      third = false;
      fourth = true;
      transcript = '';
    } else {
      transcript = '';
      talkAI('Could you repeat that?');
      return;
    }
  }

  if (sec === true) {
    if (
      transcript.includes('my name is') ||
      transcript.includes('i am') ||
      transcript.includes("i'm") ||
      transcript !== ''
    ) {
      talkAI('The pleasure is all mine! ???Do you like music?');
      sec = false;
      third = true;
      transcript = '';
    } else {
      transcript = '';
      talkAI('Could you repeat that?');
      return;
    }
  }

  if (first === true) {
    if (transcript.includes('hi') || transcript.includes('hello')) {
      talkAI('hello there, I???m Robert The Robot! What???s your name?');
      first = false;
      sec = true;
      transcript = '';
    } else {
      transcript = '';
      talkAI('Could you repeat that?');
      return;
    }
  }
};
