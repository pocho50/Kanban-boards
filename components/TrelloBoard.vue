<script setup lang="ts">
import type { Column } from "@/types"
import { nanoid } from "nanoid"
const columns = ref<Column[]>([
    {
        id: nanoid(),
        title: "Backlog",
        tasks: [
            {
                id: nanoid(),
                title: "Create marketing landing page",
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

</script>

<template>
    <div class=" flex gap-4 overflow-x-auto items-start">
        <div v-for="column in columns" :key="column.id" class="bg-gray-200 p-5 rounded min-w-[250px]">
            <header class="font-bold mb-4">
                {{ column.title }}
            </header>
            <TrelloBoardTask :task="task" v-for="task in column.tasks" :key="task.id" />
            <footer>
                <button class="text-gray-500">+ Add a Card</button>
            </footer>
        </div>

    </div>
</template>