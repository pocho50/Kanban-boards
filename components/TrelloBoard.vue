<script setup lang="ts">
import type { Column, Task, Board, ID } from "@/types"
import draggable from "vuedraggable"
import { nanoid } from "nanoid"
import useBoards from "@/composables/useBoards"

const { boards } = useBoards();

const props = defineProps<{
    boardId: ID
}>();

function getBoard() {
    return boards.value.find(b => b.id === props.boardId) as Board
}

const alt = useKeyModifier("Alt")

function createColum() {
    const column: Column = {
        id: nanoid(),
        title: "",
        tasks: []
    }
    getBoard().columns.push(column);
    nextTick(() => {
        (document.querySelector('.column:last-of-type .title-input') as HTMLInputElement).focus()
    })

}
</script>

<template>
    <div>
        <h2 class="font-bold mb-4 text-2xl">
            {{ getBoard().title }}

        </h2>
        <div class="flex items-start overflow-x-auto gap-4">

            <draggable v-model="getBoard().columns" group="columns" handle=".drag-handle" :animation="150" item-key="id"
                class=" flex gap-4  items-start">
                <template #item="{ element: column }: { element: Column }">
                    <div class="column bg-base-200 p-5 rounded min-w-[250px]">
                        <header class="font-bold mb-4">
                            <DragHandle />
                            <input class="title-input bg-transparent focus:bg-white rounded px-1 w-4/5"
                                @keyup.enter="($event.target as HTMLInputElement).blur()"
                                @keydown.backspace="column.title === '' ? getBoard().columns = getBoard().columns.filter(c => c.id !== column.id) : null"
                                v-model="column.title" type="text">
                        </header>
                        <draggable v-model="column.tasks" handle=".drag-handle"
                            :group="{ name: 'tasks', pull: alt ? 'clone' : true }" :animation="150" item-key="id">
                            <template #item="{ element: task }: { element: Task }">
                                <div>
                                    <TrelloBoardTask :task="task"
                                        @delete="column.tasks = column.tasks.filter(t => t.id !== $event)" />
                                </div>
                            </template>
                        </draggable>

                        <footer>
                            <NewTask @add="column.tasks.push($event)" />
                        </footer>
                    </div>
                </template>
            </draggable>

            <button @click="createColum" class="btn opacity-50">
                + Add another column

            </button>
        </div>
    </div>
</template>