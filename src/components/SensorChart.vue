<template>
  <div class="relative w-full h-[400px] mt-4">
    <div :id="chartId" class="w-full h-full"></div>
    <div v-if="error" class="absolute inset-0 flex items-center justify-center bg-red-50 text-red-600">
      Grafico non disponibile
    </div>
    <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-gray-50">
      Caricamento...
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, onMounted, onUnmounted, ref, computed } from 'vue';
import Plotly from 'plotly.js-dist-min';
import { useSensorsStore } from '../store/sensor';

// props
const props = defineProps({ 
  sensorId: {
    type: String,
    required: true
  } 
});

// store
const store = useSensorsStore();

// refs
const error = ref<string | null>(null);
const loading = ref(false);

// computed
// Genera un ID unico per il grafico
const chartId = computed(() => `chart-${props.sensorId}`);

// Metodi
// Funzione che renderizza il grafico
async function renderChart() {
  /* 
  *! implementazione ritrovata su internet
  *! https://plotly.com/javascript/getting-started/
  *! https://plotly.com/javascript/line-charts/
  *! https://plotly.com/javascript/line-charts/#line-charts-with-plotly-js
  * molte funzionalità utili per il grafico, ### da valutare come funzionano ###
  */
  try {
    loading.value = true;
    error.value = null;
    
    const data = await store.fetchMeasurements(props.sensorId); // dati del sensore selezionato
    const threshold = store.getThreshold(props.sensorId); // soglia del sensore selezionato
    const x = data.map(m => m.timestamp); // asse x tramite timestamp
    const y = data.map(m => m.disp_mm); // asse y tramite disp_mm
    const over = y.map(v => v > threshold ? v : null); // asse y sopra la soglia

    // layout del grafico
    const layout = {
      title: `Misurazioni Sensore ${props.sensorId}`,
      xaxis: {
        title: 'Data/Ora',
        tickformat: '%d/%m/%Y %H:%M',
        tickangle: -45
      },
      yaxis: {
        title: 'Spostamento (mm)',
        range: [0, Math.max(...y, threshold) * 1.1] // range dell'asse y, il max tra i dati e la soglia per avere un po' di spazio per il grafico
      },
      margin: { t: 100, r: 0, b: 100, l: 0 }, // margini del grafico
      showlegend: true,
      legend: {
        x: 0,
        y: 1.5
      }
    };

    // configurazione del grafico
    const config = {
      responsive: true,
      displayModeBar: false, // disabilitato funzionalità non utili per il momento
      displaylogo: false
    };

    /* plot del grafico, 
    * il newPlot è la funzione che crea il grafico,
    */
    await Plotly.newPlot(chartId.value, [
      // dati del grafico
      {
        x, y,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Misurazioni',
        line: { color: '#3B82F6' }
      },
      // soglia del grafico
      {
        x, y: Array(y.length).fill(threshold),
        type: 'scatter',
        mode: 'lines',
        name: 'Soglia',
        line: { dash: 'dot', color: '#EF4444' }
      },
      // dati sopra la soglia
      {
        x, y: over,
        mode: 'markers',
        type: 'scatter',
        name: 'Sopra soglia',
        marker: { color: '#EF4444', size: 8 }
      }
    ], layout, config); // layout e config sono gli oggetti che definiscono la struttura del grafico

  } catch (e) {
    error.value = 'Errore nel caricamento del grafico';
    console.error('Errore nel rendering del grafico:', e);
  } finally {
    loading.value = false;
  }
}

// Lifecycle
// Renderizza il grafico quando il componente viene montato
onMounted(() => {
  renderChart();
});
// Pulisci il grafico quando il componente viene distrutto, per evitare che il grafico si accumuli con i dati dei sensori precedenti
onUnmounted(() => {
  Plotly.purge(chartId.value);
});

// Watch
// Rende il grafico quando il sensore selezionato cambia
watch(() => props.sensorId, renderChart);
</script>