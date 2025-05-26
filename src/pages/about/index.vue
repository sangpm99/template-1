<script setup lang="ts">
import { getSiteInfo } from "@/stores/homeStore";
import type { Site } from "@/types/home";

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
      <p class="text-center text-h2">About Us</p>
      <p>
        Welcome to {{ site.siteName }} We are dedicated to offering unique and
        personalized gifts for your special occasions and relationships. Our
        goal is to provide a wide range of customized products that express your
        deepest emotions and convey heartfelt messages to your loved ones,
        leaving a lasting impact on their lives.
      </p>

      <p class="text-h5 mb-1">
        <b>Who We Are: Crafting Personalized Connections</b>
      </p>
      <p>
        At {{ site.siteName }}, we specialize in a diverse range of products
        that can be customized to suit your unique style and preferences. Our
        products are designed to add a personal touch to your space and make
        perfect gifts for any occasion. Our team values human emotions and
        incorporates them into our designs, allowing you to express your
        feelings through meaningful gifts. We strive to offer the best quality
        products within your budget.
      </p>

      <p class="text-h5 mb-1">
        <b>Our Story: A Journey of Modern Love</b>
      </p>
      <p>
        Our journey began with a modern love story when one of our co-founders
        struggled to find the perfect gift for a dear friend from high school.
        This challenge inspired the idea of personalized gifts and led to the
        founding of our young and vibrant company. We aim to create unique and
        meaningful gifts that recipients will cherish for a lifetime.
      </p>

      <p class="text-h5 mb-1">
        <b>Our Mission</b>
      </p>
      <p>
        At {{ site.siteName }}, we believe in bringing human emotions to life
        through our designs and expressing themes such as loyalty, friendship,
        and family love. Our personalized items are intended to bring joy and
        happiness to your loved ones. If you are looking for a special occasion
        gift that is unique, long-lasting, and meaningful, you have come to the
        right place. In our opinion, a personalized gift is worth a thousand
        words.
      </p>

      <p class="text-h5 mb-1">
        <b>Core Values</b>
      </p>
      <ul class="ms-5">
        <li>
          <p>
            <b>Customer-Centricity:</b> We prioritize our customers’ needs and
            strive to provide exceptional service and high-quality products.
          </p>
        </li>

        <li>
          <p>
            <b>Creativity and Innovation:</b> We are committed to continuous
            innovation and creativity in our designs to offer unique and
            meaningful gifts.
          </p>
        </li>

        <li>
          <p>
            <b>Integrity:</b> We maintain transparency and honesty in all our
            dealings, ensuring trust and reliability.
          </p>
        </li>

        <li>
          <p>
            <b>Quality:</b> We uphold high standards of quality in our products
            to ensure they bring lasting joy to their recipients.
          </p>
        </li>

        <li>
          <p>
            <b>Passion:</b> We are passionate about what we do, and this passion
            drives us to exceed our customers’ expectations.
          </p>
        </li>
      </ul>

      <p class="text-h5 mb-1">
        <b>Why {{ site.siteName }}?</b>
      </p>
      <ul class="ms-5">
        <li>
          <p>
            <b>Unique Designs:</b> Our products stand out with unique and
            personalized designs that cater to a variety of tastes and
            preferences.
          </p>
        </li>

        <li>
          <p>
            <b>Emotional Connection:</b> We understand the importance of
            emotional connections, and our gifts are crafted to reflect this
            understanding.
          </p>
        </li>

        <li>
          <p>
            <b>High-Quality Products:</b> We use quality materials to ensure
            that our products are durable and long-lasting.
          </p>
        </li>

        <li>
          <p>
            <b>Excellent Customer Service:</b> Our dedicated customer service
            team is here to assist you every step of the way.
          </p>
        </li>

        <li>
          <p>
            <b>Affordable Prices:</b> We offer competitive pricing without
            compromising on quality, making personalized gifts accessible to
            everyone.
          </p>
        </li>
      </ul>
      <p>
        Thank you for choosing {{ site.siteName }} to help you celebrate life’s
        special moments with your loved ones.
      </p>
    </div>
  </section>
</template>
