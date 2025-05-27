<script setup lang="ts">
import type { Site } from "@/types/home";
import { getSiteInfo } from "@/stores/home";

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
          <p class="text-center text-h2">Frequently Asked Questions</p>

          <p class="text-h5 mb-2">
            <strong>1. What is your return policy?</strong>
          </p>
          <p>
            We offer a 30-day return policy to our customers. Items must be
            defective or damaged to qualify for a return. Please ensure that all
            returns are sent via certified mail and include the original
            packaging and invoice. For more details, please refer to our
            <a href="/return-refund-policy"
              ><strong>Return &amp; Refund Policy</strong></a
            >.
          </p>
          <p class="text-h5 mb-2">
            <strong>2. How do I request a return?</strong>
          </p>
          <p>To request a return, please follow these steps:</p>
          <ul class="ms-5">
            <li>
              <p>
                Submit a return request within 30 days after receiving your
                goods.
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
            <li>
              <p>We will respond within 24 hours with further instructions.</p>
            </li>
          </ul>
          <p class="text-h5 mb-2">
            <strong>3. Who pays for the return shipping costs?</strong>
          </p>
          <p>
            You are responsible for paying the shipping costs for returning your
            item. Shipping costs are non-refundable. If you receive a refund,
            the cost of return shipping will be deducted from your refund.
            However, if an item is damaged or defective, we will refund the
            entire initial amount you paid, but you will still be responsible
            for the return shipping cost.
          </p>
          <p class="text-h5 mb-2">
            <strong>4. How long does it take to receive a refund?</strong>
          </p>
          <p>
            Once your return is received and inspected, we will send you an
            email to notify you that we have received your returned item. We
            will also notify you of the approval or rejection of your refund. If
            approved, your refund will be processed, and a credit will
            automatically be applied to your credit card or original method of
            payment. For PayPal, the money will be refunded immediately after we
            confirm via email. For debit/credit cards, the refund amount will
            show in your account within 5 to 10 days depending on your bank.
          </p>
          <p class="text-h5 mb-2">
            <strong
              >5. What should I do if I haven’t received my refund?</strong
            >
          </p>
          <p>
            If it has been more than 10 business days since we approved your
            refund and you still have not received your money, please contact us
            either by emailing us at
            <a :href="`mailto:${site.siteEmail}`">{{ site.siteEmail }}</a
            >.
          </p>
          <p class="text-h5 mb-2">
            <strong>6. Can I cancel or change my order?</strong>
          </p>
          <p>
            If you cancel your order within 12 hours of placing it, you may be
            able to change or cancel the order. Please contact us by emailing us
            at <a :href="`mailto:${site.siteEmail}`">{{ site.siteEmail }}</a
            >. After 12 hours, you will lose the right to cancel the order as it
            will have already been processed for shipping.
          </p>
          <p class="text-h5 mb-2">
            <strong>7. What if my order is not fulfilled?</strong>
          </p>
          <p>
            If we are unable to fulfill your order, we will notify you as soon
            as possible. Upon your confirmation, we will issue a full refund to
            your original method of payment.
          </p>
          <p class="text-h5 mb-2">
            <strong
              >8. What should I do if I haven’t received my parcel within 15
              days?</strong
            >
          </p>
          <p>
            If you haven’t received your parcel within 15 days, please contact
            the shipping courier with your tracking code. If you need further
            assistance or have any unanswered questions, please contact our team
            via email at
            <a :href="`mailto:${site.siteEmail}`">{{ site.siteEmail }}</a
            >.
          </p>
          <p class="text-h5 mb-2"><strong>9. How do exchanges work?</strong></p>
          <p>
            We only exchange items if they are the wrong item or defective. If
            you consider that a product is defective, please promptly contact us
            at
            <a :href="`mailto:${site.siteEmail}`">{{ site.siteEmail }}</a> with
            details of the product and the defect.
          </p>
          <p class="text-h5 mb-2">
            <strong
              >10. What are the shipping charges and delivery times?</strong
            >
          </p>
          <table
            dir="ltr"
            style="height: 134px"
            border="1"
            width="649"
            cellspacing="0"
            cellpadding="0"
            data-sheets-root="1"
          >
            <colgroup>
              <col width="93" />
              <col width="121" />
              <col width="142" />
            </colgroup>
            <tbody>
              <tr>
                <td style="text-align: center">
                  <strong>Shipping Type</strong>
                </td>
                <td style="text-align: center">
                  <strong>Shipping Time</strong>
                </td>
                <td style="text-align: center">
                  <strong>Shipping Cost</strong>
                </td>
              </tr>
              <tr>
                <td style="text-align: center">
                  <strong>Free Shipping</strong>
                </td>
                <td style="text-align: center">25 - 30 Business days</td>
                <td style="text-align: center">Price Based on Conditions</td>
              </tr>
              <tr>
                <td style="text-align: center">
                  <strong>Standard Shipping</strong>
                </td>
                <td style="text-align: center">10 - 15 Business days</td>
                <td style="text-align: center">Price Based on Conditions</td>
              </tr>
            </tbody>
          </table>
          <p class="text-h5 mb-2">
            <strong>11. What is the shipment processing time?</strong>
          </p>
          <p>
            All orders are processed within 2-3 business days. Shipping time
            will depend on locations, availability of the item, and local
            jurisdiction regulations. Orders are not shipped or delivered on
            weekends or holidays.
          </p>
          <p class="text-h5 mb-2">
            <strong
              >12. What should I do if my tracking says "No Information
              Available at the Moment"?</strong
            >
          </p>
          <p>
            It’s not uncommon for no tracking information to show until your
            package has been scanned in by the respective carriers. It might
            remain "blank" for up to a week after you receive your tracking
            link. If your order was placed more than a week ago and there is
            still no information on your tracking number, please contact us.
          </p>
          <p class="text-h5 mb-2">
            <strong
              >13. What happens if my order is damaged during shipping?</strong
            >
          </p>
          <p>
            {{ site.siteName }} is not liable for any products damaged or lost
            during shipping. If you received your order damaged, please contact
            the shipment carrier to file a claim. Please save all packaging
            materials and damaged goods before filing a claim.
          </p>
          <p class="text-h5 mb-2">
            <strong>14. Are there any restrictions on return shipment?</strong>
          </p>
          <p>
            Our delivery partners will only accept {{ site.siteName }} articles
            that are returned in their original packaging. Please do not include
            any other items in the package as these could violate shipping
            regulations, and your return may then not be accepted by our
            delivery partner/us.
          </p>
          <p class="text-h5 mb-2">
            <strong
              >15. Who is responsible for customs, duties, and taxes?</strong
            >
          </p>
          <p>
            {{ site.siteName }} is not responsible for any customs and taxes
            applied to your order. All fees imposed during or after shipping are
            the responsibility of the customer (tariffs, taxes, etc.). Import
            taxes, duties, and related customs fees may be charged once your
            order arrives at its final destination, determined by your local
            customs office. Payment of these charges and taxes is your
            responsibility and will not be covered by us. We are not responsible
            for delays caused by the customs department in your country. For
            further details of charges, please contact your local customs
            office.
          </p>
          <p class="text-h5 mb-2">
            <strong>16. What happens if I provide the wrong address?</strong>
          </p>
          <p>
            If you provide an address that is considered insufficient by the
            courier, the shipment will be returned to our facility. In some
            cases, the order had arrived at the nearest post office to the
            buyer’s location because of insufficient address. Buyers can contact
            a nearby post office or reach out to pick up their order.
          </p>
        </VCol>
      </VRow>
    </div>
  </section>
</template>
