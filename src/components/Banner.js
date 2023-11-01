import axios from '../api/axios';
import requests from '../api/request';
import React, { useEffect, useState } from 'react'
import './Banner.css';

const Banner =() => {

  const [movie, setmovie] = useState([]);

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    //현재 상영중인 영화 정보 가져오기
    const response = await axios.get(requests.fetchNowPlaying);
    console.log(response);
    //여러 영화 중 랜덤 하나의 id 가져오기
    const movieId = response.data.results
      [Math.floor(Math.random() * response.data.results.length)].id;
   
    //특정 영화의 더 상세한 정보 가져오기
    const {data: movieDetail} = await axios.get(`movie/${movieId}`
    , {params : {append_to_response: "videos"}
    });
    setmovie(movieDetail);
  }

  //100자 이상 시, "..." 표현
  const subst = (str, n) => {
    //str이 있을 때만 n보다 클 때는 잘라주기. 아니면 str 전체 표기
    return str?.length > n ? str.substring(0,n) + "..." : str;
  }
  

  return (
    <header
      className='banner'
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
        backgroundPosition :"top center",
        backgroundSize : "cover"
      }}  
    >

      <div className='banner_contents'>
        <h1 className='banner_title'>
          {movie.title || movie.name || movie.original_name}
        </h1>

        <div className='banner_buttons'>
          {movie?.videos?.results[0]?.key && 
            <button className='banner_button play'>
              play
            </button>
          }
        </div>

        <p className='banner_description'>
          {subst(movie.overview,150) }
        </p>

          <div className='banner_fadeBottom'>         
          </div>
      </div>
    </header>
  )
  
}

export default Banner;