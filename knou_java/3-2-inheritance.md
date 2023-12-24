# 2. 상속

### 합성

- 기존 클래스를 새로운 클래스에서 데이터 필드의 자료형으로 사용
- has-a 관계
```java
class Line {
  Point begin, end;
  …
}
```

### 상속

- 기존 클래스를 사용하여 새로운 클래스를 정의
- 코드의 중복 작성을 줄이고 프로그램의 확장성이 좋아짐
- 상속은 기존 클래스를 확장 or 특화하는 것
- 자식 is-a 부모의 관계

- 상속을 주는 클래스 - 슈퍼 클래스(부모, 상위 또는 기반 클래스)
- 상속을 받는 클래스 - 서브 클래스(자식, 하위 또는 파생 클래스)

- 클래스의 상속은 단일 상속만 허용
    - 인터페이스 상속의 경우는 다중 상속 가능

## 1. 접근 제어자에 따른 필드와 메소드의 상속

- 원칙적으로 슈퍼 클래스의 모든 필드와 메소드를 상속받지만, 접근 제어자에 따라 사용에 제한이 있을 수 있다.
- private
- protected
    - 필드나 메소드의 선언을 포함하고 있는 클래스 내부
    - 그 클래스와 같은 패키지(같은 소스 파일에서 정의된 클래스)의 내부
    - 서브 클래스의 내부
        - 접근 제어자가 생략된 경우, 서브 클래스의 내부는 참조하지 못한다는 차이가 있다.

## 2. 메소드 오버라이딩

- 메소드의 이름, 인자의 개수와 자료형, 반환형이 같은 메소드를 정의
- 반환형은 서브 타입도 가능함
    - double 형인 경우 int로 변경 가능
- 접근 제어자의 가시성(접근 범위)은 같거나 커져야 함
    - protected인 경우 protected 또는 public
    - public인 경우 public만 가능

```java
class Shape {
	public double getArea(double h, double w) {
		return h * w;
	}
}

class Triangle extends Shape {
	public double getArea(double h, double w) { // 오버라이딩
		return h * w * 0.5;
	}
}

public class OverridingTest {
	public static void main(String args[]) {
		Triangle t = new Triangle();
		System.out.println(t.getArea(3.0, 4.0)); // 오버라이딩된 getArea()를 사용한다.
	}
}
```

## 3. this와 super

- this는 현재 객체를 가리키고, super는 직계 상위의 슈퍼 클래스를 가리킨다.
- static 메소드는 객체와 무관하게 실행되므로 this와 super를 사용할 수 없다.
- 슈퍼 클래스와 서브 클래스에서 각각 정의된 같은 이름의 필드를 분리하여 참조하는 것이 가능하다.

```java
class CSuper {
	public double x;
}
class CSub extends CSuper {
	public double x;
	public CSub(double new_x) {
		this.x = new_x;
		super.x = new_x * 10;
	}
}
```

- `this()`와 `super()`와 같은 메소드 형식으로 생성자 몸체에서 사용하면 각각 현재 클래스의 다른 생성자나 슈퍼 클래스의 생성자를 호출할 수 있다.
    - 생성자에서만 호출할 수 있으며, 생성자의 맨 앞에 위치해야 한다.

```java
class CSuper {
	public double x;
	public CSuper(double new_x) {
		this.x = new_x * 10;
	}
}
class CSub extends CSuper {
	public double x;
	public CSub(double new_x) {
		super(new_x);
		x = new_x;
	}
}
```

- `this()`는 여러 개의 생성자 중에서 다른 생성자를 이용하여 초기화 작업을 할 때 사용한다.

```java
class MyClass {
	double x = 10.0;
	public MyClass() { x = 20.0; }
	public MyClass(double new_x) {
		this();
		x = x + new_x;
	}
}
```

## 4. 상속과 생성자

- 생성자는 객체를 생성할 때 자동으로 호출되는 메소드이므로 상속 관계에 있는 경우 주의 깊게 사용해야한다.
- 슈퍼 클래스의 매개변수를 가지는 생성자를 서브 클래스에서 명시적으로 호출하지 않으면, 매개변수가 없는 기본 생성자가 자식 객체 생성 시 호출된다.

```java
class CSuper {
	public CSuper() { System.out.println("super non-argu"); }
	public CSuper(int a) { System.out.println("super argu"); }
}
class CSub extends CSuper {
	public CSub() { System.out.println("sub non-argu"); }
	public CSub(int a) { System.out.println("sub argu"); }
}
public class ConstructorTest {
	public static void main(String args[]) {
		CSub sub1 = new CSub();
		CSub sub2 = new CSub(10);
	}
}

// super non-argu
// sub non-argu
// super non-argu
// sub argu
```

- 생성자가 명시되어 있지 않으면 컴파일러가 기본 생성자를 삽입한다.
- 상속을 받지 않는 클래스에 대해 `extends Object` 구문을 자동으로 넣어준다.

```java
// 실제 작성한 코드 
// class MyClass { }

// 컴파일러가 코드를 삽입한 결과
class MyClass extends Object {
	public MyClass() { super(); } 
}

public class ConstructorTest {
	public static void main(String args[]) {
		MyClass mc = new Myclass();
	}
}
```

- 슈퍼 클래스에 매개변수가 없는 기본 생성자 선언 없이, 생성자가 하나 이상 정의되어 있으면 컴파일로가 추가로 기본 생성자를 넣지 않는다.
- 따라서, 다음 코드는 컴파일 오류가 발생한다.

```java
class CSuper {
	public CSuper(int a) { System.out.println("super argu"); }
}
class CSub extends CSuper {
	public CSub(int a) { System.out.println("sub argu"); }
}
public class ConstructorTest {
	public static void main(String args[]) {
		CSub sub = new CSub(10);
	}
}
```

```diff
/tmp/compilejava-CljIeh/ConstructorTest.java:5: error: constructor CSuper in class CSuper cannot be applied to given types;
public CSub(int a) { System.out.println("sub argu"); }
                   ^
  required: int
  found:    no arguments
  reason: actual and formal argument lists differ in length
1 error
```
