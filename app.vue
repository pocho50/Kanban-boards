<script setup lang="ts">
import useBoards from '@/composables/useBoards'
import { TrashIcon } from '@heroicons/vue/24/solid'

const { boards, currentBoard, createNewBoard, removeBoard } = useBoards();
</script>
<template>
  <div class="drawer">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <!-- Page content here -->
      <TheNavBar />

      <div class="p-10 h-[100vh] bg-accent overflow-hidden">
        <TrelloBoard v-if="currentBoard" :board-id="currentBoard.id" />
      </div>
    </div>
    <div class="drawer-side">
      <label for="my-drawer" class="drawer-overlay"></label>
      <ul class="menu p-4 w-80 bg-base-100 text-base-content">
        <!-- Sidebar content here -->
        <li v-for="board in boards" :id="board.id">

          <div class="flex justify-between w-full p-0">
            <label for="my-drawer" class="w-full h-full cursor-pointer p-3" @click="currentBoard = board">
              {{ board.title }}
            </label>
            <button @click="removeBoard(board)" class="pr-3">
              <TrashIcon class="h-4 hover:text-red-600" />
            </button>
          </div>


        </li>
        <li>
          <NewBoard @add="createNewBoard" />

        </li>

      </ul>
    </div>
  </div>
</template>
