// // with avatar and drop down menu

// import React, { useState, useEffect } from "react";
// import "./HomePage.css";
// import Typography from "@mui/material/Typography";
// import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";
// import Carousel from "react-material-ui-carousel";
// import { getFeeds } from "../api";


// const HomePage = () => {
//   const [carouselItems, setCarouselItems] = useState([]);

//   const [activeImageIndex, setActiveImageIndex] = useState(0);

//   const handleImageClick = (index) => {
//     setActiveImageIndex(index);
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveImageIndex((prevIndex) =>
//         prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
//       );
//     }, 100);
//     return () => clearInterval(interval);
//   }, [carouselItems]);

//   useEffect(() => {
//       async function getCarouselData() {
//         const feedData = await getFeeds()
//         setCarouselItems(feedData)
//       } 

//       getCarouselData()
//   }, []);

//   const handlePrevClick = () => {
//     setActiveImageIndex((prevIndex) =>
//       prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
//     );
//   };

//   const handleNextClick = () => {
//     setActiveImageIndex((prevIndex) =>
//       prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
//     );
//   };
  

//   return (
//     <div style={{ flexGrow: 1, padding: "16px", backgroundColor: "#fff" }}>
//       <Grid container spacing={3} style={{ marginTop: "32px" }}>
//         <Grid item xs={12}>
//           <Typography variant="h4" align="center">
//             Welcome to New Leaf!
//           </Typography>
//         </Grid>
//         <Grid item xs={12}>
//           <Paper elevation={3} style={{ padding: "16px" }}>
//             <Carousel
//               animation="slide"
//               navButtonsAlwaysVisible
//               indicators={false}
//               interval={5000}
//               timeout={500}
//               navButtonsProps={{
//                 style: {
//                   backgroundColor: "#00796b",
//                   borderRadius: 0,
//                 },
//               }}
//             >
//               {carouselItems.map((item, index) => (
//                 <div
//                   key={index}
//                   style={{
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                   }}
//                   onClick={() => handleImageClick(index)}
//                 >
//                   {item.type === "motivational-post" && (
//                     <Paper
//                       elevation={3}
//                       style={{
//                         padding: "16px",
//                         width: "100%",
//                         marginBottom: "16px",
//                       }}
//                     >
//                       <Typography variant="h6" style={{ textAlign: "center", fontWeight: "bold", fontSize: "24px", marginBottom: "8px", textDecoration: "underline" }}>
//                         {item.title}
//                       </Typography>
//                       <Typography variant="body1" style={{ textAlign: "center" }}>
//                         {item.description}
//                       </Typography>
//                       <img
//                         src={item.images[0]}
//                         style={{ maxWidth: "100%" }}
//                       />
//                     </Paper>
//                   )}
//                   {item.type === "quote" && (
//                     <Paper
//                       elevation={3}
//                       style={{
//                         padding: "16px",
//                         width: "100%",
//                         marginBottom: "16px",
//                       }}
//                     >
//                       <Typography variant="h6" style={{ marginBottom: "8px" }}>
//                         {item.quote}
//                       </Typography>
//                       <img
//                         src={item.images[0]}
//                         alt={item.image.title}
//                         style={{ maxWidth: "100%" }}
//                       />
//                       <Typography
//                         variant="subtitle1"
//                         style={{ marginTop: "16px", textAlign: "right" }}
//                       >
//                         - {item.author}
//                       </Typography>
//                     </Paper>
//                   )}
//                   {item.type === "image" && (
//                     <img
//                       key={index}
//                       src={item.url}
//                       alt={item.title}
//                       style={{
//                         width: "100%",
//                         height: "auto",
//                         cursor: "pointer",
//                         border:
//                           index === activeImageIndex
//                             ? "2px solid green"
//                             : "none",
//                       }}
//                     />
//                   )}
//                 </div>
//               ))}
              
//             </Carousel>
//           </Paper>
//         </Grid>
//       </Grid>
//     </div>
//   );
// };

// export default HomePage;


// with avatar and drop down menu

import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Carousel from "react-material-ui-carousel";
import { getFeeds } from "../api";
import './HomePage.css';
import FeedBackPop from "../../src/components/feedBack/feedBackPop"

const HomePage = () => {
  const [carouselItems, setCarouselItems] = useState([]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleImageClick = (index) => {
    setActiveImageIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImageIndex((prevIndex) =>
        prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 100);
    return () => clearInterval(interval);
  }, [carouselItems]);

  useEffect(() => {
      async function getCarouselData() {
        const feedData = await getFeeds()
        setCarouselItems(feedData)
      } 

      getCarouselData()
  }, []);

  const handlePrevClick = () => {
    setActiveImageIndex((prevIndex) =>
      prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setActiveImageIndex((prevIndex) =>
      prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
    );
  };
  

  return (
    <div className="container">
      <Grid>
      <div className = "Heading">
        <Grid >
          <Typography variant="h1" className="Heading__title" >
            Welcome to New Leaf!
          </Typography>
        </Grid>
        </div>
        <Grid >
          <Paper >
            <Carousel
              animation="slide"
              navButtonsAlwaysVisible
              indicators={false}
              interval={3500}
              timeout={500}
              navButtonsProps={{
                style: {
                  backgroundColor: "#00796b",
                  borderRadius: 0,
                },
              }}
            >
              {carouselItems.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  onClick={() => handleImageClick(index)}
                >
                  {item.type === "motivational-post" && (
                    <Paper style={{ border: "2px solid #00796b", borderRadius: 0 }}>
                      <Typography variant="h4" component="h2" style={{ fontWeight: "bold" , textAlign: "center", textDecoration: "underline"}}>
                        {item.title}
                      </Typography>
                      <Typography variant="body1" style={{ fontStyle: "italic", textAlign: "center" }}>
                        {item.description}
                      </Typography>
                      <img
                        className="carousel-image"
                        src={item.images[0]} 
                        alt={`Motivational poster with the quote: '${item.title}'`}
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                      />
                    </Paper>
                  )}
                  {item.type === "quote" && (
                    <Paper style={{ border: "2px solid #00796b", borderRadius: 0, width: "5000px", height: "5000px" }}>
                    <Typography variant="h4" component="h2" style={{ fontWeight: "bold" , textAlign: "center", textDecoration: "underline"}}>
                      {item.title}
                    </Typography>
                    <Typography variant="body1" style={{ fontStyle: "italic", textAlign: "center" }}>
                      {item.description}
                    </Typography>
                    <img
                    className="carousel-image"
                      src={item.images[0]} 
                      alt={`Motivational quote with the title: '${item.title}'`}
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    />
                  </Paper>
                  )}
                  {item.type === "image" && (
                    <Paper style={{ borderWidth: "10px", borderStyle: "solid", borderColor: "transparent" }}>
                    <Typography variant="h4" component="h2" style={{ fontWeight: "bold" , textAlign: "center", textDecoration: "underline"}}>
                      {item.title}
                    </Typography>
                    <Typography variant="body1" style={{ fontStyle: "italic", textAlign: "center" }}>
                      {item.description}
                    </Typography>
                    <img
                    className="carousel-image"
                      src={item.images[0]} 
                      alt={`Motivational image with the title: '${item.title}'`}
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    />
                  </Paper>
                  )}
                </div>
              ))}
            </Carousel>
          </Paper>
        </Grid>
      </Grid>
      <div>
        <FeedBackPop
          chatId="6445696e99e0f288c0614080"
          username = "john doe"
        />
      </div>
    </div>
  );
};

export default HomePage;

