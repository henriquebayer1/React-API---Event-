import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TestePage = () => {
  const [count, setCount] = useState(100);
  const [calculation, setCalculation] = useState(0);
const {idEvento} = useParams()
  //executa quando o componente for montado
  //e quando o state count for alterado
  useEffect(() => {
    setCalculation( count * 2 );
    console.log(`Rodou ${count}`);
  }, []);

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
      <p>Calculation: {calculation}</p>
      <p>{idEvento}</p>
    </>
  );
};

export default TestePage;
