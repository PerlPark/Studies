# 1. 패키지


- 관련이 있는 클래스와 인터페이스의 묶음 (클래스와 인터페이스는 패키지의 멤버로 존재)
- 계층 구조의 클래스 라이브러리
- 패키지의 용도: 쉽게 찾아 사용하기 위해, 이름 충돌을 피하기 위해, 접근 제어를 위해

## 1. 시스템 패키지

- JDK가 제공하는 라이브러리
- 가장 기본이 되는 최상위 시스템 패키지는 java임 (대부분의 시스템 패키지는 java.으로 시작됨)
- Java 언어에서 가장 기본적 클래스는 java.lang 패키지에 존재

## 2. 사용자 정의 패키지

```java
package 패키지이름;
// 1개 이상의 클래스나 인터페이스 정의가 나옴
```

```java
package com.vehivle;
public class Car {
	String szType = "승용차";
}
```

- 컴파일 결과로 Car.class가 만들어짐
- Car.class는 com.vehicle 패키지에 저장됨
- 프로젝트를 생성하면 src, bin 폴더가 생성되는데, class 파일은 bin 폴더에 저장이 됨

## 3. 패키지와 클래스의 사용

- 다른 패키지에 존재하는 public 클래스를 사용하려면 기본적으로 패키지 경로를 포함한 완전한 클래스 이름을 사용해야 함
    - 프로그램에서 자주 사용한다면 import 구문을 사용하는 게 좋음

```java
graphics.Rectagle myRect = new graphics.Rectangle();

java.util.Scanner s = new java.util.Scanner(System.in);
```

```java
import 패키지이름.클래스이름;
import 패키지이름.*;
```

- 1개의 클래스 또는 패키지에 있는 클래스 전체를 import 할 수 있음
- import 구문은 소스코드 맨 앞에 위치하지만 package 구문이 있다면 그 다음에 위치함
- Java 프로그램에서 `import java.lang.*;` 구문이 자동 포함됨

### 클래스 찾기

- 컴파일러는 환경변수 CLASSPATH에 지정된 경로에서 사용자 클래스를 찾을 수 있음
- CLASSPATH의 경로는 jar 파일을 포함할 수 있음
    - `CLASSPATH=경로1;경로2;a.jar`
    - 프로그램에서 `graphics.Circle` 클래스를 사용하면 위 경로 1, 2와 a.jar 에서 `/graphics/Circle.class`를 찾음
    

## 4. 패키지와 클래스 접근 제어자

```java
package com.vehicle;
class Car { ... } // 접근 제어자 생략 - 패키지 접근 수준
```

```java
package com.vehicle;
**public** class Bus extends Car { ... }
```

```java
import com.vehicle.*;
 
class MyBus extends Bus { }

public class PackageTest {
	public static void main(String args[]) {
		Bus bus = new Bus();
		Car car = new Car(); // 오류
	}
}
```

- Car 클래스를 사용하는 부분에서 컴파일 오류가 발생한다. Car 클래스는 `com.vehicle` 패키지에 포함된 클래스이긴 하지만, 접근 제어자가 생략되어 사용 범위가 동일 패키지 내로 한정된다.
- PackageTest 클래스는 `com.vehicle` 패키지를 사용하는 것이지, 포함되는 것이 아니기 때문에 오류가 발생할 수 밖에 없다.

# 2. 예외와 예외처리


## 1. 예외와 에러

- 에러(Error)는 심각한 오류로 더 이상의 실행이 불가함
- 예외(Exception)는 경미한 오류로 복구가 가능함
    - 예외는 정상적 실행 흐름을 방해하는 예외적 사건

### 예외 발생과 처리

- 메소드를 수행할 때 예외가 발생하면 예외 객체를 만들어 던짐
- 예외처리 코드(exception handler)가 없으면, 오류 메시지가 출력되면서 프로그램이 즉시 종료됨
- 예외처리 코드가 있으면, 예외 객체를 잡아 처리한 뒤, 프로그램은 계속 수행됨
- 예외 객체는 Exception 클래스(또는 하위 클래스)로 표현되며 예외 발생 정보를 가지고 있음

## 2. 예외 클래스의 계층 구조

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/9f086c46-78fa-4d31-805c-af5a06d5abad/74406593-b2b7-4342-8ed9-c9d1d8bc7755/Untitled.png)

## 3. 예외처리(Excpetion handling)

