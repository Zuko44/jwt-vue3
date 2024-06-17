import { ref } from 'vue';
import { defineStore } from 'pinia';
import axiosApiInstance from '../api/api';

const apiKey = 'AIzaSyAeAWdKSf27dPMB_s3eTS3fuPz_ZcaCB34';

export const useAuthStore = defineStore('auth', () => {
  const userInfo = ref({
    token: '',
    email: '',
    userId: '',
    refreshToken: '',
    expiresIn: '',
  });
  const error = ref<string>('');

  const auth = async (payload: any, type: string) => {
    const stringUrl = type === 'signup' ? 'signup' : 'signInWithPassword';
    error.value = '';
    try {
      const response = await axiosApiInstance.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:${stringUrl}?key=${apiKey}`,
        {
          ...payload,
          returnSecureToken: true,
        },
      );
      userInfo.value = {
        token: response.data.idToken,
        email: response.data.email,
        userId: response.data.localId,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn,
      };
      localStorage.setItem(
        'userTokens',
        JSON.stringify({
          token: userInfo.value.token,
          refreshToken: userInfo.value.refreshToken,
          expiresIn: userInfo.value.expiresIn,
        }),
      );
    } catch (err: any) {
      switch (err.response.data.error.message) {
        case 'EMAIL_EXISTS':
          error.value = 'Email exists';
          break;
        case 'OPERATION_NOT_ALLOWED':
          error.value = 'Operation not allowed';
          break;
        case 'EMAIL_NOT_FOUND':
          error.value = 'Email not found';
          break;
        case 'INVALID_PASSWORD':
          error.value = 'Invalid password';
          break;
        default:
          error.value = 'Error';
          break;
      }
      throw error.value;
    }
  };

  const logout = () => {
    userInfo.value = {
      token: '',
      email: '',
      userId: '',
      refreshToken: '',
      expiresIn: '',
    };
  };

  return { auth, userInfo, error, logout };
});
