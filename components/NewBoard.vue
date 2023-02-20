<script setup lang="ts">
import type { Board } from '~~/types';
import useBoards from '@/composables/useBoards'
import { nanoid } from "nanoid";

const { createInitialColumns } = useBoards();

const emit = defineEmits<{
    (e: 'add', payload: Board): void;
}>();

const focused = ref(false);
const title = ref("");

function createBoard(e: Event) {
    if (title.value.trim()) {
        e.preventDefault();
        emit('add', {
            title: title.value.trim(),
            id: nanoid(),
            columns: createInitialColumns()
        } as Board)
    }
    title.value = "";
}


</script>

<template>
    <input type="text" v-model="title" @keyup.enter="createBoard"
        class="input input-ghost w-full max-w-xs resize-none cursor-pointer focus:bg-base-100 focus:border-2 focus:border-base-300"
        style="outline: none !important" @focus="focused = true" @blur="focused = false"
        :placeholder="!focused ? '+ Add New Board' : 'Enter a title for this Board'" />
</template>