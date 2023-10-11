// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./ERC20.sol";

contract Pokenmon is ERC20 {
    constructor() ERC20("Pokenmon", "PTK", 10000) {}

    // 포켓몬 객체를 만들것.
    // 이 객체 하나가 포켓몬의 데이터
    struct Pokens {
        string url;
        string name;
    }

    // 포켓몬 빵 구매한 사람들의 주소를 담아놓을것.
    struct Users {
        address account;
    }

    // ERC20 토큰을 지불해서 포켓몬 빵을 하나 사는것.
    // 빵하나에 얼마?
    // 단위를 이더로 지정 10**18 소수점 단위
    // 가격이 1000 토큰
    uint256 private tokenPrice = 1000 ether;

    // 우리가 포켓몬 빵을 사면 랜덤한 스티커가 들어있는데
    // 배열안에 나올수있는 포켓몬의 이름을 선언 해두자.
    // 한글을 사용하려면 유니코드 작성 해야함..
    // 영어로 쓰자.
    string[] pokenmonName = ["Pikachu", "Kobuk", "Charmander"];

    // 포켓몬 이쁜 이미지를 담아놓을 배열
    string[] pokenmonUrl = [
        "https://mblogthumb-phinf.pstatic.net/20160817_259/retspe_14714118890125sC2j_PNG/%C7%C7%C4%AB%C3%F2_%281%29.png?type=w800",
        "https://i.namu.wiki/i/qxW3nOx3cDu6UGSaGTKm7CkJgbpI5CMJHIqll3YMAH7DhCNJI2e60D5vMOrepRacs4SsZHE_fx3J0JfKy4NNNQ.gif",
        "https://i.namu.wiki/i/wkwHbl319sCFlTR6pt9P4AnhauWeYt9a28QtGf50DbR2hAUrZ7hcabdwI3KvPSHJd6JoLJ9PZMONNXcdE0sOqg.webp"
    ];
    // 구매하면 한개를 얻는데
    // 또 사면 두개
    mapping(address => Pokens[]) public pokenmons;
    // {
    //     "0x156165151" : [Pokens{url : "" , name : ""},Pokens{url : "" , name : ""},Pokens{url : "" , name : ""}]
    // }

    // 한번이라도 포켓몬 빵을 구매한 사람들의 주소를 가지고 있는 Users 객체
    Users[] public users;

    // 지갑주소가 가지고있는 포켓몬 조회
    function getPokenmon() public view returns (Pokens[] memory) {
        return pokenmons[msg.sender];
    }

    function getPokenmonUsers() public view returns (Users[] memory) {
        return users;
    }

    function buyPokenmon() public {
        require(balances[msg.sender] >= tokenPrice);
        balances[msg.sender] -= tokenPrice;
        totalSupply -= tokenPrice;

        uint random = uint(
            keccak256(
                abi.encodePacked(block.timestamp, block.coinbase, block.number)
            )
        );
        random = uint(random % 3); // 0~2까지의 3가지의 랜덤값
        // Pokens구조체 형태로 객체를 만들어서 배열에 푸쉬
        pokenmons[msg.sender].push(
            Pokens(pokenmonUrl[random], pokenmonName[random])
        );

        // 유저가 포켓몬빵을 한번 산적이 있는지
        bool isUser = false;
        for (uint256 i = 0; i < users.length; i++) {
            if (users[i].account == msg.sender) {
                isUser = true;
                break;
            }
        }

        if (!isUser) {
            users.push(Users(msg.sender));
        }
    }
}
