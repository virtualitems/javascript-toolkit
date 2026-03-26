// <button id="start">Start</button>
// <button id="stop">Stop</button>

const $start = document.getElementById('start');
const $stop = document.getElementById('stop');
const recognition = new webkitSpeechRecognition();

recognition.lang = 'en-US';

recognition.continuous = true;

recognition.onstart = () => {
  console.warn('Speech recognition service has started');
};

recognition.onerror = (event) => {
  console.error(event.error);
};

recognition.onresult = (event) => {
  for (const result of event.results) {
    console.log(result[0].transcript);
  }
};

recognition.onend = () => {
  console.warn('Speech recognition service disconnected');
};

$start.addEventListener('click', () => {
  recognition.start();
});

$stop.addEventListener('click', () => {
  recognition.stop();
});
