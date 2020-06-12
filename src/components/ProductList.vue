<template>
  <div>
    <h1>Product List</h1>
    <img
      v-if="loading"
      src="https://i.pinimg.com/originals/a2/dc/96/a2dc9668f2cf170fe3efeb263128b0e7.gif"
    />
    <ol class="gradient-list" v-else>
      <li v-for="product in products" :key="product.id">
        {{ product.title }} - {{product.price | currency}} - {{product.inventory}}
        <button
          :disabled="!productIsInStock(product)"
          @click="addProductToCart(product)"
        >Add to cart</button>
      </li>
    </ol>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      loading: false
    };
  },
  computed: {
    ...mapState({
      products: state => state.products.items
    }),
    ...mapGetters({
      productIsInStock: "productIsInStock"
    })
  },

  created() {
    this.loading = true;
    this.fetchProducts().then(() => (this.loading = false));
  },
  methods: {
    ...mapActions({
      fetchProducts: "fetchProducts",
      addProductToCart: "addProductToCart"
    })
  }
};
</script>

<style scoped>
ol.gradient-list > li,
ol.gradient-list > li::before {
  box-shadow: 0.25rem 0.25rem 0.6rem rgba(0, 0, 0, 0.05),
    0 0.5rem 1.125rem rgba(75, 0, 0, 0.05);
}

/*** STYLE ***/
*,
*:before,
*:after {
  box-sizing: border-box;
}

ol.gradient-list {
  counter-reset: gradient-counter;
  list-style: none;
  margin: 1.75rem 0;
  padding-left: 1rem;
  color: #1d1f20;
}
ol.gradient-list > li {
  background: white;
  border-radius: 0 0.5rem 0.5rem 0.5rem;
  counter-increment: gradient-counter;
  margin-top: 1rem;
  min-height: 3rem;
  padding: 1rem 1rem 1rem 3rem;
  position: relative;
}
ol.gradient-list > li > button {
  top: -0.5rem;
  overflow: hidden;
  position: relative;
  margin-left: 1rem;
}
ol.gradient-list > li::before,
ol.gradient-list > li::after {
  background: linear-gradient(135deg, #83e4e2 0%, #a2ed56 100%);
  border-radius: 1rem 1rem 0 1rem;
  content: "";
  height: 3rem;
  left: -1rem;
  overflow: hidden;
  position: absolute;
  top: -1rem;
  width: 3rem;
}
ol.gradient-list > li::before {
  align-items: flex-end;
  content: counter(gradient-counter);
  color: #1d1f20;
  display: flex;
  justify-content: flex-end;
  padding: 0.125em 0.25em;
  z-index: 1;
}
ol.gradient-list > li:nth-child(10n + 1):before {
  background: linear-gradient(
    135deg,
    rgba(162, 237, 86, 0.2) 0%,
    rgba(253, 220, 50, 0.2) 100%
  );
}
ol.gradient-list > li:nth-child(10n + 2):before {
  background: linear-gradient(
    135deg,
    rgba(162, 237, 86, 0.4) 0%,
    rgba(253, 220, 50, 0.4) 100%
  );
}
ol.gradient-list > li:nth-child(10n + 3):before {
  background: linear-gradient(
    135deg,
    rgba(162, 237, 86, 0.6) 0%,
    rgba(253, 220, 50, 0.6) 100%
  );
}
ol.gradient-list > li:nth-child(10n + 4):before {
  background: linear-gradient(
    135deg,
    rgba(162, 237, 86, 0.8) 0%,
    rgba(253, 220, 50, 0.8) 100%
  );
}
ol.gradient-list > li:nth-child(10n + 5):before {
  background: linear-gradient(135deg, #a2ed56 0%, #fddc32 100%);
}
ol.gradient-list > li:nth-child(10n + 6):before {
  background: linear-gradient(
    135deg,
    rgba(162, 237, 86, 0.8) 0%,
    rgba(253, 220, 50, 0.8) 100%
  );
}
ol.gradient-list > li:nth-child(10n + 7):before {
  background: linear-gradient(
    135deg,
    rgba(162, 237, 86, 0.6) 0%,
    rgba(253, 220, 50, 0.6) 100%
  );
}
ol.gradient-list > li:nth-child(10n + 8):before {
  background: linear-gradient(
    135deg,
    rgba(162, 237, 86, 0.4) 0%,
    rgba(253, 220, 50, 0.4) 100%
  );
}
ol.gradient-list > li:nth-child(10n + 9):before {
  background: linear-gradient(
    135deg,
    rgba(162, 237, 86, 0.2) 0%,
    rgba(253, 220, 50, 0.2) 100%
  );
}
ol.gradient-list > li:nth-child(10n + 10):before {
  background: linear-gradient(
    135deg,
    rgba(162, 237, 86, 0) 0%,
    rgba(253, 220, 50, 0) 100%
  );
}
ol.gradient-list > li + li {
  margin-top: 2rem;
}

button {
  font-size: 1em;
  outline: none;
  float: right;
  border: none;
  padding: 8px 15px 8px 15px;
  background-color: cadetblue;
  background-image: linear-gradient(135deg, #83e4e2 0%, #a2ed56 100%);
  color: #1c273a;
  box-shadow: 1px 1px 4px black;
  border-radius: 4px;
}
button:active,
button:disabled {
  transition: 200ms;
  background-image: none;
  box-shadow: 0px 0px 0px;
}
</style>