import React, { useRef, useState, useEffect } from 'react'

const PrintDrag = () => {
  let canvasRef = useRef();
  let [drawing, setDrawing] = useState(false);
  let [brushWeight, setbrushWeight] = useState(1);
  // box sizing toggle
  let [boxSizing, setBoxSizing] = useState(false);



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
    ctx.lineWidth = brushWeight
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  }
  function stopDrwaying() {
    setDrawing(false)
  }
  useEffect(() => {
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
    popoverTriggerList.forEach((popoverTriggerEl) => {
      new Popover(popoverTriggerEl)
    })
  }, [])
  return (
    <>
      <div className="bg-white" style={{ height: '100vh' }}>
        <div className="d-flex align-items-center justify-content-center flex-column" style={{ height: '100%' }}>
          <h1 className='text-center fw-bold'>Sketching Page</h1>

          <canvas ref={canvasRef} width={window.innerWidth} height={600} style={{ height: '600px', backgroundColor: 'grey', borderRadius: '20px' }} onMouseUp={(e) => { stopDrwaying() }} onMouseDown={(e) => { startDrawing(e) }} onMouseMove={(e) => { draw(e) }} >
          </canvas>

          <div className='p-5 position-relative bg-success mt-3 rounded-5 gap-3 d-flex align-items-center justify-content-center' style={{ minWidth: '400px', height: '100px' }}>
            {/* brush size Box */}
            {boxSizing && (
              <div className='box'>
                <div
                  className="border rounded shadow p-3 mt-2 bg-white position-absolute hidden"
                  style={{ width: '250px' ,top:"-90px"}}
                >
                  <h6>Select Brush Size</h6>

                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={brushWeight}
                    onChange={(e) => setbrushWeight(e.target.value)}
                    className="form-range"
                  />

                  <p>Selected Size: "{brushWeight}"px</p>

                  <div
                  className="border rounded-circle mx-auto"
                  style={{
                    width: `${brushWeight}px`,
                    height: `${brushWeight}px`,
                    backgroundColor: 'black'
                  }}
                />
                </div>
              </div>
            )}

            <button className='btn btn-info btn-lg' onClick={(e) => { setBoxSizing(!boxSizing) }}>
              <i class="fa-solid fa-paintbrush"></i>
            </button>

              {/* brush size Box */}
            {boxSizing && (
              <div className='box'>
                <div
                  className="border rounded shadow p-3 mt-2 bg-white position-absolute hidden"
                  style={{ width: '250px' ,top:"-90px"}}
                >
                  <h6>Select Brush Size</h6>

                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={brushWeight}
                    onChange={(e) => setbrushWeight(e.target.value)}
                    className="form-range"
                  />

                  <p>Selected Size: "{brushWeight}"px</p>

                  <div
                  className="border rounded-circle mx-auto"
                  style={{
                    width: `${brushWeight}px`,
                    height: `${brushWeight}px`,
                    backgroundColor: 'black'
                  }}
                />
                </div>
              </div>
            )}
            <button className='btn btn-info btn-lg'>
              <i class="fa-solid fa-paintbrush"></i>
            </button>
            <button className='btn btn-info btn-lg'>
              <i class="fa-solid fa-paintbrush"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default PrintDrag
