<template>
    <div class="mr-44">
        <Toast />
        <h1 class="text-2xl tracking-wide text-center m-5">Polizas</h1>
        <Button label="+ Añadir" rounded raised class="mb-2 p-2 text-green-600" @click="visible = true" />
        <DataTable :value="polizas" v-model:expandedRows="expandedRows" class="mb-10" paginator :rows="5" stripedRows
            :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="">
            <Column expander style="width: 5rem" />
            <Column field="id" header="#" sortable></Column>
            <Column field="nombre" header="Cliente" sortable></Column>
            <Column field="numero" header="Numero" sortable></Column>
            <Column field="estado" header="Estado" sortable>
                <template #body="slotProps">
                    <Tag :value="slotProps.data.estado" :severity="getSeverityPago(slotProps.data.estado)" />
                </template>
            </Column>
            <Column field="importe" header="Importe Total" sortable></Column>
            <Column field="importe_restante" header="Importe Restante" sortable></Column>
            <Column field="notas" header="Notas" :body="tipoTemplate" sortable></Column>
            <Column header="Opciones">
                <template #body="slotProps">
                    <div class="bg-orange-300 p-1 m-1 w-min rounded">
                        <Button icon="bi bi-pencil-square" @click="obtenerCliente(slotProps.data.id)" />
                    </div>
                    <div class="bg-red-300 p-1 m-1 w-min rounded">
                        <Button icon="bi bi-trash" @click="confirmDelete(slotProps.data.id)" />
                    </div>
                </template>
            </Column>
            <template #expansion="slotProps">
                <div class="pl-16 pr-16 pt-5 pb-5 bg-blue-900 bg-opacity-80 rounded-md">
                    <h5 class="text-white">Pagos de la póliza #{{ slotProps.data.numero }}</h5>
                    <Button label="+ Nuevo Pago" rounded class="m-2 p-1 border text-white"
                        @click="crearPago(slotProps.data.numero)" />
                    <DataTable :value="slotProps.data.pagos" paginator stripedRows :rows="5"
                        :rowsPerPageOptions="[5, 10, 20, 50]">
                        <!-- <Column field="cliente_id" header="Cliente" sortable></Column> -->
                        <Column field="id" header="#" sortable></Column>
                        <Column field="num_poliza" header="Poliza" sortable></Column>
                        <Column field="importe" header="Importe" sortable></Column>
                        <Column field="fecha_pago" header="Fecha Pago" sortable></Column>
                        <Column field="notas" header="Notas"></Column>
                    </DataTable>
                </div>
            </template>
        </DataTable>

        <Dialog v-model:visible="visiblePago" modal header="Nuevo Pago" :style="{ width: '25rem' }">
            <span class="p-text-secondary block mb-5 text-green-600">Añadir Pago</span>
            <div class="flex align-items-center gap-3 mb-3">
                <label for="poliza" class="font-semibold w-6rem">Numero Poliza: </label>
                <InputText id="poliza" v-model="nuevoPago.num_poliza" readonly class="flex-auto " autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-3">
                <label for="notas" class="font-semibold w-6rem">Notas: </label>
                <InputText id="notas" v-model="nuevoPago.notas" class="flex-auto p-1" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-3">
                <label for="importe" class="font-semibold w-6rem">Importe: </label>
                <InputNumber id="importe" v-model="nuevoPago.importe" class="flex-auto p-1" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-3">
                <label for="fecha_pago" class="font-semibold w-6rem">Fecha Pago: </label>
                <Calendar v-model="nuevoPago.fecha_pago" :maxDate="maxDate" showButtonBar showIcon iconDisplay="input"
                    inputId="icondisplay" />
            </div>

            <div class="flex justify-content-end gap-2 mt-5 ml-28 align-items-center">
                <Button type="button" label="Cancel" @click="visiblePago = false"></Button>
                <Button type="button" label="Añadir" raised class="mr-2 p-2 text-green-600"
                    @click="confirmNewPago"></Button>
            </div>
        </Dialog>




        <Dialog v-model:visible="deleteVisible" modal header="Borrar Poliza" :style="{ width: '25rem' }">
            <div class="flex align-items-center gap-3 mb-3">
                <label for="nombre" class="font-semibold w-6rem">¿Está seguro de borrar el cliente? </label>
            </div>

            <div class="flex justify-content-end gap-2 mt-5 ml-28 align-items-center">
                <Button type="button" label="Cancel" @click="deleteVisible = false"></Button>
                <Button type="button" label="Borrar" raised class="mr-2 p-2 text-red-600" @click="deletePoliza"></Button>
            </div>
        </Dialog>



        <Dialog v-model:visible="visible" modal header="Crear Poliza" :style="{ width: '25rem' }">
            <span class="p-text-secondary block mb-5 text-green-600">Información Personal</span>
            <div class="flex align-items-center gap-3 mb-3">
                <label for="nombre" class="font-semibold w-6rem">Cliente: </label>
                <Dropdown v-model="tipoSelected" :options="clientes" optionLabel="nombre" placeholder="Cliente" filter
                    class="w-full md:w-14rem">
                    <template #option="slotProps">
                        <div>{{ slotProps.option.nombre }}</div>
                    </template>
                </Dropdown>

            </div>

            <div class="flex align-items-center gap-3 mb-3">
                <label for="estado" class="font-semibold w-6rem">Estado: </label>
                <Dropdown v-model="tipoSelectedEstado" :options="estadosPoliza" placeholder="Tipo de Estado" />
            </div>

            <div class="flex align-items-center gap-3 mb-3">
                <label for="numero" class="font-semibold w-6rem">Numero de Poliza: </label>
                <InputText id="numero" v-model="polizaNueva.numero" class="flex-auto h-8" autocomplete="off" />
            </div>

            <div class="flex align-items-center gap-3 mb-3">
                <label for="importe" class="font-semibold w-6rem">Importe total: </label>
                <InputNumber id="importe" v-model="polizaNueva.importe" class="flex-auto p-2" autocomplete="off" />
            </div>

            <div class="flex align-items-center gap-3 mb-3">
                <label for="notas" class="font-semibold w-6rem">Notas de Poliza: </label>
                <InputText id="notas" v-model="polizaNueva.notas" class="flex-auto p-1 h-8" autocomplete="off" />
            </div>



            <div class="flex justify-content-end gap-2 mt-5 ml-28 align-items-center">
                <Button type="button" label="Cancel" @click="visible = false"></Button>
                <Button type="button" label="Crear" raised class="mr-2 p-2 text-green-600" @click="crearPoliza"></Button>
            </div>
        </Dialog>

        <Dialog v-model:visible="editVisible" modal header="Editar Poliza" :style="{ width: '25rem' }">
            <span class="p-text-secondary block mb-5 text-blue-600">Información Personal</span>
            <div class="flex align-items-center gap-3 mb-3">
                <label for="nombre" class="font-semibold w-6rem">Cliente: </label>
                <Dropdown v-model="tipoSelected" :options="clientes" optionLabel="nombre" placeholder="Cliente" filter
                    class="w-full md:w-14rem">
                    <template #option="slotProps">
                        <div>{{ slotProps.option.nombre }}</div>
                    </template>
                </Dropdown>
            </div>

            <div class="flex align-items-center gap-3 mb-3">
                <label for="estado" class="font-semibold w-6rem">Estado: </label>
                <Dropdown v-model="tipoSelectedEstado" :options="estadosPoliza" placeholder="Tipo de Estado" />
            </div>
            <div class="flex align-items-center gap-3 mb-3">
                <label for="numero" class="font-semibold w-6rem">Numero de Poliza: </label>
                <InputText id="numero" v-model="polizaNueva.numero" class="flex-auto h-8" autocomplete="off" />
            </div>

            <div class="flex align-items-center gap-3 mb-3">
                <label for="importe" class="font-semibold w-6rem">Importe total: </label>
                <InputNumber id="importe" v-model="polizaNueva.importe" class="flex-auto p-2" autocomplete="off" />
            </div>

            <div class="flex align-items-center gap-3 mb-3">
                <label for="notas" class="font-semibold w-6rem">Notas de Poliza: </label>
                <InputText id="notas" v-model="polizaNueva.notas" class="flex-auto p-1 h-8" autocomplete="off" />
            </div>

            <div class="flex justify-content-end gap-2 mt-5 ml-28 align-items-center">
                <Button type="button" label="Cancel" @click="editVisible = false"></Button>
                <Button type="button" label="Editar" raised class="mr-2 p-2 text-blue-600"
                    @click="enviarPolizaMod"></Button>
            </div>
        </Dialog>


    </div>
