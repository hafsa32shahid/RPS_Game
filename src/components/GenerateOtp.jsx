import React, { useEffect, useState } from 'react'

const GenrateOtp = () => {
    let [otp, setOtp] = useState('00000');
    let [time,setTime]= useState('0');
    let [expired,setExpired] = useState(false);
    let genrateOtp = ""
    let random = 0
    
    function setTimeOtp(){
        setTime('30')
        const interval = setInterval(() => {
            setTime((prev)=>{
                if(prev<=1){
                    clearInterval(interval);
                    setExpired(true);
                    return 0
                }
                return prev - 1
            });
        }, 1000);
    }
     
    function handleOtp() {
        for (let i = 0; i <= 4; i++) {
            random = Math.floor(Math.random() * 10);
            console.log(random)
            genrateOtp += random;
        }
        setOtp(genrateOtp);
        setExpired(false)
        setTimeOtp();
    }
    useEffect(()=>{
       if(expired == true){
            setOtp("00000")
        }
    },[expired])
    return (
        <>
            <div style={{ height: '100vh', backgroundColor: '#033973' }}>
                <div className="d-flex align-items-center justify-content-center h-100">
                    <div className='rounded d-flex align-items-center justify-content-center flex-column' style={{ width: '450px', height: '300px', backgroundColor: '#141617' }}>
                        <h1 className='text-white fw-bold'>OTP Generator</h1>
                        <button onClick={handleOtp} className='btn btn-primary my-4'>GenrateOtp</button>
                         <span className='my-2 text-white fw-medium'>This otp will expire in {time}s</span>
                        <div className='p-2 rounded d-flex align-items-center justify-content-center gap-3'
                            style={{ width: "300px", height: "50px", backgroundColor: 'gray' }}>
                            <span className='text-black fw-bold fs-3'>{otp}</span> </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GenrateOtp
