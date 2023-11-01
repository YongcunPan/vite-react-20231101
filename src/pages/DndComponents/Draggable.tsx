import { useDrag } from "react-dnd";

interface DraggableProps {
  type?: string;
}

export const Draggable = (props: DraggableProps) => {
  const { type = "card" } = props || {};
  const [, drag] = useDrag(() => {
    return {
      type,
      item: { id: 1, a: 1, b: 2, type },
      // end: (item) => console.log(item, "end"),
    };
  });

  return (
    <div
      ref={drag}
      style={{
        border: "1px solid #ddd",
        padding: "10px",
        display: "inline-block",
      }}>
      todoDrag
    </div>
  );
};
