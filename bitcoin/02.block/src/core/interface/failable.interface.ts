// 객체 구조 정의
// 연산에 성공했을때와 실패했을때의 반환값 객체 구조 정의

// Result<R>에서 R은 타입을 매개변수로 받겠다는 뜻
// R,E는 특별한 기능을 포함하고 있는 변수가 아닌 단순 매개변수의 이름이지만 개발자들끼리의 규칙같은게 있음
// T : Type의 약자로 제네릭에서 많이 사용되는 표준적인 매개변수 이름
// R : Result나 Return type을 의미
// E : Error나 Exception을 의미
export interface Result<R> {
  isError: false;
  value: R;
}

// 실패했을때 객체 구조 정의
export interface Faillure<E> {
  isError: true;
  value: E;
}

// 반환값 지정
// Failable<R, E> 의 결과값은 Result<R> | Faillure<E> 둘 중에 하나라는 뜻으로
// | 는 "또는" 이라는 의미를 가짐
export type Failable<R, E> = Result<R> | Faillure<E>;
