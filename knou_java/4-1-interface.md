# 1. 인터페이스

## 1. 추상 클래스와 추상 메소드

### 추상 메소드

- 메소드 선언에 abstract 키워드를 사용함
- 몸체의 구현이 없이 형식만 존재하는 메소드
    - 반환형, 이름, 인자 선언만 존재함
    - 자식 클래스에 상속될 때 몸체의 구현이 필요함
    - 상반된 의미의 final과 함께 사용할 수 없음

```java
abstract public class Shape {
	...
	abstract public double getArea();
}
```

### 추상 클래스

- 객체를 직접 생성시킬 수 없는 클래스
- 슈퍼 클래스로 사용될 수 있다. 즉. 상속을 통해 다른 클래스에 필드와 메소드를 물려 줄 수는 있지만 직접 객체를 생성시켜 사용할 수는 없다.
- 구체적이지 못한 불완전한 클래스라는 의미
- 추상 메소드를 포함하는 클래스는 반드시 추상 클래스여야 함

```java
<접근 제어자> abstract class <클래스 이름> {
	<필드 선언>;
	<메소드 선언>;
}
```

### 추상 클래스의 사용

- 의미적으로 유사한 클래스를 묶고자 할 때 사용
    - 공통으로 사용할 데이터 필드와 메소드를 정의
- 추상 클래스는 불완전한 클래스
    - 기능적으로 구현하기 어려운 메소드가 존재
- 추상 클래스는 자식 클래스로 상속되어 사용됨
    - 자식 클래스에서 추상 메소드를 구현해야 함
- 그러면 자식 클래스는 객체 생성이 가능
    - 자식 클래스가 추상 메소드를 구현하지 않으면 계속해서 자식 클래스도 추상 클래스로 남음
- 추상 클래스는 일반 클래스와 인터페이스의 중간적 성격을 가짐

## 2. 인터페이스

- 100% 추상적 클래스
- 인터페이스의 이름은 보통 형용사다. (ex. Runnable, Serializable, Comparable)
- 클래스와 마찬가지로 객체들을 추상화된 개념이다.
- 인터페이스는 객체와 외부 세계와의 소통수단으로 사용되는 메소드로만 구성된다.
    - 넓은 의미로 클래스에 정의되는 메소드도 인터페이스라고 할 수 있다.
- 추상 클래스와 마찬가지로 객체를 생성시킬 수 없다.

```java
<접근 제어자> interface <인터페이스 이름> {
	<필드 선언>;
	<메소드 선언>;
}
```

- 접근 제어자는 생략 또는 `public`만 가능하다. `abstract` 표시는 보통 생략한다.
- 데이터 필드는 항상 `public static final`이어야 하며, 표시를 생략할 수 있다.
- 모든 메소드는 추상 메소드이다. 항상 `public abstract`이며 표시는 생략할 수 있다.
    - 단, 몸체가 구현된 default 메소드와 static 메소드도 포함 가능
        - 모든 메소드의 기본 접근 제어자는 public

```java
interface Figure {
	double getArea();
}
```

- 인터페이스를 활용하여 생성된 클래스는 ‘인터페이스를 구현하는 클래스’라고 한다.

## 3. 인터페이스의 구현

- 인터페이스를 상속받을 때는 `implements` 키워드를 사용한다.
- 상속보다는 구현(implementation)이다.
- 의미적으로는 관련이 없으나 기능적으로 유사한 클래스들을 묶을 때 인터페이스를 사용할 수 있다.
    - 예: 대소 비교가 가능한 객체들의 자료형을 묶을 때
- 두 개 이상의 인터페이스를 상속받아 구현하는 클래스를 정의할 수 있다. = 인터페이스의 다중 상속

```java
interface Movable {
	void add(double dx, double dy);
	void sub(double dx, double dy);
}

interface Scalable {
	void mul(double s);
	void div(double s);
}

class Point implements Movable, Scalable {
	double x, y;
	public void add(double dx, double dy) { x += dx; y += dy; }
	public void sub(double dx, double dy) { x -= dx; y -= dy; }
	public void mul(double s) { x *= s; y *= s; }
	public void div(double s) { x /= s; y /= s; }
}
```

## 4. 인터페이스의 상속

