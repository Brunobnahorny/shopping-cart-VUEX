import shop from "@/api/shop";

export default {
  state: {
    items: [],
    checkoutStatus: null
  },
  getters: {
    cartProducts(state, getters, rootState) {
      return state.items.map(cartItem => {
        const product = rootState.products.items.find(
          product => product.id === cartItem.id
        );
        return {
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity
        };
      });
    },

    cartTotal(state, getters) {
      return getters.cartProducts.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      );
    }
  },
  actions: {
    addProductToCart({ state, getters, commit }, product) {
      if (getters.productIsInStock(product)) {
        const cartItem = state.items.find(item => item.id === product.id);
        if (!cartItem) {
          commit("pushProductToCart", product.id);
        } else {
          commit("incrementItemQuantity", cartItem);
        }
        commit("decrementProductInventory", product);
      }
    },

    checkout({ state, getters, commit }) {
      if (getters.cartProducts[0] !== undefined) {
        shop.buyProducts(
          state.items,
          () => {
            commit("emptyCart");
            commit("setCheckoutStatus", "success");
          },
          () => {
            commit("setCheckoutStatus", "fail");
          }
        );
      }
    },
    removeItem({ getters, commit }, product) {
      let cartItemId = getters.getProductId(product);
      if (product.quantity > 1) {
        commit("reduceItemQuantity", cartItemId);
      } else {
        commit("removeProductFromCart", cartItemId);
      }
      commit("incrementProductInventory", cartItemId);
    }
  },
  mutations: {
    pushProductToCart(state, productId) {
      state.items.push({
        id: productId,
        quantity: 1
      });
    },
    removeProductFromCart(state, cartItemId) {
      let remover = state.items.findIndex(item => item.id === cartItemId[0].id);
      if (remover > -1) {
        state.items.splice(remover, 1);
      }
    },

    reduceItemQuantity(state, cartItemId) {
      state.items.find(item => item.id === cartItemId[0].id).quantity--;
    },

    incrementItemQuantity(state, cartItem) {
      cartItem.quantity++;
    },

    setCheckoutStatus(state, status) {
      state.checkoutStatus = status;
    },

    emptyCart(state) {
      state.items = [];
    }
  }
};
