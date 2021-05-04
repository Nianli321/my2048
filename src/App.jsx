import './App.css';
import React from 'react';
import Button from 'react-bootstrap/Button';
import { cloneDeep } from 'lodash';

function App() {
  const defaultBoard = [[2, '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', ''],]
  const [board, setBoard] = React.useState(defaultBoard)  

  // add either 2 or 4 to the board
  const addNum = () => {
    let success = false
    while (!success) {
      let x = getRandomInt(4)
      let y = getRandomInt(4)
      console.log(x + ' ' + y)
      if (board[x][y] !== '') {
        continue
      }
      const newBoard = cloneDeep(board)
      newBoard[x][y] = (getRandomInt(2)+1)*2
      setBoard(newBoard)
      success = true
    }
  }
  
  const handleKeyPress = (event) => {
    if (event.key === 'ArrowUp') {
      console.log(board)
    } else if (event.key === 'ArrowDown') {
      console.log('down')
    } else if (event.key === 'ArrowRight') {
      console.log('right')
    } else if (event.key === 'ArrowLeft') {
      console.log('left')
    }
  }

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
  }, [])
  

  return (
    <div>  
      <Button 
        onClick={() => {
          addNum()
        }}
        variant="primary"
      >
        set
      </Button>
      <Button 
        onClick={() => {
          setBoard(defaultBoard)
        }}
        variant="primary"
      >
        reset
      </Button>
      <table border="1">
        <tr>
          <td>{board[0][0]}</td>
          <td>{board[0][1]}</td>
          <td>{board[0][2]}</td>
          <td>{board[0][3]}</td>
        </tr>
        <tr>
          <td>{board[1][0]}</td>
          <td>{board[1][1]}</td>
          <td>{board[1][2]}</td>
          <td>{board[1][3]}</td>
        </tr>
        <tr>
          <td>{board[2][0]}</td>
          <td>{board[2][1]}</td>
          <td>{board[2][2]}</td>
          <td>{board[2][3]}</td>
        </tr>
        <tr>
          <td>{board[3][0]}</td>
          <td>{board[3][1]}</td>
          <td>{board[3][2]}</td>
          <td>{board[3][3]}</td>
        </tr>
      </table>
    </div>
  );
}

// genarate a random number, cited from comp6080 UNSW tutorial
const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.ceil(max));
}


export default App;
