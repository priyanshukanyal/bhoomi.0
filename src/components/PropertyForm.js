import React, { useState } from 'react';
import { BlobServiceClient } from '@azure/storage-blob';

const ImageUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Updated SAS token with correct permissions and expiration
  const sasToken = "sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-11-12T13:18:11Z&st=2024-11-12T05:18:11Z&spr=https,http&sig=8ATZ5iO%2BKuyLNrIJAok4tFcTMYnZ1F5SEYDRVqBiZ5s%3D";
  const containerName = "bhoomidata";
  const blobServiceClient = new BlobServiceClient(`https://bhoomistorage2024.blob.core.windows.net?${sasToken}`);
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const handleFileChange = (event) => {
    setSelectedFiles(Array.from(event.target.files));
  };

  const uploadFiles = async () => {
    if (selectedFiles.length === 0) {
      alert("No files selected.");
      return;
    }

    try {
      for (const file of selectedFiles) {
        const blockBlobClient = containerClient.getBlockBlobClient(file.name);
        await blockBlobClient.uploadData(file, {
          blobHTTPHeaders: { blobContentType: file.type },
        });
        console.log(`File ${file.name} uploaded successfully`);
      }
      alert("All files uploaded successfully.");
    } catch (error) {
      console.error("Error uploading files:", error);
      alert(`Error uploading files: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Upload Files to Azure Blob Storage</h2>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={uploadFiles}>Upload</button>
    </div>
  );
};

export default ImageUpload;




// // frontend/src/components/PropertyForm.js
// import React, { useState, useEffect } from 'react';
// import { TextField, MenuItem, Button, Typography, Grid, Paper, Grid2 } from '@mui/material';
// import dayjs from 'dayjs';  // Import dayjs for date manipulation

// function PropertyForm({ property, onSubmit, onCancel }) {
//   // Initialize the form data state with default values
//   const [formData, setFormData] = useState({
//     property_type: 'residential',  // Default property type
//     category: 'Flat/Apartment',  // Default category for residential properties
//     city: 'Delhi',  // Default city
//     locality: 'Connaught Place',  // Default locality
//     price: '5000000',  // Default price
//     sqft: '1000',  // Default square footage
//     bedrooms: '2',  // Default number of bedrooms
//     bathrooms: '2',  // Default number of bathrooms
//     parking_spaces: '1',  // Default parking spaces
//     furnishing_status: 'Furnished',  // Default furnishing status
//     property_status: 'Ready to move',  // Default property status
//     listed_startdate: dayjs().format('YYYY-MM-DD'),  // Default start date (today's date)
//     listing_enddate: dayjs().add(90, 'day').format('YYYY-MM-DD'),  // Default end date (90 days from today)
//     video_url: '',  // Default video URL
//     image: null,  // Stores the image file
//     imagePreviewUrl: '',  // For previewing the selected image
//   });

//   // Set form data if editing an existing property
//   useEffect(() => {
//     if (property) {
//       setFormData({
//         ...property,
//         imagePreviewUrl: property.imageUrl || '',  // Display existing image URL if available
//       });
//     }
//   }, [property]);

//   // Automatically set the listing end date based on the start date
//   useEffect(() => {
//     if (formData.listed_startdate) {
//       const startDate = dayjs(formData.listed_startdate);
//       const endDate = startDate.add(90, 'day').format('YYYY-MM-DD');
//       setFormData((prev) => ({
//         ...prev,
//         listing_enddate: endDate,
//       }));
//     }
//   }, [formData.listed_startdate]);

//   // Handle text input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   // Handle image file change
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
    
//     if (file) {
//       setFormData((prev) => ({
//         ...prev,
//         image: file,
//         imagePreviewUrl: URL.createObjectURL(file),
//       }));
//     }
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);  // Modify to include image uploading to backend
//     setFormData({
//       property_type: 'residential',
//       category: 'Flat/Apartment',
//       city: 'Delhi',
//       locality: 'Connaught Place',
//       price: '5000000',
//       sqft: '1000',
//       bedrooms: '2',
//       bathrooms: '2',
//       parking_spaces: '1',
//       furnishing_status: 'Furnished',
//       property_status: 'Ready to move',
//       listed_startdate: dayjs().format('YYYY-MM-DD'),
//       listing_enddate: dayjs().add(90, 'day').format('YYYY-MM-DD'),
//       video_url: '',
//       image: null,
//       imagePreviewUrl: '',
//     });
//   };

//   // Category options based on property type
//   const categoryOptions = {
//     residential: [
//       'Flat/Apartment',
//       'Independent/Builder Floor',
//       'Independent House/Villa',
//       'Residential Land',
//       '1 RK/ Studio Apartment',
//       'Farm House',
//     ],
//     commercial: [
//       'Ready to move offices',
//       'Bare shell offices',
//       'Shops & Retail',
//       'Commercial/Inst. Land',
//       'Agricultural/Farm Land',
//       'Industrial Land/Plots',
//       'Warehouse',
//       'Cold Storage',
//       'Factory & Manufacturing',
//       'Hotel/Resorts',
//     ],
//   };

//   return (
//     <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, margin: 'auto', borderRadius: 2 }}>
//       <Typography variant="h5" sx={{ marginBottom: 2, textAlign: 'center' }}>
//         {property ? 'Edit Property' : 'Add Property'}
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <Grid2 container spacing={2}>

//           {/* Property Type */}
//           <Grid2 item xs={12} sm={6}>
//             <TextField
//               select
//               name="property_type"
//               label="Property Type"
//               value={formData.property_type}
//               onChange={handleChange}
//               fullWidth
//               required
//             >
//               <MenuItem value="residential">Residential</MenuItem>
//               <MenuItem value="commercial">Commercial</MenuItem>
//             </TextField>
//           </Grid2>

//           {/* Category */}
//           <Grid2 item xs={12} sm={6}>
//             <TextField
//               select
//               name="category"
//               label="Category"
//               value={formData.category}
//               onChange={handleChange}
//               fullWidth
//               required
//               disabled={!formData.property_type} // Disable if no property type selected
//             >
//               {(formData.property_type && categoryOptions[formData.property_type] ? categoryOptions[formData.property_type] : []).map((option) => (
//                 <MenuItem key={option} value={option}>
//                   {option}
//                 </MenuItem>
//               ))}
//             </TextField>
//           </Grid2>

//           {/* City */}
//           <Grid2 item xs={12} sm={6}>
//             <TextField
//               name="city"
//               label="City"
//               value={formData.city}
//               onChange={handleChange}
//               fullWidth
//               required
//             />
//           </Grid2>

//           {/* Locality */}
//           <Grid2 item xs={12} sm={6}>
//             <TextField
//               name="locality"
//               label="Locality"
//               value={formData.locality}
//               onChange={handleChange}
//               fullWidth
//               required
//             />
//           </Grid2>

//           {/* Price */}
//           <Grid2 item xs={12} sm={6}>
//             <TextField
//               name="price"
//               label="Price"
//               type="number"
//               value={formData.price}
//               onChange={handleChange}
//               fullWidth
//               required
//               inputProps={{ min: 0, max: 10000000 }}
//             />
//           </Grid2>

//           {/* Square Feet */}
//           <Grid2 item xs={12} sm={6}>
//             <TextField
//               name="sqft"
//               label="Square Feet"
//               type="number"
//               value={formData.sqft}
//               onChange={handleChange}
//               fullWidth
//               required
//             />
//           </Grid2>

//           {/* Bedrooms */}
//           <Grid2 item xs={12} sm={6}>
//             <TextField
//               name="bedrooms"
//               label="Bedrooms"
//               type="number"
//               value={formData.bedrooms}
//               onChange={handleChange}
//               fullWidth
//               required
//               inputProps={{ min: 0, max: 20 }}
//             />
//           </Grid2>

//           {/* Bathrooms */}
//           <Grid2 item xs={12} sm={6}>
//             <TextField
//               name="bathrooms"
//               label="Bathrooms"
//               type="number"
//               value={formData.bathrooms}
//               onChange={handleChange}
//               fullWidth
//               required
//               inputProps={{ min: 0, max: 20 }}
//             />
//           </Grid2>

//           {/* Parking Spaces */}
//           <Grid2 item xs={12} sm={6}>
//             <TextField
//               name="parking_spaces"
//               label="Parking Spaces"
//               type="number"
//               value={formData.parking_spaces}
//               onChange={handleChange}
//               fullWidth
//               required
//               inputProps={{ min: 0, max: 10 }}
//             />
//           </Grid2>

//           {/* Furnishing Status */}
//           <Grid2 item xs={12} sm={6}>
//             <TextField
//               select
//               name="furnishing_status"
//               label="Furnishing Status"
//               value={formData.furnishing_status}
//               onChange={handleChange}
//               fullWidth
//               required
//             >
//               <MenuItem value="Furnished">Furnished</MenuItem>
//               <MenuItem value="Semi-furnished">Semi-furnished</MenuItem>
//               <MenuItem value="Unfurnished">Unfurnished</MenuItem>
//             </TextField>
//           </Grid2>

//           {/* Property Status */}
//           <Grid2 item xs={12} sm={6}>
//             <TextField
//               select
//               name="property_status"
//               label="Property Status"
//               value={formData.property_status}
//               onChange={handleChange}
//               fullWidth
//               required
//             >
//               <MenuItem value="Ready to move">Ready to move</MenuItem>
//               <MenuItem value="New Launch">New Launch</MenuItem>
//               <MenuItem value="Under-Construction">Under-Construction</MenuItem>
//             </TextField>
//           </Grid2>

//           {/* Listing Start Date */}
//           <Grid2 item xs={12} sm={6}>
//             <TextField
//               name="listed_startdate"
//               label="Listing Start Date"
//               type="date"
//               value={formData.listed_startdate}
//               onChange={handleChange}
//               fullWidth
//               InputLabelProps={{ shrink: true }}
//               required
//             />
//           </Grid2>

//           {/* Listing End Date (calculated automatically) */}
//           <Grid2 item xs={12} sm={6}>
//             <TextField
//               name="listing_enddate"
//               label="Listing End Date"
//               type="date"
//               value={formData.listing_enddate}
//               fullWidth
//               InputLabelProps={{ shrink: true }}
//               disabled // Disable manual input
//             />
//           </Grid2>

//           {/* Video URL */}
//           <Grid2 item xs={12}>
//             <TextField
//               name="video_url"
//               label="Video URL"
//               type="url"
//               value={formData.video_url}
//               onChange={handleChange}
//               fullWidth
//               placeholder="https://example.com/video.mp4"
//             />
//           </Grid2>

//           {/* Image Upload Field */}
//           <Grid2 item xs={12}>
//             <Button
//               variant="contained"
//               component="label"
//               fullWidth
//             >
//               Upload Image
//               <input
//                 type="file"
//                 hidden
//                 accept="image/*"
//                 onChange={handleImageChange}
//               />
//             </Button>
//           </Grid2>

//           {/* Image Preview */}
//           {formData.imagePreviewUrl && (
//             <Grid2 item xs={12} sx={{ textAlign: 'center', marginTop: 2 }}>
//               <img
//                 src={formData.imagePreviewUrl}
//                 alt="Property Preview"
//                 style={{ maxWidth: '100%', height: 'auto', borderRadius: 8 }}
//               />
//             </Grid2>
//           )}

//           {/* Submit and Cancel Buttons */}
//           <Grid2 item xs={12} sx={{ textAlign: 'center' }}>
//             <Button variant="contained" color="primary" type="submit" sx={{ marginRight: 2 }}>
//               {property ? 'Update' : 'Add'} Property
//             </Button>
//             {onCancel && (
//               <Button variant="outlined" color="secondary" onClick={onCancel}>
//                 Cancel
//               </Button>
//             )}
//           </Grid2>

//         </Grid2>
//       </form>
//     </Paper>
//   );
// }

// export default PropertyForm;
