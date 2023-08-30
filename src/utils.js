export const fetchHelper = async (url) => {
    
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: url,
        headers: {}
      };
  
      const response = await axios.request(config);
      return response;
}