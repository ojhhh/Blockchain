import React from "react";
import { SendListWrap, HeaderBox, SearchBox } from "./SendList.styled";

const SendList = ({ onChangePage }) => {
  return (
    <SendListWrap>
      <HeaderBox>
        <div className="headerText">
          <span>보낼 대상 : </span>
        </div>
        <div className="returnBtn">
          <span onClick={() => onChangePage("MainBody")}>취소</span>
        </div>
      </HeaderBox>
      <SearchBox>
        <input type="text" />
      </SearchBox>
    </SendListWrap>
  );
};

export default SendList;
