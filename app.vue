<script setup lang="ts">
import type { Column, Task, Board } from "@/types"
import { nanoid } from "nanoid"
const boards = useLocalStorage<Board[]>('trelloBoard', [
  {
    id: nanoid(),
    title: 'Board 1',
    columns: [
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
    ]
  }

])
</script>
<template>
  <div class="drawer">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <!-- Page content here -->
      <TheNavBar />

      <div class="p-10 h-[100vh] bg-accent overflow-hidden">
        <TrelloBoard :board="boards[0]" />
      </div>
    </div>
    <div class="drawer-side">
      <label for="my-drawer" class="drawer-overlay"></label>
      <ul class="menu p-4 w-80 bg-base-100 text-base-content">
        <!-- Sidebar content here -->
        <li v-for="board in boards" :id="board.id">
          <a>{{ board.title }}</a>
        </li>

      </ul>
    </div>
  </div>

</template>
