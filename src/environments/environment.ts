declare let process: any;
const env = process.env.NODE_ENV;

export const environment = {  
  apiURL: (env  === 'production') 
    ? 'https://mpox-api-7c81d2a0cb87.herokuapp.com/api'
    : 'http://localhost:3000/api'
};