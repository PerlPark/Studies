# 1. 제네릭


컴파일 오류는 프로그램 코드를 컴파일할 때 컴파일러가 발견하며 원인을 찾아 해결하는 것이 어렵지 않다. 하지만 실행 오류는 원인을 찾거나 해결하기가 상대적으로 매우 어렵다. 따라서 실행 오류를 최소화하기 위한 프로그래밍 작업이 매우 중요하다.

제네릭은 실행 오류를 최소화하고 컴파일할 때 대부분의 오류를 발견하게 하는 프로그래밍 기법이다.

# 2. 제네릭 타입


- 클래스, 인터페이스, 메소드를 정의할 때 자료형을 매개변수화할 수 있음
- 자료형을 한정하여 컴파일 시점에 자료형 검사가 가능
- 캐스트(형변환) 연산자의 사용이 불필요

```java
class ArrayList<E> implements List<E> {
	boolean add(E e) { ... }
	E get(int index) { ... }
	E remove(int index) { ... }
	...
}

...

List list1 = new ArrayList();
list1.add("hello");
String s1 = (String)list1.get(0); // 형변환 필요

List<String> list2 = new ArrayList<String>();
list2.add("hello");
String s2 = list2.get(0); // 형변환이 필요 없음
```

- 각 괄호 <> 안에 타입 파라미터를 표시함
- 컴마(,)로 구분하여 여러 개의 타입 파라미터를 지정할 수 있음
- 타입 파라미터의 이름은 관례적으로 E, K, V, N, T… 를 사용함

```java
class Data {
	private Object object;
	public void set(Object object) {
		this.object = object;
	}
	public Object get() { return object; }
}
```

```java
class Data2<T> {
	private T t;

	public void set(T t) { this.t = t; }
	public T get() { return t; }
}
```

- 제네릭 타입을 사용하지 않으면 컴파일 시점에서 오류를 검출하지 못함
- 의미가 명확하면 생성자 호출 시, 괄호만 사용할 수 있음
    - `Data2<String> b3 = new Data2<>();`

```java
public class GenericsTest2 {
	public static void main(String args[]) {
		Data2<String data = new Data2<String>();
		Integer i = new Integer(20);
		data.set(i); // 컴파일 오류
		String s = (String) data.get(); // 제네릭이 아닌 경우 Integer형을 String으로 강제 형변환 하면서 실행 오류가 발생함
	}
}
```

## 3. 제네릭 인터페이스를 구현하는 제네릭 클래스 정의 및 사용하기

```java
interface Pair <K, V> {
	public K getKey();
	public V getValue();
}

class OrderedPair<K, V> implements Pair<K, V> {
	private K key;
	private V value;

	public OrderedPair(K key, V value) {
		this.key = key;
		this.value = value;
	}

	public K getKey() { return key; }
	public V getValue() { return value; } 
}

class Data<T> {
	private T t;
	public Data(T t) { this.t = t; }
	public void set(T t) { this.t = t; }
	public T get() { return t; } 
}
```

- 이미 정의 되어 있는 제네릭 타입을 다른 제네릭 타입의 타입 매개변수를 위해 사용할 수 있음

## 4. 제네릭 타입으로 일반 클래스/인터페이스 정의하기

```java
class MyPair implements Pair<String, Integer> {
	private String key;
	private Integet value;
	public MyPair(String key, Integet value) {
		this.key = key;
		this.value = value;
	}
}
```

## 5. Raw 타입

- 제네릭 타입이지만 일반 타입처럼 사용하는 경우, 제네릭 타입을 지칭하는 용어
- 타입 매개변수 없이 사용되는 제네릭 타입
    - 자료형을 Object로 처리함
    - `Data data = new Data(”hello”);`
    - 이때 Data는 제네릭 타입 Data<T>의 raw 타입

# 3. 제네릭 메소드와 타입 제한


## 1. 제네릭 메소드

- 자료형을 매개변수로 가지는 메소드
- 일반 메소드, static 메소드 모두 제네릭 메소드로 정의 가능
- 타입 매개변수는 매개변수의 자료형, 지역 변수의 자료형, 반환형으로 사용할 수 있음

```java
public static <T> T getLast(T[] a) {
	return a[a.length-1];
}
```

```java
class Util {
	public static <K, V> boolean compare(Pair<K, V> pi, Pair<K, V> p2) {
		return p1.getKey().equals(p2.getKey())&& p1.getValue().equals(p2.getValue());
	}
}

...

public class GenericsTest5 {
	public static void main(String args[]) {
		Pair<Integet, String> p1 = new OrderedPair<>(1, "apple");
		Pair<Integet, String> p2 = new OrderedPair<>(2, "pear");
		boolean same = Util.<Integet, String>compare(p1, p2);
	}
}
```

