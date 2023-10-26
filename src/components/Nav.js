import React from 'react'
import styled from 'styled-components'

//컴포넌트 사용을 하려면 const로 선언해줘야 함.
function Nav() {
  return (
    <Navrapper>
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
  background-color : #090b13;
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