import React from "react";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { hourState, minuteState, toDoState } from "./atoms";
import Board from "./Components/Board";
import DraggableCard from "./Components/DraggableCard";
//import Board from "./Components/Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;


function App() {
  // const [toDos, setToDos] = useRecoilState(toDoState);
  // const onDragEnd = (info: DropResult) => {
  //   const { destination, draggableId, source } = info;
  //   if (!destination) return;
  //   if (destination?.droppableId === source.droppableId) {
  //     // same board movement.
  //     setToDos((allBoards) => {
  //       const boardCopy = [...allBoards[source.droppableId]];
  //       const taskObj = boardCopy[source.index];
  //       boardCopy.splice(source.index, 1);
  //       boardCopy.splice(destination?.index, 0, taskObj);
  //       return {
  //         ...allBoards,
  //         [source.droppableId]: boardCopy,
  //       };
  //     });
  //   }
  //   if (destination.droppableId !== source.droppableId) {
  //     // cross board movement
  //     setToDos((allBoards) => {
  //       const sourceBoard = [...allBoards[source.droppableId]];
  //       const taskObj = sourceBoard[source.index];
  //       const destinationBoard = [...allBoards[destination.droppableId]];
  //       sourceBoard.splice(source.index, 1);
  //       destinationBoard.splice(destination?.index, 0, taskObj);
  //       return {
  //         ...allBoards,
  //         [source.droppableId]: sourceBoard,
  //         [destination.droppableId]: destinationBoard,
  //       };
  //     });
  //   }
  // };
  // return (
  //   <DragDropContext onDragEnd={onDragEnd}>
  //     <Wrapper>
  //       <Boards>
  //         {Object.keys(toDos).map((boardId) => (
  //           <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
  //         ))}
  //       </Boards>
  //     </Wrapper>
  //   </DragDropContext>
  // );
  

  //const toDos = ["a", "b", "c", "d", "e", "f"]

  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info:DropResult) => {
    const {draggableId, destination, source} = info;
    if(!destination) return;
    if(destination?.droppableId === source.droppableId) {
      setToDos((allBoards) => {
          const boardsCopy = [...allBoards[source.droppableId]];
          const taskObj = boardsCopy[source.index]
          boardsCopy.splice(source.index, 1);
          boardsCopy.splice(destination?.index, 0, taskObj);        
          return {
            ...allBoards,
            [source.droppableId]: boardsCopy,
          }
        }      
      )
    }

    if(destination?.droppableId !== source.droppableId) {
      setToDos((allBoards) => {
        const boardsCopy = [...allBoards[source.droppableId]];
        const taskObj = boardsCopy[source.index]
        const destinationCopy = [...allBoards[destination.droppableId]];
        boardsCopy.splice(source.index, 1);
        destinationCopy.splice(destination.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: boardsCopy,
          [destination.droppableId]: destinationCopy,
        }
      })
    }


  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => <Board key={boardId} boardId={boardId} toDos={toDos[boardId]} />)}
        </Boards>
      </Wrapper>
    </DragDropContext>
  )
}

export default App;