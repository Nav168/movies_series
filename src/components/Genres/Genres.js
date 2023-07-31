import { Chip } from "@material-ui/core";
import axios from "axios";
import { useEffect } from "react";

const Genres = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  type,
  setPage,
}) => {
  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  };

  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/genre/${type}/list`,
    headers: {
      accept: 'application/json',
      //Authorization: process.env.REACT_APP_OPTIONS,
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTM5OTc4NThkNzVkMjhiMTJiZmQ4MzQzMmMwOTE4YyIsInN1YiI6IjY0YzYxNDVmNjNlNmZiMDBjNDA5M2NmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OLkmbvuZ2TfpEdAr_jkgfcSRvwPHGECuQQMAI9S6lgM'

    },
    params: {
      language: 'en-US',
    }
  };
  
  const fetchGenres = () => {
      axios.request(options)
      .then((response)=>{
        setGenres(response.data.genres);
    }).catch((error) => {
      console.error('Error:', error);
    });
  }

  // const fetchGenres = async () => {
  //   const { data } = await axios.get(
  //     `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  //   );
  //   setGenres(data.genres);
  // };

  useEffect(() => {
    fetchGenres();

    return () => {
      setGenres({}); // unmounting
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ padding: "6px 0" }}>
      {selectedGenres.map((genre) => (
        <Chip
          style={{ margin: 2 }}
          label={genre.name}
          key={genre.id}
          color="primary"
          clickable
          size="small"
          onDelete={() => handleRemove(genre)}
        />
      ))}
      {genres.map((genre) => (
        <Chip
          style={{ margin: 2 }}
          label={genre.name}
          key={genre.id}
          clickable
          size="small"
          onClick={() => handleAdd(genre)}
        />
      ))}
    </div>
  );
};

export default Genres;
