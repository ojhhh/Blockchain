import React from "react";
import {
  MainBodyWrap,
  BodyTop,
  BodyMiddle,
  BodyBottom,
} from "./MainBody.styled";
import Copy from "../../../images/clone-solid.svg";
import Add from "../../../images/plus-solid.svg";
import Arrow from "../../../images/arrow-right-solid.svg";
import DArrow from "../../../images/arrow-right-arrow-left-solid.svg";
import Bridge from "../../../images/bezier-curve-solid.svg";
import portFolio from "../../../images/chart-line-solid.svg";

const MainBody = () => {
  return (
    <MainBodyWrap>
      {/* 계정 복사 부분 */}
      <BodyTop>
        <div className="AccountBox">
          <div className="AccountInfo">
            <span>0xABD...ERFG</span>
          </div>
          <div className="AccountCopy">
            <img src={Copy} />
          </div>
        </div>
      </BodyTop>
      {/* 잔액 출력 */}
      <BodyMiddle>
        <div className="BalanceBox">
          <span>100 ETH</span>
        </div>
      </BodyMiddle>
      {/* 기능 버튼  */}
      <BodyBottom>
        <div className="BuyBox">
          <div className="BuyBtn">
            <img src={Add} alt="" />
          </div>
          <div className="BuyText">
            <span>구매</span>
          </div>
        </div>
        <div className="SendBox">
          <div className="SendBtn">
            <img src={Arrow} alt="" />
          </div>
          <div className="SendText">
            <span>보내기</span>
          </div>
        </div>
        <div className="SwapBox">
          <div className="SwapBtn">
            <img src={DArrow} alt="" />
          </div>
          <div className="SwapText">
            <span>스왑</span>
          </div>
        </div>
        <div className="BridgeBox">
          <div className="BridgeBtn">
            <img src={Bridge} alt="" />
          </div>
          <div className="BridgeText">
            <span>Bridge</span>
          </div>
        </div>
        <div className="PortfolioBox">
          <div className="PortfolioBtn">
            <img src={portFolio} alt="" />
          </div>
          <div className="PortfolioText">
            <span>포트폴리오</span>
          </div>
        </div>
      </BodyBottom>
    </MainBodyWrap>
  );
};

export default MainBody;
