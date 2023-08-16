declare let process: any;
const env = process.env.NODE_ENV;

export const environment = {  
  apiURL: (env  === 'production') 
    ? 'https://wmrh-api-7f92d2af5580.herokuapp.com/api'
    : 'http://localhost:3000/api'
};