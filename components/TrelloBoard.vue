<script setup lang="ts">
import type { Column, Task } from "@/types"
import { nanoid } from "nanoid"
import draggable from "vuedraggable"
const columns = useLocalStorage<Column[]>('trelloBoard', [
    {
        id: nanoid(),
        title: "Backlog",
        tasks: [
            {
                id: nanoid(),
                title: "Create marketing landing page",
                createAt: new Date()

            },
            {
                id: nanoid(),
                title: "New Design",
                createAt: new Date()
            }
        ]
    },
    {
        id: nanoid(),
        title: "Complete",
        tasks: [],
    },
    {
        id: nanoid(),
        title: "I Progress",
        tasks: [],
    }
])
const alt = useKeyModifier("Alt")

function createColum() {
    const column: Column = {
        id: nanoid(),
        title: "",
        tasks: []
    }
    columns.value.push(column);
    nextTick(() => {
        (document.querySelector('.column:last-of-type .title-input') as HTMLInputElement).focus()
    })

}
</script>

<template>
    <div class="flex items-start overflow-x-auto gap-4">
        <draggable v-model="columns" group="columns" handle=".drag-handle" :animation="150" item-key="id"
            class=" flex gap-4  items-start">
            <template #item="{ element: column }: { element: Column }">
                <div class="column bg-gray-200 p-5 rounded min-w-[250px]">
                    <header class="font-bold mb-4">
                        <DragHandle />
                        <input class="title-input bg-transparent focus:bg-white rounded px-1 w-4/5"
                            @keyup.enter="($event.target as HTMLInputElement).blur()"
                            @keydown.backspace="column.title === '' ? columns = columns.filter(c => c.id !== column.id) : null"
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

        <button @click="createColum" class="bg-gray-200 whitespace-nowrap p-2 rounded opacity-50">
            + Add another column

        </button>
    </div>
</template>