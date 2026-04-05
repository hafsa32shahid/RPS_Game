import React, { useEffect, useRef, useState } from 'react'

const GenrateOtp = () => {
    let [otp, setOtp] = useState('0000');
    let [time, setTime] = useState('0');
    let [expired, setExpired] = useState(false);
    let inputRef = useRef([]);
    let genrateOtp = ""
    let otpValidateValue = ""
    let random = 0

    function setTimeOtp() {
        setTime('30')
        const interval = setInterval(() => {
            setTime((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setExpired(true);
                    return 0
                }
                return prev - 1
            });
        }, 1000);
    }

    function handleOtp() {
        for (let i = 0; i <= 3; i++) {
            random = Math.floor(Math.random() * 10);
            console.log(random)
            genrateOtp += random;
        }
        setOtp(genrateOtp);
        setExpired(false)
        setTimeOtp();
    }
    // if time is expired than do otp cleared
    useEffect(() => {
        if (expired == true) {
            setOtp("00000")
        }
    }, [expired]);
    
    // focus of input handle
    function handleFocus(e,index){
        let value = e.target.value;
        if(value.length === 1 && index < inputRef.current.length - 1 ){
            inputRef.current[index].classList.remove('otp-input-focus')
            inputRef.current[index + 1].classList.add('otp-input-focus');
        }
    }
    // otp validator 
    function ValidateOtp(){
       for (let i = 0; i < inputRef.current.length; i++) {
        otpValidateValue += inputRef.current[i].value;
        
       }
       if(otpValidateValue === otp && expired != true){
         console.log("validated")
       }else{
        console.log("your otp is Expired or not valid")
       }
    }

    return (
        <>
            <div style={{ height: '100vh', backgroundColor: '#033973' }}>
                <div className="d-flex align-items-center justify-content-center flex-column h-100">
                    {/* otp generator block */}
                    <div className='rounded d-flex align-items-center justify-content-center flex-column' style={{ width: '450px', height: '300px', backgroundColor: '#141617' }}>
                        <h1 className='text-white fw-bold'>OTP Generator</h1>
                        <button onClick={handleOtp} className='btn btn-primary my-4'>GenrateOtp</button>
                        <span className='my-2 text-white fw-medium'>This otp will expire in {time}s</span>
                        <div className='p-2 rounded d-flex align-items-center justify-content-center gap-3'
                            style={{ width: "300px", height: "50px", backgroundColor: 'gray' }}>
                            <span className='text-black fw-bold fs-3'>{otp}</span> </div>
                    </div>
                    {/* otp validator block */}
                    <div className='rounded d-flex my-4 align-items-center justify-content-center flex-column' style={{ width: '450px', height: '300px', backgroundColor: '#141617' }}>
                        <h1 className='text-white fw-bold'>OTP Validator</h1>
                        <div className="d-flex gap-2">
                            <input ref={(el)=>{inputRef.current[0]=el}} onChange={(e)=>handleFocus(e,0)} maxLength="1" className="otp-input" />
                            <input ref={(el)=>{inputRef.current[1]=el}} onChange={(e)=>handleFocus(e,1)}  maxLength="1" className="otp-input" />
                            <input ref={(el)=>{inputRef.current[2]=el}} onChange={(e)=>handleFocus(e,2)}  maxLength="1" className="otp-input" />
                            <input ref={(el)=>{inputRef.current[3]=el}} onChange={(e)=>handleFocus(e,3)} maxLength="1" className="otp-input" />
                        </div>
                        <button onClick={ValidateOtp} className='btn btn-primary my-4'>Validate Otp</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GenrateOtp
