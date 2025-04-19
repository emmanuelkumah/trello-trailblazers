import axios from "axios";
// import { toast } from 'react-toastify';

const fetchCountries = async () => {
  try {
    const response = await axios.get(
      "https://restcountries.com/v3.1/all?fields=name,flags,idd,currencies"
      // "https://countriesnow.space/api/v0.1/countries"
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching countries: ${error}`);
    throw error;
  }
};

export default fetchCountries;
