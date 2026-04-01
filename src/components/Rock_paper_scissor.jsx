import React, { useState } from 'react'

const Rock_paper_scissor = () => {
  let choices = [
    {
      name: "Rock",
      bg: "green",
      emogi: "👊",
    },
    {
      name: "Paper",
      bg: "#3B82F6",
      emogi: "🖐",
    },
    {
      name: "Scissor",
      bg: "#EF4444",
      emogi: "✌",
    }
  ];

  let [userChoice, setUserChoice] = useState("");
  let [computerChoice, setComputerChoice] = useState("");
  let [userScore, setUserScore] = useState(0);
  let [computerScore, setComputerScore] = useState(0);
  let [result, setResult] = useState("");



// randomly picked choice
  function getComputerChoice() {
    let computerRandom = Math.floor(Math.random() * choices.length);
    console.log(computerRandom)
    return choices[computerRandom]
  }

  // set and assigned values 
  function handleChoice(user) {
    let computer = getComputerChoice();
    setUserChoice(user);
    setComputerChoice(computer.name);


    if (userChoice === computerChoice) {
      setResult("Its a Draw")
    } else if ((userChoice === "Rock" && computerChoice === "Scissor") ||
      (userChoice === "Paper" && computerChoice === "Rock") ||
      (userChoice === "Scissor" && computerChoice === "Paper")) {
        setResult("You are win")

      setUserScore( userScore + 1 )
    } else {
            setResult("you are Lose")

      setComputerScore( computerScore + 1 )

    }


  }

  return (
    <>
      <div className="container" style={{ height: '100vh' }}>
        <div className="d-flex align-items-center justify-content-center flex-column h-100">
          <h1 className='text-success fw-bold my-3'>Rock Paper Scissor Game</h1>
          <div className='bg-info d-flex align-items-center justify-content-center rounded gap-3 fw-bold text-white' style={{ width: '500px', height: '200px' }}>
            {choices.map((choice, i) => {
              return <div key={i} className='d-flex align-items-center justify-content-center' onClick={() => handleChoice(choice.name)} style={{ minWidth: '100px', height: '100px', backgroundColor: choice.bg, borderRadius: '20px', cursor: 'pointer' }}>
                <h1>{choice.emogi}</h1>
              </div>
            })}
          </div>

          {/* result */}
          <h4 className='text-white fw-bold my-3'>{result}</h4>

          {/* Score */}
          <div className="d-flex align-items-center">
            <h4 className='text-white my-2'>Your Score: <span className='text-info'> {userScore} </span>
              ,  Computer Score: <span className='text-danger'>{computerScore}</span></h4>
          </div>
        </div>
      </div>
    </>
  )
}

export default Rock_paper_scissor
