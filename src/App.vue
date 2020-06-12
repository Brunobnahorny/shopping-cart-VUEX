<template>
  <div id="app">
    <logo class="header" />
    <main>
      <productlist />
      <aside>
        <shoppingCart />
      </aside>
    </main>
  </div>
</template>

<script>
import productlist from "./components/ProductList";
import shoppingCart from "./components/ShoppingCart";
import logo from "./components/Logo";

export default {
  name: "app",
  components: {
    productlist,
    shoppingCart,
    logo
  }
};
</script>

<style>
body {
  background-color: #1c273a;
  margin: 0;
  padding-top: 0;
}
.header {
  width: 100%;
  display: block;
  position: relative;
}
main {
  display: block;
  margin: 0 auto;
  width: 50rem;
  padding: 1rem;
  display: flex;
}
aside {
  display: block;
  margin: 0 auto;
  width: 15rem;
  padding-left: 2rem;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: lightsteelblue;
}
</style>
