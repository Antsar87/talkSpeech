// Queries Selector
const start = document.querySelector('#start');
const box1 = document.querySelector('.box1');
const box2 = document.querySelector('.box2');
const body = document.querySelector('body');
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
  recognition.start();
  mic.start();
  t = true;
});

const talkAI = (text) => {
  const utter = new SpeechSynthesisUtterance(text);
  synth.speak(utter);
  recognition.stop();
  utter.onend = () => {
    recognition.start();
    t = true;
  };
};

recognition.onresult = (e) => {
  transcript = e.results[0][0].transcript.toLowerCase().trim();
  t = '';
  console.log(transcript);

  if (fourth === true) {
    if (
      transcript == 'ok' ||
      transcript == 'sure' ||
      transcript == 'okey' ||
      transcript == 'okay'
    ) {
      talkAI('Alright! That’s the spirit! Let’s go!');
      alert('Funciona');
      fourth = false;
      t = false;
    } else {
      transcript = '';
      talkAI('i did not hear you');
      return;
    }
  }

  if (third === true) {
    if (transcript.includes('yes')) {
      talkAI(
        'Would you like to make some music on your own? …Come on, you know you want to!'
      );
      third = false;
      fourth = true;
    } else {
      transcript = '';
      talkAI('i did not hear you');
      return;
    }
  }

  if (sec === true) {
    if (
      transcript.includes('my name is') ||
      transcript.includes('i am') ||
      transcript.includes("i'm")
    ) {
      talkAI('The pleasure is all mine! …Do you like music?');
      sec = false;
      third = true;
    } else {
      transcript = '';
      talkAI('i did not hear you');
      return;
    }
  }

  if (first === true) {
    if (transcript === 'hi' || transcript === 'hello') {
      talkAI('hello there, I’m Robert The Robot! What’s your name?');
      first = false;
      sec = true;
    } else {
      transcript = '';
      talkAI('i did not hear you');
      return;
    }
  }

  transcript = '';
};

setInterval(() => {
  if (transcript === '' && t === true) {
    talkAI('Hello');
  }
}, 20000);
