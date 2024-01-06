# 7장 java.lang

# 1. Object



## 1. String toString()

- 객체의 문자열 표현을 반환
- 문자열의 연산, `System.out.println` 등에서 필요함
- 자식 클래스에서 재정의할 수 있음

```java
public String toString() {
	return getClass().getName()+"@"+Integer.toHexString(hashCode());
}
```

```java
class MyClass {}

public class ToStringTest {
    public static void main(String[] args) {
        MyClass my_class = new MyClass();
        System.out.println(my_class);            // "**MyClass@30f39991"**
        System.out.println(my_class.toString()); // "**MyClass@30f39991"**
    }
}
```

## 2. boolean equals(Object obj)

- 두 객체 변수를 비교해서 두 변수의 참조값이 같을 때 true를 반환
- 자식 클래스에서 재정의할 수 있음

## 2. Object clone()

- 객체를 복제하여 리턴함
- Cloneable 인터페이스를 구현한 클래스일 때만 clone() 메소드 호출 가능
- clone() 메소드는 checked exception인 CloneNotSupportedException을 발생시킬 수 있기 때문에 반드시 try-catch 구문을 사용해야 한다.

```java
class Box impolements Clonable {
	private int width, height;
	public Box(int w, int h) {
		width=w; height=h;
	}

	public int width() { return width; }
	public int height() { return height; }
	public Object clone() {
		try {
			return super.clone();
		} catch (CloneNotSupportedException e) {
			return null;
		}
	}
}

public class CloneTest {
	public static void main(String[] args) {
		Box h1 = new Box(20, 30);
		Box hw = (Box) b1.cone();

		System.out.println(b2.width()); // 20
		System.out.println(b2.height()); // 30
		System.out.println(b1); // "Box@28a318fc"
		System.out.println(b2); // "Box@5305068a"
	}
}
```

# 2. String



## 1. String 클래스와 생성자

- 문자열을 표현하고 처리하기 위한 클래스
- 기본 자료형처럼 다룰 수 있음
    - String s1 = “Java”; // 리터럴을 대입
    - 같은 리터럴은 1개만 만들어져 공유됨
- String 객체는 내용이 변하지 않는(immutable) 상수 객체

## 2. 문자열의 비교 메소드

- int compareTo(String anotherString)
    - 같으면 0을 리턴하고, 다르면 0이 아닌 정수값을 리턴함
- int compareToIgnoreCase(String anotherString)
    - 대소문자를 구분하지 않고 비교함
- boolean equals(Object anObject)
    - 문자열이 같으면 true를 리턴하고, 다르면 false를 리턴함
- boolean equalsIgnoreCase(String anotherString)
    - 대소문자를 구분하지 않음

```java
String s1 = "Java";
String s2 = "Java";
String s3 = new String("Java");
String s4 = new String("Java");

s1.equals(s2) // true
s1.equals(s3) // true
s1 == s2 // true
s1 == s3 // false
```

## 3. 문자열의 검색 메소드

- int indexOf(String str [, int formIndex])
    - 처음 위치부터 문자열 str을 찾아 처음 등장하는 위치(인덱스)를 리턴
    - 없으면 -1을 리턴
- int lastIndexOf(String str [, int formIndex])
    - 마지막 위치부터 앞 방향으로 찾음

## 4. 문자열의 추출 메소드

- char charAt(int index)
    - index 위치에 있는 문자를 리턴
- String substring(int beginIndex)
    - beginIndex 위치부터 마지막까지의 문자열을 리턴함
    - System.out.println(”hamburge”.substring(3));
- String substring(index beginIndex, int endIndex)
    - beginIndex 위치부터 (endIndex-1)까지의 문자열을 리턴함

## 5. 문자열의 변환 메소드

- 원본 문자열은 변경되지 않고 새로운 객체가 만들어짐
- String replace(char oldChar, char newChar)
    - oldChar 문자를 newChar 문자로 변환하여 리턴함
- String trim()
    - 문자열 앞과 뒤에 나오는 화이트 스페이스 문자를 제거하여 리턴함
- String toUpperCase()
- String toLowerCase()
- String concat(String str)
    - 두 문자열을 연결함
    

