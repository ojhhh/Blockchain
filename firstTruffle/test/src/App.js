import { useEffect, useState } from "react";
import useWeb3 from "./hooks/web3.hook";
import abi from "./abi/Counter.json";

const App = () => {
  const { user, web3 } = useWeb3();
  const [count, setCount] = useState(0);

  // CA 컨트랙트 주소에 상태변수를 조회하는 함수 작성
  const getCount = () => {
    // web3가 있는지 즉, 메타마스크가 있는지 검사
    if (web3 == null) return;

    const getValueData = abi.find((data) => data?.name === "getValue");

    // data 실행시킬 내용이 담겨있음
    // 원격 프로시저 호출
    const data = web3.eth.abi.encodeFunctionCall(getValueData, []);

    // to : CA의 주소
    web3.eth
      .call({
        to: "0xb826c60569F14878738eb3263F94B5D31A09Cabc",
        data,
      })
      .then((data) => {
        const result = web3.utils.toBigInt(data).toString(10);
        setCount(result);
      });
  };

  // 값을 블록체인 네트워크에 요청해서 상태변수를 변경하는 함수
  const increment = async () => {
    const incrementData = abi.find((data) => data.name === "increment");
    const data = web3.eth.abi.encodeFunctionCall(incrementData, []);

    // 접속한 지갑의 주소
    const from = user.account;
    // to : CA의 주소
    const _data = web3.eth.sendTransaction({
      from: from,
      to: "0xb826c60569F14878738eb3263F94B5D31A09Cabc",
      data,
    });
    console.log(_data);
    getCount();
  };

  const decrement = async () => {
    const decrementData = abi.find((data) => data.name === "decrement");
    const data = web3.eth.abi.encodeFunctionCall(decrementData, []);

    const from = user.account;
    const _data = web3.eth.sendTransaction({
      from: from,
      to: "0xb826c60569F14878738eb3263F94B5D31A09Cabc",
      data,
    });
    console.log(_data);
    getCount();
  };

  useEffect(() => {
    if (web3 !== null) getCount();
  }, [web3]);

  if (user.account === "") return "login please";
  return (
    <>
      <div>
        <div>
          <h2>Wallet Address : {user.account}</h2>
        </div>
        <h2>Counter : {count}</h2>
        <button onClick={increment}>increment</button>
        <button onClick={decrement}>decrement</button>
      </div>
    </>
  );
};

export default App;
