declare let process: any;
const env = process.env.NODE_ENV;

export const environment = {  
  apiURL: (env  === 'production') 
    ? 'https://wmrh-e189cd6cadd5.herokuapp.com/api'
    : 'http://localhost:3000/api'
};