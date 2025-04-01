export default function Stats({ initialItems }) {
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
