import React, { useEffect, useState } from "react";
import { usePrevState } from "../../../src";
/* import { useFetchByCallback } from "../../../dist"; */

const App: React.FC = () => {
  const [counter, setCounter] = useState(0);

  const prevState = usePrevState(counter);

  useEffect(() => {
    console.log(prevState, counter);
  }, [prevState, counter]);

  return (
    <div>
      <div>{counter}</div>
      <button onClick={() => setCounter((prev) => ++prev)}>add</button>
    </div>
  );
};

export default App;
