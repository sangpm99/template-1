<script setup lang="ts">
import { requiredValidator } from "@/@core/utils/validators";

import { useCartStore } from "@/stores/cart";
import type { Product } from "@/types/home";
import { getProducts } from "@/stores/home";
import { register } from "swiper/element/bundle";

definePage({
  meta: {
    public: true,
  },
});

interface Option {
  name: string;
  disabled: boolean;
}

const route = useRoute();
const cartStore = useCartStore();
const { cart } = storeToRefs(cartStore);
const product = ref<Product>();
const products = ref<Product[]>();
const sizes: Option[] = [
  { name: "XS", disabled: true },
  { name: "S", disabled: false },
  { name: "M", disabled: false },
  { name: "L", disabled: false },
  { name: "XL", disabled: false },
  { name: "2XL", disabled: false },
  { name: "3XL", disabled: false },
  { name: "4XL", disabled: true },
  { name: "5XL", disabled: true },
  { name: "6XL", disabled: true },
];
const size = ref<string>("");
const tab = ref<number>(0);

const addToCart = async () => {
  if (!product.value) return;
  const foundProduct = cart.value.items.findIndex(
    (item) => item.productId === product.value!.id,
  );
  if (foundProduct !== -1) {
    cart.value.items[foundProduct].quantity++;
    cart.value.items[foundProduct].subtotal += 99;
    cart.value.total += 99;
  } else {
    cart.value.items.push({
      id:
        cart.value.items.length === 0
          ? "1"
          : String(
              Number(cart.value.items[cart.value.items.length - 1].id) + 1,
            ),
      productId: product.value.id,
      variation: [],
      quantity: 1,
      productName: product.value.productName,
      productImage: product.value.mainMockupURL,
      price: 99,
      subtotal: 99,
      tax: 0,
      metadata: "",
    });
  }
  cartStore.updateCart();
};

onMounted(async () => {
  const params = route.params;
  const { id } = params as { id: string };
  if (id) {
    products.value = await getProducts();
    product.value = products.value.find((p) => p.id == id);
  }
});

register();
</script>

