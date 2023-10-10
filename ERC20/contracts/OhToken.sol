// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract OhToken is ERC20 {
    // 상속받은 부모 생성자 호출
    constructor() ERC20("OhToken","OH") {
        // 상속받은 ERC20 생성자 함수 추가
        _mint(msg.sender, 10000 * 10 ** decimals());
    }
}