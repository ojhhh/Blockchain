import Block from "@core/block/block";
import Chain from "@core/chain/chain";
// npm install @types/ws ws
import { WebSocket, WebSocketServer } from "ws";

// ws
// 기본적인 연결 관련된것만 있는 모듈

// enum : 상태를 지정할 때 사용
// 상태값을 숫자로 받았을때 단순 숫자로만 쓰면 헷갈리기 때문에 상태를 별도로 지정
// 궁금증 : typescript라면 lastBlock : int = 0, 이런식으로 되야 하는거 아닌가?
// -> enum은 타입스크립트에서 조금 특별한 구조를 갔는데 내부 멤버는 기본적으로 숫자 값을 가짐
// 그 숫자는 0부터 시작하여 자동으로 증가하며 숫자값을 명시적으로 지정 할 수 있음
// enum MessageType {
//   lastBlock,
//   allBlock,
//   addBlock,
// }
// 자동으로 0으로 시작하기 때문에 이런식으로 작성해도 아래와 같이 동작
// lastBlock = 5 라면 순차적으로 5, 6, 7 이 정의됨
enum MessageType {
  // 코드 가독성을 높히기 위해 사용
  // 마지막 블록을 요청할 때
  lastBlock = 0,
  // 전체 체인을 요청할 때
  allBlock = 1,
  // 블록이 추가됬을 때
  addBlock = 2,
}

interface IMessage {
  // Message type
  type: MessageType;
  // Message value
  payload: any;
}

class P2P extends Chain {
  // Chain을 상속받아서 Chain에 있는 메소드를 사용
  private sockets: Array<any>; // 연결된 소켓 확인

  constructor() {
    super();
    this.sockets = [];
  }

  // 연결된 소켓을 반환
  getSockets(): Array<WebSocket> {
    return this.sockets;
  }

  // void : 반환값이 없는 함수
  connectSocket(socket: WebSocket, type?: MessageType): void {
    // 연결된 소켓을 sockets에 추가
    // 서비스에 연결되면 충돌방지를 위해 고유의 포트번호 지정
    // 어떤 값으로 소켓이 들어올지 몰라서 any로 풀어둠
    // typescript는 컴파일 언어이기 때문에 테스트 환경에서는 socket 타입을 받아오지 못함
    // 그렇기 때문에 any로 해야 테스트 동작 실행 가능
    this.sockets.push(
      `${(socket as any)._socket.remoteAddress} : ${
        (socket as any)._socket.remotePort
      }`
    );
    // socket.send() : 메소드를 호출하면 이벤트 실행
    socket.on("message", (_data: string) => {
      const data = JSON.parse(_data.toString());

      // data.type은 0, 1, 2의 숫자를 받음
      // enum으로 선언해줬기 때문
      switch (data.type) {
        case MessageType.lastBlock:
          const message: IMessage = {
            // 모든블록 타입이 실행되는지 확인
            type: MessageType.lastBlock,
            // 마지막 블록은 payload에 담음
            payload: [this.lastestBlock()],
          };
          // 완성된 객체를 문자여롤 치환 후 내보냄
          socket.send(JSON.stringify(message));
          break;
        case MessageType.allBlock:
          break;
        case MessageType.addBlock:
          // 추가 될 수 있는지 검증
          const isValid = this.replaceChain(data.payload);
          // 문제가 있으면 종료
          if (isValid.isError) break;
          // 검증에 통과하면 socket에 추가
          const message2: IMessage = {
            type: MessageType.addBlock,
            payload: data.payload,
          };

          this.sockets.forEach((item) => {
            // 현재 접속한 유저에게 메시지 전송
            item.send(JSON.stringify(message2));
          });
          break;

        default:
          break;
      }
    });
  }

  listen(port: number): void {
    // 현재 로컬에서 서버 생성
    // websocket port listen
    const server: WebSocketServer = new WebSocket.Server({ port });

    server.on("connection", (socket: WebSocket) => {
      // 소켓 연결 시도
      console.log("new socket start");
      // 현재 소켓 배열에 저장 및 message 이벤트 등록
      this.connectSocket(socket);
    });
  }

  addToPeer(peer: string): void {
    // 상대방이 내 ip에 접속 했을때 소켓을 생성하고 연결
    // 상대 소켓 서버 주소를 받아서 연결 시도
    // 소켓이 연결되면서 socket의 타입이 정해짐
    const socket: WebSocket = new WebSocket(peer);
    socket.on("open", () => {
      // 연결이 성공하면 open 이벤트 실행
      console.log("connect success");
      this.connectSocket(socket, MessageType.addBlock);
    });
  }
}

export default P2P;
// ip 주소 연결하여 data를 받음
