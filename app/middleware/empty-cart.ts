import { useBasketStore } from '../stores/useBasketStore';

export default defineNuxtRouteMiddleware(() => {
    const basketStore = useBasketStore();

    // TODO проверка только на клиенте, если localstorage

    if (basketStore.isCleared) {
        return navigateTo('/');
    }
});