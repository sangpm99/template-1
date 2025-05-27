<script setup lang="ts">
import { useCartStore } from "@/stores/cart";

import QuantityCounter from "@/components/QuantityCounter.vue";

definePage({
  meta: {
    public: true,
  },
});

const router = useRouter();
const cartStore = useCartStore();
const { cart } = storeToRefs(cartStore);

const onNavigationToShop = () => {
  router.push({ name: "shop" });
};

const onRemoveCartItem = (index: number) => {
  if (cart.value) {
    cart.value.items = cart.value.items.filter((_, i) => i !== index);
  }
  cartStore.updateCart();
};

const onNavigateToShop = () => {
  router.push({ name: "shop" });
};

const onNavigateToCheckout = () => {
  router.push({ name: "checkout" });
};
</script>

<template>
  <section>
    <div class="layout-width mt-5 mb-10">
      <VRow>
        <VCol cols="12">
          <p class="text-center text-h2">Cart</p>
        </VCol>
      </VRow>

      <VRow>
        <VCol cols="12" v-if="!cart || !cart.items.length">
          <div class="d-flex flex-column align-center">
            <p>Your cart is currently empty</p>
            <VBtn @click="onNavigationToShop">Return to Shop</VBtn>
          </div>
        </VCol>

        <VCol cols="12" v-else>
          <VRow>
            <VCol cols="12">
              <VTable>
                <thead>
                  <tr>
                    <td>Product</td>
                    <td>Price</td>
                    <td>Quantity</td>
                    <td>Subtotal</td>
                    <td>Actions</td>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="(product, index) in cart.items" :key="index">
                    <td>
                      <div class="d-flex gap-3 py-5 align-center">
                        <VImg
                          width="100"
                          max-width="100"
                          :src="product.productImage"
                        ></VImg>
                        <p>{{ product.productName }}</p>
                      </div>
                    </td>

                    <td>${{ product.price }}</td>

                    <td>
                      <QuantityCounter
                        v-model:quantity="cart.items[index].quantity"
                        @update:quantity="cartStore.updateCart"
                        :min="1"
                      ></QuantityCounter>
                    </td>

                    <td>${{ product.subtotal }}</td>

                    <td>
                      <VIcon
                        icon="ri-close-line"
                        @click="onRemoveCartItem(index)"
                      ></VIcon>
                    </td>
                  </tr>

                  <tr>
                    <td colspan="2">
                      <span><b>Total</b></span>
                    </td>
                    <td>
                      {{
                        cart.items
                          .map((item) => item.quantity)
                          .reduce((a, b) => a + b, 0)
                      }}
                    </td>
                    <td colspan="2">${{ cart.total }}</td>
                  </tr>
                </tbody>
              </VTable>
            </VCol>

            <VCol cols="12" class="d-flex justify-end">
              <div class="d-flex gap-4">
                <VBtn variant="outlined" @click="onNavigateToShop"
                  >Continue Shopping</VBtn
                >
                <VBtn @click="onNavigateToCheckout">Proceed to Checkout</VBtn>
              </div>
            </VCol>
          </VRow>
        </VCol>
      </VRow>
    </div>
  </section>
</template>
