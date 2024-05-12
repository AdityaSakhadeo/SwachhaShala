import axios from 'axios'; // Import Axios library

export const getUserPosition = async (lat, lng) => {
  console.log(typeof(lat))
  const googleAPI = 'AIzaSyDpzWi_fOehkRUAYH_-WUYGE6l4rsUrbNs'; // Replace with your Google Maps API Key
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleAPI}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
