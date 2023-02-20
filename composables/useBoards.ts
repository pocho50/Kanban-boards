import type { Column, Task, Board } from "@/types";
import { nanoid } from "nanoid";

export default function useBoards() {
  function createInitialColumns(): Column[] {
    return [
      {
        id: nanoid(),
        title: "To Do",
        tasks: [],
      },
      {
        id: nanoid(),
        title: "In Progress",
        tasks: [],
      },
      {
        id: nanoid(),
        title: "Complete",
        tasks: [],
      },
    ];
  }
  const boards = useLocalStorage<Board[]>("trelloBoard", [
    {
      id: nanoid(),
      title: "Board 1",
      columns: createInitialColumns(),
    },
  ]);

  const currentBoard = ref<Board | null>(boards.value[0]);

  const createNewBoard = (newBoard: Board) => {
    boards.value.push(newBoard);
  };

  const removeBoard = (board: Board) => {
    if (currentBoard.value.id === board.id) {
      currentBoard.value = null;
    }
    boards.value = boards.value.filter((b) => b.id !== board.id);
  };

  return {
    createInitialColumns,
    boards,
    currentBoard,
    createNewBoard,
    removeBoard,
  };
}
