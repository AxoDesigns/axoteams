let x = 0, y = 0;
  let isMouseDown = false;

  const stopDrawing = () => { isMouseDown = false; }
  const startDrawing = event => {
      isMouseDown = true;
     [x, y] = [event.offsetX, event.offsetY];
  }
  const drawLine = event => {
      if ( isMouseDown ) {
          const newX = event.offsetX;
          const newY = event.offsetY;
          context.beginPath();
          context.moveTo( x, y );
          context.lineTo( newX, newY );
          context.stroke();
          //[x, y] = [newX, newY];
          x = newX;
          y = newY;
      }
  }
  const header = document.querySelector('header');
  const paintCanvas = document.querySelector( '#js-paint' );
  const tools = document.querySelector('.tools');

  header.width = document.documentElement.clientWidth;

  paintCanvas.width = this.window.innerWidth;
  paintCanvas.height = this.window.innerHeight - header.clientHeight ;

  const context = paintCanvas.getContext( '2d' );
  context.lineCap = 'round';

  const paintCanvas1 = document.querySelector( '#js' );
  paintCanvas1.width= document.documentElement.clientWidth;
  paintCanvas1.height= document.documentElement.clientHeight - header.clientHeight ;
  paintCanvas1.addEventListener( 'mousedown', startDrawing );
  const context1 = paintCanvas1.getContext( '2d' );
  context1.lineCap = 'round';
  context1.globalCompositeOperation = 'destination-atop';
  const lineWidthRange = document.querySelector( '.js-line-range' );
  const lineWidthLabel = document.querySelector( '.js-range-value' );

  window.addEventListener('resize', function(event){
    let img = new Image();
    img.onload = function() {
        context.drawImage(img, 0, 0);
    };
    img.src = paintCanvas.toDataURL();
    //img.src = "img/caram6.jpeg";
    //context.drawImage(img, 0, 0);
    let wdt = this.window.innerWidth;
    let hgt = document.documentElement.clientHeight - header.clientHeight
    let wd  = paintCanvas1.width;
    let ht = paintCanvas1.height;
    //let img = new Image;
    let source = paintCanvas1.toDataURL();
    paintCanvas.width = wdt;
    paintCanvas.height = document.documentElement.clientHeight - header.clientHeight;
    paintCanvas1.width= wdt;
    paintCanvas1.height= document.documentElement.clientHeight - header.clientHeight;
    context1.globalCompositeOperation = 'destination-atop';
    context.lineCap = 'round';
    context1.imageSmoothingEnabled = false;
    context.lineWidth = lineWidthRange.value;
    //img.src = source;
    //context1.drawImage(img,0,0,wd,ht);

    //context.drawImage(img,0,0,wd,ht);

  });

  paintCanvas1.addEventListener('mousemove', (e) => {
    let size = lineWidthRange.value;
    context1.beginPath();
    context1.arc(e.offsetX, e.offsetY, size, 0, Math.PI * 2);
    context1.strokeStyle = colorPicker.value;
    context1.stroke();
  });



  const goma = document.querySelector('#goma');

  goma.addEventListener('change', function (event) {
    if (goma.checked) {
      context.globalCompositeOperation = 'destination-out';
    } else {
      context.globalCompositeOperation = 'source-over';
    }
  });



  const colorPicker = document.querySelector( '.js-color-picker');

  const colorListener = function (event) {
    context.strokeStyle = event.target.value;
    console.log(event.target) // <input type="color"  class="js-color-picker  color-picker">
  }

  colorPicker.addEventListener( 'change', colorListener);




  lineWidthRange.addEventListener( 'input', event => {
      const width = event.target.value;
      lineWidthLabel.innerHTML = width;
      context.lineWidth = width;
  } );


  paintCanvas1.addEventListener( 'mousedown', startDrawing );
  paintCanvas1.addEventListener( 'mousemove', drawLine );
  paintCanvas1.addEventListener( 'mouseup', stopDrawing );
  paintCanvas1.addEventListener( 'mouseout', stopDrawing );

