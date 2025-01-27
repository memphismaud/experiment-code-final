let potPin = 0; // Analog pin connected to the potentiometer
let slider;
var bgcolor;
var button; 
var input;
var nameP;
let videos = [];
let currentVideoIndex = 0;
let serial; // Variable to hold an instance of the serialport library
let potValue = 0;
//let valueDisplay; 

function preload() {
  // Load all videos into an array
  serial = new p5.SerialPort(); 
  serial.list(); 
  console.log("Listing serial ports:");
  serial.open("/dev/cu.usbmodem14201", 9600);
  serial.on('data', serialEvent);
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
 // slider = createSlider(0, 1023, 0); // Create a slider with range 0-1023
 // slider.position(10, 10); 
  nameP = createP('Your name!');
  button = createButton('go');
  //button.mousePressed(changeSize);

  slider = createSlider(10, 300, 16);
 // valueDisplay = createP("Value: 0"); 
 // valueDisplay.position(10, 50);
  input = createInput('type your name');
  videos[currentVideoIndex].loop();
}

function draw() {
  background(220);

  textSize(20);
  text("Potentiometer Value: " + potValue, 10, 50); 
  fill(255, 0, 0); 
  ellipse(map(potValue, 0, 1023, 0, width), height/2, 50, 50); 

  let inString = serial.readStringUntil('\r\n'); 
  if (inString.length > 0) {
    potValue = int(inString.trim());
  }
  //valueDisplay.html("Value: " + potValue); 

  // Draw a circle to visualize the slider position (optional)
 // fill(0);
 // ellipse(map(potValue, 0, 1023, 0, width), height/2, 20, 20); 
  image(videos[currentVideoIndex], 0, 0, width, height);
}

function mousePressed() {
  // Play the next video in the sequence
  videos[currentVideoIndex].stop(); 
  currentVideoIndex = (currentVideoIndex + 1) % videos.length; 
  videos[currentVideoIndex].loop(); 
}
