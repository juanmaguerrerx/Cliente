
<template>
    <div class="container mx-auto p-8">
        <h2 class="text-4xl mb-3">Filtros</h2>
        <!-- Input de rango numérico -->
        <div class="mb-4">
            <label class="block mb-2 text-sm font-bold text-gray-700" for="idMin">Rango Numérico:</label>
            <div class="flex w-44">
                <InputNumber v-model="idMin" :controls="false" class="w-min mr-2" placeholder="Mínimo" />
                <span class="text-gray-500">-</span>
                <InputNumber v-model="idMax" :controls="false" class="w-min ml-2" placeholder="Máximo" />
            </div>
        </div>

        <!-- Dropdown para seleccionar estado -->
        <div class="mb-4">
            <label class="block mb-2 text-sm font-bold text-gray-700" for="state">Estado:</label>
            <Dropdown v-model="selectedEstado" :options="estado" placeholder="Selecciona un estado" />

        </div>

        <!-- Input de rango de fechas -->
        <div class="mb-4">
            <label class="block mb-2 text-sm font-bold text-gray-700" for="dateRange">Rango de Fechas:</label>
            <div class="flex w-auto">
                <Calendar v-model="fechaInicio" showButtonBar showIcon iconDisplay="input" inputId="icondisplay"
                    :maxDate="maxDate" class=" mr-2 pr-14" placeholder="Inicio" />
                <span class="text-gray-500">-</span>
                <Calendar v-model="fechaFin" class=" pr-14 ml-2" placeholder="Fin" showButtonBar showIcon
                    :minDate="fechaInicio" :maxDate="maxDate" iconDisplay="input" inputId="icondisplay" />
            </div>
        </div>

        <div class="mb-4">
            <Button label="Aplicar filtros" @click="applyfiltros" class="text-green-600" />
        </div>
    </div>

    <!-- <div>{{ clientesFiltrados }}</div>
    <div>{{ polizasFiltradas }}</div> -->

    <div class="container p-4">
        <h2 class="text-center text-2xl mb-4">Resultados:</h2>
        <div class="w-full flex justify-center">
            <DataTable :value="clientesFiltrados" v-model:expandedRows="expandedRows" paginator stripedRows :rows="5"
                :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="" class="w-auto">
                <Column expander style="width: 5rem" />
                <Column field="id" header="#" sortable></Column>
                <Column field="nombre" header="Nombre" sortable></Column>
                <Column field="email" header="Email" sortable></Column>
                <Column field="telefono" header="Telefono" sortable></Column>
                <Column field="ciudad" header="Ciudad" sortable></Column>
                <Column field="empresa" header="Tipo" sortable>
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.empresa" :severity="getSeverity(slotProps.data.empresa)" />
                    </template>
                </Column>


                <template #expansion="slotProps">
                    <div class="p-4 bg-blue-900 bg-opacity-80 rounded-md">
                        <h5 class="text-white">Polizas de {{ slotProps.data.nombre }}</h5>
                        <DataTable :value="getPolizas(slotProps.data.id)" v-model:expandedRows="expandedRowsPagos" paginator
                            stripedRows :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]">
                            <Column expander style="width: 5rem" />
                            <Column field="numero" header="Nombre" sortable></Column>
                            <Column field="estado" header="Estado" sortable>
                                <template #body="slotProps">
                                    <Tag :value="slotProps.data.estado"
                                        :severity="getSeverityPago(slotProps.data.estado)" />
                                </template>
                            </Column>
                            <Column field="notas" header="Notas" sortable></Column>
                            <Column field="importe" header="Importe" sortable></Column>
                            <template #expansion="slotProps">
                                <div class="p-2 bg-slate-600 bg-opacity-80 rounded-md">
                                    <h5 class="text-white">Pagos de {{ slotProps.data.numero }}</h5>
                                    <DataTable :value="slotProps.data.pagos" paginator stripedRows :rows="5"
                                        :rowsPerPageOptions="[5, 10, 20, 50]">
                                        <Column field="importe" header="Importe" sortable></Column>
                                        <Column field="fecha_pago" header="Fecha de Pago" sortable></Column>
                                        <Column field="notas" header="Notas" sortable></Column>
                                    </DataTable>
                                </div>
                            </template>
                        </DataTable>
                    </div>
                </template>

            </DataTable>
        </div>
    </div>
</template>
  
<script>
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
import Calendar from 'primevue/calendar';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import api from '@/service/service';

