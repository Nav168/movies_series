import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { img_300, noPicture } from "../../config/config";
import "./Carousel.css";

const handleDragStart = (e) => e.preventDefault();

const Gallery = ({ id, media_type }) => {
  const [credits, setCredits] = useState([]);

  const items = credits.map((c) => (
    <div className="carouselItem">
      <img
        src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
        alt={c?.name}
        onDragStart={handleDragStart}
        className="carouselItem__img"
      />
      <b className="carouselItem__txt">{c?.name}</b>
    </div>
  ));

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };

  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/${media_type}/${id}/credits`,
    headers: {
      accept: 'application/json',
      //Authorization: process.env.REACT_APP_OPTIONS,
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTM5OTc4NThkNzVkMjhiMTJiZmQ4MzQzMmMwOTE4YyIsInN1YiI6IjY0YzYxNDVmNjNlNmZiMDBjNDA5M2NmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OLkmbvuZ2TfpEdAr_jkgfcSRvwPHGECuQQMAI9S6lgM'

    },
    params: {
      language: 'en-US',
    }
  };
  
  const fetchCredits = () => {
      axios.request(options)
      .then((response)=>{
        setCredits(response.data.cast);
    }).catch((error) => {
      console.error('Error:', error);
    });
  }

  // const fetchCredits = async () => {
  //   const { data } = await axios.get(
  //     `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  //   );
  //   setCredits(data.cast);
  // };

  useEffect(() => {
    fetchCredits();
    // eslint-disable-next-line
  }, []);

  return (
    <AliceCarousel
      mouseTracking
      infinite
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      items={items}
      autoPlay
    />
  );
};

export default Gallery;
