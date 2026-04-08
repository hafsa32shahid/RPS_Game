import React, { useRef, useState } from 'react'

const PrintDrag = () => {
  let canvasRef = useRef();
  let [drawing, setDrawing] = useState(false);
  let [weight, setWeight] = useState(1);


  function startDrawing(e) {
    setDrawing(true);
    let canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  }

  function draw(e) {
    if (!drawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = weight
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  }
  function stopDrwaying() {
    setDrawing(false)
  }
  return (
    <>
      <div className="bg-white" style={{ height: '100vh' }}>
       <div className="d-flex align-items-center justify-content-center flex-column" style={{height:'100%'}}>
         <h1 className='text-center fw-bold'>Sketching Page</h1>
         
         <canvas ref={canvasRef} width={window.innerWidth} height={600} style={{ height: '600px', backgroundColor: 'grey',borderRadius:'20px' }} onMouseUp={(e) => { stopDrwaying() }} onMouseDown={(e) => { startDrawing(e) }} onMouseMove={(e) => { draw(e) }} >
        </canvas>

        <div className='p-5 bg-success mt-3 rounded-5' style={{minWidth:'400px',height:'100px'}}>
            <button type="button" class="btn btn-secondary" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="top" data-bs-content="Top popover">
  Popover on top
</button>
        </div>
       </div>
      </div>
    </>
  )
}

export default PrintDrag
