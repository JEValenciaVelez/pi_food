
const axios = require('axios');
const{URL, API_KEY} = process.env;





const getRecipeById = async () => {

   const response = await axios.get(`${URL}apiKey=${API_KEY}&addRecipeInformation=true&number=10`);   
    
   console.log(response.data); 
     
};








module.exports = {getRecipeById};