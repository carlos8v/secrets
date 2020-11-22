import api from './api';

export const getSecrets = async () => {
  const response = await api.get('/secrets');
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

export const getSecretsCount = async () => {
  const { data: { total } } = await api.get('/secrets/total');
  return total;
}

// import data from './dataExample';

// localStorage.setItem('secrets', JSON.stringify(data.secrets));

// const readSecrets = () => JSON.parse(localStorage.getItem('secrets'));

// const saveSecrets = (secrets) => localStorage.setItem('secrets', JSON.stringify(secrets));

// export const getSecretsCount = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const secrets = readSecrets();
//       resolve(secrets.length);
//     },1000);
//   })
// }

// export const getSecrets = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const secrets = readSecrets();
//       resolve(secrets);
//     }, 1000)
//   })
// }

// export const getSecret = (secretID) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const secrets = readSecrets().find(({ id }) => id === parseInt(secretID));
//       resolve(secrets);
//     }, 1000);
//   })
// }

// export const createSecret = (secret) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       let secrets = readSecrets();
//       const nextId = secrets[secrets.length - 1].id + 1;
//       const newSecret = { id: nextId, ...secret };
//       secrets = [newSecret, ...secrets];
//       saveSecrets(secrets);
//       resolve('ok');
//     }, 1000);
//   });
// }
