import { defineStore } from 'pinia';

// definisce l'interfaccia Measurement
interface Measurement {
  timestamp: string;
  disp_mm: number;
}

// definisce l'interfaccia Sensor
interface Sensor {
  id: string;
  name: string;
  location: string;
  threshold: number;
  lastValue?: number; // valore dell'ultima misurazione?
}

export const useSensorsStore = defineStore('sensors', {
  state: () => ({
    sensors: [] as Sensor[],
    measurements: {} as Record<string, Measurement[]>
  }),
  actions: {
    async loadSensors() {
      // ottiene i dati del sensors dal db.json
      const res = await fetch('/api/sensors');
      const data = await res.json(); 
      // assegna i dati allo state sensors
      this.sensors = data as Sensor[];
    },
    async fetchMeasurements(id: string) {
      // ottiene i dati del measurements dal db.json
      if (!this.measurements[id]) {
        const res = await fetch(`/api/measurements/${id}`); // ottiene i dati del measurements dal db.json
        const dataResponse = await res.json(); // converte i dati in json
        this.measurements[id] = dataResponse.data; // assegna i dati allo state measurements
      }
      return this.measurements[id];
    },
    getThreshold(id: string) {
      // ottiene il threshold del sensor dal db.json
      return this.sensors.find(s => s.id === id)?.threshold || 0;
    }
  }
});