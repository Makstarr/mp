/*   Анимации зонных диаграмм для МП структур
     c полупроводниками p и n типа
     Напряжение изменяется слайдером
     Носители задаются в рандомных координатах с выбранными границами
     Движение носителей зависит от приложенного напряжения
     Все построения сделаны на canvas
*/
// Цвета для canvas берутся из html документа (можно задать цвета этим переменным)

const
      fermi_level = document.getElementById('fermi_level').style.color,
      fermi_level_metal_0volts = document.getElementById('fermi_level_metal_0volts').style.color,
      eg_border = document.getElementById('Eg_border').style.color,
      arrows = document.getElementById('arrows').style.color,
      arrows_b = document.getElementById('arrows_border').style.color,
      metal = document.getElementById('metal').style.color,
      ei_level = document.getElementById('Ei_level').style.color,
      eg_fill = document.getElementById('Eg_fill').style.color,
      electrons = document.getElementById('electrons').style.color,
      disappearance_color = ('#f4f4f4'),
      electrons_border = document.getElementById('electrons_border').style.color,
      holes = document.getElementById('holes').style.color,
      holes_border = document.getElementById('holes_border').style.color;


var balls2 = [],
    balls = [];

var canvases = document.getElementsByClassName('carriers');
var canvasSize = document.documentElement.clientWidth;
// Генератор рандомных чисел в интервале от min до max
function random(min,max)
{
  var num = Math.floor(Math.random()*(max-min)) + min;
  /*if(num==0)
  {
      num=random(min,max)
  }*/
  return num;
}

// Функция для создания одного носителя
function Ball(type,id,x, y, velX, velY,maxX,minX,minY)
{
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.size = 6;
  this.color = "red";
  this.b_color = "black"
  this.type = type;
  this.maxX = maxX;
  this.minX = minX;
  this.minY = minY;
  this.id=id;
}



// Функция рисующая носители на холсте
Ball.prototype.draw = function(ctx, i)
{
  // Canvas подготавливается к работе
  ctx.beginPath();
  if (this.type=='p'){
      ctx.fillStyle = holes
      ctx.strokeStyle = holes_border
    }
    if (this.type=='n'){
      ctx.fillStyle = electrons
      ctx.strokeStyle = electrons_border
    }

  ctx.lineWidth = 1;
  ctx.arc(this.x,this.y, this.size, 0,2*Math.PI);

  if(this.x-this.size>=200 && this.y >= (this.x+this.size-296)/1.8+150 && this.y <= -(this.x+this.size-296)/1.8+150 )
  {
    if(this.type == 'p' && i>=3){
    ctx.fill();
    ctx.stroke();
    }
    if(this.type == 'n' && i<3)  {
      ctx.fill();
      ctx.stroke();
    }
  }
  if(this.x<200-this.size && this.y >= 130 && this.y <= 180 )
  {
    if(this.type == 'p' && i>=3){
    ctx.fill();
    ctx.stroke();
    }
    if(this.type == 'n' && i<3) {
      ctx.fill();
      ctx.stroke();
    }
  }
}

// Фунцкия определяющая пересещение носителей по холсту
Ball.prototype.update = function(i){
    let s = document.querySelector('#n_type_slider').value;
    let s2 = document.querySelector('#p_type_slider').value;

    // Электроны n-типе
    if (this.type == 'n')
    {
      if(this.x-this.size<=0)
      {
        this.velX = random(1,2)
      }
      if(this.x>=295-this.size)
      {
        this.x = -random(0,-2)
        this.velX = random(1,2)
        this.velY = random(-1,1)
        this.y = random(100,280)
      }
    }
    if (this.type == 'p')
    {

      if(this.x<5+this.size)
      {
        this.x = 305;
        this.velX = -random(1,2)
        this.velY = random(-1,1)
        this.y = random(100,280)
      }
      if(this.x>=295-this.size)
      {
        this.velX = -random(0,2)
      }
    }
    if(this.y<=80)
    {
      this.velY = random(0,2)
    }

    if(this.y>=220)
    {
      this.velY = -random(0,2)
    }

    // Обновление коодинат в соответствии с условиями
    this.x += this.velX;
    this.y += this.velY;
}

