import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useToDos from "../../hooks/Todos/useToDos";
import Loading from "../shared/Loading/Loading";


import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import Todo from "../../pages/Categoryes/Todo";
import InProgress from "../../pages/Categoryes/InProgress";
import Done from "../../pages/Categoryes/Done";
import axios from "axios";




const Category = () => {
    const { user } = useContext(AuthContext);
    const { todos: task, isLoading, refetch } = useToDos()
    if (isLoading) return <Loading></Loading>;

    const handleDragEnd = async (result) => {
        if (!result.destination) return;

        const { source, destination, draggableId } = result;

        const newCategory = destination.droppableId;

        try {
            await axios.put(`https://to-do-server-black.vercel.app/task/update/${draggableId}`, { category: newCategory });
            refetch(); 
        } catch (error) {
            console.error("Error updating task category:", error);
        }
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-6 2xl:mx-36 mx-2 lg:mx-4 xl:mx-20 my-10">
          {/* TO-DO */}
          <Droppable droppableId="To-Do">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <h1 className="text-center text-xl font-bold sm:text-2xl pb-3.5 text-[#d44a6c]">
                  TO-DO
                </h1>
                <div className="bg-[#c98b9b3b] p-3 rounded-2xl">
                  {task.filter((task) => task.category === "To-Do").map((filteredTask, index) => (
                    <Draggable key={filteredTask._id} draggableId={filteredTask._id} index={index}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <Todo filteredTask={filteredTask} refetch={refetch} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
      
          {/* IN PROGRESS */}
          <Droppable droppableId="In Progress">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <h1 className="text-center text-xl font-bold sm:text-2xl pb-3.5 text-[#e68226]">
                  In Progress
                </h1>
                <div className="bg-[#e6b89c24] p-3 rounded-2xl">
                  {task.filter((task) => task.category === "In Progress").map((filteredTask, index) => (
                    <Draggable key={filteredTask._id} draggableId={filteredTask._id} index={index}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <InProgress filteredTask={filteredTask} refetch={refetch} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
      
          {/* DONE */}
          <Droppable droppableId="Done">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <h1 className="text-center text-xl font-bold sm:text-2xl pb-3.5 text-[#3b82f6]">
                  Done
                </h1>
                <div className="bg-[#a2d1f55a] p-3 rounded-2xl">
                  {task.filter((task) => task.category === "Done").map((filteredTask, index) => (
                    <Draggable key={filteredTask._id} draggableId={filteredTask._id} index={index}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <Done filteredTask={filteredTask} refetch={refetch} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
      
    );
};

export default Category;