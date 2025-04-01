import { useState } from "react";

// let initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "Charger", quantity: 1, packed: true },
// ];

export default function App() {
  const [initialItems, setinitialItems] = useState([]);
  function handleADD(new_item) {
    setinitialItems([...initialItems, new_item]);
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
  return (
    <div className="app">
      <Logo />
      <Form initialItems={initialItems} handleADD={handleADD} />
      <Packinglists
        initialItems={initialItems}
        handleDelet={handleDelet}
        handleChanged={handleChanged}
      />
      <Stats initialItems={initialItems} />
    </div>
  );
}

function Logo() {
  return <h1> 🏝️ Far Away 🧳</h1>;
}
function Form(props) {
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
    // console.log(input_Val)
  }

  function handleAdds() {
    let newval = {
      id: props.initialItems.length + 1,
      description: input_Val,
      quantity: option,
      packed: false,
    };
    props.handleADD(newval);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3> what you need 😍 for your trip? </h3>
      <select value={option} onChange={handleSelect}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={input_Val}
        onChange={handleInput}
        placeholder="Item..."
      />
      <button onClick={handleAdds}>Add</button>
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
