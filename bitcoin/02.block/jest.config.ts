import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  // 모듈 파일 확장자 설정 : typescript와 javascript 둘다 테스트파일로 지정
  moduleFileExtensions: ["ts", "js"],

  // 테스트파일 매치 설정 : 파일의 이름의 패턴을 설정
  // 루트 경로에서 모든 폴더에 모든 파일 이름의 패턴
  testMatch: ["<rootDir>/**/*.test.(js|ts)"],

  // 모듈의 이름에 대한 별칭 설정 : @core
  //
  moduleNameMapper: {
    "^@core/(.*)$": "<rootDir>/src/core/$1",
  },
  // 테스트 환경 설정 : node 환경에서 실행
  testEnvironment: "node",
  // 자세한 로그 출력 설정 : 터미널에 로그들을 더 자세히 출력
  verbose: true,
  // 프리셋 설정 : typescript에서 사용할 jest / ts-jest 설정
  preset: "ts-jest",
};

export default config;
