import React, { useRef, useState } from 'react'
import dice1 from '../assets/dice-img/dice-six-faces-one.png';
import dice2 from '../assets/dice-img/dice-six-faces-two.png';
import dice3 from '../assets/dice-img/dice-six-faces-three.png';
import dice4 from '../assets/dice-img/dice-six-faces-four.png';
import dice5 from '../assets/dice-img/dice-six-faces-five.png';
import dice6 from '../assets/dice-img/dice-six-faces-six.png';


const Dice_roller = () => {
    var dices = [
        {
            num: 1,
            img: dice1
        },
        {
            num: 2,
            img: dice2
        },
        {
            num: 3,
            img: dice3
        },
        {
            num: 4,
            img: dice4
        },
        {
            num: 6,
            img: dice5
        },
        {
            num: 6,
            img: dice6
        }
    ]
    var diceRef = useRef();
    var [dice, setDice] = useState(dice1)

   function rollDice(){
    let count = 0

    const interval = setInterval(()=>{
       var random = Math.floor(Math.random() * 6);
       setDice(dices[random].img)
       count++

       if(count===10){
        clearInterval(interval);
       }
    },100)
   }
    
    function handleDice() {
        if (diceRef.current) {
            diceRef.current.classList.remove('dice')
            setTimeout(() => {
                diceRef.current.classList.add('dice');
                rollDice()
            }, 10)
        }
    }
    return (
        <>
            <div className="container" style={{ height: '100vh' }} >
                <div className="d-flex align-items-center justify-content-center flex-column h-100">
                    <h1 className='fw-bold text-white'>Dice Roller Master</h1>

                    <div ref={diceRef} className='my-5' style={{ width: '250px', height: "250px" }}>
                        <img src={dice} className='w-100 h-100' alt="" />
                    </div>

                    <button onClick={handleDice} className='btn btn-info btn-lg'>Roll Out</button>
                </div>
            </div>
        </>
    )
}

export default Dice_roller
