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
          <p class="text-center text-h2">Disclaimer</p>

          <p>
            If you require any more information or have any questions about our
            site's disclaimer, please feel free to contact us by email at
            <a :href="`mailto:${site.siteEmail}`">{{ site.siteEmail }}</a
            >.
          </p>
          <p>
            All the information on this website - {{ site.siteName }} - is
            published in good faith and for general information purposes only.
            {{ site.siteName }} does not make any warranties about the
            completeness, reliability, and accuracy of this information. Any
            action you take upon the information you find on this website is
            strictly at your own risk. [site_domain] will not be liable for any
            losses and/or damages in connection with the use of our website.
          </p>
          <p>
            From our website, you can visit other websites by following
            hyperlinks to such external sites. While we strive to provide only
            quality links to useful and ethical websites, we have no control
            over the content and nature of these sites. These links to other
            websites do not imply a recommendation for all the content found on
            these sites. Site owners and content may change without notice and
            may occur before we have the opportunity to remove a link that may
            have gone 'bad'.
          </p>
          <p>
            Please be also aware that when you leave our website, other sites
            may have different privacy policies and terms that are beyond our
            control. Please be sure to check the Privacy Policies of these sites
            as well as their "Terms of Service" before engaging in any business
            or uploading any information.
          </p>
          <p class="text-h5 mb-2"><strong>Product Review Disclaimer</strong></p>
          <p>
            The opinions expressed in customer reviews are solely those of the
            reviewers and do not represent the views of our company. We do not
            guarantee the accuracy or reliability of any reviews posted on our
            platform.
          </p>
          <p class="text-h5 mb-2"><strong>Website Consent</strong></p>
          <p>
            By using our website, you hereby consent to our disclaimer and agree
            to its terms.
          </p>
          <p class="text-h5 mb-2"><strong>Update</strong></p>
          <p>
            Should we update, amend or make any changes to this document, those
            changes will be prominently posted here.
          </p>
        </VCol>
      </VRow>
    </div>
  </section>
</template>
