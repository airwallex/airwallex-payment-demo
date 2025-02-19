<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <a href="/" :style="{ textDecoration: 'none' }"><h1>Airwallex Payment Demo - Vue</h1></a>
  </header>
  <div id="container">
    <div id="nav">
      <h2>All Demos</h2>
      <RouterLink to="/card"><button>Card element</button></RouterLink>
      <RouterLink to="/hpp"><button>Hosted payment page (HPP)</button></RouterLink>
      <RouterLink to="/drop-in"><button>DropIn</button></RouterLink>
      <RouterLink to="/split-card" tag="button"><button>Split Card element</button></RouterLink>
    </div>
    <div id="payment-element">
      <RouterView />
    </div>
  </div>
</template>

<style>
header {
  margin-top: 60px;
}
h1 {
  text-align: center;
  border-bottom: 1px solid lightgray;
  margin: 0px;
  padding: 25px 0px;
  color: #2c3e50;
}
#container {
  display: flex;
  min-height: 90vh;
}
#nav {
  width: 15vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border-right: 1px solid lightgrey;
  min-width: 175px;
  padding: 0px 10px;
}
a {
  width: 100%;
}
#nav button {
  width: 100%;
  margin: 10px 0px;
  padding: 5px 10px;
  background-color: #612fff;
  color: white;
  outline: none;
  border: none;
  border-radius: 5px;
  min-height: 40px;
  font-weight: 500;
  cursor: pointer;
}
#payment-element {
  width: 100%;
  display: flex;
  justify-content: center;
}
#submit {
  display: block;
  margin: 0px auto;
  background-color: #612fff;
  height: 40px;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  border: none;
  padding: 5px 10px;
  font-weight: 500;
}
</style>
