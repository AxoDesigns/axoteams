var configuracion = {
	numCirculos:257,
	radio:13,
	velocidad:2.6,
	colorCirculos:'#000000',
	randomTam:false,
	circulosConexion:false,
	lineasConexion:true,
	circulosMouse:false,
	lineasMouse:true,
	opacidadCirculo:1,
	colision:true,
	colorConexion:'#000000',
	rellenoInteraccion:true,
	velocidadColoreado:0.08,
	opacidadCircunferencia:1,
	distanciaConexion:42,
	distanciaMouse:130,
	anchoCircunferencia:1,
	anchoConexion:0.2,
	masaRandom:false,
	colorRandom:true,
	hacker:false,
	colores:['#f2abd8','#6a6869']
}

const random = (n, m) =>  {
 return Math.floor(Math.random() * (m - n) + n);
};


function distancia(x1,y1,x2,y2){
  var dx = Math.pow(x2-x1,2);
  var dy = Math.pow(y2-y1,2);
  return Math.sqrt(dx+dy);
}
function medio(x1,y1,x2,y2){
  var x = (x1+x2)/2;
  var y = (y1+y2)/2;
  return new Array(x,y);
}

function rota({x,y}, angulo) {
  var velocidadesRotadas = {
    x: x * Math.cos(angulo) - y * Math.sin(angulo), 
    y: x * Math.sin(angulo) + y * Math.cos(angulo)
  };
  return velocidadesRotadas;
}

function rota1({vx,vy}, angulo) {
  var velocidadesRotadas = {
      x: vx * Math.cos(angulo) - vy * Math.sin(angulo),
      y: vx * Math.sin(angulo) + vy * Math.cos(angulo)
  };
  return velocidadesRotadas;
}


function resuelveColision(circulo, otroCirculo) {
   var velocidadX = circulo.velocidad.x - otroCirculo.velocidad.x;
   var velocidadY = circulo.velocidad.y - otroCirculo.velocidad.y;
   var distanciaX = otroCirculo.x - circulo.x;
   var distanciaY = otroCirculo.y - circulo.y;
    if (velocidadX * distanciaX + velocidadY * distanciaY <= 0){
      var angulo = -Math.atan2(otroCirculo.y - circulo.y, otroCirculo.x - circulo.x);
      var m1 = circulo.masa;
      var m2 = otroCirculo.masa;
      var u1 = rota(circulo.velocidad, angulo);
      var u2 = rota(otroCirculo.velocidad, angulo);
      var v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
      var v2 = { x: u2.x * (m2 - m1) / (m1 + m2) + u1.x * 2 * m1 / (m1 + m2), y: u2.y };
      var vFinal1 = rota(v1, -angulo);
      var vFinal2 = rota(v2, -angulo);
      circulo.velocidad.x = vFinal1.x;
      circulo.velocidad.y = vFinal1.y;
      otroCirculo.velocidad.x = vFinal2.x;
      otroCirculo.velocidad.y = vFinal2.y;
    }

}

function randomColor(opacidad){
  return 'rgba('+random(0,256)+','+random(0,256)+','+random(0,256)+','+opacidad+')';
}
let mouseIB = { x:0 , y:0}
var posX = 0;
var posY = 0;

window.addEventListener('mousemove',function(event){
  posX = event.clientX;
  posY = event.clientY;
})
const canvas = document.querySelector('canvas') // Grab canvas from DOM
canvas.width = window.innerWidth // Set canvas' width to full width of window
canvas.height = window.innerHeight
const c = canvas.getContext('2d') // Get context to access 2D canvas functions
c.globalCompositeOperation='destination-over';


