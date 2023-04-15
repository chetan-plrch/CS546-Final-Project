import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";

const ProfileImage = () => {
  const [profileImage, setImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("")
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const MAX_FILE_SIZE = 204.8; // 200KB
    const fileSizeKiloBytes = file.size / 1024;

    const allowedExtensions = /(\jpg|\jpeg|\png|\gif)$/i;
    if (!allowedExtensions.exec(file.type)) {
      setErrorMessage("Invalid file type! jpg, jpeg, png, gif are supported");
      return;
    }

    if (fileSizeKiloBytes > MAX_FILE_SIZE) {
      setErrorMessage("File size is greater than 200KB limit");
      return;
    }

    setErrorMessage('')
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <label htmlFor="profile-image">
        {profileImage ? (
          <img className="profile-image" src={profileImage} alt="Profile" />
        ) : (
            <Avatar
                sx={{
                bgcolor: "lightgrey",
                color: 'black',
                width: 80,
                height: 80,
                marginTop: 6,
                marginRight: 2,
                fontSize: '10px',
                cursor: 'pointer'
              }}
            >
              No Profile Image
            </Avatar>
        )}
      </label>

      <input
        type="file"
        id="profile-image"
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
      {errorMessage && <div className="profile-image-error">{errorMessage}</div>}
    </div>
  );
};

export default ProfileImage;