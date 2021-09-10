import React, { useState } from "react";
import { useChangeArrayLength } from "../../../src";
/* import { useFetchByCallback } from "../../../dist"; */

const App: React.FC = () => {
  const [counter, setCounter] = useState(0);

  const [arr, setArr] = useState<Array<number>>([]);

  const [fn, setFn] = useState<() => void>(() => () => {
    console.log("change array");
  });

  useChangeArrayLength(arr, fn);

  return (
    <div>
      <div>{arr.toString()}</div>

      <div>
        <button onClick={() => setCounter((prev) => ++prev)}>
          change othen state {counter}
        </button>
      </div>

      <div>
        <button onClick={() => setArr((prev) => [...prev, 0])}>
          change array
        </button>
      </div>

      <div>
        <button
          onClick={() =>
            setFn(() => () => {
              console.log("change array");
            })
          }
        >
          change callback
        </button>
      </div>
    </div>
  );
};

export default App;
