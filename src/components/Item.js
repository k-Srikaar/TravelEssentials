export default function Item({ item, handleDelet, handleChanged }) {
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
