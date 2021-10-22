import {useEffect} from 'react'
import axios from 'axios'
import { Chip } from "@material-ui/core";

const Genres = ({selectedgenres,
       setselectedgenres,
       genres,
       setgenres, 
       type,
       setpage}) => {

    const handleAdd = (genre) => {
    setselectedgenres([...selectedgenres, genre]);
    setgenres(genres.filter((g) => g.id !== genre.id));
    setpage(1);
  };

  const handleRemove = (genre) => {
    setselectedgenres(
      selectedgenres.filter((selected) => selected.id !== genre.id)
    );
    setgenres([...genres, genre]);
    setpage(1);
  };


           const fetchGenres = async() => {
              const { data } = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
               setgenres(data.genres);
           }
          
           useEffect(() => {
              fetchGenres();
              return () => {
                  setgenres({})
              }
              // eslint-disable-next-line
           }, [])
    return (
        <div style={{padding:"6px 0"}}>
        {selectedgenres && selectedgenres.map((genre) => (
              <Chip 
              label={genre.name}
              style={{margin:2}}
              clickable 
              size="small"
              color="primary"
              key={genre.id}
              onDelete={() => handleRemove(genre)}
              />
          ))}
           
          {genres && genres.map((genre) => (
              <Chip 
              label={genre.name}
              style={{margin:2}}
              clickable 
              size="small"
              key={genre.id}
              onClick={() => handleAdd(genre)}
              />
          ))}

         
           
        </div>
    )
}

export default Genres
