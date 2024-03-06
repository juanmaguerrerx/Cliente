<template>
    <div class="container w-full h-full self-center  mt-10 text-center">
        <h1 class="text-center text-2xl mb-5">POSTS</h1>
        <Toast ref="toastRef" />
        <Toolbar class="mb-4">
            <template #center>
                <Button label="New" icon="fa-solid fa-plus" severity="success" class="mr-2 text-green-800 bg-green-200 p-3"
                    @click="openNew" />
            </template>

        </Toolbar>

        <DataTable v-model:expandedRows="expandedRows" editMode="cell" @cell-edit-complete="onCellEditComplete" :pt="{
            table: { style: 'min-width: 50rem;' },
            column: {
                bodycell: ({ state }) => ({
                    class: [{ 'pt-0 pb-0': state['d_editing'] }]
                })
            }
        }" :value="posts" paginator stripedRows :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="">
            <Column expander style="width: 5rem" />
            <Column field="id" header="#" sortable></Column>
            <Column field="userId" header="ID User" sortable>
                <template #editor="{ data, field }">
                    <InputText v-model="data[field]" />
                </template>
            </Column>
            <Column field="title" header="Título" sortable>
                <template #editor="{ data, field }">
                    <InputText v-model="data[field]" class="w-full" />
                </template>
            </Column>
            <Column field="body" header="Cuerpo" sortable>
                <template #editor="{ data, field }">
                    <Textarea v-model="data[field]" class="w-full h-full" />
                </template>
            </Column>
            <Column style="min-width:8rem" header="">
                <template #body="{ data }">
                    <Button icon="fa-solid fa-trash" class="text-red-400" @click="confirmDeletePost(data)" />
                </template>
            </Column>

            <template #expansion="slotProps">
                <div class="pl-16 pr-16 pt-5 pb-5 bg-gray-400 rounded-md">
                    <h5 class="text-white">Comentarios del Post #{{ slotProps.data.id }}</h5>
                    <DataTable :value="slotProps.data.comments" paginator stripedRows :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" >
                        <Column field="id" header="#" sortable></Column>
                        <Column field="name" header="Nombre" sortable></Column>
                        <Column field="email" header="Email" sortable></Column>
                        <Column field="body" header="Comentario" sortable></Column>
                    </DataTable>
                </div>
            </template>

        </DataTable>




        <Dialog v-model:visible="deletePostDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span>Are you sure you want to delete <b>{{ posts.title }}</b>?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deletePostDialog = false" />
                <Button label="Yes" icon="pi pi-check" text @click="deletePost" />
            </template>
        </Dialog>


        <Dialog v-model:visible="postDialog" :style="{ width: '450px' }" header="Nuevo Post" class="text-center"
            :modal="true">
            <div class="field m-2 mb-5">
                <label for="userId">ID Usuario</label>
                <InputText id="userId" class="ml-2" v-model.trim="newPost.userId" />
            </div>
            <div class="field m-2">
                <label for="title">Título</label>
                <InputText id="title" class="ml-2" v-model.trim="newPost.title" required />
            </div>
            <div class="field m-2">
                <label for="body">Cuerpo</label>
                <Textarea id="body" class="ml-2" v-model="newPost.body" rows="3" cols="20" />
            </div>
            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" text @click="cancelNewPost" />
                <Button label="Guardar" icon="pi pi-check" text @click="saveNewPost" />
            </template>
        </Dialog>



    </div>
</template>

<script>
import api from "@/service/service"
import DataTable from "primevue/datatable"
import Column from "primevue/column"
import InputText from "primevue/inputtext"
import Textarea from 'primevue/textarea';
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Toast from "primevue/toast";
import Toolbar from "primevue/toolbar";

export default {
    name: 'Index',
    components: {
        DataTable,
        Column,
        InputText,
        Textarea,
        Button,
        Dialog,
        Toast,
        Toolbar
    },
    data() {
        return {
            posts: [],
            editingRows: [],
            deletePostDialog: false,
            postDialog: false,
            submitted: false,
            newPost: {
                userId: '',
                title: '',
                body: ''
            },
            expandedRows: []
        };
    },
    mounted() {
        this.fetchPosts();
    },
    methods: {
        openNew() {
            this.post = {};
            this.submitted = false;
            this.postDialog = true;
        },
        createId() {
            // Encontrar el máximo ID actual en la lista de posts
            const maxId = this.posts.reduce((max, post) => {
                return post.id > max ? post.id : max;
            }, 0);

            // Incrementar el máximo ID en 1 para obtener el nuevo ID
            return maxId + 1;
        },
        cancelNewPost() {
            this.postDialog = false;
            this.submitted = false;
            this.newPost = {
                userId: '',
                title: '',
                body: ''
            };
        },
        saveNewPost() {
            this.submitted = true;

            if (this.newPost.userId.trim() && this.newPost.title.trim() && this.newPost.body.trim()) {
                const newPost = {
                    userId: this.newPost.userId,
                    title: this.newPost.title,
                    body: this.newPost.body,
                    id: this.createId()
                };

                this.posts.push(newPost);
                // Reiniciar el estado del nuevo post
                this.postDialog = false;
                this.submitted = false;
                this.newPost = {
                    userId: '',
                    title: '',
                    body: ''
                };

                if (this.$refs.toastRef) {
                    this.$refs.toastRef.add({ severity: 'success', summary: 'Éxito', detail: 'Post Creado', life: 3000 });
                }

            }
        },
        confirmDeletePost(post) {
            this.post = post;
            this.deletePostDialog = true;
        },
        deletePost() {
            const index = this.posts.findIndex(item => item.id === this.post.id);
            if (index !== -1) {
                this.posts.splice(index, 1);
            }

            this.deletePostDialog = false;
            if (this.$refs.toastRef) {
                this.$refs.toastRef.add({ severity: 'success', summary: 'Successful', detail: 'Post Deleted', life: 3000 });
            }
        },
        onCellEditComplete(event) {
            let { data, newValue, field } = event;

            switch (field) {
                case 'userId':
                    data[field] = newValue;
                    break;

                case 'title':
                    data[field] = newValue;
                    break;

                case 'body':
                    data[field] = newValue;
                    break;

                default:
                    data[field] = newValue;
                    break;
            }
        },
        fetchPosts() {
            let comments;
            api.get('posts')
                .then(async (response) => {
                    this.posts = response.data;
                    const commentsResponse = await api.get('comments');
                    comments = commentsResponse.data;
                    this.posts = this.posts.map(post => {
                        const postComments = comments.filter(comment => comment.postId === post.id);
                        return { ...post, comments: postComments };
                    });
                })
                .catch(error => {
                    console.error('Error al obtener posts:', error);
                });
        },
    }
}
</script>
