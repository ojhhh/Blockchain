import { useEffect, useState } from "react";
import Web3 from "web3";

const useWeb3 = () => {
  const [user, setUser] = useState({ account: "", balance: "" });
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum
        .request({
          method: "eth_requestAccounts",
        })
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

          // 메타마스크에 있는 모든 지갑 정보 및 지갑에 있는 토큰량을 보여줌
          // 컨트랙트를 배포한 네트워크가 맞는지 아니면 네트워크 변경 할 수 있게 함수 실행
          // 지갑을 바꾸면 바꾼 지갑 내용을 브라우저에 표출
        });
    } else {
      alert("install metamask");
    }
  }, []);

  return { user, web3 };
};

export default useWeb3;
