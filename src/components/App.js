import { useState } from "react";

export default function App() {
  const [initialItems, setinitialItems] = useState([]);
  const [option, setOption] = useState(1);
  const [input_Val, setInput] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    // console.log(e);
    // This is written because , when we submit the form reload happens, to have a single page application we stop this.
  }

  function handleSelect(e) {
    setOption(Number(e.target.value));
    // console.log(option);
  }

  function handleInput(e) {
    setInput(e.target.value);
    console.log(input_Val);
  }
  // function handleADD(new_item) {

  // }

  function handleAdds() {
    let newval = {
      id: initialItems.length + 1,
      description: input_Val,
      quantity: option,
      packed: false,
    };
    console.log(newval);
    setinitialItems([...initialItems, newval]);
    // handleADD(newval);
  }

  function handleDelet(delet_item) {
    console.log(initialItems);

    setinitialItems(
      initialItems.filter((item) => item.description !== delet_item)
    );
    // console.log(initialItems);
  }
  function handleChanged(item_des) {
    // console.log(item_des);

    setinitialItems(
      initialItems.map((item) => {
        if (item.description === item_des) {
          // console.log(item.packed);
          return { ...item, packed: item.packed === true ? false : true };
        }
        return item;
      })
    );
  }

  function handleClear() {
    setinitialItems([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form
        initialItems={initialItems}
        // handleADD={handleADD}
        handleSubmit={handleSubmit}
        handleSelect={handleSelect}
        handleInput={handleInput}
        handleAdds={handleAdds}
        option={option}
        input_Val={input_Val}
      />
      <Packinglists
        initialItems={initialItems}
        handleDelet={handleDelet}
        handleChanged={handleChanged}
        handleClear={handleClear}
      />
      <Stats initialItems={initialItems} />
    </div>
  );
}

function Logo() {
  return <h1> 🏝️ Far Away 🧳</h1>;
}
function Form(props) {
  return (
    <form className="add-form" onSubmit={() => props.handleSubmit()}>
      <h3> what you need 😍 for your trip? </h3>
      <select value={props.option} onChange={(e) => props.handleSelect(e)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={props.input_Val}
        onChange={(e) => props.handleInput(e)}
        placeholder="Item..."
      />
      <button onClick={() => props.handleAdds()}>Add</button>
    </form>
  );
}
function Packinglists(props) {
  // console.log(props.initialItems.length);
  return (
    <div className="list">
      <ul>
        {props.initialItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            handleDelet={props.handleDelet}
            handleChanged={props.handleChanged}
          />
        ))}
      </ul>
      <button onClick={() => props.handleClear()}>Clear List</button>
    </div>
  );
}

function Item({ item, handleDelet, handleChanged }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => handleChanged(item.description)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity}
        {item.description}
      </span>
      <button onClick={() => handleDelet(item.description)}>❌</button>
    </li>
  );
}
function Stats({ initialItems }) {
  let items = initialItems.length;
  let count = 0;
  for (let i = 0; i < items; i++) {
    if (initialItems[i].packed) {
      count = count + 1;
    }
  }

  let packed = Math.round((count / items) * 100);
  if (items === 0) {
    packed = 0;
  }
  return (
    <footer className="stats">
      <em>Stats</em>
      <hr />
      {packed === 100 ? "Ready To Go 🚀" : `Percenatge of packed ${packed}`}
    </footer>
  );
}
