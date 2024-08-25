import React, { useEffect, useState } from 'react';
import "./pixelart.css";

const COLORS = {
    white: '#fff',
    gray: '#e9ecef',
    black: '#000',
    red: '#cc0001',
    orange: '#fb940b',
    yellow: '#ffff01',
    green: '#01cc00',
    teal: '#38d9a9',
    blue: '#228be6',
    purple: '#7950f2',
    beige: '#ff8787',
  };

const DrawingMode = {
    DRAW: "draw",
    ERASE: "erase",
};

const PixelArt = () => {

    const[drawingMode, setDrawingMode] = useState(DrawingMode.DRAW);
    const[selectedColor, setSelectedColor] = useState(COLORS.red);
    const[pixelGrid, setPixelGrid] = useState([]);

    const[isMouseClicked, setMouseClicked] = useState(false);

    useEffect(() => {
        const gridSize = 15;
        const grid = []
        for(let i = 0;i < Math.pow(gridSize, 2);i++) {
            if(i % 2 === 0) {
                grid.push({
                    defaultColor: COLORS.gray,
                    currentColor: -1
                })
            } else {
                grid.push({
                    defaultColor: COLORS.white,
                    currentColor: -1
                })
            }
        }

        setPixelGrid(grid)
    }, [])

    useEffect(() => {
        console.log("clicked", isMouseClicked);
    }, [isMouseClicked])

    const handleMouseOver = (index) => {
        if(!isMouseClicked) return;
        if(drawingMode === DrawingMode.DRAW) {
            setPixelGrid(prevState => {
                const tempState = [...prevState];
                tempState[index].currentColor = selectedColor;
                return tempState;
            })
        } else {
            setPixelGrid(prevState => {
                const tempState = [...prevState];
                tempState[index].currentColor = -1;
                return tempState;
            })
        }
    }

    return (
        <div className='pixel-art-main'>
            <h1>Pixel Art</h1>
            <div className='pixel-art-cont'>
                <div className='pixel-art-box'>
                    <div
                        onMouseDown={() => setMouseClicked(true)}
                        onMouseLeave={() => setMouseClicked(false)}
                        onMouseUp={() => setMouseClicked(false)}
                        onMouseOver={(e) => handleMouseOver(Number(e.target.id))}
                        className='pixel-grid'
                    >
                    {
                        pixelGrid.map((pixelItem, index) => {
                            return (
                                <span id={`${index}`} style={pixelItem.currentColor === -1 ? { background: `${pixelItem.defaultColor}` } : { background: `${pixelItem.currentColor}` }} className='pixel-item'>

                                </span>
                            )
                        })
                    }
                    </div>
                </div>
                <div className='instrument-cluster'>
                    <div className='left-half'>
                        <div className='btn-container'>
                            <button onClick={() => setDrawingMode(DrawingMode.DRAW)} style={ drawingMode === DrawingMode.DRAW ? { background: "rgba(0, 0, 0, 0.8)", color: "white" } :  {background: "white", color: "rgba(0, 0, 0, 0.8)"} }>Draw</button>
                            <button onClick={() => setDrawingMode(DrawingMode.ERASE)} style={ drawingMode === DrawingMode.ERASE ? { background: "rgba(0, 0, 0, 0.8)", color: "white" } : {background: "white", color: "rgba(0, 0, 0, 0.8)"} }>Erase</button>
                        </div>
                    </div>
                    <div className='right-half'>
                        <div onClick={(e) => setSelectedColor(e.target.id)} className='color-selector'>
                        {
                            Object.entries(COLORS).map((color, index) => {
                                return (
                                    <span id={`${color[1]}`} className={color[1] !== selectedColor ? 'color-span' : 'color-span-selected'} style={{ background: `${color[1]}` }}></span>
                                )
                            })
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PixelArt