- 인터페이스 끼리 서로 상속하거나 상속 받을 수 있다.

```java
interface SuperInterface {
	public void func1();
	public void func2();
}
interface SubInterface extends SuperInterface {
	public void func3();
}
```

## 5. 디폴트 메소드

```java
interface Movable {
	void add(double dx, double dy);
	void sub(double dx, double dy);
	default double change_sign(double v) { return v * (-1.0); }
}
class Point implements Movable {
	double x, y;
	public void add(double dx, double dy) { x += dx; y += dy; }
	public void sub(double dx, double dy) { x -= dx; y -= dy; }
}
public class DefaultTest {
	public static void main(String args[]) {
		Point p = new Point();
		p.x = 10.5;
		p.y = 11.6;
		System.out.println(p.change_sign(p.x));
	}
}
```

- 인터페이스에서 선언하는 메소드에 기본 구현을 넣을 수 있다.
- 자식 클래스에서 상속받을 때, 디폴트 메소드를 그대로 사용하거나 몸체를 다시 정의해 줄 수 있다.
- 인터페이스에 나열된 기능을 확장할 때, 기존 코드의 수정을 피하기 위함이다.
    - 단순히 추상 메소드가 추가된다면, 이전 인터페이스를 구현한 클래스를 수정해야 한다.

```java
interface DoIt {
	void doSomething();
	int doSomethingElse(String s);
	// 아래를 새로 추가한다면?
	default boolean didItWork(int i, String s) { ... }
}
```

## 6. 인터페이스를 자료형으로 사용하기

- 인터페이스가 필요한 상황은 하나의 인터페이스를 여러 개의 클래스에서 구현할 필요가 있을 때이다.
- 클래스에 구현된 인터페이스는 그 클래스의 객체 변수를 선언할 때 자료형으로 사용할 수 있다.
- 인터페이스를 자료형으로 사용하면 클래스에서 추가된 메소드는 호출할 수 없다.

```java
interface I { ... }
class C implements I { ... }

I i = new C();
```

## 7. 객체 변수의 선언

- 선언된 클래스나 인터페이스는 변수를 선언할 때 변수의 자료형으로 사용할 수 있다.
- 변수가 객체의 참조값을 가지는, 객체를 가리키는 객체 변수이다.
- 클래스와 인터페이스는 사용자가 만드는 새로운 자료형이라 할 수 있다.
- 따라서 클래스와 인터페이스는 참조형으로 분류된다.

## 8. 인터페이스와 클래스의 형변환

- 인터페이스와 클래스는 ‘사용자 정의 자료형’이므로 기본 자료형에 적용되는 것과 유사한 형변환을 적용할 수 있다.

### 인터페이스형의 변환

- 두 개의 클래스가 상속 관계에 있는 경우 서브 클래스형의 객체는 슈퍼 클래스형으로 선언된 변수에 대입될 수 있고, 서브 클래스형이 슈퍼 클래스형으로 형변환된다.
- 반대 방향의 형변환은 불가하다.
- 슈퍼 클래스형 변수에 대입하려면 먼저 서브 클래스형의 변수에 객체가 대입되어 있어야 한다.
- 슈퍼 클래스형 변수에 대입되면, 슈퍼 클래스에 정의된 메소드만 사용할 수 있다.
- 슈퍼 클래스와 서브 클래스 모두 정의한 메소드가 있다면, 슈퍼 클래스형 변수에 대입하더라도 서브 클래스에 정의된 메소드를 호출한다. (동적 바인딩)
    - = 상위 유형의 변수가 가리키는 객체의 실제 유형에 따라 수행되는 메소드가 결정됨

```java
class Electronics {
	public int getVoltage() { ... }
}
class TV extends Electronics {
	public void getSize() { ... }
	public void getVoltage() { ... }
}

public class Test {
	public static void main(String args[]) {
		Electronics elec;
		TV tv = new TV();
		elec = tv;

		elec.getSize(); // 컴파일 오류
		tv.getSize(); // 문제 없음

		elec.getVoltage(); // TV 클래스의 getVoltage 호출 (메소드의 동적 바인딩)
	}
}
```

### 인터페이스형의 변환

- 클래스형의 변환과 마찬가지로 인터페이스형의 변환도 가능하다.
