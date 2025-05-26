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
          <p class="text-center text-h2">Copyright Policy</p>

          <p>Copyright © {{ site.siteName }} All Rights Reserved.</p>
          <p>
            All files and information contained in this Website are copyright by
            {{ site.siteName }} and may not be duplicated, copied, modified or
            adapted, in any way without our written permission. Our Website may
            contain our service marks or trademarks as well as those of our
            affiliates or other companies, in the form of words, graphics, and
            logos.
          </p>
          <p>
            Your use of our Website, or Services does not constitute any right
            or license for you to use our service marks or trademarks, without
            the prior written permission of {{ site.siteName }}.
          </p>
          <p>
            Our Content, as found within our Website, and Services, is protected
            under copyrights. The copying, redistribution, use, or publication
            by you of any such Content, is strictly prohibited. Your use of our
            Website and Services does not grant you any ownership rights to our
            Content.
          </p>
          <p class="text-h5 mb-2"><strong>You must not:</strong></p>
          <ul class="ms-5">
            <li>
              <p>
                Use our website in any way or take any action that causes, or
                may cause, damage to the website or impairment of the
                performance, availability, or accessibility of the website;
              </p>
            </li>
            <li>
              <p>
                Use our website in any way that is unlawful, illegal, fraudulent
                or harmful, or in connection with any unlawful, illegal,
                fraudulent, or harmful purpose or activity;
              </p>
            </li>
            <li>
              <p>
                Use our website to copy, store, host, transmit, send, use,
                publish or distribute any material which consists of (or is
                linked to) any spyware, computer virus, Trojan horse, worm,
                keystroke logger, rootkit, or other malicious computer software.
              </p>
            </li>
            <li>
              <p>
                Conduct any systematic or automated data collection activities
                (including without limitation scraping, data mining, data
                extraction, and data harvesting) on or in relation to our
                website without our express written consent.
              </p>
            </li>
          </ul>

          <p class="text-h5 mb-2"><strong>Report abuse</strong></p>
          <ul class="ms-5">
            <li>
              <p>
                If you found any unlawful material or activity on our website or
                any material or activity that breaches this notice, please let
                us know.
              </p>
            </li>
            <li>
              <p>
                You can let us know about any such material or activity by
                emailing us at
                <a :href="`mailto:${site.siteEmail}`">{{ site.siteEmail }}</a
                >.
              </p>
            </li>
          </ul>
          <p class="text-h5 mb-2"><strong>Enforcement of copyright</strong></p>
          <ul class="ms-5">
            <li>
              <p>We take the protection of our copyrights very seriously.</p>
            </li>
            <li>
              <p>
                If we discover that you have used our copyright materials in
                contravention of the license set out in this notice, we may
                bring legal proceedings against you, seeking monetary damages
                and/or an injunction to stop you from using those materials. You
                could also be ordered to pay legal costs.
              </p>
            </li>
          </ul>
          <p class="text-h5 mb-2"><strong>Permissions</strong></p>
          <p>
            You may request permission to use the copyright materials on our
            website by emailing us at
            <a :href="`mailto:${site.siteEmail}`">{{ site.siteEmail }}</a
            >.
          </p>
        </VCol>
      </VRow>
    </div>
  </section>
</template>
