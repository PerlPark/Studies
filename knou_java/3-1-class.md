# 1. 클래스

## 1. 클래스 정의하기

- Java의 클래스는 상태 정보를 저장하기 위한 데이터 필드와 행위를 나타내는 멤버 메소드로 구성된다.
    - 데이터 필드는 멤버 필드, 멤버 변수, 인스턴스 변수, 간단히 필드라고도 부른다.

```java
<접근 제어자> class <클래스 이름> {
	<필드 선언>;
	<메소드 선언>;
}
```

- 접근 제어자는 생략하거나 `public, private, protected, abstract, final` 등이 올 수 있다.
    - 접근 제어자의 생략
        - 해당 클래스가 존재하는 패키지 내부에서 사용이 가능하다.
        - 정의된 클래스와 같은 패키지에 있는 다른 클래스에서 사용할 수 있다.
        - 하지만 다른 패키지에 존재하는 클래스에서는 사용이 불가능하다.
        - 사용이라 함은 변수 선언이나 상속을 위해 클래스 이름을 사용하는 것을 말한다.
    - `public`
        - 어디서나, 모든 클래스에서 사용할 수 있다.
        - 하나의 소스 파일에는 하나의 public 클래스만 존재할 수 있고, 소스 파일의 이름이 그 안에 들어있는 public 클래스의 이름과 일치해야 한다.
    - `private`
        - 중첩 클래스에서 내부 클래스를 정의할 때만 사용할 수 있다.
        - private로 정의되는 내부 클래스는 그것을 포함하고 있는 클래스에서만 사용이 가능하다.
    - `protected`
        - 중첩 클래스에서 내부 클래스를 정의할 때만 사용할 수 있다.
        - 내부 클래스를 포함하고 있는 클래스, 같은 패키지, 내부 클래스를 포함하고 있는 클래스를 상속받는 서브(자식) 클래스에서 사용이 가능하다.

```java
public class Electronics {
	private int nVoltage = 0;
	
	nVoltage = 1; // 오류

	{ nVoltage = 1; } // 오류 아님 (초기화 블록)
}
```

- 클래스 정의 블록에는 필드나 메소드 정의 외에 다른 명령문을 넣을 수 없다.
- 필드의 지정문을 메소드 외부에 넣을 수 없다. 하지만 지정문을 중괄호 블록 안에 두면 클래스 내부에 들어갈 수 있다.
- 이러한 블록을 초기화 블록이라고 하고, 초기화 블록에는 연산식이나 제어문도 들어갈 수 있다.

## 2. 필드와 메소드

### 필드

- 클래스를 정의할 때와 마찬가지로 필드를 정의할 때에도 필드의 접근 범위를 지정하는 접근 제어자를 사용할 수 있다.
- 클래스의 필드는 외부로부터 직접적인 접근을 불허하는 것이 객체지향 프로그래밍 개념에 부합되기 때문에 필드를 정의할 때 접근 제어자로 private를 사용하는 것이 좋다.
    - 클래스 외부에서도 접근해양하는 필드가 있다면 메소드를 통해 제어하는 것이 바람직하다.

| Alpha 클래스에서 <br/> 멤버의 선언 | Alpha | Beta(같은 패키지) | AlphaSub(자식) | Gamma(다른 패키지) |
|--------------------------|-------|--------------|--------------|---------------|
| public                   | 사용 가능 | 사용 가능        | 사용 가능        | 사용 가능         |
| protected                | 사용 가능 | 사용 가능        | 사용 가능        |               |
| 생략                       | 사용 가능 | 사용 가능        |              |               |
| private                  | 사용 가능 |              |              |               |

### 메소드

- 메소드는 외부에서 클래스에 정의된 필드나 다른 메소드로 접근하고 사용하게 하는 창구가 된다.
- 따라서 메소드를 인터페이스(interface)라고도 한다. 인터페이스란 메소드가 클래스와 클래스 외부 사이의 소통수단이 된다는 의미다.
- 메소드도 접근 제어자를 붙일 수 있다.

## 3. 클래스의 사용

- 클래스 형의 변수를 선언

  `Electronics b;`

- 클래스형 변수에 해당 클래스의 구체적인 실체인 객체를 넣기 위해서는 객체 생성을 해야한다.

  `<클래스 이름> <변수 이름> = new <클래스 이름>();`

  `Electronics b = new Electronics();`


## 4. 생성자

