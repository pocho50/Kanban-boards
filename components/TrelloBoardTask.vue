<script setup lang="ts">
import type { Task, ID } from '~~/types';
import { XMarkIcon } from '@heroicons/vue/24/outline'


const props = defineProps<{
    task: Task
}>();

const emit = defineEmits<{
    (e: "delete", payload: ID): void;
}>()

const focused = ref(false);

onKeyStroke("Backspace", (e) => {
    if (focused.value == true) emit('delete', props.task.id)
})
</script>

<template>
    <div :title="task.createAt.toLocaleString()" class="task bg-white p-2 mb-2 rounded shadow-sm max-w-[250px] flex"
        @focus="focused = true" @blur="focused = false" tabindex="0">
        <DragHandle class="pr-2 h-6 w-6" />
        <span class="grow">{{ task.title }}</span>
        <XMarkIcon class="h-5 w-5 hover:text-red-600 pt-1 cursor-pointer" @click="$emit('delete', task.id)" />
    </div>
</template>
<style>
.sortable-drag .task {
    transform: rotate(5deg);
}

.sortable-ghost .task {
    position: relative;
}

.sortable-ghost .task::after {
    content: "";
    @apply absolute top-0 bottom-0 left-0 right-0 bg-slate-300 rounded;
}

.task:focus,
.task:focus-visible {
    @apply outline-gray-400 !important;
    outline: grey auto 1px;
}
</style>