import React, { useState, useEffect } from "react";
import {
  MainWrap,
  MainHeaderContainer,
  MainBodyContainer,
  MainFooterContainer,
} from "./Main.styled";
import MainHeader from "../../feature/MainHeader/MainHeader";
import MainBody from "../../feature/MainBody/MainBody";
import MainFooter from "../../feature/MainFooter/MainFooter";
import SendList from "../../feature/SendBody/SendList";

const Main = () => {
  const [page, setPage] = useState("MainBody");

  const changePageHandle = (pageName) => {
    setPage(pageName);
  };

  const returnPage = (pageName) => {
    switch (pageName) {
      case "MainBody":
        return <MainBody onChangePage={changePageHandle} />;
      case "SendList":
        return <SendList onChangePage={changePageHandle} />;
    }
  };

  return (
    <MainWrap>
      {/* Header Start */}
      <MainHeaderContainer>
        <MainHeader />
      </MainHeaderContainer>

      {/* Body Start */}
      <MainBodyContainer>{returnPage(page)}</MainBodyContainer>

      {/* Footer Start */}
      <MainFooterContainer>
        {page == "MainBody" ? <MainFooter /> : null}
      </MainFooterContainer>
    </MainWrap>
  );
};

export default Main;