- 객체를 생성할 때 자동으로 호출되는 메소드를 생성자(constructor)라고 한다.
- 일반적으로 생성자는 객체가 사용할 변수나 필드 등을 초기화하거나, 객체의 사용을 위해 필요한 초기화 작업을 수행한다.
- 생성자는 일반 메소드처럼 정의하되 다음과 같은 특징을 갖는다.
    - 생성자는 메소드이지만 반환 자료형(또는 리턴 타입)을 지정할 수 없다.
    - 생성자의 이름은 클래스의 이름과 같아야 한다.
    - 생성자는 사용자가 임의로 호출할 수 없으며, 객체가 생성될 때 자동으로 호출된다.

```java
class TV {
	private int nSize = 0;
	public TV(int nNewSize) {
		nSize = nNewSize;
	}
}

public class Test {
	public static void main(String args[]) {
		TV tv = new TV(10); // 이때 상성자가 호출되고 객체가 초기화된다.
	}
}
```

- 클래스에 단 하나의 생성자도 정의되어 있지 않으면 컴파일러가 아무런 매개변수(인자)도 갖지 않고 아무 기능도 수행하지 않는 생성자를 자동으로 만들어준다. 이런 생성자를 기본 생성자(default constructor)라고 한다.
- 생성자도 메소드이므로 접근 제어자를 지정할 수 있는데, 특별한 경우가 아니면 생성자에는 public을 사용한다. private 생성자는 외부에서 호출이 불가능하기 때문에 특별한 경우에만 사용한다.
- 하나의 클래스에는 이름은 같지만 매개변수가 서로 다른 여러 개의 생성자가 정의될 수 있다.
  (생성자 오버로딩)
- 여러 개의 생성자가 있을 경우 객체를 생성할 때 그들 중 오직 하나만 호출된다.
- 어떤 생성자가 호출될 것인지는 객체 생성 시 사용된 생성자의 매개변수에 의해 결정된다.
- 즉, 매개변수의 자료형이나 개수가 정확하게 일치하는 생성자가 호출된다.

```java
class TV {
	private int nSize = 0;
	public TV(int nNewSize) { nSize = nNewSize;	}
	public TV() { nSize = 20; }
}

public class Test {
	public static void main(String args[]) {
		TV tv1 = new TV(10); // 첫 번째 생성자가 호출된다.
		TV tv2 = new TV(); // 두 번째 생성자가 호출된다.
	}
}
```

## 5. static 필드와 static 메소드

### static 필드

- non-static 필드는 객체가 배타적으로 소유할 독립적인 필드이다.
    - 클래스의 객체가 생성될 때마다 서로 다른 필드 변수가 된다.
    - 이러한 필드 변수를 인스턴스 변수라고 한다.
- 반면에 stitc 필드는 여러 개의 객체를 생성하더라도 해당 클래스에서 하나만 존재하며, 여러 객체가 공유하는 필드 변수가 된다.
    - 이러한 필드 변수를 클래스 변수라고 한다.
    - 객체가 배타적으로 소유하지 않기 때문에, 객체를 생성하지 않았더라도 클래스 이름을 통해 사용할 수 있다.

    ```java
    class MyClass {
    	public static int nStaticField = 0;
    }
    
    public class StaticTest2 {
    	public static void main(String args[]) {
    		MyClass.nStaticField = 10;
    		System.out.println(MyClass.nStaticField);
    	}
    }
    ```

- Java 언어는 어디에서나 사용할 수 있는 전역 변수를 정의할 수 없기 때문에 여러 소스코드에서 상수처럼 공통되는 값으로 사용되어야 하는 값들이 있다면 이런 값을 클래스에서 static 필드로 정의해 놓고 활용할 수 있다.
- static 필드의 초기화를 생성자에서 하면, 객체가 생성될 때마다 값이 초기화된다. 필드의 값을 조작한 뒤 유지하고 싶다면 필드 선언문에서 초기화를 해야한다.
- static 필드는 일반 필드와는 달리 접근 제어자로 public을 사용하는 것이 좋다. 왜냐하면 여러 객체 사이에서 공유하기 위한 용도로 사용하기 때문에 어디서든 참조할 수 있도록 하는 것이 바람직하기 때문이다.

### static 메소드

- 필드와 마찬가지로 클래스 메소드(static), 인스턴스 메소드(non-static)로 나뉜다.
- static 메소드는 객체와 무관하게 클래스 이름만으로 호출할 수 있으므로 static 메소드 안에서 non-static 필드를 참조하거나 non-static 메소드를 호출할 수 없다.
- 따라서 static 메소드는 static 필드를 제어하는 기능을 담당하도록 구현하는 것이 일반적이다.
- static 메소드는 객체를 통해 호출할 수 있지만 객체와 무관하게 `<클래스 이름>.<메소드 이름>`과 같은 방식으로 호출하는 것이 좋다.

