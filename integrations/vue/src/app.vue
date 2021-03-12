<!--
  app.vue
  Airwallex Payment Demo - Vue.  Created by Jessica Zhou and Josie Ku.

  This file creates the site navigation for the demo.  
-->

<template>
  <div id="app">
    <a href="/" :style="{ textDecoration: 'none' }"><h1>Airwallex Payment Demo - Vue.js</h1></a>
    <div id="container">
      <div id="nav">
        <h2>Payment Methods</h2>
        <router-link to="/card" tag="button">
          Card
        </router-link>
        <router-link to="/hpp" tag="button">
          Hpp
        </router-link>
        <router-link to="/dropin" tag="button">
          Drop In
        </router-link>
        <router-link to="/full-featured-card" tag="button">
          Full Feature Card
        </router-link>
        <router-link to="/split-card" tag="button">
          Split Card
        </router-link>
        <router-link to="/wechat" tag="button">
          Wechat
        </router-link>
        <router-link to="/redirect" tag="button">
          Redirect
        </router-link>
      </div>
      <router-view id="router" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
/* These styles are NOT REQUIRED for the integration */
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h1 {
  padding-bottom: 25px;
  border-bottom: 1px solid lightgrey;
  color: #2c3e50 !important;
}
#container {
  display: flex;
  flex-direction: row;
}
#nav {
  display: flex;
  flex-direction: column;
  width: 20vw;
  align-items: center;
  border-right: 1px solid lightgrey;
  min-width: 175px;
}
#router {
  width: 80vw;
}
button {
  margin: 10px;
  padding: 5px 10px;
  font-family: 'Helvetica Neue';
  font-weight: 500;
  cursor: pointer;
  background-color: #612fff;
  color: #fff;
  outline: none;
  border: none;
  border-radius: 5px;
  min-width: 150px;
  min-height: 40px;
  max-width: 150px;
}
button:disabled {
  opacity: 0.75;
}
body {
  margin-bottom: 100px;
}
p#error {
  background: #ffebee;
  border-radius: 5px;
  padding: 5px 10px;
  max-width: 400px;
  margin: auto;
}
</style>
