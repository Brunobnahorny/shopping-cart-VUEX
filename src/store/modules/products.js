import shop from "@/api/shop";
export default {
  state: {
    items: []
  },
  getters: {
    availableProducts(state, getters) {
      return state.items.filter(product => product.inventory > 0);
    },
    productIsInStock() {
      return product => {
        return product.inventory > 0;
      };
    },
    getProductId(state) {
      return product =>
        state.items.filter(item => {
          return item.title === product.title;
        });
    }
  },
  actions: {
    fetchProducts({ commit }) {
      return new Promise((resolve, reject) => {
        shop.getProducts(products => {
          commit("setProducts", products);
          resolve();
        });
      });
    }
  },
  mutations: {
    setProducts(state, products) {
      state.items = products;
    },
    decrementProductInventory(state, product) {
      product.inventory--;
    },
    incrementProductInventory(state, cartItemid) {
      state.items[cartItemid[0].id - 1].inventory++;
    }
  }
};
