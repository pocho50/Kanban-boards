<script setup lang="ts">
import useBoards from '@/composables/useBoards'

const { boards, currentBoard, createNewBoard } = useBoards();
</script>
<template>
  <div class="drawer">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <!-- Page content here -->
      <TheNavBar />

      <div class="p-10 h-[100vh] bg-accent overflow-hidden">
        <TrelloBoard :board-id="currentBoard.id" />
      </div>
    </div>
    <div class="drawer-side">
      <label for="my-drawer" class="drawer-overlay"></label>
      <ul class="menu p-4 w-80 bg-base-100 text-base-content">
        <!-- Sidebar content here -->
        <li v-for="board in boards" :id="board.id">
          <label for="my-drawer" @click="currentBoard = board">
            {{ board.title }}
          </label>

        </li>
        <li>
          <NewBoard @add="createNewBoard" />

        </li>

      </ul>
    </div>
  </div>
</template>
