import { useState } from "react";

// const App = () => {

//   const [left, setLeft] = useState(0);
//   const [right, setRight] = useState(0);
//   const [allClicks, setAll] = useState([]);

//   const [total, setTotal] = useState(0);

//   const handleLeftClick = () => {
//     setAll(allClicks.concat("L"));
//     const updatedLeft = left + 1;
//     setLeft(updatedLeft);

//     setTotal(updatedLeft + right);
//   };

//   const handleRightClick = () => {
//     setAll(allClicks.concat("R"));
//     const updatedRight = right + 1;
//     setRight(updatedRight);

//     setTotal(left + updatedRight);
//   };

//   return (
//     <div>
//       {left}
//       <Button onClick={handleLeftClick} text="left" />
//       <Button onClick={handleRightClick} text="right" />
//       {right}
//       <History allClicks={allClicks} />

//       <p>total {total}</p>
//     </div>
//   );
// };

const App = () => {
  const [value, setValue] = useState(10);

  const setToValue = (newValue) => {
    console.log("value now", newValue);
    setValue(newValue);
  };

  return (
    <div>
      {value}
      <Button onClick={() => setToValue(1000)} text="thousand" />
      <Button onClick={() => setToValue(0)} text="reset" />
      <Button onClick={() => setToValue(value + 1)} text="increment" />
    </div>
  );
};

const Display = ({ counter }) => {
  return <div>{counter}</div>;
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const History = (props) => {
  if (props.allClicks.length === 0) {
    return <div>the app is used by pressing the buttons</div>;
  }
  return <div>button press history: {props.allClicks.join(" ")}</div>;
};
export default App;
