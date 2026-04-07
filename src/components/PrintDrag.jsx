import React, { useRef, useState } from 'react'

const PrintDrag = () => {
   let canvasRef = useRef();
   let [drawing,setDrawing] = useState(false);
  
   function startDrawing(e){
      setDrawing(true);
      draw(e)
   }

   function draw(e){
    if(!drawing) return
    let canvas = canvasRef.current;
     const ctx = canvas.getContext("2d");
     ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    //  ctx.arc(e.nativeEvent.offsetX,  e.nativeEvent.offsetY, 10, 0, 2 * Math.PI);
     console.log(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
    //  ctx.arc()
     ctx.stroke()

   }
   function stopDrwaying(){
    setDrawing(false)
   }
  return (
    <>
      <div className="container bg-white" style={{height:'100vh'}}>
        <canvas ref={canvasRef} style={{height:'500px',width:'500px',backgroundColor:'red'}} onMouseLeave={(e)=>{stopDrwaying()}} onMouseDown={(e)=>{startDrawing(e)}} >
            
        </canvas>
      </div>
    </>
  )
}

export default PrintDrag
