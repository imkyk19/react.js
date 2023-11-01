import axios from '../api/axios';
import requests from '../api/request';
import React, { useEffect, useState } from 'react'

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
    console.log("moviedetail:"+movieDetail);

  }
  return (
    <div>Banner</div>
  )
  
}

export default Banner;