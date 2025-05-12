<template>
  <VRow class="mt-3 ms-1 border-t-thin">
    <VCol cols="auto" class="d-flex">
      <div class="d-flex align-center">
        <span class="me-1">Page Size:</span>
      </div>

      <slot name="pageSize"></slot>
    </VCol>

    <VCol cols="auto">
      <slot name="pagination"></slot>
    </VCol>
  </VRow>
</template>
