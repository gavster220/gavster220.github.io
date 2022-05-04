<template>
  <div id="app">
    <header class="navbar navbar-expand-md navbar-dark bg-dark px-4">
      <nav class="container-xxl flex-wrap flex-md-nowrap" aria-label="Main Navigation">
          <router-link class="navbar-brand" to="/">RuneScape Side-by-Side</router-link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".myNavbar" aria-controls="myNavbar" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
          </button>
          <div class="navbar-collapse collapse myNavbar" id="myNavbar">
              <ul class="navbar-nav mr-auto">
                  <li class="nav-item">
                      <router-link to="/" class="nav-link active" >Home<span class="sr-only"></span></router-link>
                  </li>
                  <li class="nav-item">
                      <router-link to="/functions" class="nav-link">Probability Tools</router-link>
                  </li>
                  <li class="nav-item">
                      <router-link to="/item_management" class="nav-link" >Item Management</router-link>
                  </li>
                  <li class="nav-item">
                      <router-link to="/monster_list" class="nav-link" >Monster List</router-link>
                  </li>
              </ul>
          </div>
      </nav>
    </header>
    <div class="container mt-3">
      <router-view/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
