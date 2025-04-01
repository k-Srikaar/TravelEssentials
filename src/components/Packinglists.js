import Item from "./Item";
export default function Packinglists(props) {
  // console.log(props.initialItems.length);
  return (
    <div className="list">
      <ul>
        {props.initialItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            handleDelet={() => props.handleDelet(item.description)}
            handleChanged={() => props.handleChanged(item.description)}
          />
        ))}
      </ul>
      <button onClick={props.handleClear}>Clear List</button>
    </div>
  );
}
