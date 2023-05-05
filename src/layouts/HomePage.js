import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import {Paper} from "@mui/material";
// import Carousel from "react-material-ui-carousel";
import { getFeeds } from "../api/index.js";
import './HomePage.css';
import FeedBackPop from "../../src/components/feedBack/feedBackPop.js"

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
          <Typography variant="h2" className="Heading__title" >
            Welcome to New Leaf!
          </Typography>
        </Grid>
        </div>
        <Grid >
          <Paper >
            {/* <Carousel
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
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  onClick={() => handleImageClick(index)}
                >
                  {item.type === "motivational-post" && (
                    <Paper >
                      <Typography>
                        {item.title}
                      </Typography>
                      <Typography>
                        {item.description}
                      </Typography>
                      <img
                        src={item.images[0]}
                      />
                    </Paper>
                  )}
                  {item.type === "quote" && (
                    <Paper>
                      <Typography >
                        {item.quote}
                      </Typography>
                      <img
                        src={item.images[0]}
                        alt={item.image.title} />
                      <Typography
                        variant="subtitle1"
                        style={{ marginTop: "16px", textAlign: "right" }}
                      >
                        - {item.author}
                      </Typography>
                    </Paper>
                  )}
                  {item.type === "image" && (
                    <img
                      key={index}
                      src={item.url}
                      alt={item.title}
                      style={{
                        width: "100%",
                        height: "auto",
                        cursor: "pointer",
                        border:
                          index === activeImageIndex
                            ? "2px solid green"
                            : "none",
                      }}
                    />
                  )}
                </div>
              ))}
            </Carousel> */}
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