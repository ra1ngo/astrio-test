import { useBasketStore } from '../stores/useBasketStore';

export default defineNuxtRouteMiddleware(() => {
    const basketStore = useBasketStore();

    if (basketStore.isCleared) {
        return navigateTo('/');
    }
});