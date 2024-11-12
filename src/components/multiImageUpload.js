// import React, { useState } from 'react';
// import { BlobServiceClient } from '@azure/storage-blob';

// const UploadImages = () => {
//   const [selectedFiles, setSelectedFiles] = useState([]);

//   const handleFileSelect = (event) => {
//     setSelectedFiles(event.target.files);
//   };

//   const uploadFiles = async () => {
//     const sasToken = "<Your_SAS_Token>"; // Securely store or fetch this token
//     const containerName = "<Your_Container_Name>";
//     const blobServiceClient = new BlobServiceClient(`https://<your_account_name>.blob.core.windows.net?${sasToken}`);
//     const containerClient = blobServiceClient.getContainerClient(containerName);

//     for (let i = 0; i < selectedFiles.length; i++) {
//       const file = selectedFiles[i];
//       const blockBlobClient = containerClient.getBlockBlobClient(file.name);

//       try {
//         await blockBlobClient.uploadBrowserData(file);
//         console.log(`File ${file.name} uploaded successfully`);
//       } catch (error) {
//         console.error(`Error uploading file ${file.name}:`, error.message);
//       }
//     }
//   };

//   return (
//     <div>
//       <h2>Upload Images to Azure Blob Storage</h2>
//       <input type="file" multiple onChange={handleFileSelect} />
//       <button onClick={uploadFiles}>Upload</button>
//     </div>
//   );
// };

// export default UploadImages;
