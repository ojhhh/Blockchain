import React, { useState, useEffect } from "react";
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
import Web3 from "web3";

const MainBody = () => {
  const [account, setAccount] = useState("0xABD...ERFG");
  const [balance, setBalance] = useState(0);
  const [web3, setWeb3] = useState(null);
  const [sliceAccount, setSliceAccount] = useState(null);

  useEffect(() => {
    (async () => {
      const [data] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("data : ", data);
      setWeb3(new Web3(window.ethereum));
      // 로그인한 계정 정보 가져오기
      setAccount(data);
      // 계정 잔액 가져오기
      // setBalance(web3.eth.getBalance(data));
    })();
  }, []);

  useEffect(() => {
    setSliceAccount(account.slice(0, 5) + "..." + account.slice(-4));
    if (web3) {
      (async () => {
        const ta = await web3.eth.getBalance(account);
        console.log("ta : ", ta);
      })();
    }
  }, [web3]);

  useEffect(() => {}, [balance]);

  return (
    <MainBodyWrap>
      {/* 계정 복사 부분 */}
      <BodyTop>
        <div className="AccountBox">
          <div className="AccountInfo">
            <span>{sliceAccount}</span>
          </div>
          <div className="AccountCopy">
            <img src={Copy} />
          </div>
        </div>
      </BodyTop>
      {/* 잔액 출력 */}
      <BodyMiddle>
        <div className="BalanceBox">
          <span>{balance} ETH</span>
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
