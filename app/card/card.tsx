'use client'
import { useState } from "react"
import Confetti from "react-confetti"
import { FaBirthdayCake } from 'react-icons/fa';
import { GiBalloons } from 'react-icons/gi';
import { motion, AnimatePresence } from 'framer-motion'; 
import { FaGift } from "react-icons/fa";

// Define color arrays for candles and balloons
const candleColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
const balloonColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];

export default function Card() {

    // State to handle form submission and card display
    const [click, setClick] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [candlesLit, setCandlesLit] = useState(0);
    const [balloonsPoppedCount, setBalloonsPoppedCount] = useState(0);
    const [celebrating, setCelebrating] = useState<boolean>(false);

    // State for input fields and their corresponding values
    const [nameInput, setNameInput] = useState("");
    const [name, setName] = useState('');
    const [messageInput, setMessageInput] = useState("");
    const [message, setMessage] = useState('');
    const [senderInput, setSenderInput] = useState("");
    const [sender, setSender] = useState('');
    const [ageInput, setAgeInput] = useState("");
    const [age, setAge] = useState('');
    const [dateInput, setDateInput] = useState("");
    const [date, setDate] = useState('');

    // State for error messages
    const [nameError, setNameError] = useState('');
    const [messageError, setMessageError] = useState('');
    const [senderError, setSenderError] = useState('');
    const [ageError, setAgeError] = useState('');
    const [dateError, setDateError] = useState('');

    // Constants for the number of candles and balloons
    const totalCandles = 5;
    const totalBalloons = 5;

    // Function to handle form submission
    const submitHandle = (e: any) => {
        e.preventDefault();

        // Reset errors
        setNameError('');
        setMessageError('');
        setSenderError('');
        setAgeError('');
        setDateError('');

        // Form validation
        let hasError = false;

        if (name.trim() === '') {
            setNameError('This field is required');
            hasError = true;
        }

        if (age.trim() === '') {
            setAgeError('This field is required');
            hasError = true;
        }

        if (message.trim() === '') {
            setMessageError('This field is required');
            hasError = true;
        }

        if (sender.trim() === '') {
            setSenderError('This field is required');
            hasError = true;
        }

        if (date.trim() === '') {
            setDateError('This field is required');
            hasError = true;
        }

        if (hasError) return; // Stop the submission if there are errors

        // Update state with form inputs and reset form fields
        setNameInput(name);
        setName('');
        setMessageInput(message);
        setMessage('');
        setSenderInput(sender);
        setSender('');
        setAgeInput(age);
        setAge('');
        setDateInput(date);
        setDate('');
        setClick(true);
    }

    // Function to handle celebration logic
    const celebrateHandle = () => {
        if (candlesLit === totalCandles && balloonsPoppedCount === totalBalloons) {
            setShowConfetti(true); // Show confetti
            setTimeout(() => setShowConfetti(false), 9000);
        }
        setCelebrating(true);
    }

    // Function to handle lighting candles
    const lightCandle = (index: any) => {
        if (index === candlesLit) {
            setCandlesLit(prev => prev + 1);
            console.log('Candle lit:', index); // Debug log
        }
    };

    // Function to handle popping balloons
    const popBalloon = (index: any) => {
        if (index === balloonsPoppedCount) {
            setBalloonsPoppedCount(prev => prev + 1);
            console.log('Balloon popped:', index); // Debug log
        }
    };

    return (
        <div>
            {/* Render Confetti if showConfetti is true */}
            {showConfetti && <Confetti />}

            <div className="flex flex-col items-center justify-between p-4 md:p-8 lg:p-12">

                {/* Render form if click is false */}
                {!click && <div>
                    <div className='bg-gray-600 text-black p-4 md:p-6 lg:p-8 shadow-lg shadow-gray-700 rounded-xl w-full max-w-lg'>
                        {/* Form for user inputs */}
                        <form className='flex justify-center flex-col space-y-2' onSubmit={submitHandle}>
                            {/* Name input field */}
                            <div className="flex flex-col">
                                <label htmlFor="text" className="text-white text-center">Your friend&apos;s name</label>
                                {nameError && <p className="text-red-500 text-center text-sm">{nameError}</p>}
                                <input type="text" value={name} placeholder='Enter your friend’s name' onChange={(e) => setName(e.target.value)}
                                    className="px-12 py-1 rounded-xl m-2 text-center" />
                            </div>

                            {/* Age input field */}
                            <div className="flex flex-col">
                                <label htmlFor="text" className="text-white text-center">Age</label>
                                {ageError && <p className="text-red-500 text-center text-sm">{ageError}</p>}
                                <input type="text" value={age} placeholder='Enter age' onChange={(e) => setAge(e.target.value)}
                                    className="px-12 py-1 rounded-xl m-2 text-center" />
                            </div>

                            {/* Date of Birth input field */}
                            <div className="flex flex-col">
                                <label htmlFor="text" className="text-white text-center">Date of Birth</label>
                                {dateError && <p className="text-red-500 text-center text-sm">{dateError}</p>}
                                <input type="text" value={date} placeholder='Enter date of birth' onChange={(e) => setDate(e.target.value)}
                                    className="px-12 py-1 rounded-xl m-2 text-center" />
                            </div>

                            {/* Message input field */}
                            <div className="flex flex-col">
                                <label htmlFor="text" className="text-white text-center">Your Message</label>
                                {messageError && <p className="text-red-500 text-center text-sm">{messageError}</p>}
                                <input type="text" value={message} placeholder='Enter your message' onChange={(e) => setMessage(e.target.value)}
                                    className="px-12 py-1 rounded-xl m-2 text-center" />
                            </div>

                            {/* Sender’s name input field */}
                            <div className="flex flex-col">
                                <label htmlFor="text" className="text-white text-center">Your Name</label>
                                {senderError && <p className="text-red-500 text-center text-sm">{senderError}</p>}
                                <input type="text" value={sender} placeholder='Enter your name' onChange={(e) => setSender(e.target.value)}
                                    className="px-12 py-1 rounded-xl m-2 text-center" />
                            </div>

                            {/* Submit button */}
                            <button className="text-xl font-extrabold bg-white rounded-xl px-0 py-4 hover:bg-gray-300">Create Card</button>
                        </form>
                    </div>
                </div>}

                {/* Render birthday card if click is true */}
                {click && <div className="border-black p-4 rounded-xl border-2">
                    <h1 className="text-2xl font-extrabold p-4 text-center">Happy {ageInput}th Birthday!</h1>
                    <div className="bg-gray-100 px-2 rounded-lg w-full max-w-lg text-center">
                        <p className="text-black text-xl font-bold pb-2">{nameInput}</p>
                        <p className="text-gray-500 text-sm font-semibold">{dateInput}</p>
                        <p className="text-black text-xl font-bold">{messageInput}</p>
                    </div>

                    {/* Candles section */}
                    <div className="flex flex-col justify-center items-center space-4 gap-1">
                        <div className="mt-8">
                            <h3 className="text-lg font-semibold text-black mb-2 ml-6">Light the candles:</h3>
                            <div className="flex justify-center space-x-2">
                                {[...Array(totalCandles)].map((_, index) => (
                                    <AnimatePresence key={index}>
                                        {(index < candlesLit) ? (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                exit={{ scale: 0 }}
                                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                            >
                                                <FaBirthdayCake
                                                    className="w-8 h-8 transition-colors duration-300 ease-in-out cursor-pointer hover:scale-110"
                                                    style={{ color: candleColors[index % candleColors.length] }}
                                                    onClick={() => lightCandle(index)}
                                                />
                                            </motion.div>
                                        ) : (
                                            <FaBirthdayCake
                                                className="w-8 h-8 text-gray-300 transition-colors duration-300 ease-in-out cursor-pointer hover:scale-110"
                                                onClick={() => lightCandle(index)}
                                            />
                                        )}
                                    </AnimatePresence>
                                ))}
                            </div>
                        </div>

                        {/* Balloons section */}
                        <div className="mt-8">
                            <h3 className="text-lg font-semibold text-black mb-2 ml-6">Pop the balloons:</h3>
                            <div className="flex justify-center space-x-2">
                                {[...Array(totalBalloons)].map((_, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ scale: 1 }}
                                        animate={{ scale: index < balloonsPoppedCount ? 0 : 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <GiBalloons
                                            className="w-8 h-8 cursor-pointer hover:scale-110"
                                            style={{ color: index < balloonsPoppedCount ? '#D1D5DB' : balloonColors[index % balloonColors.length] }}
                                            onClick={() => popBalloon(index)}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Celebrate button */}
                        <button className="bg-black text-white hover:bg-gray-800 transition-all duration-300 px-8 py-2 rounded-2xl flex flex-row" onClick={celebrateHandle} disabled={celebrating}>
                            <p>Celebrate!</p>
                            <FaGift className="ml-2 h-4 w-4" />
                        </button>
                        <p className="text-black text-lg font-semibold">From {senderInput}</p>
                    </div>
                </div>}
            </div>
        </div>
    )
}
