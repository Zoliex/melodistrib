import { ChartData, ChartOptions } from 'chart.js'
import { defineStore } from 'pinia'
import { DATA_ORDER, useDataStore } from './dataStore'

export const useDistributionViewStore = defineStore('distributionView', {
    state: () => {
        const data = useDataStore()
        return {
            repartitionByMusiciansChart: {
                data: {
                    labels: [],
                    datasets: []
                } as ChartData<'line'>,
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            display: false
                        }
                    },
                    interaction: {
                        mode: 'x',
                        intersect: false
                    },
                    plugins: {
                        annotation: {
                            annotations: []
                        },
                        tooltip: {
                            mode: 'nearest',
                            axis: 'x',
                            position: 'average',
                            cornerRadius: 5,
                            padding: { x: 10, y: 5 }
                        }
                    }
                } as ChartOptions<'line'>
            },
            settings: {
                firstTrackUUID: data.getTracks(DATA_ORDER.ALPHABETIC)[0]?.uuid || '',
                shuffleTracks: true,
                forceAttribution: [] as Array<{ musicianUUID: string; trackUUID: string }>
            },
            generationTime: 0
        }
    }
})
