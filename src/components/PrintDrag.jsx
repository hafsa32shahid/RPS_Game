import React, { useRef, useState, useEffect } from 'react'

const PrintDrag = () => {
  let canvasRef = useRef();
  // saving current canvas
  const history = useRef([]);
  const currentIndex = useRef(-1);
  let sizeBoxRef = useRef();
  let colorBoxRef = useRef();
  let [drawing, setDrawing] = useState(false);
  let [brushWeight, setbrushWeight] = useState(1);
  // box sizing toggle
  let [boxSizing, setBoxSizing] = useState(false);
  //color box toggle
  let [colorBox, setColorBox] = useState(false);
  // erase toggle
  let [erase, setErase] = useState(false);
  // paint color toggle
  let [color, setColor] = useState("black");


// start the drawing when click on canvas
  function startDrawing(e) {
    setDrawing(true);
    let canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  }
// draw the drawing when move after click on canvas
  function draw(e) {
    if (!drawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = brushWeight;
    if (erase) {
      ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      ctx.strokeStyle = "grey"
      ctx.stroke();
    } else {
      ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      ctx.strokeStyle = color
      ctx.stroke();
    }

  }
  //  stop drawing when click up mean when click leave click state 
  function stopDrwaying() {
    setDrawing(false)
    // saving history of canvas 
    const canvas = canvasRef.current;
    history.current.push(canvasRef.current.toDataURL());
    currentIndex.current = history.current.length - 1;
  }
  // handle outside click for some box
    function handleClick(e) {
      if (sizeBoxRef.current && !sizeBoxRef.current.contains(e.target)) {
        setBoxSizing(false);
      }

      if (colorBoxRef.current && !colorBoxRef.current.contains(e.target)) {
        setColorBox(false);
      }
    }

    // handling previous state back
    function HandleCanvasState(ImageData){
      const canvas = canvasRef.current;
      let ctxt = canvas.getContext('2d')

      const img = new Image();
      img.src = ImageData;

      img.onload = ()=>{
        ctxt.clearRect(0,0,canvas.width,canvas.height);
        ctxt.drawImage(img,0,0);
      }
    }

    // download current canvas image
    function download(index){
      let canvas = canvasRef.current;
      let ctx = canvas.getContext('2d');
      const img = canvas.toDataURL('image/png')
      const a = document.createElement('a')
      a.download = "my-signature.png";
      a.href = img;
      a.click();
      alert("downloaded succefully")
    }
  useEffect(() => {

    //  by clicking of ctrl and z the action will back
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "z") {
        console.log('hello')
        if (currentIndex.current >= 0) {
          currentIndex.current--;
          HandleCanvasState(history.current[currentIndex.current]);
        }
      }
       // Check for Ctrl + Y
      if (e.ctrlKey && e.key === 'y') {
        if (currentIndex.current < history.current.length - 1) {
          currentIndex.current++;
          const nextState = history.current[currentIndex.current];
          HandleCanvasState(nextState);
        }
      }
    };

  //  handling back and again redo
    document.addEventListener("keydown", handleKeyDown);
    //  handlingin click on out side all open boxes will close
    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeyDown);

    };
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
            <div ref={sizeBoxRef}>
              <button className='btn btn-info btn-lg' onClick={(e) => { setBoxSizing(!boxSizing) }}>
                <i className="fa-solid fa-paintbrush"></i>
              </button>

              {boxSizing && (
                <div className='box'>
                  <div
                    className="border rounded shadow p-3 mt-2 bg-white position-absolute hidden"
                    style={{ width: '250px', top: "-90px" }}
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
            </div>


            {/* erase current data on board */}
            <button className='btn btn-light btn-lg' onClick={(e) => { setErase(!erase) }}>
              <i className="fa-solid fa-eraser"></i>
            </button>
            {/* brush size Box */}
            <div ref={colorBoxRef}>
              <button className='btn btn-warning btn-lg' onClick={(e) => { setColorBox(!colorBox) }}>
                <i className="fa-solid fa-palette"></i>
              </button>

              {colorBox && (
                <div className='box'>
                  <div
                    className="border rounded shadow p-3 mt-2 bg-white position-absolute hidden"
                    style={{ width: '250px', top: "-90px" }}
                  >
                    <h6>Select Brush Size</h6>

                    <input
                      type="color"
                      min="1"
                      max="50"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
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
            </div>

            {/* download current data image */}
            <button className='btn btn-danger btn-lg' onClick={(e) => { download(currentIndex.current)}}>
              <i className="fa-solid fa-download"></i>
            </button>

          </div>
        </div>
      </div>
    </>
  )
}

export default PrintDrag
