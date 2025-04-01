export default function Form(props) {
  return (
    <form className="add-form" onSubmit={props.handleSubmit}>
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
