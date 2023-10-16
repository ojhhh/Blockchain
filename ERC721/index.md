# ERC 721 - NFT

# NFT 대체 불가능한 토큰 Non-fungible Token

- 고유의 값을 가짐
- 디지털 자산의 소유권을 보장
- 토큰의 내용이 대체 불가능한것이 아니고 토큰 자체가 고유의 값을 가지고 있어 대체 불가능하다는 뜻
- NFT를 생성했을때 내용이 같아도 각각의 고유성을 가지고 있음

# NFT

```javascript
const nft = {
  tokenId = "0x0000000000000000000000000000000000000000" // 토큰의 고유 식별자
  url = "https://nfturl.com/data.json"  // nft에 담길 객체 파일의 경로
}
```

# NFT의 url 내용

```json
{
  "name": "NFT의 이름",
  "description": "NFT이 설명",
  "image": "NFT에 포함할 이미지 경로",
  "attributes": [] // 추가 할 속성
}
```

- url의 객체의 내용을 데이터베이스에 저장해도 NFT 민팅을 할 순 있지만 탈중앙화라고 보기 힘듬
- 탈중앙화를 하기 위해 분산 파일 시스템(IPFS)에 객체의 내용 및 이미지를 저장하여 URL 전달
- NFT를 조회했을때 분산 파일 시스템에 저장된 객체의 내용을 보여줌

- IPFS에 파일을 업로드하면 파일의 경로는 해시기반의 고유한 주소값을 가짐
- 분산 파일 시스템 데이터를 저장하는 프로토콜 P2P 네트워크

```sh
npm init -y
npm install @openzeppelin/contracts
```

- ERC 20은 누가 토큰을 얼마나 가지고 있는지가 중요하다면 ERC 721은 누가 가지고 있는지가 중요

# pinata

- IPFS Provider 사용
- pinata로 IPFS에 직접 파일을 업로드하고 업로드한 파일의 해시주소를 가져오기
- 가져온 해시주소로 업로드된 파일을 다운받을 수 있음

## remix 사용

```sh
remixd -s . --remix-ide https://remix.ethereum.org/
```
