<template>
  <div>
    <h1>Shopping Cart</h1>
    <transition-group name="slide-up" tag="ul" appear>
      <li v-for="product in products" :key="product.title">
        <button @click="removeItem(product)">X</button>
        <span class="title">
          {{ product.title }}
          <br />
          {{ product.price | currency }}
        </span>

        <span class="quantity">{{ product.quantity }}</span>
      </li>
    </transition-group>
    <p class="total">Total: {{total | currency}}</p>
    <button class="checkoutBtn" @click="checkout()">Checkout</button>
    <p v-if="checkoutStatus">{{checkoutStatus}}</p>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters({
      products: "cartProducts",
      total: "cartTotal"
    }),
    ...mapState({
      checkoutStatus: state => state.cart.checkoutStatus
    })
  },
  methods: {
    ...mapActions(["checkout", "removeItem"])
  }
};
</script>

<style scoped>
.slide-up-enter {
  transform: translateY(10px);
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.2s ease;
}
.slide-up-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

.slide-up-move {
  transition: transform 0.8s ease-in;
}

.total {
  font-weight: bold;
}

li {
  background: white;
  color: #1c273a;
  list-style: none;
  width: 16rem;
  border-radius: 0 0.5rem 0.5rem 0.5rem;
  margin: 1rem 0 0 0;
  padding: 0.5rem 0 0 0.5rem;
  height: 4rem;
  position: relative;
  font-weight: bold;
}
li > button {
  float: left;
  position: absolute;
  left: -2rem;
  top: -0.05rem;
  z-index: 1;
  width: 2em;
  height: 2em;
  background-color: darkred;
  color: white;
  text-align: center;
  font-size: 1em;
  border-radius: 0.5em 0 0.5em 0.5em;
  outline: none;
  border: none;
  box-shadow: 1px 1px 4px black;
}
li > button:active,
li > button:disabled {
  transition: 100ms;
  background-color: gray;
  box-shadow: 0px 0px 0px;
}

.title {
  font: bold;
  position: relative;
  display: flex;
  float: left;
  overflow: hidden;
}

.quantity {
  background-color: darkred;
  color: white;
  text-align: center;
  padding: 0.5rem 0.5rem 0 0.5rem;
  position: relative;
  display: flex;
  float: right;
  height: 4rem;
  top: 0;
  border-radius: 0 0.5rem 0.5rem 0.5rem;
}

.checkoutBtn {
  font-size: 1em;
  outline: none;
  border: none;
  float: right;
  padding: 8px 15px 8px 15px;
  background-color: cadetblue;
  background-image: linear-gradient(135deg, #23a11f 0%, #a2ed56 100%);
  color: #1c273a;
  box-shadow: 1px 1px 4px black;
  border-radius: 4px;
}
.checkoutBtn:active,
.checkoutBtn:disabled {
  transition: 200ms;
  background-image: none;
  box-shadow: 0px 0px 0px;
}
</style>