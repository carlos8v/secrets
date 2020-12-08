import api from './api';

export const getSecrets = async (page = 1) => {
  const response = await api.get('/secrets', {
    params: {
      page,
    },
  });
  return response.data;
}

export const getSecret = async (secretID) => {
  const secret = await api.get(`secrets/${secretID}`);
  return secret.data;
};

export const createSecret = async (secret) => {
  const response = await api.post('secrets/new', secret);
  return response.data;
}

export const getPagination = async () => {
  const { data: { total, lastPage } } = await api.get('/secrets/pages');
  return { total, lastPage };
}
