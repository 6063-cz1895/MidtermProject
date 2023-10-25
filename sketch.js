// Define arrays and variables globally
//define the array for (evil) circles
let circles = [];
// Define a variable for the button color
let buttonColor;
// Set the boolean of the button to false initially
let isButtonPressed = false;
// Define the radius for button (john coffey's head)
let buttonRadius = 70;
// Declare a variable for my custom font
let myFont;
// Declare variables for color values for global
let GMGreen, JCSkin, GMYellow, JailGrey;

// Define the initial status of halo for its height,width,velocity
let halo = {
  h: 0, 
  w: 0,  
  v: 0  
};

// Preload function to load my custom font before setup()
function preload() {
  myFont = loadFont('myFont.TTF');
}

// Setup:
function setup() {
  // Create canvas
  createCanvas(1920, 1080);
  // Set white background
  background(255);

  // Define color using the color() function
  GMGreen = color(0, 146, 69);
  JCSkin = color(96, 56, 19);
  GMYellow = color(255, 240, 0);
  JailGrey = color(51, 51, 51);

  // Set the initial button color to JCSkin
  buttonColor = JCSkin;

  // Seed the random number generator for consistency
  randomSeed(99);

  // Set the velocity for the halo effect
  halo.v = 1; 
}

// Custom function 'Lamp' to draw a lamp object
function Lamp(xLamp, yLamp) {
  // Draw the lamp's bulb
  fill(GMYellow);
  ellipse(xLamp, yLamp + 81, 54);
  // Draw the lamp's shell
  fill(102, 102, 102);
  noStroke();
  beginShape();
  vertex(xLamp, yLamp);
  vertex(xLamp - 71, yLamp + 81);
  vertex(xLamp + 71, yLamp + 81);
  endShape(CLOSE);
  // Draw the lamp's wire
  fill(102, 102, 102);
  rectMode(CENTER);
  rect(xLamp, yLamp - 203, 8, 414);
}

// Draw function
function draw() {
  // draw Background
  background(103);
  noStroke();
  // Draw book with rectangle
  fill(255);
  rect(960, 540, 720, 1080);
  // Draw the back of the jail cell with rect
  fill(0);
  rect(960, 646.5, 720, 493);
  // Draw walls of jail cell with rectangles
  fill(JailGrey);
  rect(960, 375, 720, 50);
  rect(960, 918, 720, 50);

  // Draw John Coffey's body
  fill(JCSkin);
  rect(960, 746.75, 151, 273.5, 20);

  // Draw the head John Coffey (button) color=button color
  fill(buttonColor);
  ellipse(961, 541, 2*buttonRadius);

  // Draw halo on his head
  strokeWeight(10);
  stroke(GMYellow);
  noFill();
  // add an logic for animation of the halo, if button is pressed, the height and width will keep increase untill 40 and 130. Using min(), else they are zero
  if (isButtonPressed) {
    halo.h = min(halo.h + halo.v, 40);
    halo.w = min(halo.w + halo.v * 3, 130);
  } else {
    halo.h = 0;
    halo.w = 0;
  }
  //draw the halo using ellipse
  ellipse(961, 448, halo.w, halo.h);

  // Draw jail bar using for loop
  for (let x = 656; x < 1320; x += 85) {
    noStroke();
    fill(51, 51, 51);
    rect(x, 657.5, 21, 541);
  }

  // Draw John's hands using ellipses
  fill(JCSkin);
  ellipse(835, 639, 76);
  ellipse(1085, 639, 76);

  // Draw lamp using the function we created
  Lamp(1150, 403);
  Lamp(761, 311);

  // Draw title and author using the custom font (define Fill, font, size, text...)
  fill(GMGreen);
  textFont(myFont);
  textSize(72);
  textAlign(CENTER, CENTER);
  text("The", 976, 119);
  textSize(150);
  text("Green Mile", 961, 217);
  textSize(43);
  text("By Stephen King", 1151, 975);

  // Create circles at random positions on the "book cover"'s area
  //The code is repeated every 30 frames (using frameCount), if reaches the time, let circle at random position on book cover and random size between 10-40
  // Using push to add the newly created circle object to the 'circles' array.
  if (frameCount % 30 == 0) { 
    let circle = {
      x: random(620, 1300),
      y: random(height),
      r: random(10, 40)
    };
    circles.push(circle);
  }

  circles = circles.filter(c => c.r > 0);// Use the filter() function to remove circles when c.r == 0

  // Creating the the logic for the evil circle
  fill(132, 138, 0);//Evil circle color
  for (let i = 0; i < circles.length; i++) {//Create for loop for the circle
    let c = circles[i];//create variable for the circle array
    //Wirte the logic: if button is pressed, calculate the distance between the circle and the button(using dist), if distance is less than 10, make its radius 0
    //else caculate the θ using the function (which is also a formula) θ=atan2(y,x), using θ, we can caululate sin(θ) and cos(θ) which is its speed on x and y direction 
    //(sketch attached in readme)
    if (isButtonPressed) {
      let distance = dist(c.x, c.y, 961, 541);
      if (distance < 10) {
        c.r = 0;
      } else {
        let angle = atan2(541 - c.y, 961 - c.x);
        c.x += cos(angle) * 5;
        c.y += sin(angle) * 5;
      }
    }
    //whatever the button is pressed or not. For the circle, as long as its r is larger than 0 it would be drawn
    if (c.r > 0) {
      ellipse(c.x, c.y, c.r * 2, c.r * 2);
    }
  }
}

// Function for mouse press event to check if the mouse is pressed on the button
function mousePressed() {
  // Again using dist to check if the mouse is on the button (if the distance between mouse and the button center is smaller than the radius of the button)
  if (dist(mouseX, mouseY, 961, 541) <= buttonRadius) {
    isButtonPressed = true;    // If this is true
    buttonColor = color(159, 121, 0); //change the button color
  }
}

// Function to handle mouse release events (Reset the button state and color when the mouse is released)
//if the current status is button is pressed, set the status to false and set the button color to skin color
function mouseReleased() {
  if (isButtonPressed) {
    isButtonPressed = false;
    buttonColor = JCSkin;
  }
}