<template>
  <div class="home">
    <div>
      <b-jumbotron>
        <template #header>Fudbalska liga</template>

        <hr class="my-4">

        <p>
          Ovde mozete videti trenutne rezultate nase mini lige!
        </p>
        <router-link to="/timovi" type="button" class="btn btn-primary btn-lg">Timovi</router-link>
        <div class="mt-2 col-md-12" > </div>
        <router-link to="/fudbaleri"  class="btn btn-primary btn-lg" >Fudbaleri</router-link>
      </b-jumbotron>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Home'
}
</script>
