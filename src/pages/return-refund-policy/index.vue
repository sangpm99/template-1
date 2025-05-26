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
          <p class="text-center text-h2">Return &amp; Refund Policy</p>

          <p>
            Thank you for purchasing our product from our website
            {{ site.siteName }}
          </p>
          <p>
            In line with providing our customers with the best quality and
            client experience, we have established a considerate refund policy.
          </p>
          <p>
            We offer a 30-day return policy to our customers. If 30 days or more
            have passed since your purchase, we cannot offer you a refund or an
            exchange.
          </p>
          <p class="text-h5 mb-2">
            <strong
              >Returns Need To Meet All Of The Following Conditions:</strong
            >
          </p>
          <ul class="ms-5">
            <li><p>Items must be defective or damaged to qualify.</p></li>
            <li><p>Returns must be sent via certified mail.</p></li>
            <li>
              <p>
                Delivered goods have printing errors, wrong items, wrong size,
                wrong color, wrong design, or wrong style (e.g., long sleeve
                shirt instead of t-shirt) and are defective.
              </p>
            </li>
            <li>
              <p>
                All items must have original packaging and be carefully packaged
                for shipping.
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
                Please do not send your package back to us unless we give you
                permission to do so.
              </p>
            </li>
          </ul>
          <p class="text-h5 mb-2">
            <strong>To Request A Return, Please Follow These Steps:</strong>
          </p>
          <ul class="ms-5">
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
                Email us at
                <a :href="`mailto:${site.siteEmail}`">{{ site.siteEmail }}</a
                >, stating your reason for a replacement/refund and attaching
                the photos/videos.
              </p>
            </li>
            <li><p>We will respond within 24 hours.</p></li>
          </ul>
          <p class="text-h5 mb-2">
            <strong
              >Once Your Return Request Is Approved, Please Proceed With The
              Following:</strong
            >
          </p>
          <p>Follow the instructions from the response email.</p>
          <p>
            <em
              >Please note that you are responsible for covering the shipping
              costs for returning the order. We do not refund these shipping
              costs.</em
            >
          </p>
          <p class="text-h5 mb-2"><strong>Refunds (If Applicable)</strong></p>
          <p>
            Once your return is received and inspected, we will send you an
            email to notify you that we have received your returned item. We
            will also notify you of the approval or rejection of your refund.
          </p>
          <p>
            If you are approved, your refund will be processed, and a credit
            will automatically be applied to your credit card or original method
            of payment.
          </p>
          <ul class="ms-5">
            <li>
              <p>
                With PayPal: Money will be refunded immediately after we confirm
                via email.
              </p>
            </li>
            <li>
              <p>
                With Debit/Credit cards: The refund amount will show in your
                account within 5 to 10 days depending on your bank.
              </p>
            </li>
          </ul>
          <p>
            If it has been more than 15 business days since we approved your
            refund and you still have not received your money, please contact us
            either by emailing us at
            <a :href="`mailto:${site.siteEmail}`">{{ site.siteEmail }}</a
            >.
          </p>
          <p class="text-h5 mb-2"><strong>Order Cancellation</strong></p>
          <p>
            If you cancel your order within 12 hours of placing it, you may be
            able to change or cancel the order. Please contact us by emailing us
            at <a :href="`mailto:${site.siteEmail}`">{{ site.siteEmail }}</a
            >. After 12 hours, you will lose the right to cancel the order as it
            will have already been processed for shipping.
          </p>
          <p class="text-h5 mb-2"><strong>Exchanges (If Applicable)</strong></p>
          <p>
            We only exchange items if they are the wrong item or defective. In
            circumstances where you consider that a product is defective, you
            should promptly contact us at
            <a :href="`mailto:${site.siteEmail}`">{{ site.siteEmail }}</a> with
            details of the product and the defect.
          </p>
          <p class="text-h5 mb-2"><strong>Shipping</strong></p>
          <p>
            You will be responsible for paying the shipping costs for returning
            your item. Shipping costs are non-refundable. If you receive a
            refund, the cost of return shipping will be deducted from your
            refund. However, if an item is damaged or defective, we will refund
            the entire initial amount you paid, but you will still be
            responsible for the return shipping cost.
          </p>
          <p>
            See more information:
            <strong><a href="/shipping-delivery">shipping delivery</a></strong>
          </p>
        </VCol>
      </VRow>
    </div>
  </section>
</template>
