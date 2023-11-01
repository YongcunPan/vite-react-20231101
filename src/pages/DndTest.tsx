import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Draggable } from "./DndComponents/Draggable";
import Droppable from "./DndComponents/DropContainer";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Draggable />
      <Draggable type="abc" />
      <Droppable />
    </DndProvider>
  );
}

export default App;