- 하나의 메소드 정의로 여러 유형의 데이터를 처리할 때 유용함
- 제네릭 메소드를 호출할 때 타입을 명시하지 않아도 인자에 의해 추론이 가능함

## 2. 제네릭의 타입 제한

- 적용 가능한 자료형에 제한을 두는 것
- `<T extends Number>`와 같이 하면 T를 상한으로 정할 수 있음
    - T에 주어지는 자료형은 Number의 서브 클래스여야 함
- 상속 관계가 있어야 상위/하위 자료형의 관계가 존재함
    - Integer나 Double은 Number의 자식 클래스
    - `Data<Number>`와 `Data<Integer>`는 상하위 관계가 없음

```java
class Data<T> { ... }
class FormattedData<T> extends Data<T> {} // 상속 관계

public class GenericTypeConversion1 {
	public static void main(String args[]) {
		Data<Number> data = new Data<Number>();
		data.set(new Integer(10)); // 업캐스팅에 의해 OK
		data.set(new Double(10.1)); // 업캐스팅에 의해 OK
		Data<Number> data1 = new Data<Integer>(); // 컴파일 오류
		Data<Integer> data = new FormattedData<Integer>(); // 상속 관계가 정의되어 있어서 OK
	}
}
```

# 4. 제네릭 타입 사용 시 유의 사항


- 기본 자료형은 타입 매개변수로 지정할 수 없음
    - Data<int> d = new Data<>(); // 오류
- 타입 매개변수로 객체 생성을 할 수 없음
    - class Data<T> { private T t1 = new T(); } // 오류
- 타입 매개변수의 타입으로 static 데이터 필드를 선언할 수 없음
    - class Data<T> { private static T t2; } // 오류
- 제네릭 타입의 배열을 선언할 수 없음
    - Data<Integer>[] arrayOfData; // 오류
    

# 5. 람다식


인터페이스를 구현하는 익명 클래스의 객체 생성 부분을 수식화 한 것

## 1. 람다식 기본 문법

```java
Runnable runnable = new Runnable() {
	public void run() { ... } };
}

// 메소드 매개변수의 괄호, 화살표, 메소드 몸체로 표현
Runnable runnable = () -> { ... };
```

- 구현할 것이 1개의 추상 메소드 뿐 이어야 함
- 익명 구현 클래스의 객체 생성 부분만 람다식으로 표현함
    - 익명 서브 클래스의 객체 생성은 람다식이 될 수 없음
- 람다식의 결과 타입을 타깃 타입이라 함
- 1개의 추상 메소드를 포함하는 인터페이스를 함수적 인터페이스라 함
    - 메소드가 1개 뿐이므로 메소드 이름을 생략할 수 있음
    - 람다식은 이름 없는 메소드 선언과 유사함

## 2.  간소화된 람다식 문법

```java
인터페이스 객체변수 = (매개변수목록) → { 실행문목록 };
```

- 매개변수 목록에서 자료형은 인터페이스(타깃 타입) 정의에서 알 수 있으므로 자료형을 생략하고 변수 이름만 사용 가능
- 매개변수가 1개면 괄호도 생략 가능하며 변수 이름 하나만 남음
- 매개변수를 가지지 않으면 괄호만 남음
- 화살표 사용
- 실행문 목록에서 실행문이 1개이면 중괄호 생략 가능
- 실행문이 return문 뿐이라면 return과 세미콜론, 중괄호를 동시 생략해야하고 1개의 수식만 남게 됨

```java
interface Addable {
	int add(int a, int b);
}

public class LambdaExpressionTest {
	public static void main(String[] args) {
		// 익명 클래스
		Addable ad1 = new Addable() {
			public int add(int a, int b) {
				return (a + b);
			}
		};
		System.out.println(ad1.add(100, 200));

		// 매개변수 자료형과 return 문을 가진 람다식
		Addable ad2 = (int a, int b) -> {
			return (a + b);
		}
		System.out.println(ad2.add(10, 20));

		// 간단한 람다식
		Addable ad3 = (a, b) -> (a + b);
		System.out.println(ad3.add(1, 2));
	}
}
```

## 3. 람다식의 활용

- 함수적 인터페이스(functional interface)
- 패키지 java.util.function에서 표준 함수적 인터페이스가 제네릭 인터페이스로 제공됨
- 함수적 인터페이스를 구현하는 클래스를 정의할 때, 익명 클래스 정의를 활용할 수 있으나 람다식이 효율적

### **표준 함수적 인터페이스의 예**

- `Consumer<T>`는 `void accept(T t)`를 가짐
- `Supplier<T>`는 `T get()` 메소드를 가짐
- `Function<T, R>`은 `R apply(T t)`를 가짐
