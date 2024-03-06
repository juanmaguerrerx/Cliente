<template>
    <div class="mr-44 mb-14">
        <Toast />
        <h1 class="text-2xl tracking-wide text-center m-5">Clientes</h1>
        <Button label="+ Añadir" rounded raised class="mb-2 p-2 text-green-600" @click="crear()" />


        <DataTable :value="clientes" v-model:expandedRows="expandedRows" paginator stripedRows :rows="5"
            :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="">
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
            <Column header="Opciones">
                <template #body="slotProps">
                    <div class="bg-orange-300 p-1 m-1 w-min rounded">
                        <Button icon="bi bi-pencil-square" @click="edit(slotProps.data.id)" />
                    </div>
                    <div class="bg-red-300 p-1 m-1 w-min rounded">
                        <Button icon="bi bi-trash" @click="confirmDelete(slotProps.data.id)" />
                    </div>
                </template>
            </Column>

            <template #expansion="slotProps">
                <div class="pl-16 pr-16 pt-5 pb-5 bg-blue-900 bg-opacity-80 rounded-md">
                    <h5 class="text-white">Polizas de {{ slotProps.data.nombre }}</h5>
                    <Button label="+ Nueva Poliza" rounded class="m-2 p-1 border text-white"
                        @click="newPoliza(slotProps.data.id)" />
                    <DataTable :value="slotProps.data.polizas" paginator stripedRows :rows="5"
                        :rowsPerPageOptions="[5, 10, 20, 50]">
                        <!-- <Column field="cliente_id" header="Cliente" sortable></Column> -->
                        <Column field="numero" header="Nombre" sortable></Column>
                        <Column field="estado" header="Estado" sortable>
                            <template #body="slotProps">
                                <Tag :value="slotProps.data.estado" :severity="getSeverityPago(slotProps.data.estado)" />
                            </template>
                        </Column>
                        <Column field="notas" header="Notas" sortable></Column>
                        <Column field="importe" header="Importe" sortable></Column>
                    </DataTable>
                </div>
            </template>

        </DataTable>

        <Dialog v-model:visible="deleteVisible" modal header="Borrar Cliente" :style="{ width: '25rem' }">
            <!-- <span class="p-text-secondary block mb-5">Confirmar Borrado</span> -->
            <div class="flex align-items-center gap-3 mb-3">
                <label for="nombre" class="font-semibold w-6rem">¿Está seguro de borrar el cliente? </label>
            </div>

            <div class="flex justify-content-end gap-2 mt-5 ml-28 align-items-center">
                <Button type="button" label="Cancel" @click="deleteVisible = false"></Button>
                <Button type="button" label="Si, borrar" raised class="mr-2 p-2 text-red-500"
                    @click="borrarCliente"></Button>
            </div>
        </Dialog>

        <Dialog v-model:visible="visiblePoliza" modal header="Crear Poliza" :style="{ width: '25rem' }">
            <span class="p-text-secondary block mb-5 text-green-600">Información Personal</span>
            <div class="flex align-items-center gap-3 mb-3">
                <label for="nombre" class="font-semibold w-6rem">Cliente: </label>
                <InputText v-model="clienteNuevo.nombre" disabled
                    class="w-full md:w-14rem" />
                
        

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
                <Button type="button" label="Cancel" @click="visiblePoliza = false"></Button>
                <Button type="button" label="Crear" raised class="mr-2 p-2 text-green-600" @click="crearPoliza"></Button>
            </div>
        </Dialog>





        <Dialog v-model:visible="visible" modal header="Crear Cliente" :style="{ width: '25rem' }">
            <span class="p-text-secondary block mb-5 text-blue-700">Información Personal</span>
            <div class="flex align-items-center gap-3 mb-3">
                <label for="nombre" class="font-semibold w-6rem">Nombre: </label>
                <InputText id="nombre" v-model="clienteNuevo.nombre" class="flex-auto p-1" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-3">
                <label for="email" class="font-semibold w-6rem">Email: </label>
                <InputText id="email" v-model="clienteNuevo.email" class="flex-auto p-1" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-3">
                <label for="telefono" class="font-semibold w-6rem">Teléfono: </label>
                <InputMask id="telefono" class="p-1 m-2" v-model="clienteNuevo.telefono" mask="999-999-999" />
            </div>
            <div class="flex align-items-center gap-3 mb-3">
                <label for="ciudad" class="font-semibold w-6rem">Ciudad: </label>
                <InputText id="ciudad" v-model="clienteNuevo.ciudad" class="flex-auto p-1" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-3">
                <label for="codigo_postal" class="font-semibold w-6rem">Código Postal: </label>
                <InputMask id="codigo_postal" class="p-1 m-2" v-model="clienteNuevo.codigo_postal" mask="99-999" />
            </div>
            <div class="flex align-items-center gap-3 mb-3">
                <label for="empresa" class="font-semibold w-6rem">Tipo: </label>
                <Dropdown v-model="tipoSelected" :options="tipos" optionLabel="tipo" placeholder="Tipo de Cliente" />
            </div>
            <div class="flex justify-content-end gap-2 mt-5 ml-28 align-items-center">
                <Button type="button" label="Cancel" @click="visible = false"></Button>
                <Button type="button" label="Crear" raised class="mr-2 p-2 text-blue-700" @click="crearCliente"></Button>
            </div>
        </Dialog>

        <Dialog v-model:visible="editVisible" modal header="Editar Cliente" :style="{ width: '25rem' }">
            <span class="p-text-secondary block mb-5 text-green-700">Información Personal</span>
            <div class="flex align-items-center gap-3 mb-3">
                <label for="nombre" class="font-semibold w-6rem">Nombre: </label>
                <InputText id="nombre" v-model="clienteNuevo.nombre" class="flex-auto p-1" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-3">
                <label for="email" class="font-semibold w-6rem">Email: </label>
                <InputText id="email" class="flex-auto p-1" v-model="clienteNuevo.email" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-3">
                <label for="telefono" class="font-semibold w-6rem">Teléfono: </label>
                <InputMask id="telefono" v-model="clienteNuevo.telefono" mask="999-999-999" placeholder="XXX-XXX-XXX" />
            </div>
            <div class="flex align-items-center gap-3 mb-3">
                <label for="ciudad" class="font-semibold w-6rem">Ciudad: </label>
                <InputText id="ciudad" class="flex-auto p-1" v-model="clienteNuevo.ciudad" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-3">
                <label for="codigo_postal" class="font-semibold w-6rem">Código Postal: </label>
                <InputMask id="codigo_postal" v-model="clienteNuevo.codigo_postal" mask="99-999" placeholder="" />
            </div>
            <div class="flex align-items-center gap-3 mb-3">
                <label for="empresa" class="font-semibold w-6rem">Tipo: </label>
                <Dropdown v-model="tipoSelected" :options="tipos" optionLabel="tipo" placeholder="Tipo de Cliente" />
            </div>
            <div class="flex justify-content-end gap-2 mt-5 ml-28 align-items-center">
                <Button type="button" label="Cancel" @click="editVisible = false"></Button>
                <Button type="button" label="Editar" raised class="mr-2 p-2 text-green-700"
                    @click="enviarClienteMod"></Button>
            </div>
        </Dialog>


    </div>
