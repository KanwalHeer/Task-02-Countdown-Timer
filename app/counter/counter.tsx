'use client'
//import hooks for app interaction
import { useState,useRef,useEffect,ChangeEvent } from 'react';

//counter component
export default function Counter() {

//set all hooks with types 
const [duration ,setDuration]=useState<number |string>("")
const [timeLeft ,setTimeLeft]=useState<number>(0)
const [isActive ,setIaActive]=useState<boolean>(false)
const [isPuased ,setIsPuased]=useState<boolean>(false)
const timerRef = useRef<NodeJS.Timeout | null>(null)

//function for handle duration
function handleDuration():void {
  if (typeof duration === "number" && duration > 0) {
    setTimeLeft(duration)
    setIaActive(false)
    setIsPuased(false)
  }
  if (timerRef.current) {
    clearInterval(timerRef.current)
  }
}

//function for handle start button
function handleStart():void {
  if (timeLeft > 0) {
    setIaActive(true)
    setIsPuased(false)
  }
}

//function for handle pause button
function handlePause():void {
  if (isActive) {
    setIaActive(false)
    setIsPuased(true)
  }
}

//function for handle pause button
function handleReset():void {
    setIaActive(false)
    setIsPuased(false)
    setTimeLeft(typeof duration === "number" ? duration : 0) 
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
}

//use useEffect for component mounting
useEffect(()=>{
  if(isActive && !isPuased){
    timerRef.current =setInterval(()=>{
      setTimeLeft((prvTime:any)=>{
        if (prvTime <= 1) {
          clearInterval(timerRef.current!)
          return 0
        }
        return prvTime -1
        });
        },1000);
      }
     return ()=>{
     if (timerRef.current) {
      clearInterval(timerRef.current)
      }
      }
},[isActive,isPuased])

//formating time to convert into string
function fornateTime(time:number):string {
  const minutes = Math.floor(time/60);
  const seconds = time % 60
  return `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`
}

//function for handle duration change
function handleFunctionChange(e:ChangeEvent<HTMLInputElement>):void {
  setDuration(Number(e.target.value) || "")
}

  return (
    <div className='flex flex-col items-center'>
      <div className='text-gray-900 flex flex-col md:flex-row justify-center space-y-4 md:space-x-4 md:space-y-0 m-3'>
        <label htmlFor="text">
          <input
            type="text"
            id='text'
            placeholder='Enter Duration in seconds'
            className='px-4 py-2 md:px-6 md:py-3 rounded-lg outline-none bg-gray-300 shadow-md w-full md:w'
            onChange={handleFunctionChange}
          />
        </label>
        <button className='px-4 py-2 md:px-6 md:py-3 bg-gray-300 rounded-lg shadow-md font-semibold hover:bg-black hover:text-white'
         onClick={handleDuration}
        >
          Set
        </button>
       </div>
       <div className='m-3'>
        <h1 className='text-4xl md:text-5xl font-extrabold text-center'>{fornateTime(timeLeft)}</h1>
       </div>
       <div className='flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 mt-4'>
        <button className='bg-gray-300 font-semibold px-4 py-2 md:px-7 md:py-3 rounded-lg shadow-md hover:bg-black hover:text-white'
        onClick={handleStart}
        >
          {isPuased ? "Resume" : "Start"}
        </button>
        <button className='bg-gray-300 font-semibold px-4 py-2 md:px-7 md:py-3 rounded-lg shadow-md hover:bg-black hover:text-white'
         onClick={handlePause}
        >
          Pause
        </button>
        <button className='bg-gray-300 font-semibold px-4 py-2 md:px-7 md:py-3 rounded-lg shadow-md hover:bg-black hover:text-white'
         onClick={handleReset}
        >
          Reset
        </button>
       </div>
     </div>
  );
}
