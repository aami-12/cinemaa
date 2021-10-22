import axios from 'axios'
import { useEffect, useState } from "react";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import Genres from "../../components/Genres/Genres";
import useGenres from "../../hooks/useGenres";
function Movies() {
  const [page, setpage] = useState(1)
  const [content, setcontent] = useState([])
  const [numOfPages, setnumOfPages] = useState()
  const [selectedgenres, setselectedgenres] = useState([])
  const genreforURL = useGenres(selectedgenres)
  const [genres, setgenres] = useState([])
  const fetchMovies = async() => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
      );
      // console.log(data);
      setcontent(data.results);
      setnumOfPages(data.total_pages);
  };

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line
  }, [page,genreforURL])
  return (
    <div>
      <span className="pageTitle">Movies</span>
      <Genres type="movie" 
      selectedgenres={selectedgenres}
       setselectedgenres={setselectedgenres} 
       genres={genres} 
       setgenres={setgenres} 
       setpage={setpage} 
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
              media_type='movie'
              vote_average={c.vote_average}
            />
          ))}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setpage={setpage} numOfPages={numOfPages} />
      )}
    </div>
  );
}

export default Movies;
