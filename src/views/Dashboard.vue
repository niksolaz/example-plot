<template>
  <div class="p-3 my-40 mx-auto container border-2 border-gray-500">
    <SensorTable @select="handleSelect" />
    <SensorChart :sensorId="selectedSensorId" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SensorTable from '../components/SensorTable.vue';
import SensorChart from '../components/SensorChart.vue';

// refs 
const selectedSensorId = ref('SEN-001'); // parto con il primo sensore già selezionato per il grafico

// metodi
function handleSelect(id: string) {
  // seleziona il sensore cliccato per passarlo tramite props al componente SensorChart, così il grafico si aggiorna con i dati del sensore selezionato
  selectedSensorId.value = id;
}
</script>