</template>
  
<script>
import DataTable from "primevue/datatable"
import Dialog from "primevue/dialog"
import Button from "primevue/button"
import FloatLabel from "primevue/floatlabel"
import Column from "primevue/column"
import InputNumber from "primevue/inputnumber"
import InputText from "primevue/inputtext"
import Dropdown from "primevue/dropdown"
import InputMask from "primevue/inputmask"
import Toast from "primevue/toast"
import Tag from "primevue/tag"
import api from "@/service/service"

export default {
    name: 'Cliente',
    components: {
        DataTable,
        Column,
        Button,
        Dialog,
        FloatLabel,
        InputNumber,
        InputText,
        Dropdown,
        InputMask,
        Toast,
        Tag
    },
    data() {
        return {
            estadosPoliza: ['a cuenta', 'anulada', 'liquidada', 'pre anulada'],
            clientes: [],
            polizas: [],
            polizaNueva: {
                cliente_id: null,
                numero: null,
                estado: null,
                importe: null,
                notas: null,
            },
            visiblePoliza: false,
            visible: false,
            editVisible: false,
            deleteVisible: false,
            clienteNuevo: {
                id: null,
                nombre: null,
                email: null,
                telefono: null,
                ciudad: null,
                codigo_postal: null,
                empresa: null,
            },
            tipoSelected: null,
            tipoSelectedEstado: null,
            tipos: [
                { tipo: 'Particular', valor: '0' },
                { tipo: 'Empresa', valor: '1' },
            ],
            expandedRows: [],

        };
    },
    mounted() {
        this.fetchUsers();
    },
    methods: {
        edit(id){
            this.obtenerCliente(id);
            this.editVisible = true;
        },
        newPoliza(cliente_id){
            this.obtenerCliente(cliente_id);

            this.visiblePoliza = true;

        },
        crearPoliza() {
            this.polizaNueva.estado = this.tipoSelectedEstado;
            this.polizaNueva.cliente_id = this.clienteNuevo.id;

            this.visiblePoliza = false;
            console.log(this.polizaNueva);
            // Enviar el objeto clienteNuevo al servidor
            api.post('polizas', this.polizaNueva)
                .then(response => {
                    console.log(response);
                    // this.polizaNueva.cliente_id = response.data.cliente_id;
                    this.polizas.push(this.polizaNueva);
                    this.fetchUsers();
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
        crear() {
            this.clienteNuevo = {
                nombre: null,
                email: null,
                telefono: null,
                ciudad: null,
                codigo_postal: null,
                empresa: null,
            },
                this.visible = true;
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
        confirmDelete(id) {
            this.deleteVisible = true;
            this.clienteNuevo.id = id;
        },
        borrarCliente() {
            console.log(this.clienteNuevo.id);
            api.delete(`/clientes/${this.clienteNuevo.id}`)
                .then(response => {
                    console.log(response);
                    this.deleteVisible = false;
                    this.$toast.add({ severity: 'success', summary: 'Hecho', detail: 'Cliente Borrado Correctamente', life: 3000 });
                    this.clientes = this.clientes.filter(cliente =>
                        cliente.id != this.clienteNuevo.id
                    )
                })
                .catch(error => {
                    console.error(error)
                })
        },
        // Método para obtener la información del cliente desde la API
        obtenerCliente(id) {
            console.log(id);
            api.get(`clientes/${id}`)
                .then(response => {
                    // Asignar los datos del cliente a clienteNuevo
                    this.clienteNuevo = response.data;
                    // Abrir el modal de edición
                    // this.editVisible = true;
                    console.log(this.clienteNuevo);
                })
                .catch(error => {
                    console.error('Error al obtener cliente:', error);
                });
        },
        enviarClienteMod() {
            console.log(this.clienteNuevo, this.clienteNuevo.id);
            this.clienteNuevo.empresa = this.tipoSelected.valor;
            api.patch(`clientes/${this.clienteNuevo.id}`, this.clienteNuevo)
                .then(response => {
                    console.log(response);
                    // Cerrar el modal después de guardar los cambios
                    this.editVisible = false;
                    this.clientes = this.clientes.map(cliente => {
                        if (cliente.id == response.data.id) {
                            const clientePoliza = this.polizas.filter(poliza => {
                                // console.log(poliza);
                                return poliza.cliente_id == response.data.id
                            });

                            const responseData = { ...response.data, polizas: clientePoliza }
                            if (responseData.empresa == 0) {
                                responseData.empresa = 'Particular';
                            } else responseData.empresa = 'Empresa';
                            return responseData;
                        }

                        return cliente
                    })

                    this.$toast.add({ severity: 'success', summary: 'Hecho', detail: 'Cliente Editado Correctamente', life: 3000 });
                })
                .catch(error => {
                    console.error('Error al editar cliente:', error);
                });
        },
        crearCliente() {
            // Asignar el valor de empresa directamente desde tipoSelected.valor
            this.clienteNuevo.empresa = this.tipoSelected.valor;
            // Cerrar el modal después de asignar todos los valores
            this.visible = false;
            console.log(this.clienteNuevo);
            // Enviar el objeto clienteNuevo al servidor
            api.post('clientes', this.clienteNuevo)
                .then(response => {
                    console.log(response);
                    this.clienteNuevo.id = response.data.id;
                    if (this.clienteNuevo.empresa == 0) {
                        this.clienteNuevo.empresa = 'Particular';
                    } else this.clienteNuevo.empresa = 'Empresa';
                    this.clientes.push(this.clienteNuevo);
                    this.$toast.add({ severity: 'success', summary: 'Hecho', detail: 'Cliente Creado Correctamente', life: 3000 });
                })
                .catch(error => {
                    console.log(error);
                    this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Algo ha ido mal :(', life: 3000 });
                });
        },
        fetchUsers() {
            api.get('clientes')
                .then(async (response) => {
                    this.clientes = response.data.map(cliente => ({
                        ...cliente,
                        empresa: cliente.empresa == 0 ? 'Particular' : 'Empresa'
                    }));
                    const polizasResponse = await api.get('polizas');
                    this.polizas = polizasResponse.data
                    this.clientes = this.clientes.map(cliente => {
                        const clientePoliza = this.polizas.filter(poliza => poliza.cliente_id === cliente.id);
                        return { ...cliente, polizas: clientePoliza };
                    });
                    console.log(this.polizas);
                })
                .catch(error => {
                    console.error('Error al obtener usuarios:', error);
                });
        },

    }
}
</script>
  
<style scoped></style>
  