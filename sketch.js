var bgcolor;
var button; 
var slider;
var input;
var nameP;
let videos = [];
let currentVideoIndex = 0;

function preload() {
  // Load all videos into an array
  videos.push(createVideo('The-Thing copy.mov'));
  videos.push(createVideo('The-thing2011 copy.mov'));
  videos.push(createVideo('The-Omen copy.mov'));
  videos.push(createVideo('The-First-Omen copy.mov'));
  videos.push(createVideo('The-Exorcist copy.mov'));
  videos.push(createVideo('Talk-To-Me copy.mov'));
  videos.push(createVideo('The-Fly copy.mov'));
  videos.push(createVideo('Smile-2 copy.mov'));
  // Hide videos by default
  for (let i = 0; i < videos.length; i++) {
    videos[i].hide();
  }
}

function setup() {
  canvas = createCanvas(700, 400);
  bgcolor = color(200);
  nameP = createP('Your name!');
  button = createButton('go');
  //button.mousePressed(changeSize);

  slider = createSlider(10, 300, 16);
  input = createInput('type your name');
  videos[currentVideoIndex].loop();
}

function draw() {
  background(220);
  image(videos[currentVideoIndex], 0, 0, width, height);
}

function mousePressed() {
  // Play the next video in the sequence
  videos[currentVideoIndex].stop(); 
  currentVideoIndex = (currentVideoIndex + 1) % videos.length; 
  videos[currentVideoIndex].loop(); 
}