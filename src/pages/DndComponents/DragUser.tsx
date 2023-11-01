import { useDraggable } from "@dnd-kit/core";

function Draggable() {
  const { setNodeRef } = useDraggable({
    id: "draggable",
    data: {
      supports: ["type1", "type2"],
    },
  });

  return (
    <div ref={setNodeRef}>
      <button>Drag handle</button>
    </div>
  );
}

export default Draggable;
