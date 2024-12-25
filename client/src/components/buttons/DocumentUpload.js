import React, { useRef } from "react";
import { uploadDocuments } from "../../services/message.service"; // Adjust the import path as necessary
import { ReactComponent as UploadIcon } from "../../assets/upload-icon.svg"; // Import the upload icon

const DocumentUpload = () => {
  const fileInputRef = useRef(null); // Reference for the file input

  const handleUploadClick = () => {
    fileInputRef.current.click(); // Trigger the file input click
  };

  const handleFileChange = async (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const response = await uploadDocuments(files);
      console.log(response); // Handle the response (e.g., show success message)
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        className="theme__button flex-1 flex items-center" // Match the styling of ThemeToggleButton
        onClick={handleUploadClick}
      >
        <UploadIcon className="w-5 h-5 mr-2" />{" "}
        {/* Icon on the left with margin */}
        <span>Upload Documents</span>
      </button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }} // Hide the file input
        multiple
        onChange={handleFileChange} // Handle file selection
      />
    </div>
  );
};

export default DocumentUpload;
