import React, { useEffect } from 'react'
import styled from 'styled-components'

//컴포넌트 사용을 하려면 const로 선언해줘야 함.
function Nav() {

   //상태 관리
  const [show, setShow] = React.useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      //스크롤 위치 50 이하인 경우
      if (window.scrollY > 50) {
        setShow(true);
        // 스크롤 위치 50 이상인 경우
      }else{
        setShow(false);
      }
    })
  
    //컴포넌트가 더 이상 사용되지 않을 때 호출 *꼭 필요. 에러방지.
    return () => {
      window.removeEventListener('scroll', () => {});
    }

    /* 빈 배열 : 랜더링 후 컴포넌트 한 번 시작
        스테이트가 들어가면 스테이트가 변할 때 마다 시작 */
  }, [])
  


  return (
    //show 여부 가져오기.
    <Navrapper show={show}>
      <Logo>
        <img
          //이미지 소스가 안 보일 경우 보여지는 글귀
          alt="Disney Plus Logo"
          src="/images/logo.svg"
          onClick={() => window.location.href = "/"} 
        />
      </Logo>
    </Navrapper>
  )
}

export default Nav

const Navrapper = styled.nav`
  position : fixed;
  top : 0;
  left : 0;
  right : 0;
  //props로 show 가져와서 true : 투명 / false : 검정색
  background-color : ${props => props.show ? "#090b13" : "transparent" };
  display : flex;
  justify-content : space-between;
  align-items : center;
  padding : 0 36px;
  letter-spacing : 16px;
  z-index : 3; // nav는 항상 위에 올라 와 있어야 하므로.
`;

const Logo = styled.a`
  padding : 0;
  width : 80px;
  margin-top : 4px;
  max-height : 70px;
  font-size : 0;
  display : inline-block;

  // 컴포넌트 안에 있는 이미지도 여기에서 스타일링 해줄 수 있다.
  img {
    display : block;
    width : 100%;
  }
`