## 6. 다른 자료형을 문자열로 변환하는 메소드

```java
public class TrnasformData {
	public static void main(String[] args) {
		System.out.println(String.valueOf(123)); // "123"
		System.out.println(String.valueOf(5 > 3)); // "true"
		System.out.println(String.valueOf(3.0)); // "3.0"
		char[] a =  { 'J', 'a', 'v', 'a' };
		System.out.println(String.valueOf(a)); // "Java"
	}
}
```

## 7. 기타 메소드

- boolean startsWith(String prefix)
    - prefix로 시작하면 true 리턴
- boolean endWith(String suffix)
    - suffix로 끝나면 true 리턴
- char[] toCharArray()
    - 문자열을 문자 배열로 변환하여 리턴

# 3. StringBuffer



- 객체 생성 이후 문자열을 수정할 수 있는 기능을 제공
    - StringBuffer는 내용 변경이 가능한 mutable 클래스
- 내부적으로 문자열을 저장하기 위해 크기가 조절되는 버퍼를 사용함
- StringBuffer([int length OR String str])
    - 초기 버퍼의 크기는 16
    - 매개변수로 버퍼의 크기나 초기 문자열을 넣을 수 있음

## 주요 메소드

- int capacity(), int length()
- char charAt(int index), int indexOf(String str)
- String substring(int start, int end)
- StringBuffer append(char c)
    - 인자를 String 표현으로 바꾸고 원 문자열 끝에 추가하여 반환함
    - 인자는 char[], Object, String, 기본 자료형도 가능함

```java
StringBuffer s1 = new StringBuffer("start");
System.out.println(s1.capacity()); // 21 (5+16)
System.out.println(s1.length()); // 5
System.out.println(s1.append("le")); // "startle"
```

- StringBuffer delete(int start, int end)
    - start 위치에서 end-1까지의 문자열을 삭제
- StringBuffer insert(int offset,  String s)
    - offset 위치부터 s를 삽입
- StringBuffer replace(int start, int end, String s)
    - start 위치부터 end-1까지의 문자열을 s로 교체
- StringBuffer reverse()
    - 문자열을 역순으로 변경

# 4. String, StringBuffer, StringBuilder 비교



## 1. String 클래스를 사용할 때의 문제점

- 문자열을 빈번하게 변경하는 프로그램
- String은 immutable 클래스
- 기본 String 객체는 놔둔 채 새로운 String 객체가 계속 생성됨

```java
public class StringTest {
	public static void main(String[] args) {
		final String aValue = "abcde";
		String str new String();
		
		for (int i = 0; i < 1000; i++)
			str = str + aValue;
		System.out.println(str);
	}
}
```

## 2. StringBuffer와 StringBuilder 클래스의 차이점

```java
public class StringTest {
	public static void main(String[] args) {
		final String tmp = "abcde";
		long start, end;

		String str = new String();
		StringBuffer sb = new StringBuffer();
		StringBuilder sb2 = new StringBuilder();
	
		start = System.nanoTime();
		for(int i = 0; i < 10000; i++) str = str + tmp;
		end = System.nanoTime();
		System.out.println((end-start)/1000000.0 + "msecs"); // 30.523792msecs
	
		start = System.nanoTime();
		for(int i = 0; i < 10000; i++) sb.append(tmp);
		end = System.nanoTime();
		System.out.println((end-start)/1000000.0 + "msecs"); // 0.5725msecs
	
		start = System.nanoTime();
		for(int i = 0; i < 10000; i++) sb2.append(tmp);
		end = System.nanoTime();
		System.out.println((end-start)/1000000.0 + "msecs"); // 0.318459msecs
	}
}
```

- 10byte 길이의 문자열을 10,000번 연결하는 작업을 비고해봤을 때 String 클래스로 처리하는데 소요된 시간은 String > StringBuffer > StringBuilder 이다.
- 메모리에 대해서도 String 클래스는 기존 문자열이 저장된 것을 그대로 두고 새롭게 공간을 할당받지만 StringBuffer와 StringBuilder 클래스는 값이 변경될 떄 기존 공간에 추가되는 부분만큼만 할당받아 사용하기 때문에 메모리 낭비가 발생하지 않는다.
- StringBuffer 클래스는 동시성 제어를 고려하여 구현되었고, StringBuilder 클래스는 동시성 제어를 전혀 고려하지 않도록 메소드가 구현되었다.
- 변경이 자주 발생하는 문자열을 다룰 때에는 StringBuffer 클래스를 사용하는 것이 효과적이다. 동시성 제어를 고려할 필요가 없다면 StringBuilder 클래스를 사용하는 것이 가장 효과적이다.

