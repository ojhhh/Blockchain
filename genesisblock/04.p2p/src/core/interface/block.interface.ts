// block 인터페이스를 정의
// 코드의 재사용성과 유지보수성을 높이기 위해 2개의 인터페이스를 사용
// 정의된 속성 중 하나를 변경하거나 추가되어도 한 곳만 수정 하면 나머지 한쪽도 변경되므로 유지 보수에 용이
export interface IBlockHeader {
  version: string;
  height: number;
  timestamp: number;
  previoushash: string;
}

// IBlock은 IBlockHeader 내용을 상속 받기 때문에 IBlockHeader의 속성들을 다시 정의 해줄 필요가 없음
export interface IBlock extends IBlockHeader {
  merkleRoot: string;
  hash: string;
  nonce: number;
  difficulty: number;
  data: string[];
}
