<script setup>
import { ref, onMounted, watch } from "vue";
import productsData from "../database/products.json";
import MessageState from "@/components/MessageState.vue";

const productsRef = ref(productsData);
const isSuccess = ref(false);

// Sumamos el voto en el indice correcto y guardamos los totales en el localStorage.
const generateVote = (index) => {
  isSuccess.value = false;
  try {
    productsRef.value[index].votes += 1;
    localStorage.setItem(
      productsRef.value[index].id,
      productsRef.value[index].votes
    );
    isSuccess.value = true;
  } catch (error) {
    console.log(error);
  }
};

// Asignar su color dependiendo de su tipo de producto
const dynamicColor = (type) => {
  let bgColor = "";
  switch (type) {
    case 1:
      bgColor = "bg-[#965AD6]";
      break;
    case 2:
      bgColor = "bg-[#4BA6F9]";
      break;
    case 3:
      bgColor = "bg-[#E55578]";
      break;
  }
  return bgColor;
};

// Obtenemos del localStorage los votos previamente guardados.
onMounted(() => {
  let localVotes;
  productsRef.value.forEach((value, index) => {
    localVotes = "";
    localVotes = localStorage.getItem(value.id);

    if (localVotes) {
      productsRef.value[index].votes = parseInt(localVotes);
    }
  });
});

// Controlar el estado para el componente de MessageState
watch(isSuccess, (newState, oldState) => {
  if (newState === true) {
    setTimeout(() => {
      isSuccess.value = false;
    }, 1000);
  }
});
</script>

<template>
  <div
    class="flex justify-center relative items-center w-screen h-screen bg-gradient-to-r from-[#e2e2e2] to-[#c9d6ff]"
  >
    <div
      class="flex flex-row lg:flex-col xl:flex-col flex-wrap items-center justify-center p-4 bg-white w-full shadow-sm lg:w-4/5 xl:w-4/5 lg:h-4/5 xl:h-4/5 h-screen lg:max-h-[600px] md:w-full rounded-md"
    >
      <!-- Tarjeta -->
      <div
        v-for="(products, index) in productsRef"
        :class="[
          'flex flex-col lg:flex-row xl:flex-row justify-between items-center border rounded-sm p-4 mb-2 ',
          products.type === 1 ? 'w-[48%]' : 'w-full lg:w-[48%] xl:1/2',
        ]"
      >
        <!-- Cantidad de votos -->
        <div
          :class="[
            'flex justify-center items-center w-20 rounded-md text-white font-medium text-lg',
            dynamicColor(products.type),
          ]"
        >
          {{ products.votes }}
        </div>
        <!-- Nombre y descripción -->
        <div
          class="lg:w-72 text-sm text-wrap overflow-hidden mt-2 lg:mt-0 xl:mt-0"
        >
          <h2 class="text-base font-medium">{{ products.name }}</h2>
          <p class="">{{ products.description }}</p>
        </div>
        <!-- Acción votar -->
        <div class="flex justify-center items-center">
          <button
            type="button"
            @click="generateVote(index)"
            class="border px-5 py-1.5 rounded-sm text-sm transition-all mt-2 lg:mt-0 xl:mt-0 hover:bg-gray-200"
          >
            Votar
          </button>
        </div>
      </div>
    </div>
    <!-- Componente para mensajes -->
    <MessageState :isShowing="isSuccess" />
  </div>
</template>
