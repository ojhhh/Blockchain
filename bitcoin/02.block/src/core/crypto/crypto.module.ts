class CryptoModule {
  static hashToBinary(hash: string): string {
    let binary: string = "";
    // 16진수를 2진수로 바꾸는 식
    for (let i = 0; i < hash.length; i += 2) {
      // 16진수는 2자리를 사용하니 2자리씩 문자를 가져옴
      // 예) 1A 3F
      const hexByte = hash.substr(i, 2);
      // 16진수의 바이트를 10진수로 변환
      // parseInt의 두번째 매개변수에 8이면 8진수를 10진수로, 2면 2진수를 10진수로 변환
      const dec = parseInt(hexByte, 16);
      // 10진수를 2진 문자열로 변호나 8자리씩 패딩
      // dec.toString(2) : dec를 2진수 형태의 문자열로 반환
      // padStart(8, "0") : 변환된 2진수 문자열이 8자리 미만이면 앞에 "0"으로 채워 항상 8자리가 되게 만듬
      const binaryByte = dec.toString(2).padStart(8, "0");
      // 2진 바이트를 2진 문자열에 추가
      binary += binaryByte;
    }
    return binary;
  }
}

export default CryptoModule;
