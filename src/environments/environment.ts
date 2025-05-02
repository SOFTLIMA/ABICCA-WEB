export const environment = {
  production: false,
  lambidaDDBUrl: 'https://5b4nc6d53v3crhsefx42esoayq0swrhm.lambda-url.us-east-2.on.aws/',
  apiBDUrl: 'http://localhost:8000/noticias.php?tabela=noticias_dev',
  apiLogin: 'http://localhost:8000/login.php',
};

export const awsTables = {
  camposTabela: {
    id: 'id',
  },
  tabelas: {
    noticias: "NOTICIAS_DEV",
  },

};
