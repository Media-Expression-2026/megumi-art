let simpleShader;

let img0;

function preload(){
  // Load the shader
  simpleShader = loadShader('basic.vert', 'basic.frag');
  
  // Load the image
  img0 = loadImage("IMG_9045.png");  
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(500, 500, WEBGL);
}

function draw() {  

  // shader() sets the active shader with our shader
  shader(simpleShader);
  
  const mx = map(mouseX, 0, width, 0, 1);
  const my = map(mouseY, 0, height, 0, 0.2);
  
  // Send the image to the shader
  simpleShader.setUniform("uTexture0", img0);
  simpleShader.setUniform("uScale", [mx, my]);

  // rect gives us some geometry on the screen
  rect(0,0,width, height);
  
}
