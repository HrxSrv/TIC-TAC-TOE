import { useEffect, useState, useMemo, useCallback } from "react";
import "./App.css";
import Box from "./Box";
import boxes from "./boxes";
import Reset from "./Reset";
import Ocounter from "./Ocounter";
import Ccounter from "./Ccounter";
import { onSnapshot, doc, updateDoc } from "firebase/firestore";
import { gameArray } from "./firebase";

function App() {
  const [x, setX] = useState("");
  console.log(x);
  const [squares, setSquares] = useState(() => boxes);
  const [chance, setChance] = useState(0);
  const [gameOver, setGameover] = useState(0);

  const toggleChance = useCallback(() => {
    setChance((x) => x + 1);
  }, []);

  const toggle = useCallback((key, onValue) => {
    if (onValue === -1 && gameOver === 0) {
      const newArray = squares.map((x) =>
        x.id === key ? { id: key, on: !(chance % 2) } : x
      );
      setSquares(newArray);
      toggleChance();
    }
  }, [squares, gameOver, chance]);

  useEffect(() => {
    check();
  }, [squares]);

  useEffect(() => {
    async function updateCloud(newArray) {
      try {
        await updateDoc(doc(gameArray, "gameID"), {
          squares: newArray,
          playerTurn: chance % 2 === 0 ? "X" : "O",
          gameOver: gameOver,
        });
      } catch (error) {
        console.log("Error updating game state", error);
      }
    }
    updateCloud(squares);
  }, [squares, chance]);

  useEffect(() => {
    const unsub = onSnapshot(doc(gameArray, "gameID"), (doc) => {
      if(doc.exists()){
        if(doc.data().squares.length===9){
          setSquares(doc.data().squares);
        }
      setChance(doc.data().playerTurn === "X" ? 0 : 1);
      setGameover(doc.data().gameOver);
      }
    });
    return () => unsub(); // Cleanup on unmount
  }, [chance]);

  function check() {
    for (let i = 0; i < 9; i += 3) {
      if (
        squares[i].on === squares[i + 1].on &&
        squares[i + 1].on === squares[i + 2].on &&
        squares[i].on !== -1 &&
        squares[i].on !== -2
      ) {
        setGameover(1);
        return;
      }
    }
    for (let i = 0; i < 3; i++) {
      if (
        squares[i].on === squares[i + 3].on &&
        squares[i + 3].on === squares[i + 6].on &&
        squares[i].on !== -1 &&
        squares[i].on !== -2
      ) {
        setGameover(1);
        return;
      }
    }
    if (
      squares[0].on === squares[4].on &&
      squares[4].on === squares[8].on &&
      squares[0].on !== -1 &&
      squares[0].on !== -2
    ) {
      setGameover(1);
      return;
    }
    if (
      squares[2].on === squares[4].on &&
      squares[4].on === squares[6].on &&
      squares[2].on !== -1 &&
      squares[2].on !== -2
    ) {
      setGameover(1);
      return;
    }
    let flag = 0;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].on !== -1 && squares[i].on !== -2) {
        flag++;
      }
    }
    if (flag === 9) {
      setGameover(2);
      return;
    }
  }

  const squareElements = useMemo(() => (
    squares.map((square) => (
      <Box key={square.id} id={square.id} on={square.on} toggle={toggle} />
    ))
  ), [squares, toggle]);

  const styleForView = useMemo(() => (
    gameOver ? { background: "black" } : {
      background: chance % 2
        ? "linear-gradient(rgb(10, 43, 54),black, rgb(15, 14, 14))"
        : "linear-gradient(rgb(38, 19, 19),black, rgb(15, 14, 14))"
    }
  ), [gameOver, chance]);

  function reset() {
    setSquares(boxes);
    setGameover(0);
  }

  return (
    <div className="view" style={styleForView}>
      <div className="wrap">{squareElements}</div>
      <Ccounter chance={chance} gameOver={gameOver} />
      <Reset toggleReset={reset} />
      <Ocounter chance={chance} gameOver={gameOver} />
    </div>
  );
}

export default App;