</template>

<script>
import api from '@/service/service';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Tag from 'primevue/tag';
import Dropdown from 'primevue/dropdown';
import Toast from 'primevue/toast';
import InputNumber from 'primevue/inputnumber';
import Calendar from 'primevue/calendar';

export default {
    name: 'Polizas',
    components: {
        DataTable,
        Column,
        Button,
        Dialog,
        InputNumber,
        InputText,
        Toast,
        Tag,
        Dropdown,
        Calendar,
    },
    data() {
        return {
            estadosPoliza: ['a cuenta', 'anulada', 'liquidada', 'pre anulada'],
            polizas: [],
            clientes: [],
            pagos: [],
            polizaNueva: {
                cliente_id: null,
                numero: null,
                estado: null,
                importe: null,
                notas: null,
            },
            editVisible: false,
            visible: false,
            deleteVisible: false,
            expandedRows: [],
            visiblePago: false,
            tipoSelected: null,
            tipoSelectedEstado: null,
            nuevoPago: {
                num_poliza: null,
                notas: null,
                importe: null,
                fecha_pago: null,
            },
            buttondisplay: null,
            icondisplay: null,
            templatedisplay: null,
            maxDate: null,
        };
    },
    created() {
        let today = new Date();
        this.maxDate = today;
    },
    async mounted() {
        this.fetchUsers();
        await this.fetchPolizas();
    },
    methods: {
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
        crearPoliza() {
            // console.log(this.tipoSelected.id);
            // this.polizaNueva = {
            //     cliente_id: null,
            //     numero: null,
            //     estado: null,
            //     importe: null,
            //     notas: null,
            // }
            this.polizaNueva.cliente_id = this.tipoSelected.id;
            // console.log(this.tipoSelectedEstado); <-- No está definido aquí
            this.polizaNueva.estado = this.tipoSelectedEstado;

            this.visible = false;
            console.log(this.polizaNueva);
            // Enviar el objeto clienteNuevo al servidor
            api.post('polizas', this.polizaNueva)
                .then(response => {
                    console.log(response);
                    // this.polizaNueva.cliente_id = response.data.cliente_id;
                    this.polizas.push(this.polizaNueva);
                    this.fetchPolizas();
                    this.$toast.add({ severity: 'success', summary: 'Hecho', detail: 'Poliza Creado Correctamente', life: 3000 });
                })
                .catch(error => {
                    console.log(error);
                    this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Algo ha ido mal :(', life: 3000 });
                });

            this.polizaNueva = {
                cliente_id: null,
                numero: null,
                estado: null,
                importe: null,
                notas: null,
            }
        },
        obtenerCliente(id) {
            console.log(id);
            api.get(`polizas/${id}`)
                .then(response => {
                    // Asignar los datos del cliente a clienteNuevo
                    this.polizaNueva = response.data;
                    this.tipoSelected = this.clientes.find(cliente => cliente.id === this.polizaNueva.cliente_id);
                    this.tipoSelectedEstado = this.polizaNueva.estado; // Asignar el estado de la póliza
                    // Abrir el modal de edición
                    this.editVisible = true;
                    console.log(this.polizaNueva);
                })
                .catch(error => {
                    console.error('Error al obtener cliente:', error);
                });
        },
        confirmDelete(id) {
            this.deleteVisible = true;
            this.polizaNueva.id = id;
        },
        deletePoliza() {
            console.log(this.polizaNueva.id);
            api.delete(`/polizas/${this.polizaNueva.id}`)
                .then(response => {
                    this.deleteVisible = false;
                    this.$toast.add({ severity: 'success', summary: 'Hecho', detail: 'Poliza Borrado Correctamente', life: 3000 });
                    this.polizas = this.polizas.filter(poliza =>
                        poliza.id != this.polizaNueva.id
                    )
                })
                .catch(error => {
                    console.error(error)
                })
        },
        editPoliza() {
            console.log(this.polizaNueva, this.polizaNueva.id);
            this.polizaNueva.cliente_id = this.tipoSelected;
            this.polizaNueva.estado = this.tipoSelectedEstado;
            api.patch(`polizas/${this.polizaNueva.id}`, this.polizaNueva)
                .then(response => {
                    console.log(response);
                    // Cerrar el modal después de guardar los cambios
                    this.editVisible = false;

                    this.fetchPolizas();
                    this.$toast.add({ severity: 'success', summary: 'Hecho', detail: 'Poliza Editada Correctamente', life: 3000 });
                })
                .catch(error => {
                    console.error('Error al editar cliente:', error);
                });
        },
        crearPago(poliza) {
            this.nuevoPago.num_poliza = poliza;
            this.visiblePago = true;
        },
        confirmNewPago() {
            console.log(this.nuevoPago);
            this.visiblePago = false;
            api.post('pagos', this.nuevoPago)
                .then(response => {
                    console.log(response);
                    // this.nuevoPago.id = response.data.id;
                    this.fetchPolizas();
                    this.pagos.push(response.data);
                    this.polizas = this.polizas.map(poliza => {
                        if (this.nuevoPago.num_poliza == poliza.numero) {
                            const pagoPoliza = this.pagos.filter(pago => pago.num_poliza == poliza.numero)
                            return { ...poliza, pagos: pagoPoliza }
                        }
                        return poliza
                    })
                    this.$toast.add({ severity: 'success', summary: 'Hecho', detail: 'Pago Creado Correctamente', life: 3000 });
                })
                .catch(error => {
                    console.log(error);
                    this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Algo ha ido mal :(', life: 3000 });
                });
        },
        async fetchPolizas() {
            try {
                const responsePolizas = await api.get('polizas');
                this.polizas = responsePolizas.data;

                const responsePagos = await api.get('pagos');
                this.pagos = responsePagos.data;
                const polizaTest = this.polizas.map(poliza => {
                    const polizaPago = this.pagos.filter(pago => pago.num_poliza == poliza.numero);
                    let importePago = 0;
                    for (let pago of polizaPago) {
                        importePago += parseInt(pago.importe);
                    }
                    importePago = parseFloat(poliza.importe) - importePago;
                    const user = this.clientes.find(cliente => cliente.id == poliza.cliente_id);
                    const { nombre } = { ...user }
                    const data = { ...poliza, nombre: nombre, pagos: polizaPago, importe_restante: importePago.toFixed(2) }
                    return data;
                });

                this.polizas = polizaTest;
            } catch (error) {
                console.error('Error al obtener usuarios:', error);
            }
        },
        fetchUsers() {
            api.get('clientes')
                .then(response => {
                    this.clientes = response.data.map(cliente => ({
                        ...cliente,
                        empresa: cliente.empresa === 0 ? 'Particular' : 'Empresa'
                    }));
                })
                .catch(error => {
                    console.error('Error al obtener usuarios:', error);
                });
        },

        enviarPolizaMod() {
            this.polizaNueva.cliente_id = this.tipoSelected.id;
            console.log(this.polizaNueva, this.polizaNueva.id);
            api.put(`polizas/${this.polizaNueva.id}`, this.polizaNueva)
                .then(async response => { // Definir la función como async aquí
                    console.log(response);
                    // Cerrar el modal después de guardar los cambios
                    this.editVisible = false;

                    this.fetchPolizas();
                    // this.polizas = this.polizas.map(poliza => {
                    //     const nombre = this.clientes.find(cliente => cliente.id == poliza.cliente_id).nombre;
                    //     return { ...poliza, nombre: nombre };
                    // });

                    // const pagosResponse = await api.get('pagos'); // Utilizar await aquí
                    // this.pagos = pagosResponse.data;


                    // console.log(this.pagos);
                    // this.polizas = this.polizas.map(poliza => {
                    //     const polizaPago = this.pagos.filter(pago => pago.num_poliza === poliza.numero);
                    //     let importePago = 0;
                    //     for (let pago of polizaPago) {
                    //         console.log(pago);
                    //         importePago += parseInt(pago.importe);
                    //     }
                    //     importePago = parseFloat(poliza.importe) - importePago;
                    //     return { ...poliza, pagos: polizaPago, importe_restante: importePago.toFixed(2) };
                    // });

                    this.$toast.add({ severity: 'success', summary: 'Hecho', detail: 'Poliza Editado Correctamente', life: 3000 });
                })
                .catch(error => {
                    console.error('Error al editar cliente:', error);
                });
        },



    },
}
</script>