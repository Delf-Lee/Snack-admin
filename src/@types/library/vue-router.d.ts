import { NavigationGuard } from 'vue-router';

/**
 * @summary about Next type
 * @reference https://github.com/vuejs/vue-router/issues/2758
 */
type Next = Parameters<NavigationGuard>[2];
