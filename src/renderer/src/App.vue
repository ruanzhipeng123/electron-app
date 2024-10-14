<script setup lang="ts">
import Navbar from '@renderer/components/Navbar.vue'
import Copyright from '@renderer/components/Copyright.vue'
// import {ref} from 'vue'

</script>

<template>
  <main class="">
    <Navbar />
    <router-view></router-view>
    <Copyright class="mt-2" />
  </main>
</template>