# 5. 포장 클래스



- 기본형을 참조형으로 표현하기 위한 클래스
- 사용 목적
    - 메소드의 인자로 기본형이 아니라 참조형인 **객체**가 필요할 때
    - 클래스가 제공하는 상수를 사용할 때
        - Integer.MIN_VALUE, Integer.MAX_VALUE
        - Float나 Double의 경우에는 MIN_VALUE가 양의 최소값, MAX_VALUE는 양의 최대값을 표현
    - 클래스가 제공하는 다양한 메소드를 사용할 때

| 구분 | 정수형 |  |  |  | 실수형 |  | 문자형 | 논리형 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 기본형 | byte | short | int | long | float | double | char | boolean |
| 참조형 | Byte | Short | Integer | Long | Float | Double | Character | Boolean |

## 1. Number 클래스

- Number는 Byte, Short, Integer, Long, Float, Double의 추상 부모 클래스
- Number의 자식 클래스에서 구현된 주요 메소드
    - byte byteValue(), short shortValue(), …
        - 객체를 해당 기본형의 숫자로 변환(unboxing)
    - int compareTo(Byte anothetByte), …
        - this와 인자를 비교하여 같으면 0을 리턴
    - boolean equals(Object obj)
        - 같은 유형이고, 값이 같으면 true를 리턴
        

## 2. String과 기본형 데이터 간의 변환

- 포장 클래스가 제공하는 static 메소드를 사용함

```java
int n = Integer.parseInt("123");
long l = Long.parseLong("1234");
String s1 = Integer.toString(4);
String s2 = Long.toString(5);
String s3 = String.valueOf(123);
```

## 3. Integer 클래스

- Integer, String, int 사이의 변환 기능을 제공
- 다른 클래스들도 유사한 기능을 제공함

```java
static int parseInt(String s) // String -> int
static String toString(int i) // int -> String
static Integer valueOf(int i) // int -> Integer
			 String toString() // Integer -> String
static Integer valueOf(String s) // String -> Integer
```

## 4. 박싱

- 기본형 데이터를 포장 클래스의 객체로 변환하는 것
- 자동 박싱
    - 기본형에서 포장 클래스의 객체로 자동 변환되는 것
    - 인자에 전달되거나 변수에 대입될 때 적용됨

```java
Double radius = new Double(2.52); // 생성자 사용 - 옛날 방식
Double radius = Double.valueOf(10.4); // valueOf() 사용
Double radius = 2.52; // 자동 boxing
```

## 5. 언박싱

- 포장 클래스의 객체를 기본형 데이터로 변환하는 것
- 포장 클래스에서 기본형 `Value()` 메소드를 사용
- 자동 언박싱
    - 포장 클래스의 객체에서 기본형으로 자동 변환되는 것
    - 인자에 전달되거나 변수에 대입될 때 적용됨

```java
double r = radius.doubleValue(); // 객체.기본형Value()
double r = radius; // 자동 unboxing
System.out.println(new Integer(3) % 2); // 자동 unboxing
```

# 6. System 클래스


- Java 플랫폼 및 시스템과 관련된 기능 제공
- 모든 멤버는 static, 사용 시 객체를 생성할 필요 없음

### 주요 기능

- 표준 입출력
    - System.in (InputStream)
    
    ```java
    System.in.read() // 1byte 짜리 입력을 받을 수 있음
    
    InputStreamReader isr = InputStreamReader(System.in);
    BufferedReader is = new BufferedReader(isr); // line 단위 입력을 받을 수 있음
    
    is.readLine(); // 라인단위 입력값 사용
    ```
    
    - System.out, System.err (PrintStream)
- JVM 또는 운영체제 속성과 시스템 환경 변수의 사용
- 배열 복사
- 등…
