import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";

const ProfileImage = (props) => {
  const imageBase64 = props.image;
  const [selectedFile, setSelectedFile] = useState();
  const [errorMsg, setErrorMsg] = useState("");

  const handleFileChange = (event) => {
    console.log("files", event.target.files[0]);
    if (event.target.files.length > 0) {
      const isValid = validateSelectedFile(event.target.files[0]);
      if (!isValid) {
        setSelectedFile(event.target.files[0]);
      }
    }
  };

  const validateSelectedFile = (file) => {
    const MAX_FILE_SIZE = 204.8; // 200KB

    const fileSizeKiloBytes = file.size / 1024;

    if (fileSizeKiloBytes > MAX_FILE_SIZE) {
      setErrorMsg("File size is greater than 200KB limit");
      setIsSuccess(false);
      return false;
    }

    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    if (!allowedExtensions.exec(file.type)) {
      setErrorMsg("Invalid file type! jpg, jpeg, png, gif are supported");
      setIsSuccess(false);
      return false;
    }

    setErrorMsg("");
    setIsSuccess(true);
    return true;
  };

  if (imageBase64) {
  }
  return (
    <div className="picture-dialog">
      <Avatar
        sx={{
          bgcolor: "red",
          width: 80,
          height: 80,
          marginTop: 6,
          marginRight: 2,
        }}
      >
        N
      </Avatar>
      <input type="file" name="file" onChange={handleFileChange} />;
      {errorMsg && <div>{errorMsg}</div>}
    </div>
  );
};

export default ProfileImage;
