import './App.css';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Footer from './Footer';

function App() {
  const defaultBoard = [[2, ' ', ' ', ' '], [' ', ' ', ' ', ' '], [' ', ' ', ' ', ' '], [' ', ' ', ' ', ' '],]
  const [board, setBoard] = React.useState(defaultBoard)  

  // add either 2 or 4 to the board
  const addNum = () => {
    let success = false
    while (!success && !boardIsFull()) {
      let x = getRandomInt(4)
      let y = getRandomInt(4)
      if (board[x][y] !== ' ') {
        continue
      }
      const newBoard = [...board]
      newBoard[x][y] = (getRandomInt(2)+1)*2
      setBoard(newBoard)
      success = true
    }
  }
  
  // check is the board is full
  const boardIsFull = () => {
    for (var x = 0; x < 4; x++) {
      for (var y = 0; y < 4; y++) {
        if (board[x][y] === ' ') {
          return false
        }
      } 
    }
    return true 
  }

  // handle key presses
  const handleKeyPress = (event) => {
    const newBoard = [...board]
    if (event.key === 'ArrowUp') {
      handleUp(newBoard)
      mergeUp(newBoard)
      handleUp(newBoard)
    } else if (event.key === 'ArrowDown') {
      handleDown(newBoard)
      mergeDown(newBoard)
      handleDown(newBoard)
    } else if (event.key === 'ArrowRight') {
      handleRight(newBoard)
      mergeRight(newBoard)
      handleRight(newBoard)
    } else if (event.key === 'ArrowLeft') {
      handleLeft(newBoard)
      mergeLeft(newBoard)
      handleLeft(newBoard)
    }
    addNum()
    setBoard(newBoard)
  }

  const handleUp = (newBoard) => {
    // move all the numbers up 
    for (var x = 1; x < 4; x++) {
      for (var y = 0; y < 4; y++) {
        if (board[x][y] === ' ') {
          continue
        }
        var d = 0
        while (d <= x && x-d-1 >= 0 && newBoard[x-d-1][y] === ' ') {
          d++
        }
        if (d !== 0) {
          newBoard[x-d][y] = newBoard[x][y]
          newBoard[x][y] = ' '
        }
      }
    }
  }

  const mergeUp = (newBoard) => {
    for (var y = 0; y < 4; y++) {
      for (var x = 1; x < 4; x++) {
        if (newBoard[x][y] === newBoard[x-1][y] && newBoard[x][y] !== ' ') {
          newBoard[x][y] = ' '
          newBoard[x-1][y] = newBoard[x-1][y]*2
        }
      }
    }
  }

  const mergeDown = (newBoard) => {
    for (var y = 0; y < 4; y++) {
      for (var x = 2; x >= 0; x--) {
        if (newBoard[x][y] === newBoard[x+1][y] && newBoard[x][y] !== ' ') {
          newBoard[x][y] = ' '
          newBoard[x+1][y] = newBoard[x+1][y]*2
        }
      }
    }
  }

  const mergeLeft = (newBoard) => {
    for (var x = 0; x < 4; x++) {
      for (var y = 1; y < 4; y++) {
        if (newBoard[x][y] === newBoard[x][y-1] && newBoard[x][y] !== ' ') {
          newBoard[x][y] = ' '
          newBoard[x][y-1] = newBoard[x][y-1]*2
        }
      }
    }
  }

  const mergeRight = (newBoard) => {
    for (var x = 0; x < 4; x++) {
      for (var y = 2; y >= 0; y--) {
        if (newBoard[x][y] === newBoard[x][y+1] && newBoard[x][y] !== ' ') {
          newBoard[x][y] = ' '
          newBoard[x][y+1] = newBoard[x][y+1]*2
        }
      }
    }
  }

  

  const handleDown = () => {
    //deep clone a new board
    const newBoard = [...board]
    // move all the numbers down
    for (var x = 2; x >= 0; x--) {
      for (var y = 0; y < 4; y++) {
        if (board[x][y] === ' ') {
          continue
        }
        var d = 0
        while (d < 4-x && x+d+1 <= 3 && newBoard[x+d+1][y] === ' ') {
          d++
        }
        if (d !== 0) {
          newBoard[x+d][y] = newBoard[x][y]
          newBoard[x][y] = ' '
        }
      }
    }
    setBoard(newBoard)
  }

  const handleLeft = () => {
    //deep clone a new board
    const newBoard = [...board]
    // move all the numbers left 
    for (var y = 1; y < 4; y++) {
      for (var x = 0; x < 4; x++) {
        if (board[x][y] === ' ') {
          continue
        }
        var d = 0
        while (d <= y && y-d-1 >= 0 && newBoard[x][y-d-1] === ' ') {
          d++
        }
        if (d !== 0) {
          newBoard[x][y-d] = newBoard[x][y]
          newBoard[x][y] = ' '
        }
      }
    }
    setBoard(newBoard)
  }

  const handleRight = () => {
    //deep clone a new board
    const newBoard = [...board]
    // move all the numbers right
    for (var y = 2; y >= 0; y--) {
      for (var x = 0; x < 4; x++) {
        if (board[x][y] === ' ') {
          continue
        }
        var d = 0
        while (d < 4-y && y+d+1 <= 3 && newBoard[x][y+d+1] === ' ') {
          d++
        }
        if (d !== 0) {
          newBoard[x][y+d] = newBoard[x][y]
          newBoard[x][y] = ' '
        }
      }
    }
    setBoard(newBoard)
  }

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress)
  })
  
  return (
    <div className='container'>  
      <div className='title'>welcome to my 2048</div>
      <Footer/>
      <table border="0">
        <tr>
          <td>
            <div className='block' style={{backgroundColor: getColor(board[0][0])}}> {board[0][0]}</div>
          </td>
          <td>
            <div className='block' style={{backgroundColor: getColor(board[0][1])}}>{board[0][1]}</div>
          </td>
          <td>
            <div className='block' style={{backgroundColor: getColor(board[0][2])}}>{board[0][2]}</div>
          </td>
          <td>
            <div className='block' style={{backgroundColor: getColor(board[0][3])}}>{board[0][3]}</div>
          </td>
        </tr>
        <tr>
          <td>
            <div className='block' style={{backgroundColor: getColor(board[1][0])}}> {board[1][0]}</div>
          </td>
          <td>
            <div className='block' style={{backgroundColor: getColor(board[1][1])}}>{board[1][1]}</div>
          </td>
          <td>
            <div className='block' style={{backgroundColor: getColor(board[1][2])}}>{board[1][2]}</div>
          </td>
          <td>
            <div className='block' style={{backgroundColor: getColor(board[1][3])}}>{board[1][3]}</div>
          </td>
        </tr>
        <tr>
          <td>
            <div className='block' style={{backgroundColor: getColor(board[2][0])}}> {board[2][0]}</div>
          </td>
          <td>
            <div className='block' style={{backgroundColor: getColor(board[2][1])}}>{board[2][1]}</div>
          </td>
          <td>
            <div className='block' style={{backgroundColor: getColor(board[2][2])}}>{board[2][2]}</div>
          </td>
          <td>
            <div className='block' style={{backgroundColor: getColor(board[2][3])}}>{board[2][3]}</div>
          </td>
        </tr>
        <tr>
          <td>
            <div className='block' style={{backgroundColor: getColor(board[3][0])}}> {board[3][0]}</div>
          </td>
          <td>
            <div className='block' style={{backgroundColor: getColor(board[3][1])}}>{board[3][1]}</div>
          </td>
          <td>
            <div className='block' style={{backgroundColor: getColor(board[3][2])}}>{board[3][2]}</div>
          </td>
          <td>
            <div className='block' style={{backgroundColor: getColor(board[3][3])}}>{board[3][3]}</div>
          </td>
        </tr>
      </table>
      <Button size='sm' className='button'
        onClick={() => {
          setBoard(defaultBoard)
        }}
        variant="primary"
      >
        restart
      </Button>
    </div>
  );
}

// genarate a random number, cited from comp6080 UNSW tutorial
const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.ceil(max));
}

const getColor = (num) => {
  if (num === ' ') {
    return '#99ccff'
  } else if (num === 2) {
    return '#9eb8ff'
  } else if (num === 4) {
    return '#a3a3ff'
  } else if (num === 8) {
    return '#a88fff'
  } else if (num === 16) {
    return '#ad7aff'
  } else if (num === 32) {
    return '#b266ff'
  } else if (num === 64) {
    return '#b852ff'
  } else if (num === 128) {
    return '#bd3dff'
  } else if (num === 256) {
    return '#c229ff'
  } else if (num === 512) {
    return '#c714ff'
  } else if (num === 1024) {
    return '#cc00ff'
  } else if (num === 2048) {
    return '#990099'
  } 
  return '#ffffff'
}

export default App;
