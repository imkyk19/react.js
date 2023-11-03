import axios from '../api/axios';
import React, { useCallback, useEffect, useState } from 'react'
import "./Row.css";

//부모 컴포넌트 Apps.js에서 내려준 Props 가져오기 (title, id, fetchUrl)
const Row = ({title, id, fetchUrl}) => {

  //영화정보 가져오기위한 변수 설정 (여러 정보를 가져오기 때문에 배열로 설정)
    const [movies, setMovies] = useState([])

  //컴포넌트가 렌더링 될 때 함수 실행. 영화 데이터 가져오기 - Apps.js에서 내려준 Props인 fetchUrl (4개)
  const fetchMovieData = useCallback ( async () => {
    const response = await axios.get(fetchUrl);

     //데이터 배열 형태로 저장
    setMovies(response.data.results);
   
    //의존성 부분이 바껴야 새로운 함수를 다시 생성함. -> useCallback 사용이유
  }, [fetchUrl])

  //fetchMovieData 데이터가 바뀌면 한번 더 call 함.
  useEffect(() => {
   fetchMovieData();

   //의존성 : fetchMovieData
  }, [fetchMovieData])

  return (
    <div>
      <h2>{title}</h2>
        <div className='slider'>
          <div className='slider_arrow-left'>
            <span className='arrow'>
              {"<"}
            </span>
          </div>
          <div id={id} className='row_posters'>
            {movies.map(movie => (
              <img
              key={movie.id}
              className='row_poster'
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              art={movie.name}
              width='200px' height='150px'
              />
            ))}
          </div>
          <div className='slider_arrow-right'>
          <span className='arrow'>
              {">"}
            </span>
          </div>
        </div>
    </div>
  )
}

export default Row

