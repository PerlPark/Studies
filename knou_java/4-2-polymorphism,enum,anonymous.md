# 2. 다형성

- 하나의 객체가 다양한 형상, 즉 다양한 기능을 갖게 된다는 뜻
- 서브 클래스에서 메소드가 오버라이딩될 수 있고 상속 관계에 있는 클래스 사이에서 서브 클래스 유형이 슈퍼 클래스 유형으로 형변환이 가능하다는 점에서 파생

## 1. 클래스로 다형성 구현하기

```java
class A {
	public void func() { System.out.println("a"); }
}
class B extends A {
	public void func() { System.out.println("b"); }
}
class C extends B {
	public void func() { System.out.println("c"); }
}

public class PolymorphTest {
	public static void main(String args[]) {
		A a = new B();
		a.func();
		a = new C();
		a.func();
	}
}
```

- `a.func()`의 실행결과는 변수 a에 실제로 어떤 클래스의 객체가 대입되었는지에 따라 달라진다.
- 하위 클래스에서 상위 클래스로의 형 변환 = **업캐스팅**

## 2. 인터페이스로 다형성 구현하기

```java
interface Computer {
	public void calculate(String order);
}
class PersonalComputer implements Computer {
	public void calculate(String order) {
		System.out.println("PersonalComputer:" + order);
	}
}
class Workstation implements Computer {
	public void calculate(String order) {
		System.out.println("Workstation:" + order);
	}
}
```

- 클래스와 마찬가지로 어떤 클래스의 객체가 대입되었는지에 따라 출력이 달라진다.

## 3. 인터페이스의 구현 vs 클래스의 상속

- 클래스를 정의하는 방법은 다양하다. 단독으로 정의할 수도 있고, 다른 클래스를 상속받을 수도 있고, 인터페이스를 구현할 수도 있다. 두 가지를 섞어 인터페이스도 구현하면서 다른 클래스를 상속받는 서브 클래슬 정의할 수도 있다.
- 장단점이 있기 때문에 상황에 따라 적절한 방식으로 클래스를 정의해야 한다.

```java
interface Calculator {
	public void caclculate(String order);
}
class Computer {
	int nMemoryCapacity;
	int nHDDCapacity;
	boolean qPowered = false;
	void powerOn() { qPowered = true; }
	void powerOff() { qPowered = false; }
}

class PersonalComputer extends Computer implements Cacluator {
	public void claculate(String order) {
		System.out.println("PersonalComputer:" + order);
	}
}
```

## 4. 다형성의 활용

### 다형성의 활용

```java
class Employee {
	int nSalary;
	String szDept = null;
	public void doJob() {
		System.out.println("Do something");
	}
}
class Sales extends Employee {
	public Sales() { szDept = "Sales Dept"; }
	public void doJob() {
		System.out.println("Do sales");
	}
}
class Development extends Employee {
	public Development() { szDept = "Development Dept"; }
	public void doJob() {
		System.out.println("Do development");
	}
}

public class Company1 {
	public static void main(String args[]) {
		Employee emp1, emp2;
		emp1 = new Sales();
		emp2 = new Development();
		emp1.doJob();
		emp2.doJob();
	}
}
```

### 다형성의 비활용

```java
class Employee {
	int nSalary;
	String szDept = null;
	public Employee(String szNewDept) { szDept = szNewDept; }
	public void doJob() {
		if (szDept.equals("Sales Dept")) 
			System.out.println("Do sales");
		else if (szDept.equals("Development Dept")) 
			System.out.println("Do development");
		}
	}
}

public class Company2 {
	public static void main(String args[]) {
		Employee emp1 = new Employee("Sales Dept");
		Employee emp1 = new Employee("Development Dept");
		emp1.doJob();
		emp2.doJob(); 
	}
}
```

- Employee 클래스에서 부서에 따른 if 문을 사용했기 때문에 새로운 부서가 생길 때마다 Employee 클래스를 계속 수정해야 한다.
- 따라서 다형성을 활용하는 것이 코드의 모듈화나 코드의 유지보수성에서 우수하다.

# 3. 열거 자료형


## 1. 열거형 선언하기

- 미리 정의된 상수값을 만들기 위한 자료형
- enum을 사용하여 정의
- 열거형으로 선언된 변수에는 미리 지정된 값만 대입 가능
- static 메소드인 `values()`를 제공한다. 열거형에 지정된 상수값을 배열로 반환한다.

```java
enum Day {
	SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY
}

public class EnumTest1 {
	public static void main(String args[]) {
		Day day = Day.MONDAY;

		for (Day d: Day.values()) {
			System.out.println(d);
		}
	}
}
```

## 2. 생성자 및 메소드 정의하기

- 열거형은 클래스처럼 생성자와 메소드 및 필드를 정의할 수 있다.
- 생성자는 클래스의 생성자와 다르게 접근 제어자를 생략하거나 private이어야 한다.
- 열거형의 생성자는 열거형의 상수값을 설정할 때 자동으로 호출된다.

```java
enum BaseballTeam {
	LG(40, 30),
	SS(30, 40),
	KT(20, 35);

	private final int win;
	private final int lose;

	private BaseballTeam(int win, int lose) {
		this.win = win;
		this.lose = lose;
	}

	public double winsRate() {
		return (win * 100.0) / (win + lose);
	}
}

public class EnumTest2 {
	public static void main(String args[]) {
		BaseballTeam bt = BaseballTeam.LG;
		System.out.println(bt.winsRate());
	}
}
```

- LG가 열거형에 설정되는 상수값이 되고, 40과 30이 순서대로 생성자의 매개변수가 되어 생성자가 호출된다.

# 4. 익명 클래스


- 독립된 클래스 정의문 없이 바로 객체를 생성하는 용도로만 사용되는 클래스를 의미한다.
- 일회성으로 1개의 객체를 생성하기 위한 클래스다.
    - 클래스 정의와 동시에 객체를 생성할 수 있다.
- 슈퍼 클래스를 상속받거나 인터페이스를 구현하도록 익명 클래스를 정의한다.

```java
new 슈퍼클래스() { ... } // 슈퍼클래스의 자식 객체 생성
new 인터페이스() { ... } // 인터페이스를 구현하는 자식 객체 생성
```

- 주의할 점은 익명 클래스의 객체가 대입된 변수를 이용해서 오버라이딩된 메소드, 상속받은 필드나 메소드를 참조할 수는 있지만 익명 클래스에서 새로 정의한 필드나 메소드는 참조할 수 없다.

```java
class CSuper {
	public int a = 10;
	public void method1() { System.out.println("super1"); }
	public void method2() { System.out.println("super2"); }
}

public class AnonymousTest {
	public static void main(String args[]) {
		CSuper sub = new CSuper() {
			public int b = 20;
			public void method1() { System.out.println("sub1"); }
			public void method3() { System.out.println("sub3"); }
		};
		
		sub.method1();
		sub.method2();
		System.out.println(sub.a);
		
		sub.method3();             // 컴파일 오류
		System.out.println(sub.b); // 컴파일 오류
	}
}
```
