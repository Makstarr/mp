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
      fermi_level_metal = document.getElementById('fermi_level_metal').style.color,
      metal = document.getElementById('metal').style.color,
      ei_level = document.getElementById('Ei_level').style.color,
      eg_fill = document.getElementById('Eg_fill').style.color,
      electrons = document.getElementById('electrons').style.color,
      disappearance_color = ('#f4f4f4'),
      electrons_border = document.getElementById('electrons_border').style.color,
      holes = document.getElementById('holes').style.color,
      holes_border = document.getElementById('holes_border').style.color;

// Canvas подготавливается к работе
var canvas = document.getElementById('n_type_carriers');
var ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;
var canvas2 = document.getElementById('p_type_carriers');
var ctx2 = canvas2.getContext('2d');
canvas2.width = 500;
canvas2.height = 500;
var width = 500;
var height = 500;

var balls2 = [],
    balls = [];

// Генератор рандомных чисел в интервале от min до max
function random(min,max)
{
  var num = Math.floor(Math.random()*(max-min)) + min;
  if(num==0)
  {
      num=random(min,max)
  }
  return num;
}

// Функция для создания одного носителя
function Ball(type,id,x, y, velX, velY,maxX,minX,minY)
{
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.size = 3.5;
  this.color = "red";
  this.b_color = "black"
  this.type = type;
  this.maxX = maxX;
  this.minX = minX;
  this.minY = minY;
  this.id=id;
}

// Функция рисующая носители на холсте
Ball.prototype.draw = function()
{
  if (this.type =='nn'|| this.type =='pn'){
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.strokeStyle = this.b_color;
  ctx.lineWidth = 1;
  ctx.arc(this.x,this.y, this.size, 0,2*Math.PI);
  ctx.fill();
  ctx.stroke();}

  if (this.type =='pp'|| this.type =='np') {
  ctx2.beginPath();
  ctx2.fillStyle = this.color;
  ctx2.strokeStyle = this.b_color;
  ctx2.lineWidth = 1;
  ctx2.arc(this.x,this.y, this.size, 0,2*Math.PI);
  ctx2.fill();
  ctx2.stroke();}
}

// Рисует злнную картинку слева s=slider.value
function Semiconductor(s){
  if (s>150){
    document.getElementById('fermi_level_metal').style.top=s*2.9+185-425+'px';
  }
  else {
    document.getElementById('fermi_level_metal').style.top=s*1.6+185-230+'px';
  }

var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');
var w = canvas.width;
var h = canvas.height;
    // Задает изменение ширины ОПЗ
var opz =  (s-120)/2;
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
  if (s>150){
    document.getElementById('fermi_level_metal').style.top=s*2.9+185-425+'px';
  }
  else {
    document.getElementById('fermi_level_metal').style.top=s*1.6+185-230+'px';
  }

var canvas = document.getElementById('canvas2');
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
//loop()

//Вывод значений напряжения и вида смещения
//QuerySelector is supported on Firefox 3.1+, IE8+ (only in IE8 standards mode), and Safari 3.1+ browsers.
//Можно использовать id или class
const slider1 = document.getElementById('n_type_slider'),
slider2 = document.getElementById('p_type_slider'),
voltsOutput1 = document.querySelector('.voltsI'),
voltsOutput2 = document.querySelector('.voltsII'),
mode = document.querySelector('.mode'),
mode2= document.querySelector('.mode2');

// Включается слайдер1
slider1.addEventListener('input', () => {
      // Подгон слайдера к значениям вольт
      voltsOutput1.textContent= ((slider1.value-150)*75/4000).toFixed(2);


      //Анимированный график n-type
      Semiconductor(slider1.value);

})
// Включается слайдер2
slider2.addEventListener('input', () => {
      voltsOutput2.textContent= ((slider2.value-150)*75/4000).toFixed(2);


      //Анимированный график p-type
      Semiconductor2(slider2.value);

})