export default {
    name: 'Filtros',
    components: {
        InputNumber,
        Button,
        Calendar,
        Dropdown,
        DataTable,
        Column,
        Tag,
    },
    data() {
        return {
            idMin: null,
            idMax: null,
            selectedEstado: null,
            estado: [
                'Todos', 'a cuenta', 'cobrada', 'liquidada', 'anulada', 'pre anulada'
            ],
            fechaInicio: null,
            fechaFin: null,
            expandedRows: [],
            expandedRowsPagos: [],
            clientesFiltrados: [],
            polizasFiltradas: [],
            maxDate: new Date(),
        };
    },
    methods: {
        applyfiltros() {
            this.fetchClientes();
        },
        getSeverityPago(estado) {
            switch (estado) {
                case 'a cuenta':
                    return 'contrast';
                    ; break;
                case 'anulada':
                    return 'danger';
                    break;
                case 'liquidada':
                    return 'success';
                    break;
                case 'pre anulada':
                    return 'warning';
                    break;
            }
        },
        getSeverity(status) {
            if (status == 'Empresa') {
                return 'success'
            } else {
                return 'warning'
            }
        },
        async fetchClientes() {
            try {
                const response = await api.get('/clientes');
                let clientes = response.data;

                for (const cliente of clientes) {
                    if (cliente.empresa == 0) {
                        cliente.empresa = 'Paricular';
                    } else cliente.empresa = 'Empresa';
                }

                // Filtrar los clientes por el rango de IDs
                clientes = clientes.filter(cliente => {
                    return cliente.id >= this.idMin && cliente.id <= this.idMax;
                });


                if (this.selectedEstado == 'Todos') {
                    this.selectedEstado = null;
                }
                // Verificar si el estado seleccionado está vacío
                if (!this.selectedEstado) {
                    this.clientesFiltrados = clientes;
                    await this.fecthPolizas();
                    await this.fetchPagos();
                    return;
                }


                // Obtener los IDs de los clientes filtrados
                const clientesIds = clientes.map(cliente => cliente.id);
                let polizasFiltradas = [];
                // Filtrar las pólizas según el estado seleccionado
                if (this.selectedEstado) {
                    const responsePolizas = await api.get(`/polizas`);
                    const polizas = responsePolizas.data;
                    polizasFiltradas = polizas.filter(poliza => poliza.estado === this.selectedEstado && clientesIds.includes(poliza.cliente_id));
                }

                // Filtrar los clientes basados en si tienen pólizas correspondientes al estado seleccionado
                clientes = clientes.filter(cliente => polizasFiltradas.some(poliza => poliza.cliente_id === cliente.id));

                this.clientesFiltrados = clientes;
                this.polizasFiltradas = polizasFiltradas;
                await this.fetchPagos(); // Cargar pagos

            } catch (error) {
                console.error('Error al obtener los clientes:', error.message);
            }
        },
        async fetchPagos() {
            try {
                const numerosPolizas = this.polizasFiltradas.map(poliza => poliza.numero);
                const responsePagos = await api.get(`/pagos`);
                const pagos = responsePagos.data;

                // Verificar si las fechas están seleccionadas
                if (this.fechaInicio && this.fechaFin) {
                    // Filtrar los pagos dentro del rango de fechas
                    const pagosEnRango = pagos.filter(pago => {
                        const fechaPago = new Date(pago.fecha_pago);
                        return fechaPago >= this.fechaInicio && fechaPago <= this.fechaFin;
                    });

                    // Asociar los pagos filtrados a las pólizas correspondientes
                    this.polizasFiltradas.forEach(poliza => {
                        poliza.pagos = pagosEnRango.filter(pago => pago.num_poliza === poliza.numero);
                    });

                    // Filtrar las pólizas que tienen pagos dentro del rango de fecha
                    this.polizasFiltradas = this.polizasFiltradas.filter(poliza => poliza.pagos.length > 0);
                } else {
                    // Si las fechas no están seleccionadas, asignar todos los pagos a las pólizas correspondientes
                    this.polizasFiltradas.forEach(poliza => {
                        poliza.pagos = pagos.filter(pago => pago.num_poliza === poliza.numero);
                    });
                }

                console.log(this.polizasFiltradas);
            } catch (error) {
                console.error('Error al obtener los pagos:', error.message);
            }
        },

        async fecthPolizas() {
            try {
                // Cargar todas las pólizas
                const responsePolizas = await api.get(`/polizas`);

                // Obtener todas las pólizas
                const polizas = responsePolizas.data;

                // Obtener los IDs de los clientes filtrados
                const clientesFiltradosIds = this.clientesFiltrados.map(cliente => cliente.id);

                // Filtrar las pólizas según el estado seleccionado y el cliente_id
                if (this.selectedEstado) {
                    this.polizasFiltradas = polizas.filter(poliza => {
                        return poliza.estado === this.selectedEstado && clientesFiltradosIds.includes(poliza.cliente_id);
                    });
                } else {
                    this.polizasFiltradas = polizas.filter(poliza => clientesFiltradosIds.includes(poliza.cliente_id));
                }



                console.log(this.polizasFiltradas);
            } catch (error) {
                console.error('Error al obtener las pólizas:', error.message);
            }
        },
        getPolizas(clienteId) {
            return this.polizasFiltradas.filter(poliza => poliza.cliente_id === clienteId);
        }
    }
};
</script>