- 예외가 발생했을 때 이 상황을 바로잡아 계속 수행하도록 하는 것
- 예외 발생 시, Exception 객체를 생성하고 throw 함
- throw된 예외 객치를 예외처리 코드가 catch하여 예외를 처리함

### 예외의 종류

- checked Exception이 발생할 수 있는 경우, 반드시 명시적인 예외처리가 필요함
    - 코드가 없으면 컴파일 오류
- RuntimeException의 경우, 예외처리를 안 해도 됨 (강제성이 없음)
    - 프로그램을 정확하게 작성하지 않은 경우 발생됨
    - ArithmenticException, NullpointerException, IndexOutOfBoundsException 등

## 4. 예외처리 방법

### 직접 처리

- 예외가 발생한 곳에서 예외 객체를 잡아서 처리하는 것
- try-catch 구문 또는 try-catch-finally 구문을 사용하여 예외를 처리함
- 일반 코드와 예외 처리가 분리되어 가독성이 좋아짐

### 간접 처리(예외의 전파)

- 예외 발생 가능성이 있는 메소드의 선언에서 괄호 다음에 `throws 예외이름`을 사용
- 그 메소드를 호출한 메소드에게 에외처리를 전달 또는 위임하는 것

## 5. try-catch-finally 구문

- 예외 객체를 throw하는 문장 또는 예외 발생 가능성이 있는 메소드의 호출 부분을 try 블록에 둠
- catch 블록은 1개의 예외 유형 인자를 가지는 메소드와 유사
    - 처리해야 하는 예외 유형이 여럿이면 catch 블록도 여럿이 됨
- finally 블록은 생략 가능

## 6. try-catch-finally 구문의 실행

- 예외가 발생하면 try 블록은 즉시 종료됨
- catch 블록이 여럿이면, 가장 적합한 하나만 실행됨 (발생된 예외 자료형과 일치하거나 상위 유형)
- 예외가 발생하지 않으면 catch 블록은 실행되지 않음
- finally 블록은 예외 발생과 무관하게 try 블록이 종료된 후 항상 실행됨
    - 할당 받아 사용했던 리소스를 원상복구하기 위해 finally 블록을 주로 사용함
    - 예: try 블록에서 open 했던 파일을 close 하는 코드를 finally에 둠

## 7. 예외의 직접 처리 예

```java
public class A {
	public void problem() throws RuntimeException {
		throw new RuntimeException();
	}
	public void tryThis() {
		try {
			problem();
			System.out.print("1"); // 출력하지 않음
		} catch (RuntimeException x) {
			System.out.print("2"); // 예외가 일치하므로 해당 구문 실행됨
		} catch (Exception x) {
			System.out.print("3");
		} finally {
			System.out.print("4"); // catch를 통해 예외처리를 했으므로 출력됨
		}
		System.out.print("5"); // 출력됨
	}
	public static void main(String[] args) {
		A a = new A();
		a.tryThis();
	}
}
```

## 8. 예외의 간접 처리

- 예외를 발생시킬 수 있는 메소드를 호출하는 쪽에 예외 처리를 위임하는 것(에외의 전파)
- 메소드 선언에서 발생시킬 수 있는 예외유형을 표시함

```java
public char getInput() throws IOException {
	nInput = System.in.read(); // 예외 발생 가능
}
```

- 메소드 선언에서 throws 절이 표시된 메소드를 호출하는 메소드는 예외 처리를 해야 함

```java
try {
	c = obj.getInput();
} catch(IOException ex) {
	...
}
```

### 예외를 발생시킬 수 있는 메소드

- public FileInputStream(String name) throws FileNotFoundException
    - FileInputStream 클래스의 생성자
- public int read() throws IOException
    - InputStream(또는 Reader) 클래스의 메소드
- 위와 같은 메소드를 호출할 때는 반드시 예외 처리가 필요함

## 9. 사용자 정의 예외

- 사용자가 직접 예외 클래스를 작성할 수 있음
- 일반적으로 Exception 클래스를 상속받음
- throw 구문을 사용하여, 필요할 때 예외 객체를 던질 수 있음

```java
class MyException extends Exception {
	public MyException() { super(); }
	public String toString() { return "MyException"; }
}

class MyExceptionTest {
	public void testFunc(int x) throws MyException {
		if (x > 10) throw new MyException();
	}
}
```
