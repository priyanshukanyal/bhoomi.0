import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'; // Adjust base URL to match backend

// Fetch all properties
export const fetchAllProperties = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/properties`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error("Error: Endpoint '/properties' not found (404)");
    } else {
      console.error("Error fetching properties:", error.message);
    }
    throw error;
  }
};

// Create a new property
// export const createProperty = async (propertyData, imageFile, videoFile) => {
//   const formData = new FormData();
//   formData.append('property_type', propertyData.property_type);
//   formData.append('category', propertyData.category);
//   formData.append('city', propertyData.city);
//   formData.append('locality', propertyData.locality);
//   formData.append('price', propertyData.price);
//   formData.append('sqft', propertyData.sqft);
//   formData.append('bedrooms', propertyData.bedrooms);
//   formData.append('bathrooms', propertyData.bathrooms);
//   formData.append('parking_spaces', propertyData.parking_spaces);
//   formData.append('furnishing_status', propertyData.furnishing_status);
//   formData.append('property_status', propertyData.property_status);
//   formData.append('listed_startdate', propertyData.listed_startdate);
//   formData.append('listing_enddate', propertyData.listing_enddate);
  
//   // Append image and video files if they exist
//   if (imageFile) {
//     formData.append('image', imageFile);
//   }
//   if (videoFile) {
//     formData.append('video', videoFile);
//   }

//   try {
//     const response = await axios.post(`${BASE_URL}/properties`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data', // Set content type for file uploads
//       },
//     });
//     return response.data;
//   } catch (error) {
//     if (error.response && error.response.status === 404) {
//       console.error("Error: Endpoint '/properties' not found (404)");
//     } else {
//       console.error("Error creating property:", error.message);
//     }
//     throw error;
//   }
// };
// export const createProperty = async (propertyData, imageFile, videoFile) => {
//   const formData = new FormData();
//   // Append property details
//   formData.append('property_type', propertyData.property_type);
//   formData.append('category', propertyData.category);
//   formData.append('city', propertyData.city);
//   formData.append('locality', propertyData.locality);
//   formData.append('price', propertyData.price);
//   formData.append('sqft', propertyData.sqft);
//   formData.append('bedrooms', propertyData.bedrooms);
//   formData.append('bathrooms', propertyData.bathrooms);
//   formData.append('parking_spaces', propertyData.parking_spaces);
//   formData.append('furnishing_status', propertyData.furnishing_status);
//   formData.append('property_status', propertyData.property_status);
//   formData.append('listed_startdate', propertyData.listed_startdate);
//   formData.append('listing_enddate', propertyData.listing_enddate);

//   // Append image and video files if they exist
//   if (imageFile) {
//     formData.append('image', imageFile);
//   }
//   if (videoFile) {
//     formData.append('video', videoFile);
//   }

//   try {
//     const response = await axios.post(`${BASE_URL}/properties`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data', // This is necessary for file uploads
//       },
//     });
//     return response.data;
//   } catch (error) {
//     if (error.response && error.response.status === 404) {
//       console.error("Error: Endpoint '/properties' not found (404)");
//     } else {
//       console.error("Error creating property:", error.message);
//     }
//     throw error;
//   }
// };
export const createProperty = async (propertyData, imageFile, videoFile) => {
  const formData = new FormData();
  
  // Append property details
  formData.append('property_type', propertyData.property_type);
  formData.append('category', propertyData.category);
  formData.append('city', propertyData.city);
  formData.append('locality', propertyData.locality);
  formData.append('price', propertyData.price);
  formData.append('sqft', propertyData.sqft);
  formData.append('bedrooms', propertyData.bedrooms);
  formData.append('bathrooms', propertyData.bathrooms);
  formData.append('parking_spaces', propertyData.parking_spaces);
  formData.append('furnishing_status', propertyData.furnishing_status);
  formData.append('property_status', propertyData.property_status);
  formData.append('listed_startdate', propertyData.listed_startdate);
  formData.append('listing_enddate', propertyData.listing_enddate);

  // Append image and video files if they exist
  if (imageFile) {
    formData.append('image', imageFile);
  }
  if (videoFile) {
    formData.append('video', videoFile);
  }

  try {
    const response = await axios.post(`${BASE_URL}/properties`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const { data } = response;
    
    if (data.imageUrl) {
      console.log('Image URL:', data.imageUrl);  // This will print the image URL
    }
    return data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error("Error: Endpoint '/properties' not found (404)");
    } else {
      console.error("Error creating property:", error.message);
    }
    throw error;
  }
};

// Update an existing property
// export const updateProperty = async (propertyId, propertyData, imageFile, videoFile) => {
//   const formData = new FormData();
//   formData.append('property_type', propertyData.property_type);
//   formData.append('category', propertyData.category);
//   formData.append('city', propertyData.city);
//   formData.append('locality', propertyData.locality);
//   formData.append('price', propertyData.price);
//   formData.append('sqft', propertyData.sqft);
//   formData.append('bedrooms', propertyData.bedrooms);
//   formData.append('bathrooms', propertyData.bathrooms);
//   formData.append('parking_spaces', propertyData.parking_spaces);
//   formData.append('furnishing_status', propertyData.furnishing_status);
//   formData.append('property_status', propertyData.property_status);
//   formData.append('listed_startdate', propertyData.listed_startdate);
//   formData.append('listing_enddate', propertyData.listing_enddate);

//   // Append image and video files if they exist
//   if (imageFile) {
//     formData.append('image', imageFile);
//   }
//   if (videoFile) {
//     formData.append('video', videoFile);
//   }

//   try {
//     const response = await axios.put(`${BASE_URL}/properties/${propertyId}`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data', // Set content type for file uploads
//       },
//     });
//     return response.data;
//   } catch (error) {
//     if (error.response && error.response.status === 404) {
//       console.error(`Error: Property with ID '${propertyId}' not found (404)`);
//     } else {
//       console.error("Error updating property:", error.message);
//     }
//     throw error;
//   }
// };
export const updateProperty = async (propertyId, propertyData, imageFile, videoFile) => {
  const formData = new FormData();
  // Append property details
  formData.append('property_type', propertyData.property_type);
  formData.append('category', propertyData.category);
  formData.append('city', propertyData.city);
  formData.append('locality', propertyData.locality);
  formData.append('price', propertyData.price);
  formData.append('sqft', propertyData.sqft);
  formData.append('bedrooms', propertyData.bedrooms);
  formData.append('bathrooms', propertyData.bathrooms);
  formData.append('parking_spaces', propertyData.parking_spaces);
  formData.append('furnishing_status', propertyData.furnishing_status);
  formData.append('property_status', propertyData.property_status);
  formData.append('listed_startdate', propertyData.listed_startdate);
  formData.append('listing_enddate', propertyData.listing_enddate);

  // Append image and video files if they exist
  if (imageFile) {
    formData.append('image', imageFile);
  }
  if (videoFile) {
    formData.append('video', videoFile);
  }

  try {
    const response = await axios.put(`${BASE_URL}/properties/${propertyId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Ensure content type is set for file uploads
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error(`Error: Property with ID '${propertyId}' not found (404)`);
    } else {
      console.error("Error updating property:", error.message);
    }
    throw error;
  }
};

// Delete a property
export const deleteProperty = async (propertyId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/properties/${propertyId}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error(`Error: Property with ID '${propertyId}' not found (404)`);
    } else {
      console.error("Error deleting property:", error.message);
    }
    throw error;
  }
};
