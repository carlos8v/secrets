import api from './api';

export const getSecrets = async (page = 2) => {
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

export const getTotalSecrets = async () => {
  const { data: { total } } = await api.get('/secrets/total');
  return total;
}
