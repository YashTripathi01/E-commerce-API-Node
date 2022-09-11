import React from 'react';
import styled from 'styled-components';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';

const Slider = () => {
  return (
    <Container>
      <Arrow direction="left">
        <KeyboardArrowLeft />
      </Arrow>
      <Slide>
        <Wrapper>
          <ImageContainer>
            <Image src="https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1021&q=80"></Image>
          </ImageContainer>
          <InfoContainer>
            <Title>FALL SALE</Title>
            <Description>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia,
              nihil.
            </Description>
            <Button>SHOP NOW</Button>
          </InfoContainer>
        </Wrapper>
      </Slide>
      <Arrow direction="right">
        <KeyboardArrowRight />
      </Arrow>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #ececec;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  left: ${(props) => props.direction === 'left' && '10px'};
  right: ${(props) => props.direction === 'right' && '10px'};
  cursor: pointer;
  opacity: 0.5;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
`;

const Slide = styled.div`
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const ImageContainer = styled.div`
  flex: 1;
  height: 100%;
`;

const Image = styled.img`
  height: 80%;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 70px;
`;

const Description = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;

export default Slider;