## 6. final 필드와 final 메소드

### final 필드

- 값을 바꿀 수 없는 상수 필드가 된다. 따라서 선언 후에 반드시 초기화가 한 번 이루어져야 한다.
- 초기화는 선언문, 초기화 블록, 생성자 어디에서든 가능하다.

### final 메소드

- 자식 클래스로 상속은 가능하나 재정의(오버라이딩)할 수 없다.
- 참고로 클래스를 정의할 때 final 키워드를 넣으면 해당 클래스는 슈퍼 클래스가 될 수 없다.
    - 즉, 상속받는 서브 클래스를 정의할 수 없다.

## 7. 클래스를 이용하여 보다 객체지향적인 프로그램 만들기

### 캡슐화

- 클래스의 외부에서 클래스의 필드를 직접적으로 제어할 수 없도록 필드를 private로 정의하고 그 필드에 대한 제어가 필요한 경우에는 public 메소드를 정의하여 메소드를 통해 필드를 제어하도록 한다.
- 객체를 표현하는 중요한 정보인 필드를 외부에 노출되지 않게 보호하면서도 객체와 외부 세계를 연결하는 인터페이스(메소드)를 통해 참조나 제어를 하게하는 것이다. (필드에 간접적으로 접근)
- 캡슐화의 또 다른 장점은 재사용성을 높인다는 것이다.

```java
class Circle {
	private int r;
	public Circle(int a) {
		r = a;
	}
	public double getArea() {
		return r * r * 3.141592; // Circle 클래스의 보안을 철저히 한다면 getArea의 공식을 숨길 수 있다.
	}
}

class Cylinder {
	private Circle c; // 밑면
	private int h;    // 높이
	public Cylinder(Circle a, int b) {
		c = a;
		h = b;
	}
	public double getVolume() {
		return c.getArea() * h;
	}
}

public class CylinderVolume {
	public static void main(String args[]) {
		Circle c = new Circle(7);
		int h = 8;

		Cylinder cy = new Cylinder(c, h);
		System.out.println(cy.getVolume());
	}
}
```

## 8. 필드의 초기화

- 필드 선언문에서의 초기화
- 생성자를 이용한 필드 초기화
- 초기화 블록을 이용한 필드 초기화
    - 일반 초기화 블록은 non-static 필드의 값을 초기화시킬 수 있다.
    - static 초기화 블록에서는 static 필드의 값을 초기화시킬 수 있다. (초기화 블록에 static 키워드 사용)

- 초기화하는 방법들이 여러 개 동시에 사용될 때 실행 순서는 다음과 같다.
    1. static 필드 선언문의 초기화 구문 실행
    2. static 초기화 블록 실행
    3. non-static 필드 선언문의 초기화 구문 실행
    4. non-static 초기화 블록 실행
    5. 생성자 실행

- non-static 필드는 생성자를 통해서 초기화하는 것이 바람직하고, static 필드는 필드 선언문이나 초기화 블록을 이용해서 초기화 하는 것이 바람직하다.

## 9. 메소드의 오버로딩

### 서명

- 메소드의 이름과 매개변수 목록을 메소드의 서명(signature)이라고 한다.
- 반환형이나 접근 제어자는 포함되지 않는다.
- 예를 들어 메소드 이름과 매개변수 목록은 같지만 반환 자료형이 다른 경우는 서명이 일치한다.
- Java 언어에서는 한 클래스에 서명이 같은 두 개의 메소드가 함께 존재할 수 없다.

### 오버로딩

- 한 클래스에서 메소드 이름은 같지만 매개변수 목록이 다른 메소드가 두 개 이상 정의되는 것을 말한다.
- 서로 다른 자료형의 매개변수에 대해 비슷한 기능의 메소드를 같은 이름으로 정의하여 프로그램의 가독성을 높일 수 있다.

```java
class MyClass {
	public int add(int a, int b) { return a+b; }
	public double add(double a, double b) { return a+b; }
}

public class OverloadTest {
	public static void main(String args[]) {
		MyClass mc = new MyClass();
		System.out.println(mc.add(10, 15));
		System.out.println(mc.add(10.5, 15.3));
		System.out.println(mc.add(10, 10.5)); // 3
}
```

- double형을 int형으로 변환하면 데이터 손실이 발생할 수 있지만 int형은 데이터의 손실없이 double형으로 변환이 가능하다.
- 따라서 3번째 호출은 int형 매개변수를 double형으로 자동 변환하여 두 번째 `add()` 메소드를 호출한다.