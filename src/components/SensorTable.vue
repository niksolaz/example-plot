<template>
  <table class="table-auto w-full border-collapse border border-slate-500">
    <thead>
      <tr class="bg-gray-100">
        <th class="border border-slate-600 py-3 cursor-pointer" @click="sortBy('id')">ID</th>
        <th class="border border-slate-600 py-3 cursor-pointer" @click="sortBy('name')">Name</th>
        <th class="border border-slate-600 py-3">Location</th>
        <th class="border border-slate-600 py-3">Last Value</th>
        <th class="border border-slate-600 py-3">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr 
      v-for="sensor in sortedSensors" 
      :key="sensor.id" 
      @click="getSensorId(sensor.id)" 
      class="cursor-pointer text-center hover:bg-gray-100 hover:scale-95 hover:shadow-lg hover:rounded-lg transition-all duration-300"
      :class="{ 'bg-gray-100': sensor.id === selectedSensorId }"
      >
        <td class="py-3 border border-slate-600">{{ sensor.id }}</td>
        <td class="py-3 border border-slate-600">{{ sensor.name }}</td>
        <td class="py-3 border border-slate-600">{{ sensor.location }}</td>
        <td class="py-3 border border-slate-600">{{ sensor.lastValue?.toFixed(2) ?? '—' }}</td>
        <td class="py-3 border border-slate-600" :class="sensor.lastValue > sensor.threshold ? 'text-red-500' : 'text-green-600'">
          {{ sensor.lastValue > sensor.threshold ? 'Alarm' : 'OK' }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useSensorsStore } from '../store/sensor';

// store
const store = useSensorsStore();

// emits
const emit = defineEmits(['select']);

// lifecycle
onMounted(() => store.loadSensors());

// refs
const sortKey = ref<'id' | 'name'>('id');
const selectedSensorId = ref('SEN-001'); // parto con il primo sensore già selezionato per l'effetto hover

// metodi
function sortBy(key: 'id' | 'name') {
  sortKey.value = key; // ordina i sensori per id o name in base alla chiave passata, questo permette alla computed di ordinare i sensori in base alla chiave passata
  // TODO: aggiungere nel template qualche icona per indicare l'ordine di ordinamento, magari anche un effetto che si attiva quando si clicca sulla colonna per indicare l'ordine di ordinamento
}

function getSensorId(id: string) {
  selectedSensorId.value = id;
  emit('select', id)
}

// computed
const sortedSensors = computed(() => {
  // ordina i sensori in base alla chiave passata
  return [...store.sensors].sort((a, b) => a[sortKey.value].localeCompare(b[sortKey.value]));
});

</script>