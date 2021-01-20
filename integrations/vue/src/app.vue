<template>
  <div id="app">
    <h1>Airwallex Payment Demo - Vue.js</h1>
    <div id="container">
      <div id="nav">
        <h2>Payment Methods</h2>
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#container {
  display: flex;
  flex-direction: row;
}
#nav {
  display: flex;
  flex-direction: column;
  width: 20vw;
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
  min-width: 40px;
  min-height: 40px;
}
body {
  margin-bottom: 100px;
}
</style>