// Функция создающая массив содержащий все носители и запускающая анимации
function loop(){
  for(let i = 0; i < canvases.length; i++) {
      let ctx = canvases[i].getContext('2d');

    ctx.clearRect(0,0,1000,1000);
    ctx.beginPath()
    ctx.moveTo(2,125)
    ctx.lineTo(198,125)
    ctx.lineTo(198,85)
    ctx.lineTo(295,150)
    ctx.lineTo(198,215)
    ctx.lineTo(198,185)
    ctx.lineTo(2,185)
    ctx.closePath()
    ctx.strokeStyle = arrows_b;
    ctx.fillStyle = arrows;
    ctx.lineWidth = 4;
    ctx.fill();
    ctx.stroke();
    // n в n
    while (balls.length < 200)  {
        var ball = new Ball(
        'n',           //type
        'id',
        random(0,300),//x
        random(0,300),//y
        random(1,2),   //velX
        random(-1,1),   //velY
        random(300,350),//maxX
        random(220,220),
        random(110,140)
        );
       balls.push(ball);
    }
    while (balls.length < 400)  {
        var ball = new Ball(
        'p',           //type
        'id',
        random(0,300),//x
        random(0,300),//y
        -random(1,2),   //velX
        random(-1,1),   //velY
        random(300,350),//maxX
        random(220,220),
        random(110,140)
        );
       balls.push(ball);
    }

    // Рисование и обновление
    for (var ii = 0; ii < balls.length; ii++)
    {
      balls[ii].draw(ctx,i);
      balls[ii].update(i);
     }
     ctx.beginPath()
     ctx.moveTo(2,125)
     ctx.lineTo(198,125)
     ctx.lineTo(198,85)
     ctx.lineTo(295,150)
     ctx.lineTo(198,215)
     ctx.lineTo(198,185)
     ctx.lineTo(2,185)
     ctx.closePath()
     ctx.strokeStyle = arrows_b;
     ctx.lineWidth = 4;
     ctx.stroke();
}
    requestAnimationFrame(loop);
}

// Рисует злнную картинку слева s=slider.value
function Semiconductor(s){
var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');
var w = canvas.width;
var h = canvas.height;
    // Задает изменение ширины ОПЗ
var opz =  -(s-120)/2;
ctx.clearRect(0,0,w,h);
ctx.beginPath();
    ctx.moveTo(-5, -5);
    ctx.lineTo(220,-5);
    ctx.lineTo(220,500);
    ctx.lineTo(-5, 500);
    // Рисует запрещенную зону
    ctx.lineWidth ="1.5";
    ctx.fillStyle = metal;
    ctx.strokeStyle = eg_border;
    ctx.fill();
    ctx.stroke();

   // Задает запрещенную зону
ctx.beginPath();
    ctx.moveTo(220, 120);
    ctx.quadraticCurveTo(270+opz,200+(-s+150),350+opz,200+(-s+150))
    ctx.lineTo(w+10,200+(-s+150));
    ctx.lineTo(w+10,385+(-s+150));
    ctx.lineTo(350+opz, 385+(-s+150));
    ctx.quadraticCurveTo(270+opz, 385+(-s+150),220,305);
ctx.closePath();

    // Рисует запрещенную зону
    ctx.lineWidth ="2";
    ctx.strokeStyle = eg_border;
    ctx.fillStyle = eg_fill;
    ctx.fill();
    ctx.stroke();
/*
//ОПЗ
ctx.beginPath();
    ctx.moveTo(350+opz,-5)
    ctx.lineTo(350+opz,505)

    ctx.strokeStyle=fermi_level_metal_0volts;
    ctx.lineWidth ="1"
    ctx.stroke();
*/

//Задает и рисует уровень ферми
ctx.beginPath();
    for(var f=350+opz;f<500;f=f+5)
    {
    //В полупроводнике
        ctx.moveTo(-(-f) ,  220+(-s+150))
        f=f+10;
        ctx.lineTo(-(-f),  220+(-s+150))
    }
    ctx.strokeStyle=fermi_level;
    ctx.lineWidth ="2"
    ctx.stroke();
ctx.beginPath();
    for(var f=-3;f<215;f=f+5)
    {
    //В металле
    ctx.moveTo(2-(-f) ,  220)
    f=f+10;
    ctx.lineTo(2-(-f),  220)
    ctx.strokeStyle=fermi_level_metal_0volts;
    ctx.lineWidth ="2"
    ctx.stroke();
    }
/*
ctx.beginPath();
      for(var f=-3;f<215;f=f+5)
      {
      //В металле
      ctx.moveTo(2-(-f) ,  220+(-s+150))
      f=f+10;
      ctx.lineTo(2-(-f),  220+(-s+150))
      ctx.strokeStyle=fermi_level_metal;
      ctx.lineWidth ="2"
      ctx.stroke();
      }
*/
}
// Рисует злнную картинку справа s=slider.value
function Semiconductor2(s){
var canvas = document.getElementById('canvas2');
var ctx = canvas.getContext('2d');
var w = canvas.width;
var h = canvas.height;
    // Задает изменение ширины ОПЗ
var opz =  -(120-s)/2;
ctx.clearRect(0,0,w,h);
ctx.beginPath();
    ctx.moveTo(-5, -5);
    ctx.lineTo(220,-5);
    ctx.lineTo(220,500);
    ctx.lineTo(-5, 500);
    // Рисует запрещенную зону
    ctx.lineWidth ="1.5";
    ctx.fillStyle = metal;
    ctx.strokeStyle = eg_border;
    ctx.fill();
    ctx.stroke();

   // Задает запрещенную зону
ctx.beginPath();
    ctx.moveTo(220, 160);
    ctx.quadraticCurveTo(270+opz,100+(-s+150),350+opz,100+(-s+150))
    ctx.lineTo(w+10,100+(-s+150));
    ctx.lineTo(w+10,285+(-s+150));
    ctx.lineTo(350+opz, 285+(-s+150));
    ctx.quadraticCurveTo(270+opz, 285+(-s+150),220,345);
ctx.closePath();

    // Рисует запрещенную зону
    ctx.lineWidth ="2";
    ctx.strokeStyle = eg_border;
    ctx.fillStyle = eg_fill;
    ctx.fill();
    ctx.stroke();
/*
//ОПЗ
ctx.beginPath();
    ctx.moveTo(350+opz,-5)
    ctx.lineTo(350+opz,505)

    ctx.strokeStyle=fermi_level_metal_0volts;
    ctx.lineWidth ="1"
    ctx.stroke();
*/

//Задает и рисует уровень ферми
ctx.beginPath();
    for(var f=350+opz;f<500;f=f+5)
    {
    //В полупроводнике
        ctx.moveTo(-(-f) ,  270+(-s+150))
        f=f+10;
        ctx.lineTo(-(-f),  270+(-s+150))
    }
    ctx.strokeStyle=fermi_level;
    ctx.lineWidth ="2"
    ctx.stroke();
ctx.beginPath();
    for(var f=-3;f<215;f=f+5)
    {
    //В металле
    ctx.moveTo(2-(-f) ,  270)
    f=f+10;
    ctx.lineTo(2-(-f),  270)
    ctx.strokeStyle=fermi_level_metal_0volts;
    ctx.lineWidth ="2"
    ctx.stroke();
    }
/*
ctx.beginPath();
      for(var f=-3;f<215;f=f+5)
      {
      //В металле
      ctx.moveTo(2-(-f) ,  220+(-s+150))
      f=f+10;
      ctx.lineTo(2-(-f),  220+(-s+150))
      ctx.strokeStyle=fermi_level_metal;
      ctx.lineWidth ="2"
      ctx.stroke();
      }
*/
}

