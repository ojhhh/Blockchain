import { useState, useEffect } from "react";
import Web3 from "web3";

// 커스텀 훅 작성시 use를 붙여줘야 함(규칙? 같은 느낌)
const useWeb3 = () => {
  // 현재 접속한 메타마스크 지갑정보를 담을 변수
  const [user, setUser] = useState({
    account: "",
    balance: "",
  });
  // 네트워크와 연결한 web3 인스턴스를 담을 변수
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    // ethereum 객체가 있는지 확인
    // 메타마스크가 설치되어 있는지 확인
    if (window.ethereum) {
      // 로그인
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        // 요청 받은 배열의 첫번째 값을 구조분해 할당으로 가져옴
        .then(async ([data]) => {
          const web3Provider = new Web3(window.ethereum);
          setWeb3(web3Provider);
          setUser({
            account: data,
            balance: web3Provider.utils.toWei(
              await web3Provider.eth.getBalance(data),
              "ether"
            ),
          });
        });
    } else {
      alert("install metamask");
    }
  }, []);

  return {
    user,
    web3,
  };
};

export default useWeb3;
