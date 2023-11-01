import { useDrop } from "react-dnd";

function Droppable() {
  const [{ onHover, canDrop }, drop] = useDrop(() => ({
    accept: "card",
    item: { id: 1 },
    drop: (item) => {
      console.log(item);
      // console.log(monitor);
    },
    collect: (monitor) => ({
      onHover: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        height: 100,
        width: 200,
        background: "#999",
        borderRadius: 4,
        border: `3px solid ${onHover ? "green" : "red"}`,
      }}>
      {canDrop ? "1" : "0"}
      {/* ... */}
    </div>
  );
}

export default Droppable;