function Circulo (x,y,radio,dx,dy,color,masa,circulosConexion,lineas,circulosMouse,
  lineasMouse,opacidadCirculo,colision,colorConexion,rellenoInteraccion,velocidadColoreado,
  opacidadCircunferencia,distanciaConexion,distanciaMouse,anchoCircunferencia,
anchoConexion,hacker){
 this.x=x;
 this.y=y;
 this.velocidad = {
   x: dx,
   y: dy
 };
 this.radio=radio;
 this.color = color;
 this.masa = masa;
 this.circulosConexion = circulosConexion;
 this.lineas = lineas;
 this.circulosMouse = circulosMouse;
 this.lineasMouse = lineasMouse;
 this.opacidadCirculo = opacidadCirculo;
 this.colision = colision;
 this.colorConexion = colorConexion;
 this.rellenoInteraccion = rellenoInteraccion;
 this.velocidadColoreado = velocidadColoreado;
 this.rellenoOpacidad =  0;
 this.opacidadCircunferencia = opacidadCircunferencia;
 this.distanciaConexion = distanciaConexion;
 this.distanciaMouse=distanciaMouse;
 this.anchoCircunferencia = anchoCircunferencia;
 this.anchoConexion = anchoConexion;
 this.hacker = hacker;

 this.dibuja = function(){
   c.beginPath();

   if (!this.rellenoInteraccion) {
     c.beginPath();
     c.arc(this.x,this.y, this.radio, 0, 2 * Math.PI);
     c.save();
     c.globalAlpha = this.opacidadCirculo;
     c.fillStyle = this.color;
     c.fill();
     c.restore();
     c.save();
     c.lineWidth = this.anchoCircunferencia;
     c.globalAlpha = this.opacidadCircunferencia;
     c.strokeStyle = this.color;
     c.stroke();
     c.restore();
   }else{
     c.beginPath();
     c.arc(this.x,this.y, this.radio, 0, 2 * Math.PI);
     c.save();
     c.globalAlpha = this.rellenoOpacidad;
     c.fillStyle = this.color;
     c.fill();
     c.restore();
     c.save();
     c.lineWidth = this.anchoCircunferencia;
     c.globalAlpha = this.opacidadCircunferencia;
     c.strokeStyle = this.color;
     c.stroke();
     c.restore();
   }
   if (this.hacker) {
     c.font = this.radio+'px Comic Sans MS';
     c.fillStyle = this.color;
     c.fillText(random(100,999),this.x-this.radio,this.y-(this.radio+2))
   }

 }
 this.actualiza = function(circulos){
   for (var i = 0; i < circulos.length; i++) {

     if(this==circulos[i])
       continue;
     if (distancia(this.x,this.y,circulos[i].x,circulos[i].y) - (this.radio + circulos[i].radio) < 0) {
       if(this.colision){
        resuelveColision(this,circulos[i]);
        }
       // Color random si colisionan
       //this.color = randomColor(0.5);
       //circulos[i].color = randomColor(0.5);
     }
     if (distancia(this.x,this.y,circulos[i].x,circulos[i].y) - (this.radio + circulos[i].radio) < this.distanciaConexion) {
        c.beginPath();
        if (this.lineas) {
          c.save();
          c.lineWidth = this.anchoConexion;
          c.strokeStyle = this.colorConexion;
          c.moveTo(this.x,this.y)
          c.lineTo(circulos[i].x,circulos[i].y);
          c.closePath();
          c.stroke();
          c.restore();
        }
        if(this.circulosConexion){
          var med = medio(this.x,this.y,circulos[i].x,circulos[i].y);
          c.save();
          c.lineWidth = this.anchoConexion;
          c.beginPath();
          c.strokeStyle = this.colorConexion;
          c.arc(med[0],med[1], 3, 0, 2 * Math.PI);
          c.stroke();
          c.restore();
        }
     }

   }
   if (distancia(posX,posY,this.x,this.y) - this.radio * 2 < this.distanciaMouse) {
     if (this.lineasMouse) {
       c.save();
       c.lineWidth = this.anchoConexion;
       c.beginPath();
       c.strokeStyle = this.colorConexion;
       c.moveTo(posX,posY);
       c.lineTo(this.x,this.y);
       c.closePath();
       c.stroke();
       c.restore();
     }
     if (this.circulosMouse) {
       var med = medio(posX,posY,this.x,this.y);
       c.save();
       c.lineWidth = this.anchoConexion;
       c.beginPath();
       c.strokeStyle = this.colorConexion;
       c.arc(med[0],med[1], 3, 0, 2 * Math.PI);
       c.stroke();
       c.restore();
     }if (this.rellenoInteraccion && this.rellenoOpacidad <0.5) {
       this.rellenoOpacidad +=this.velocidadColoreado;
     }

   }else if(this.rellenoInteraccion) {
     this.rellenoOpacidad -= 0.02;
     this.rellenoOpacidad = Math.max(this.rellenoOpacidad,0);

   }
   if(this.x +this.radio >innerWidth || this.x-this.radio < 0){
     this.velocidad.x*=-1;
   }
   if(this.y +this.radio >innerHeight || this.y-this.radio < 0){
     this.velocidad.y*=-1;
   }
   
   this.y-=this.velocidad.y;
   this.x-=this.velocidad.x;
   this.dibuja();
 }
}

