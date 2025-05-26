<script setup lang="ts">
import type { Site } from "@/types/home";
import { getSiteInfo } from "@/stores/homeStore";

definePage({
  meta: {
    public: true,
  },
});

const site = ref<Site>();
onMounted(async () => {
  site.value = await getSiteInfo();
});
</script>

<template>
  <section>
    <div v-if="site" class="layout-width mt-5 mb-10">
      <VRow>
        <VCol cols="12">
          <p class="text-center text-h2">Cancellation &amp; Changes</p>

          <p>
            Thank you for purchasing our product from our website
            {{ site.siteName }}.
          </p>
          <p>
            In line with providing our customers with the best quality and
            client experience, we have established a considerate cancellation
            and changes policy.
          </p>
          <p class="text-h5 mb-2"><strong>Order Cancellation</strong></p>
          <p>
            If you need to cancel your order, please do so within 12 hours of
            placing it. This will allow you to either change or cancel the order
            without any issues. Please contact us by emailing us at
            <a :href="`mailto:${site.siteEmail}`">{{ site.siteEmail }}</a
            >. After 12 hours, you will lose the right to cancel the order as it
            will have already been processed for shipping.
          </p>
          <p class="text-h5 mb-2"><strong>Order Changes</strong></p>
          <p>
            If you need to make changes to your order (e.g., address, size,
            color), please contact us within 12 hours of placing the order.
            Changes requested after 12 hours may not be possible as the order
            may have already been processed for shipping. Contact us at
            <a :href="`mailto:${site.siteEmail}`">{{ site.siteEmail }}</a> to
            request changes.
          </p>
          <p class="text-h5 mb-2"><strong>Unfulfilled Orders</strong></p>
          <p>
            If we are unable to fulfill your order, we will notify you as soon
            as possible. Upon your confirmation, we will issue a full refund to
            your original method of payment.
          </p>
          <p class="text-h5 mb-2"><strong>Important Notes</strong></p>
          <ul class="ms-5">
            <li>
              <p>
                <strong>Timely Requests:</strong> All cancellation and change
                requests must be made within 12 hours of placing the order. Any
                requests made after this period may not be accommodated.
              </p>
            </li>
            <li>
              <p>
                <strong>Shipping Processed Orders:</strong> Once an order has
                been processed for shipping, cancellations and changes are no
                longer possible.
              </p>
            </li>
          </ul>
          <p>We appreciate your understanding and cooperation.</p>
        </VCol>
      </VRow>
    </div>
  </section>
</template>
