import axios from "axios"
import {useState,useEffect} from "react"
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import "./Trending.css"

function Trending() {
         const [content, setcontent] = useState([]);
        const [page, setpage] = useState(1)
    const fetchTrending = async () => {
       
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
        );
            // console.log(data);
        setcontent(data.results)
    }

    useEffect(() => {
      fetchTrending();
      // eslint-disable-next-line
    }, [page])

    return (
      <div>
        <span className="pageTitle">Trending Today</span>
        <div className="trending">
          {content &&
            content.map((c) => <SingleContent key={c.id} id={c.id} poster={c.poster_path} title={c.title || c.name} date={c.first_air_date || c.release_date} media_type={c.media_type} 
                vote_average={c.vote_average}
            />)}
        </div>
        <CustomPagination setpage={setpage}/>
      </div>
    );
}

export default Trending
 