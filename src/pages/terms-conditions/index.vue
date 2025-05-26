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
          <p class="text-center text-h2">Terms &amp; Conditions</p>

          <p>
            Please read these terms and conditions carefully before using
            {{ site.siteName }}. This website is operated and managed by
            {{ site.siteName }}<strong>.</strong> In the whole extent of this
            website, at every point the terms “we”, “us” or “our” are used, it
            refers to {{ site.siteName }}<strong>.</strong>
          </p>
          <p>
            By purchasing goods from us, you involve in our “Service” and agree
            to be bound by the following terms and conditions stated, including
            the policies referenced herein and/or available by hyperlink. These
            Terms and Conditions are applicable to all users of the site,
            including without limitation every user who is browsers, customers,
            and merchants. If you disagree with all or any of the terms of use
            in this agreement, then you may consider not to access the website
            or use any of the services.
          </p>
          <p class="text-h5 mb-2"><strong>Changes To Terms</strong></p>
          <p>
            We are committed to ensuring that our online store is as useful and
            efficient as possible. For that reason, we reserve the right to make
            changes to the services, at any time. We will never charge you for
            any service without making it very clear to you precisely what
            you're paying for.
          </p>
          <p>
            Any new features or product(s) which are added to the current store
            shall also be subject to this Terms and condition. You can always
            review the most current version of the Terms and conditions at any
            time on this page. We reserve the right to update, change or
            retrieve any part of these Terms and conditions by posting updates
            and/or changes to our website. It is your responsibility to check
            this page periodically for changes. Your continued use of or access
            to the website following the posting of any changes constitutes
            acceptance of those changes.
          </p>
          <p class="text-h5 mb-2"><strong>Placing An Order</strong></p>
          <p>
            When you place an order through the Website, we will send an email
            to confirm that we have received the order. All orders are subject
            to these terms and conditions. Orders placed through the Website
            represent an offer to purchase a product. It is accepted for each
            product when we send you an email to confirm that the order has been
            received. We reserve the right to reject any order for any reason.
          </p>
          <p>
            It is important that you enter the correct e-mail address when
            placing your order. We also recommend that you save your order
            confirmation email to facilitate any contact with customer service
            or for future references. The order confirmation (receipt) also
            serves as a guarantee of proof of purchase.
          </p>
          <p>
            All orders are subject to stock availability. If we are unable to
            supply any products that you have ordered, we will inform you as
            soon as possible. If we are unable to fulfill your order, we will
            notify you and issue a refund as soon as you confirm. The refund
            will be returned to your original method of payment.
          </p>
          <p class="text-h5 mb-2">
            <strong>Prices, Taxes, And Payment Terms</strong>
          </p>
          <p>
            Prices and payment details of products are specified on the website.
            Payment can be made by credit card, Debit card, and/or as further
            described in the store. Prices are shown exclusive of VAT, import
            duties, and other government-imposed taxes, duties, and levies. You
            will be responsible for the payment of such import duties and taxes.
            It should be noted that {{ site.siteName }} has no control over
            these charges.
          </p>
          <p>
            Your payment is handled by the payment gateways with secure
            encryption and under strict banking standards. Your card details are
            sent directly to them and cannot be read or accessed by anyone.
          </p>
          <p class="text-h5 mb-2">
            <strong
              >Payment Methods And Customer Card Information Security</strong
            >
          </p>
          <p>
            We prioritize the security and confidentiality of your payment
            information when you make purchases on our website. When you choose
            to pay via Stripe or PayPal, you can rest assured that your payment
            details are handled securely through their respective platforms.
          </p>
          <ul class="ms-5">
            <li>
              <p>
                <strong>Stripe</strong>: Your credit card information is
                encrypted and processed securely by Stripe, a trusted payment
                gateway that adheres to the highest industry standards for data
                protection. We do not collect or store your credit card details
                on our servers.
              </p>
            </li>
            <li>
              <p>
                <strong>PayPal</strong>: PayPal provides a secure and encrypted
                platform for processing payments. Your payment details are
                safeguarded by PayPal's advanced security measures, and we do
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
            <a :href="`mailto:${site.siteEmail}`">{{ site.siteEmail }}</a> for
            assistance.
          </p>
          <p class="text-h5 mb-2">
            <strong>Our Rights To Cancel/Reject Orders</strong>
          </p>
          <p>
            We reserve the right to decline any order you place with us. We may,
            in our exclusive discretion, limit or cancel quantities purchased
            per person, per household, or per order. These restrictions may
            include orders placed by or under the same customer account, the
            same credit card, or orders that use the same billing and/or
            shipping address. If we make a change to or cancel an order, we may
            attempt to notify you by contacting the e­mail and billing
            address/phone number provided at the time the order was made. We
            reserve the right to limit or prohibit orders that, in our sole
            judgment, appear to be placed by dealers, resellers or distributors.
            You agree to provide current, complete, and accurate purchase and
            account information for all purchases made at our store.
          </p>
          <p class="text-h5 mb-2"><strong>Promo Codes And Offers</strong></p>
          <p>
            Promo Codes and Offers are made at our sole discretion and are
            subject to time validity, a valid Promotional Code should be entered
            during the checkout process for a product to be valid. Attempting to
            add a promo code after purchase or after the expiration of the code
            will not be acknowledged.
          </p>
          <p class="text-h5 mb-2"><strong>Service Terms</strong></p>
          <ul class="ms-5">
            <li>
              <p>
                {{ site.siteName }} at this moment grants the User a
                non-exclusive, non-transferable, limited right to access and use
                the Service, under the conditions of these Terms &amp;
                Conditions and for the duration of the Agreement.
              </p>
            </li>
            <li>
              <p>
                The use of the Service is at the User's own expense and risk.
                The User is responsible for meeting the technical and functional
                requirements and using the electronic communication facilities
                that are necessary to be able to access and use the Service. The
                User will at all times bear the risk of loss, theft, or damage
                to any of its data.
              </p>
            </li>
            <li>
              <p>
                {{ site.siteName }} will have the right (but not the
                obligation), at its sole discretion, to review, edit, limit,
                refuse or remove Content, products or to limit or refuse the
                User access to the Service. More specifically in the event the
                use of the Service, according to us, violates these Terms of
                Use.
              </p>
            </li>
            <li>
              <p>
                We may disclose the User's Personal Data or Content, or other
                data relating to the use of the Service, to third parties where
                it believes, in good faith, that it is necessary to comply with
                a court order, ongoing judicial proceeding, criminal or civil
                subpoena, or other legal process or request by law enforcement
                authorities, or to exercise its constitutional rights of defense
                against legal claims.
              </p>
            </li>
          </ul>
          <p class="text-h5 mb-2"><strong>Third-Party Links</strong></p>
          <p>
            The Service may contain links to third-party websites or resources.
            We are not responsible for the content or accuracy of any
            third-party materials or websites. Your use of third-party links is
            at your own risk.
          </p>
          <p class="text-h5 mb-2"><strong>Personal Information</strong></p>
          <p>
            Your submission of personal information through the store is
            regulated by our Privacy Policy. You are to view our
            <a href="/privacy-policy/"
              ><strong><u>Privacy Policy</u></strong
              >.</a
            >
          </p>
          <p class="text-h5 mb-2"><strong>User Content</strong></p>
          <p>
            Our website may contain user-generated content, for example, social
            media applications. we do not claim any ownership of such contents
            (images, photos, and videos, etc.) and take no legal responsibility
            for it. In case you suspect a violation of copyright or any other
            right, or otherwise is offended by such content, please contact our
            customer support.
          </p>
          <p class="text-h5 mb-2">
            <strong
              >Disclaimer Of Warranties And Limitation Of Liability</strong
            >
          </p>
          <p>
            We, therefore, underwrite in no pledge or represent or warrant that
            your use of our service will be uninterrupted, timely, assured,
            secure or error-free. We do not warrant that the results that may be
            obtained from the use of the service will be accurate or reliable.
          </p>
          <p>
            You agree that from time to time we may remove the service for
            indefinite periods of time or cancel the service at any time,
            without notice to you. You expressly agree that your use of, or
            inability to use, the service is at your volition and sole risk. The
            service and all products and services delivered to you through the
            service are (except as expressly stated by us) provided 'as is' and
            'as available for your use, without any representation, warranties
            or conditions of any kind, either express or implied, including all
            implied warranties or conditions of merchantability, merchantable
            quality, fitness for a particular purpose, durability, title, and
            non-infringement.
          </p>
          <p>
            In no case shall {{ site.siteName }}<strong>, </strong>our
            directors, officers, employees, affiliates, agents, contractors,
            interns, suppliers, manufacturers, service providers, or licensors
            be responsible or liable for any injury, loss, claim, or any direct,
            indirect, incidental, punitive, special, or consequential damages of
            any kind, including, without limitation lost profits, lost revenue,
            lost savings, loss of data, replacement costs, or any similar
            damages, whether based in contract, tort (including negligence),
            strict liability or otherwise, arising from your use of any of the
            service or any products procured using the service, or for any other
            claim related in any way to your use of the service or any product,
            including, but not limited to, any errors or omissions in any
            content, or any loss or damage of any kind incurred as a result of
            the use of the service or any content (or product) posted,
            transmitted, or otherwise made available via the service, even if
            advised of their possibility.
          </p>
          <p>
            Because some states or jurisdictions do not allow the exclusion or
            the limitation of liability for consequential or incidental damages,
            in such states or jurisdictions, our liability shall be limited to
            the maximum extent permitted by law.
          </p>
          <p class="text-h5 mb-2"><strong>Indemnification</strong></p>
          <p>
            You agree to indemnify, protect and hold harmless to
            {{ site.siteName }}, subsidiaries, affiliates, partners, officers,
            directors, agents, contractors, license, service providers,
            subcontractors, suppliers, interns, and employees, harmless from any
            claim or demand, including reasonable attorney’s fees, made by any
            third party due to or arising out of your breach of these Terms and
            conditions or the documents they incorporate by reference or your
            infringement of any law or the rights of a third-party.
          </p>
          <p class="text-h5 mb-2"><strong>Severability</strong></p>
          <p>
            In the event that any provision of these Terms and conditions is
            discovered to be unlawful, null or unenforceable, such provision
            shall notwithstanding be enforceable to the fullest extent permitted
            by applicable law, and the unenforceable portion shall be viewed to
            be cut off from these Terms of Use, such determination shall not
            affect the credibility and enforceability of any other remaining
            provisions.
          </p>
          <p class="text-h5 mb-2"><strong>Termination</strong></p>
          <p>
            The obligations and liabilities of the parties obtained prior to the
            termination date shall survive the termination of this agreement for
            all purposes.
          </p>
          <p>
            These Terms and conditions are effective except and until terminated
            by either you or us. You may terminate these Terms of Service at any
            time by informing us that you no longer wish to use our Services, or
            when you cease using our site.
          </p>
          <p>
            If in our sole judgment you fail, or we suspect that you have
            failed, to abide by any term or provision of these Terms of Use, we
            also may terminate this agreement at any time without notice and you
            will remain liable for all amounts due up to and including the date
            of termination; or accordingly may withhold you of access to our
            Services (or any part thereof).
          </p>
          <p class="text-h5 mb-2"><strong>Entire Agreement</strong></p>
          <p>
            Our inability to exercise or enforce any right or provision of these
            Terms of Service shall not constitute a discharge of such right or
            provision.
          </p>
          <p>
            These Terms of Use and any policies or operating rules posted by us
            on this website or in respect to the Service constitutes the entire
            agreement and understanding between you and us and govern your use
            of the Service, pre-empt any prior or synchronous agreements,
            communications, and proposals, whether oral or written, between you
            and us.
          </p>
        </VCol>
      </VRow>
    </div>
  </section>
</template>
