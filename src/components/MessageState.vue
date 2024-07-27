<template>
  <TransitionRoot
    appear
    :show="isShowing"
    as="template"
    enter="transform transition duration-[400ms]"
    enter-from="opacity-0 scale-50"
    enter-to="opacity-100 scale-100"
    leave="transform duration-200 transition ease-in-out"
    leave-from="opacity-100 scale-100 "
    leave-to="opacity-0 scale-95 "
  >
    <div
      class="fixed z-50 bottom-4 right-4 p-2 bg-green-400 text-white font-medium rounded-md"
    >
      <p>El voto ha sido registrado.</p>
    </div>
  </TransitionRoot>
</template>

<script setup>
import { ref } from "vue";
import { TransitionRoot } from "@headlessui/vue";

const props = defineProps(["isShowing"])
</script>
