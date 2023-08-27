import React, { useEffect, useState } from "react";
import "./counter.css";
function Ccounter({ gameOver, chance }) {
  const [cCount, setCcount] = useState(0);
  useEffect(() => {
    if (gameOver && chance % 2 && gameOver!==2) {
      setCcount((prevcCount) => prevcCount + 1);
    }
  }, [gameOver]);
  return <div className="ccounter">{cCount}</div>;
}

export default Ccounter;
