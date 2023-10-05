import useWeb3 from "./hooks/web3.hook";
import abi from "./abi/Counter.json";
import { useState, useEffect } from "react";

const App = () => {
  const { user, web3 } = useWeb3();
  const [count, setCount] = useState("0");
  const [countContract, setCountCountract] = useState(null);

  useEffect(() => {
    if (web3 !== null) {
      if (countContract === null) {
        // web3.eth.Contract : 네트워크에 배포되어 있는 컨트랙트를 조회하고 인스턴스로 생성
        // 메소드를 통해 네트워크에 상호작용

        // web3.eth.Contract = (abi, CA, option)
        // {data : ""} : 빈값으로 디폴트 옵션 추가
        const Counter = new web3.eth.Contract(
          abi,
          "0x2A620EF9350d9f5EE7FDff869780597c5Cdd51F2",
          { data: "", from: "" }
        );

        // 이후에 디폴트 옵션을 추가하고 싶으면
        Counter.options.from = "0x000";
        setCountCountract(Counter);
      }
    }
  }, [web3]);

  const getValue = async () => {
    if (countContract === null) return;
    // 조회한 결과값을 담음
    const result = web3.utils
      .toBigInt(await countContract.methods.getValue().call())
      .toString(10);
    setCount(result);
  };

  const increment = async () => {
    await countContract.methods.increment().send({
      from: user.account,
      data: countContract.methods.increment().encodeABI(),
    });
    getValue();
  };

  const decrement = async () => {
    await countContract.methods.decrement().send({
      from: user.account,
      data: countContract.methods.decrement().encodeABI(),
    });
    getValue();
  };

  useEffect(() => {
    if (countContract) getValue();
  }, [countContract]);

  if (user.account === null) return "connect wallet address";

  return (
    <>
      <div>{user.account}</div>
      <div>Counter : {count}</div>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
    </>
  );
};

export default App;
