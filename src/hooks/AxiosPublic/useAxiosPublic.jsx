import axios from 'axios'


const axiosInstance = axios.create({
    baseURL: 'https://to-do-server-black.vercel.app'
  });

  
const useAxiosPublic = () => {
    return axiosInstance;
};

export default useAxiosPublic;