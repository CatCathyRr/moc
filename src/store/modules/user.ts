import { loginPassword } from '@/api';
import { useCookies } from '@vueuse/integrations/useCookies';
import { defineStore } from 'pinia';
import { useTitle } from '@vueuse/core';
const { VITE_TOKEN_KEY } = import.meta.env;
const token = useCookies().get(VITE_TOKEN_KEY as string);

interface StoreUser {
  token: string;
  info: Record<any, any>;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): StoreUser => ({
    token: token,
    info: {},
  }),
  getters: {
    getUserInfo(): any {
      return this.info || {};
    },
  },
  actions: {
    setInfo(info: any) {
      this.info = info ? info : '';
    },
    login() {
      return new Promise((resolve) => {
        loginPassword().then((res) => {
          this.setInfo(res);
          resolve(res);
        });
      });
    },
  },
  persist: {
    key: 'token',
    storage: localStorage,
    paths: ['token'],
  },
});

export const useNavBarStore = defineStore('navbar', {
  state: () => ({
    title: '首页',
  }),
  actions: {
    setTitle(newTitle) {
      const title = useTitle();
      title.value = newTitle; // change current title
      this.title = newTitle;
    },
  },
});
