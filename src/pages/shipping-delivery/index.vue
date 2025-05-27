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
          <p class="text-center text-h2">Shipping &amp; Delivery</p>

          <p>
            Thank you for visiting and shopping at {{ site.siteName }}.
            Following are the terms and conditions that constitute our Shipping
            &amp; Delivery.
          </p>
          <p>We ship for free on all orders!</p>
          <p class="text-h5 mb-2"><strong>Shipment Processing Time</strong></p>
          <p>
            All orders are processed within 2-3 days in business days. Shipping
            time will depend on locations, availability of the item, and Local
            Jurisdiction Regulations. Orders are not shipped or delivered on
            weekends or holidays.
          </p>
          <p>
            If you haven’t received your parcel within 10 days, please contact
            the shipping courier with your tracking code. If you need further
            assistance or have any unanswered questions, please contact our team
            via email at
            <a :href="`mailto:${site.siteEmail}`">{{ site.siteEmail }}</a
            >.
          </p>
          <p class="text-h5 mb-2">
            <strong>Shipping Estimate And Delivery Charges</strong>
          </p>
          <p>
            We shall charge the shipping and delivery fees as mentioned below
            from you. Shipping charges may vary based on the order value of the
            Product that you have added to the cart. You agree that we are
            authorized to collect, on behalf of the Logistic Partner, the
            shipping and delivery fees for the delivery service provided by the
            Logistic Partner.
          </p>
          <p>
            In the event we charge a shipping fee for the delivery of a
            purchased Product, such shipping fees will be refunded
            proportionately by us pursuant to any return or cancellation of the
            Product. You acknowledge and accept that the title and risk of all
            Products ordered by you shall pass on to you upon the delivery of
            the purchased Products to you.
          </p>
          <p class="text-h5 mb-2"><strong>Please Note:</strong></p>
          <ul class="ms-5">
            <li>
              <p>
                Shipping time doesn’t include our 2-3 days of order processing
                time.
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
          <p class="text-h5 mb-2"><strong>Wrong Address</strong></p>
          <p>
            If you provide an address that is considered insufficient by the
            courier, the shipment will be returned to our facility.
          </p>
          <p>
            In some cases, the order had arrived at the nearest post office to
            the buyer’s location because of insufficient address. Buyers can
            contact a nearby post office or reach out to pick up their order.
          </p>
          <p class="text-h5 mb-2">
            <strong>Shipment Confirmation &amp; Order Tracking</strong>
          </p>
          <p>
            You will receive a Shipment Confirmation email once your order has
            shipped containing your tracking number(s). The tracking number will
            be active within 24 hours.
          </p>
          <p class="text-h5 mb-2">
            <strong
              >My Tracking Says “No Information Available At The Moment”</strong
            >
          </p>
          <p>
            It’s not uncommon for NO tracking information to show until your
            package has been scanned in by the respected carriers. It might
            remain “blank” for up to a week after you receive your tracking
            link. But If your order was placed more than a week and there is
            still no information on your tracking number, please contact us.
          </p>
          <p class="text-h5 mb-2">
            <strong>Restrictions On Return Shipment</strong>
          </p>
          <p>
            Our delivery partners will only accept {{ site.siteName }} articles
            that are returned in their original packaging. Please do not include
            any other items in the package as these could violate shipping
            regulations as your return may then not be accepted by our delivery
            partner/us.
          </p>
          <p class="text-h5 mb-2">
            <strong>Customs, Duties, And Taxes</strong>
          </p>
          <p>
            {{ site.siteName }} is not responsible for any customs and taxes
            applied to your order. All fees imposed during or after shipping are
            the responsibility of the customer (tariffs, taxes, etc.). Import
            taxes, duties, and related customs fees may be charged once your
            order arrives at its final destination, which is determined by your
            local customs office. Payment of these charges and taxes is your
            responsibility and will not be covered by us. We are not responsible
            for delays caused by the customs department in your country. For
            further details of charges, please contact your local customs
            office.
          </p>
          <p class="text-h5 mb-2"><strong>Damages</strong></p>
          <p>
            {{ site.siteName }} is not liable for any products damaged or lost
            during shipping. If you received your order damaged, please contact
            the shipment carrier to file a claim.
          </p>
          <p>
            Please save all packaging materials and damaged goods before filing
            a claim.
          </p>
          <p>
            See more information:
            <strong><a href="/faqs">Frequently Asked Questions</a></strong>
          </p>
        </VCol>
      </VRow>
    </div>
  </section>
</template>
