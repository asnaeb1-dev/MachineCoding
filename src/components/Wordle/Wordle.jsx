import React, { useEffect, useState } from 'react'

import "./wordle.css";

const Wordle = () => {
    const words = Object.freeze([
        'APPLE',
        'BEAST',
        'FAINT',
        'FEAST',
        'FRUIT',
        'GAMES',
        'PAINT',
        'PASTE',
        'TOWER',
        'REACT',
    ]);

    const [currentWord] = useState(words[Math.floor(Math.random() * words.length)])

    return (
        <div className='main-layout'>
            <GameLayout word={currentWord} />
        </div>
    )
}

const GameLayout = ({ word = "" }) => {

    const [cursorPosition, setCursorPosition] = useState(0);
    const [currentGuess, setCurrentGuess] = useState(0);

    /**
     *  {
            word:"",
            isSet: false
        }
     */
    const [guessList, setGuessList] = useState([
       
    ])

    const handleInputChangeEvent = e => {
        const text = e.target.value;
        if(text.length > 0) {
            if(cursorPosition < word.length) {
                setCursorPosition(c => c + 1);
            }
        } else {
            if(cursorPosition > 0) {
                setCursorPosition(c => c + 1);
            }
        }
    }

    useEffect(() => {
        console.log(cursorPosition, currentGuess);
    }, [cursorPosition])

    return (
        <div className='game-layout-main'>
            <div className='game-grid'>
                {
                    [...new Array(word.length * 6)]. map((_, index) => {
                        return (
                            <input
                                key={index}
                                name='textInputRef'
                                onChange={handleInputChangeEvent}
                                disabled={false}
                                maxLength={1}
                                className='item-input'
                                type={"text"}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}
 
export default Wordle