// Вызов функций для прорисовки до использования слайдера
Semiconductor(document.querySelector('#n_type_slider').value);
Semiconductor2(document.querySelector('#p_type_slider').value);
loop()

//Вывод значений напряжения и вида смещения
//QuerySelector is supported on Firefox 3.1+, IE8+ (only in IE8 standards mode), and Safari 3.1+ browsers.
//Можно использовать id или class
const slider1 = document.getElementById('n_type_slider'),
slider2 = document.getElementById('p_type_slider'),
voltsOutput1 = document.querySelector('.voltsI'),
voltsOutput2 = document.querySelector('.voltsII'),
mode = document.querySelector('.mode'),
mode2= document.querySelector('.mode2'),
arrow1 = document.getElementById('arrow1'),
arrow2 = document.getElementById('arrow2'),
arrow3 = document.getElementById('arrow3'),
arrow4 = document.getElementById('arrow4');


// Включается слайдер1
slider1.addEventListener('input', () => {
      // Подгон слайдера к значениям вольт
      if(slider1.value<150){
      voltsOutput1.textContent= 'Прямое смещение';
    }
    if(slider1.value>150){
      voltsOutput1.textContent= 'Обратное смещение';
    }
      //Анимированный график n-type
      arrow3.style.width = arrow3.style.height =  slider1.value/4.8 +"%";
      arrow3.style.top =  20 - (slider1.value/5)/2 - slider1.value/30 +"%";
      Semiconductor(slider1.value);

})
// Включается слайдер2
slider2.addEventListener('input', () => {
  if(slider2.value<150){
  voltsOutput2.textContent= 'Прямое смещение';
}
if(slider2.value>150){
  voltsOutput2.textContent= 'Обратное смещение';
}
      //Анимированный график p-type
      arrow4.style.width = arrow4.style.height = 30 + 150/5 - slider2.value/5 +"%";
      arrow4.style.bottom =  15 - (30 + 150/5 - slider2.value/5)/2 +slider2.value/30 +"%";
      Semiconductor2(slider2.value);

})
