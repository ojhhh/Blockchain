import React from "react";
import {
  MainWrap,
  MainHeaderContainer,
  MainBodyContainer,
} from "./Main.styled";
import MainHeader from "../../feature/MainHeader/MainHeader";
import MainBody from "../../feature/MainBody/MainBody";

const Main = () => {
  return (
    <MainWrap>
      {/* Header Start */}
      <MainHeaderContainer>
        <MainHeader />
      </MainHeaderContainer>

      {/* Body Start */}
      <MainBodyContainer>
        <MainBody />
      </MainBodyContainer>
    </MainWrap>
  );
};

export default Main;
