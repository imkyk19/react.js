import axios from '../api/axios';
import requests from '../api/request';
import React, { useEffect, useState } from 'react'
import './Banner.css';
import styled from 'styled-components';

const Banner =() => {

  const [movie, setmovie] = useState([]);

  //video play button Click boolean
  const [isClicked, setIsClicked] = useState(false);

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

  
  //video play button click event
  //click, show video
  if (isClicked) {
    return(
      //styled component UI
      <Container>
        <HomeContainer>
        <Iframe width="640" height="360" 
          src={`https://www.youtube.com/embed/${movie.videos.results[0].key}
          ?controls=0&autoplay=1&mute=1&loop=1&playlist=${movie.videos.results[0].key}`} 
          title="By Yugyeomee" frameborder="0" 
          allow=" autoplay; fullscreen;"> 
          </Iframe>
          <button className='CloseVideo' 
          onClick={()=> setIsClicked(false)}>X</button>
        </HomeContainer>
      </Container>
    )
  }else {
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
            <button className='banner_button play'
            //video pla button click, value 'True' setting
            onClick={ ()=> setIsClicked(true)}>
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
}
export default Banner;

//video play button click, styled component
const Container = styled.div`
  disply : flex;
  justify-content : center;
  align-items : center;
  flex-direction : column;
  width : 100%;
  height : 100vh;
`

const HomeContainer = styled.div`
  width : 100%;
  height : 50%;
`

//Iframe : add other pages in this page
const Iframe = styled.iframe`
  width : 100%;
  height : 100%;
  z-index : -1;
  opacity : 0.65;
  border : none;

  $::after {
    content : "";
    position : absolute;
    top : 0;
    left : 0;
    width : 100%;
    height : 100%;
  }
`