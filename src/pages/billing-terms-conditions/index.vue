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
          <p class="text-center text-h2">Billing Terms and Conditions</p>

          <p class="text-h5 mb-2"><strong>Payment Methods</strong></p>
          <p>
            We offer convenient payment methods including VISA, MasterCard,
            American Express, and PayPal at {{ site.siteName }}. Please note
            that we do not accept any other payment methods.
          </p>
          <p class="text-h5 mb-2"><strong>Time of Payment</strong></p>
          <p>
            To facilitate the necessary arrangements before printing and
            delivery, purchasers will be billed at the time of placing their
            order. This ensures the smooth execution of your order, including
            the preparation of User Content.
          </p>
          <p>
            When completing a purchase on {{ site.siteName }}, you will need to
            provide information about your credit card or payment method. By
            doing this, you attest to the accuracy of the information supplied
            and your authority to use the payment method.
          </p>
          <p class="text-h5 mb-2"><strong>Payment Process</strong></p>
          <p>To complete your order, please follow these simple steps:</p>
          <p class="text-h5 mb-2"><b>Fill in the Shipping Information:</b></p>
          <ul class="ms-5">
            <li>
              <p>
                Provide your contact information, including your email address
                for order updates.
              </p>
            </li>
            <li>
              <p>
                Enter the shipping address where you wish to receive the
                package, ensuring accuracy for swift delivery.
              </p>
            </li>
            <li>
              <p>
                Opt for the “Ship a difference address” option if necessary, and
                enter a different billing address, if applicable.
              </p>
            </li>
          </ul>
          <p class="text-h5 mb-2">
            <strong>Select the Payment Method:</strong>
          </p>
          <ul class="ms-5">
            <li><p>Choose your preferred payment method.</p></li>
            <li><p>Fill in the required payment information.</p></li>
            <li>
              <p>Click “Place your order” to complete the transaction.</p>
            </li>
          </ul>
          <p>
            If you experience any problems making your payment or discover that
            the designated payment methods aren’t working when you check out,
            don’t hesitate to get in touch with us by sending an email to
            [site_email].
          </p>
          <p class="text-h5 mb-2"><strong>Payment Security</strong></p>
          <p>
            We prioritize the security and confidentiality of your payment
            information when you make purchases on our website. When you choose
            to pay via Stripe or PayPal, you can rest assured that your payment
            details are handled securely through their respective platforms.
          </p>
          <ul class="ms-5">
            <li>
              <p>
                <strong>Stripe:</strong> Your credit card information is
                encrypted and processed securely by Stripe, a trusted payment
                gateway that adheres to the highest industry standards for data
                protection. We do not collect or store your credit card details
                on our servers.
              </p>
            </li>
            <li>
              <p>
                <strong>PayPal:</strong> PayPal provides a secure and encrypted
                platform for processing payments. Your payment details are
                safeguarded by PayPal’s advanced security measures, and we do
                not have access to your credit card information.
              </p>
            </li>
          </ul>
          <p>
            We do not collect, store, or have access to your credit card details
            at any point during the transaction process. Your privacy and
            security are of utmost importance to us, and we take all necessary
            precautions to ensure the protection of your personal and financial
            information.
          </p>
          <p>
            By choosing to make a purchase on our website using Stripe or
            PayPal, you acknowledge and agree to their respective terms of
            service and privacy policies regarding payment processing and data
            security.
          </p>
          <p>
            If you have any concerns or questions about the security of your
            payment information, please contact us at
            <a rel="noreferrer">[site_email]</a> for assistance.
          </p>
          <p class="text-h5 mb-2"><strong>Pricing and Taxes</strong></p>
          <p>
            Prices and payment details of products are specified on the website.
            Payment can be made by credit card, debit card, and/or as further
            described in the store. Prices are shown exclusive of VAT, import
            duties, and other government-imposed taxes, duties, and levies. You
            will be responsible for the payment of such import duties and taxes.
            It should be noted that {{ site.siteName }} has no control over
            these charges.
          </p>
        </VCol>
      </VRow>
    </div>
  </section>
</template>
