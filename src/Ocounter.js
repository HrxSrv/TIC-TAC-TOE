import React, { useEffect, useState } from "react";

function Ocounter({ gameOver, chance }) {
  const [oCount, setOcount] = useState(0);
  useEffect(() => {
    if (gameOver && 1 - (chance % 2)&&gameOver!==2) {
      setOcount((prevOCount) => prevOCount + 1);
    }
  }, [gameOver]);
  return <div className="ocounter">{oCount}</div>;
}

export default Ocounter;
