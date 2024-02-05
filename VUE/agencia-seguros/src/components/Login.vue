<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h3 class="text-center">Inicio de Sesión</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="login">
              <div class="mb-3">
                <label for="username" class="form-label">Nombre de Usuario:</label>
                <input v-model="username" type="text" class="form-control" id="username" required>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Contraseña:</label>
                <input v-model="password" type="password" class="form-control" id="password" required>
              </div>
              <div class="d-grid">
                <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    login() {
      // Implementa la lógica de autenticación aquí
      console.log('Usuario:', this.username);
      console.log('Contraseña:', this.password);
      // Puedes realizar una solicitud HTTP aquí para autenticar al usuario
      // Recuerda manejar los casos de éxito y error
    },
  },
};
</script>

<style scoped>

</style>
