import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";

const ProfileImage = (props) => {
  const [profileImage, setImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("")
  
  useEffect(() => {
    console.log('profileImage', profileImage)
  }, [props.image])

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const MAX_FILE_SIZE = 102.4; // 100KB
    const fileSizeKiloBytes = file.size / 1024;

    const allowedExtensions = /(\jpg|\jpeg|\png|\gif)$/i;
    if (!allowedExtensions.exec(file.type)) {
      setErrorMessage("Invalid file type! only jpg, jpeg, png, gif are supported");
      return;
    }

    if (fileSizeKiloBytes > MAX_FILE_SIZE) {
      setErrorMessage("Image size is greater than 100KB limit");
      return;
    }

    setErrorMessage('')
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
      props.onChange(props.name, reader.result)
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
              No Image
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