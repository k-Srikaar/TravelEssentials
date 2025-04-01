import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import Packinglists from "./Packinglists";
import Stats from "./Stats";

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
    setInput("");
    // handleADD(newval);
  }

  function handleDelet(delet_item) {
    console.log(initialItems);
    console.log(delet_item);
    setinitialItems(
      initialItems.filter((item) => item.description !== delet_item)
    );
    console.log(initialItems);
  }
  function handleChanged(item_des) {
    console.log(item_des);

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
    setInput("");
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
