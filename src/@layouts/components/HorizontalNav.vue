<script lang="ts" setup>
import { rulesNav } from "@/enums/configNav";
import { useAbility } from "@casl/vue";
import { HorizontalNavGroup, HorizontalNavLink } from "@layouts/components";
import type { HorizontalNavItems, NavGroup, NavLink } from "@layouts/types";

const props = defineProps<{
  navItems: HorizontalNavItems;
}>();

// 👉 Custom Nav
const { can } = useAbility();
interface CheckNav {
  name: string;
  check: boolean;
}

const checkNavs = computed<CheckNav[]>(() => {
  const nav: CheckNav[] = [];

  rulesNav.forEach((item) => {
    const permissions = item.permissions.split(".");
    const action = permissions.pop();
    const subject = permissions.join(".");

    nav.push({
      name: item.name,
      check: can(action ?? "", subject),
    });
  });

  return nav;
});

const filterNavItems = (items: typeof props.navItems, checks: CheckNav[]) => {
  const checkMap = new Map(checks.map((item) => [item.name, item.check]));

  return items.map((item) => {
    if (item?.children) {
      const filteredChildren = item?.children.filter(
        (child) => checkMap.get(child.to.name) !== false
      );

      return { ...item, children: filteredChildren };
    }

    return item;
  });
};

const filteredNavItems = filterNavItems(props.navItems, checkNavs.value);

// 👈

const resolveNavItemComponent = (item: NavLink | NavGroup) => {
  if ("children" in item) return HorizontalNavGroup;

  return HorizontalNavLink;
};
</script>

<template>
  <ul class="nav-items">
    <Component
      :is="resolveNavItemComponent(item)"
      v-for="(item, index) in filteredNavItems"
      :key="index"
      :item="item"
    />
  </ul>
</template>

<style lang="scss">
.layout-wrapper.layout-nav-type-horizontal {
  .nav-items {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
