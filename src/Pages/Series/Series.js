import axios from "axios";
import { useEffect, useState } from "react";
import Genres from "../../components/Genres/Genres";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import useGenre from "../../hooks/useGenre";

const Series = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const genreforURL = useGenre(selectedGenres);
 
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/discover/tv`,
    headers: {
      accept: 'application/json',
      //Authorization: process.env.REACT_APP_OPTIONS,
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTM5OTc4NThkNzVkMjhiMTJiZmQ4MzQzMmMwOTE4YyIsInN1YiI6IjY0YzYxNDVmNjNlNmZiMDBjNDA5M2NmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OLkmbvuZ2TfpEdAr_jkgfcSRvwPHGECuQQMAI9S6lgM'

    },
    params: {
      page: `${page}`,
      language: 'en-US',
      sort_by: 'popularity.desc',
      include_adult: false,
      include_video: false,
      with_genres: `${genreforURL}`
    }
  };
  
  const fetchSeries = () => {
      axios.request(options)
      .then((response)=>{
      setContent(response.data.results);
      setNumOfPages(response.data.total_pages);
    }).catch((error) => {
      console.error('Error:', error);
    });
  }

  // const fetchSeries = async () => {
  //   const { data } = await axios.get(
  //     `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
  //   );
  //   setContent(data.results);
  //   setNumOfPages(data.total_pages);
  //   // console.log(data);
  // };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSeries();
    // eslint-disable-next-line
  }, [genreforURL, page]);

  return (
    <div>
      <span className="pageTitle">Discover Series</span>
      <Genres
        type="tv"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="tv"
              vote_average={c.vote_average}
            />
          ))}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Series;