<template>
  <section>
    <div class="layout-width mt-5 mb-10" v-if="product">
      <VRow>
        <VCol cols="6">
          <VRow>
            <VCol cols="12">
              <swiper-container
                class="mySwiper"
                thumbs-swiper=".mySwiper2"
                loop="true"
                space-between="10"
                navigation="true"
                centered-slides="true"
                events-prefix="swiper-"
              >
                <swiper-slide
                  v-for="swiperImg in product.mockupURLs"
                  :key="swiperImg"
                >
                  <VImg :src="swiperImg" cover />
                </swiper-slide>
              </swiper-container>

              <swiper-container
                class="mySwiper2"
                loop="true"
                free-mode="true"
                events-prefix="swiper-"
                slides-per-view="4"
              >
                <swiper-slide
                  v-for="swiperImg in product.mockupURLs"
                  :key="swiperImg"
                >
                  <VImg :src="swiperImg" cover />
                </swiper-slide>
              </swiper-container>
            </VCol>
          </VRow>
        </VCol>

        <VCol cols="6">
          <VRow>
            <VCol cols="12">
              <span class="text-h3">{{ product.productName }}</span>
              <br />
              <span class="text-error text-h4"><b>$99.99</b></span>
            </VCol>

            <VCol cols="12">
              <label>Size <span class="text-error">*</span></label>
              <VSelect
                :items="sizes"
                item-title="name"
                item-value="name"
                v-model="size"
                density="compact"
                :rules="[requiredValidator]"
              >
                <template v-slot:item="{ props, item }">
                  <VListItem
                    v-bind="props"
                    :title="item.raw.name"
                    :disabled="item.raw.disabled"
                  ></VListItem>
                </template>
              </VSelect>
            </VCol>

            <VCol cols="12">
              <div class="d-flex">
                <VBtn :disabled="!size" @click="addToCart">Add To Cart</VBtn>
              </div>
            </VCol>
          </VRow>
        </VCol>
      </VRow>

      <VRow>
        <VCol cols="12">
          <VTabs v-model="tab">
            <VTab :value="0">
              <span>Description</span>
            </VTab>

            <VTab :value="1">
              <span>Reviews</span>
            </VTab>

            <VTab :value="2">
              <span>Shipping and Return Policy</span>
            </VTab>
          </VTabs>

          <VWindow v-model="tab" class="mt-5">
            <VWindowItem :value="0">
              <div v-html="product.description"></div>
            </VWindowItem>
            <VWindowItem :value="1"> There are no reviews yet. </VWindowItem>
            <VWindowItem :value="2">
              <p><strong>Shipment Processing Time</strong></p>
              <p>
                Shipping time will depend on locations, availability of the
                item, and Local Jurisdiction Regulations. Orders are not shipped
                or delivered on weekends or holidays.
              </p>
              <p>
                If you haven't received your parcel within 30 days, please
                contact the shipping courier with your tracking code. If you
                need further assistance or have any unanswered questions, please
                contact our team.
              </p>
              <p><strong>Shipping Estimate And Delivery Charges</strong></p>
              <p>
                We shall charge the shipping and delivery fees as mentioned
                below from you. Shipping charges may vary based on the order
                value of the Product that you have added to the cart. You agree
                that we are authorized to collect, on behalf of the Logistic
                Partner, the shipping and delivery fees for the delivery service
                provided by the Logistic Partner.
              </p>
              <p>
                In the event we charge a shipping fee for the delivery of a
                purchased Product, such shipping fees will be refunded
                proportionately by us pursuant to any return or cancellation of
                the Product. You acknowledge and accept that the title and risk
                of all Products ordered by you shall pass on to you upon the
                delivery of the purchased Products to you.
              </p>
              <p><strong>Please Note</strong>:</p>
              <ul>
                <li>
                  <p>
                    Shipping time doesn't include our 2-3 days of order
                    processing time.
                  </p>
                </li>
                <li>
                  <p>
                    You have up to 12 hours after purchase to cancellation &amp;
                    changes.
                  </p>
                </li>
                <li>
                  <p>
                    Orders placed after 5:00 p.m. EST will be processed on the
                    following business day.
                  </p>
                </li>
              </ul>
              <p class="uppercase thin-font">
                Learn more about Shipping Policy <a href="/shipping-delivery/"
                  ><b>here</b></a
                >.
              </p>
              <p><strong>Returns </strong></p>
              <p>
                We offer a 30-day return policy to our customers. If 30 days or
                more have passed since your purchase, we cannot offer you a
                refund or an exchange.
              </p>
              <p>
                <strong
                  >RETURNS NEED TO MEET ALL OF THE FOLLOWING CONDITIONS:</strong
                >
              </p>
              <ul>
                <li>
                  <p>Items must be defective or damaged to qualify.</p>
                </li>
                <li>
                  <p>Returns must be sent via certified mail.</p>
                </li>
                <li>
                  <p>
                    Delivered goods have printing errors, wrong items, wrong
                    size, wrong color, wrong design, or wrong style (e.g., long
                    sleeve shirt instead of t-shirt) and are defective.
                  </p>
                </li>
                <li>
                  <p>
                    All items must have original packaging and be carefully
                    packaged for shipping.
                  </p>
                </li>
                <li><p>Must include an invoice.</p></li>
                <li>
                  <p>
                    Any items that do not meet the above conditions will not be
                    refunded or exchanged.
                  </p>
                </li>
                <li>
                  <p>
                    Refunds will be issued upon receipt and inspection of the
                    returned item(s).
                  </p>
                </li>
                <li>
                  <p>
                    Please do not send your package back to us unless we give
                    you permission to do so.
                  </p>
                </li>
              </ul>
              <p>
                <strong>To request a return, please follow these steps:</strong>
              </p>
              <ol>
                <li>
                  <p>
                    Submit a return request within 30 days after receiving your
                    goods. After this period, your right to return is forfeited.
                  </p>
                </li>
                <li>
                  <p>
                    Take clear photos/videos of the product and its packaging,
                    including the QR code/Cover Package.
                  </p>
                </li>
                <li>
                  <p>
                    stating your reason for a replacement/refund and attaching
                    the photos/videos.
                  </p>
                </li>
                <li><p>We will respond within 24 hours.</p></li>
              </ol>
              <p>
                <strong
                  >Once your return request is approved, please proceed with the
                  following:</strong
                >
              </p>
              <p>
                Pack the items securely in a nylon bag or any suitable packaging
                with the order ID included.
              </p>
              <p>
                <strong
                  >Please note that you are responsible for covering the
                  shipping costs for returning the order. We do not refund these
                  shipping costs.</strong
                >
              </p>
              <p>
                For more details, check our <a href="/return-refund-policy/"
                  ><b>Return &amp; Refund policy</b></a
                >.
              </p>
            </VWindowItem>
          </VWindow>
        </VCol>
      </VRow>
    </div>
  </section>
</template>

<style lang="scss" scoped>
swiper-container {
  background-color: #000;
}

.mySwiper2 {
  swiper-slide {
    border: 5px solid black;
    block-size: 100%;
    inline-size: 25%;
    opacity: 0.4;
  }

  .swiper-slide-thumb-active {
    opacity: 1;
  }
}
</style>