var circulos =[];
function rellenaCirculos(){
  circulos=[]
  for (var i = 0; i < configuracion.numCirculos; i++) {  
    var radio = configuracion.randomTam?random(1,configuracion.radio):parseInt(configuracion.radio);
    var colorC = configuracion.colorRandom ? (configuracion.colores.length == 0? randomColor(1):configuracion.colores[random(0,configuracion.colores.length)]): configuracion.colorCirculos;
    var colorConexion = configuracion.colorRandom ? colorC:configuracion.colorConexion;
    var x = random(radio,innerWidth-radio);
    var y = random(radio,innerHeight-radio);
    var dx = random(-1,2) == 0? random(1,configuracion.velocidad*10+1)/10: -random(1,configuracion.velocidad*10+1)/10;
    var dy = random(-1,2) == 0? random(1,configuracion.velocidad*10+1)/10: -random(1,configuracion.velocidad*10+1)/10;
    var masa = configuracion.masaRandom ? random(1,radio+1): radio;
    masa = configuracion.randomTam ? radio : masa;
    /*
      El primer circulo lo podemos generar en donde sea.
      Los siguientes si hay colision activa, los generamos
      de forma que no esten uno encima de otro.
      Si no hay colision, no nos importa si se enciman,
    */
    if (circulos.length!=0 && configuracion.colision) {
      var inicio=Date.now();
      for (var j = 0; j < circulos.length; j++) {
        if (distancia(x,y,circulos[j].x,circulos[j].y)-(radio*2)<=0) {
          x = random(configuracion.radio,innerWidth-configuracion.radio);
          y = random(configuracion.radio,innerHeight-configuracion.radio);
          j=-1
          var fin = Date.now();
          if ((fin-inicio)/1000 >= 0.1) {
            return;
          }
        }
      }
    }
    circulos.push(new Circulo(x,y,radio,dx,dy,colorC,masa,
    configuracion.circulosConexion,configuracion.lineasConexion,configuracion.circulosMouse,configuracion.lineasMouse,
    configuracion.opacidadCirculo,configuracion.colision,colorConexion,
    configuracion.rellenoInteraccion,configuracion.velocidadColoreado,configuracion.opacidadCircunferencia,
    configuracion.distanciaConexion,configuracion.distanciaMouse,
    configuracion.anchoCircunferencia,configuracion.anchoConexion,configuracion.hacker));
  }
}
function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    if(window.innerWidth > 1000){
        configuracion.numCirculos = 250;
    }
    if(window.innerWidth < 900){
            configuracion.numCirculos = 150;
        }
    if(window.innerWidth < 700){
        configuracion.numCirculos = 100;
    }
    rellenaCirculos();
}
window.addEventListener('resize', resize);
function anima(){
 requestAnimationFrame(anima);
 c.clearRect(0,0,innerWidth,innerHeight);
 circulos.map((circulo) => circulo.actualiza(circulos));
}
resize();

anima();
