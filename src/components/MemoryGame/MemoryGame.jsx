import './memorygame.css';
import { useState, useEffect } from "react"
const emojis = [
  '🐵',
  '🐶',
  '🦊',
  '🐱',
  '🦁',
  '🐯',
  '🐴',
  '🦄',
  '🦓',
  '🦌',
  '🐮',
  '🐷',
  '🐭',
  '🐹',
  '🐻',
  '🐨',
  '🐼',
  '🐽',
  '🐸',
  '🐰',
  '🐙',
];

export default function MemoryGame() {
  const [grid, setGrid] = useState([...new Array(16)].fill(""));
  const [symbols, setSymbols] = useState([]);

  //obtain a list of images that you will use
  useEffect(() => {
    let uniqueSymbols = grid.length;
    const newList = [];
    while(uniqueSymbols != 0) {
      let value;
      do {
        value =  Math.floor(Math.random() * 21);
      }while(symbols.indexOf(value) !== -1);
      newList.push(value);
      uniqueSymbols--;
    }
    setSymbols(newList)
  }, [grid])

  //randomly decorate the grid
  useEffect(() => {
    for (let i = 0;i<symbols.length;i++) {
      let firstIdx;
      do {
        firstIdx = Math.floor(Math.random() * 15);
      }while(grid[firstIdx] !== "");
      
      let secondIdx; 
      do {
        secondIdx = Math.floor(Math.random() * 15);
      }while(firstIdx === secondIdx && grid[secondIdx] !== "")

      setGrid(gr => {
        const tempGrid = [...gr];
        tempGrid[firstIdx] = symbols[i];
        tempGrid[secondIdx] = symbols[i];
        return tempGrid
      })

    }
  }, [symbols])

  return (
    <div className="game-div">
      <button>Play Again</button>
      <div className="main-grid">
      {
        grid?.map((item, index) => {
          return (
            <div className="grid-item">
              {}
            </div>
          )
        })
      }
      </div>
    </div>
  );
}


