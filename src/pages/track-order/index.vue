<script setup lang="ts">
definePage({
  meta: {
    public: true,
  },
});
</script>

<template>
  <section>
    <div class="layout-width mt-5 mb-10">
      <VForm>
        <VRow>
          <VCol cols="12">
            <p class="text-h2 text-center mb-0">Track Order</p>
          </VCol>

          <VCol cols="12">
            <span>
              To track your order please enter your Order ID in the box below
              and press the "Track" button. This was given to you on your
              receipt and in the confirmation email you should have received.
            </span>
          </VCol>

          <VCol cols="12" md>
            <VTextField
              density="compact"
              label="Order ID"
              placeholder="Found in your order confirmation email."
            ></VTextField>
          </VCol>

          <VCol cols="12" md>
            <VTextField
              density="compact"
              label="Billing email"
              placeholder="Email you used during checkout"
            ></VTextField>
          </VCol>

          <VCol cols="12" md="auto">
            <VBtn>TRACK</VBtn>
          </VCol>
        </VRow>
      </VForm>
    </div>
  </section>
</template>
