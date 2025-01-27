# experiment-code-final

Arduino serial communication code

let serial; // Variable to hold an instance of the serialport library
let potValue = 0; 

function setup() {
  createCanvas(400, 200);
  // Instantiate our SerialPort object
  serial = new p5.SerialPort(); 
  // Get a list the ports available
  serial.list(); 
  console.log("Listing serial ports:");
  // Assuming our Arduino is connected to the first port, 
  // open it at a baud rate of 9600 data bits per second
  serial.open("/dev/cu.usbmodem14201", 9600); // Replace with the correct port name
  serial.on('data', serialEvent); // Callback for when new data arrives
}

function draw() {
  background(220);
  textSize(20);
  text("Potentiometer Value: " + potValue, 10, 50); 

  // Example: Map potentiometer value to control a shape
  fill(255, 0, 0); 
  ellipse(map(potValue, 0, 1023, 0, width), height/2, 50, 50); 
}

// Callback function that triggers when new data arrives
function serialEvent() {
  // Get the latest data from the serial port
  let inString = serial.readStringUntil('\r\n'); 
  if (inString.length > 0) {
    potValue = int(inString.trim()); // Convert received string to integer
  }
}

#include <Arduino.h>
#include <SoftwareSerial.h>

SoftwareSerial mySerial(10, 11); // RX, TX pins (adjust as needed)
const int potPin = A0; // Analog pin for potentiometer

void setup() {
  // Initialize serial communication
  Serial.begin(9600); 
  mySerial.begin(9600); 
}

void loop() {
  // Read potentiometer value
  int potValue = analogRead(potPin);

  // Send potentiometer value to p5.js
  mySerial.println(potValue); 

  delay(10); // Short delay for smoother readings
}
