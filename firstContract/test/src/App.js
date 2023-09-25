import { useEffect, useState } from "react";
import Web3 from "web3";
import "./App.css";

function App() {
  // 브라우저에서 이더리움 블록체인 상호작용 하기
  // 메타마스크 확장 프로그램을 통해 네트워크에 상호작용
  // 메타마스크는 외부 소유 계정 정보와 네트워크의 정보도 가지고 있음
  // 트랜잭션을 발생시키면 서명 정보를 필요로 하는데 개인키를 직접 전달하는 것이 아닌 메타마스크 안에 안전하게 보관

  // 원격 프로시저 호출을 통해 컨트랙트의 함수를 실행 시킬 수 있고 네트워크의 메소드도 사용하여 계정의 정보 등 로직을 사용 가능

  // 지갑(메타마스크)으로 로그인 (탈중앙화된 어플리케이션 로그인 처리 방식)
  const [account, setAccount] = useState(null);
  // npm install web3
  const [web3, setWeb3] = useState(null);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    (async () => {
      // 즉시 실행 함수를 사용하여 구조분해 할당
      const [data] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("data : ", data);

      // 네트워크 web3 연결
      console.log(new Web3(window.ethereum));
      setWeb3(new Web3(window.ethereum));
      setAccount(data);
    })();
  }, []);

  const balanceBtn = async () => {
    const balance = await web3.eth.getBalance(account);
    const _balance = await web3.utils.fromWei(balance, "ether");
    setBalance(_balance);
  };

  return (
    <div className="App">
      {/* 지갑의 내용을 가지고 계정 조회 */}
      {account || "login please"}
      <br />
      {balance} ETH
      <br />
      <button onClick={balanceBtn}>잔액 조회</button>
    </div>
  );
}

export default App;
