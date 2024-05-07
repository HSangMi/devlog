---
title: '1. Stategy Pattern'
date: 2022-09-19 00:00:00
category: 'Knowledge/DesignPattern'
draft: false
tags: 
- DesignPattern
---

<aside>
💡 학습목표 <br/>
`인터페이스` 개념을 이해한다  <br/>
`델리게이트` 개념을 이해한다  <br/>
`전략패턴`을 이해한다  <br/>
</aside>

### 인터페이스

---
<aside>
💡  기능에 대한 <span class="notion_sp"> 선언과 구현 분리</span><br/>
    기능의 <span class="notion_sp">사용 통로</span><br/>
</aside>
<br>

#### 예제 
```java
// 인터페이스 선언 ---------------------------------------
public interface A_interface{
    // 기능에 선언
    public void fun_A();
}

// 인터페이스 구현 ---------------------------------------
public class A_interfaceImpl implements A_interface{
    @Override
    public void func_A(){
        System.out.println("AAA");
    }
}

// 사용 --------------------------------------------------
public class Main {
    public static void main(String[] args){
        A_interface ainterface = new A_interfaceImpl();
        
        // 통로
        ainterface.func_A();
    }
}
```
    

### 델리게이트

---

<aside>
💡 <span class="notion_sp">위임</span> 하다<br/>
특정 객체에서 기능을 사용하기위해, 다른 객체의 기능을 호출하는 것
</aside>

- 두 객체간에 관계에서 델리게이트 한다 라고 표현하는데, 예제를 확인해보자!
    
    ```java
    
    public class AObj{
    
    	A_interface ainterface;
    
    	private void func_AA{
    
    		// 아래와 같은 기능이 필요할 경우,
    		System.out.println("AAA");
    		System.out.println("AAA");
    		
    		// 다른객체에게 기능을 떠넘기는것! 위임한다!
    		ainterface.func_A();
    		ainterface.func_A();
    
    	}
    }
    ```
    

 ### Stategy(전략) 패턴

---

<aside>
💡 여러 알고리즘을 하나의 <span class="notion_sp">추상적인 점근점</span>(→인터페이스)을 만들어<br/>
접근 점에서 서로 <span class="notion_sp">교환 가능</span>하도록 하는 패턴

</aside>

- 기본 설계
    
    ![Untitled](./images/StategyPattern_설계.png)
    
#### 예제 
    - 신작 게임에서 캐릭터와 무기를 구현해보세요
    - 무기는 두가지 종류가 있습니다.(칼, 검)
    
    ```java
    //-----------------------------------------------------
    // Weapon : 접근점 : 두 무기가 접근할 수 있는 접근점
    public interface Weapon {
    	public void atack();
    } 
    
    //------------------------------------------------------
    public class Knife implements Weapon{
    
    	@Override
    	public attack(){
    		System.out.println("칼 공격!");
    	}
    }
    //------------------------------------------------------
    public class Sword implements Weapon{
    
    	@Override
    	public attack(){
    		System.out.println("검 공격!");
    	}
    }
    
    // ------------------------------------------------------
    public class GameCharacter {
    	// 추상적인 접근점	
    	private Weapon weapon;
    	
    	// 교환가능
    	public void setWeapon(Weapon weapon){
    		this.weapon = weapon;
    	}
    }
    
    // 기능을 사용해볼가?
    public void attack(){
    
    	if(weapon == null)
    		System.out.println("맨손공격!");
    	else
    		// 델리게이트
    		**// 내가 어떤 무기를 들고 있느냐에 따라서 공격형태가 알아서 변경됨!
    		// 나(GameCharater)는 모름! Weapon이 알아서 할거임
    		weapon.attack();
    }
    
    // -------------------------------------------------------
    public class Main{
    	public static void main (String[] args){
    		GameCharacter character = new GameCharacter();
    
    		character.attack();
    		character.setWeapon(new Knife());
    
    		character.attack();
    		character.setSword(new Sword());
    	}
    }
    ```
    
    - 새로운 무기가 추가되었을 때, Weapon 구현클래스만 하나 추가해 주면 뚝딱!

---
> 해당 노트는 [자바 디자인 패턴의 이해 - Gof Design Pattern](https://www.inflearn.com/course/%EC%9E%90%EB%B0%94-%EB%94%94%EC%9E%90%EC%9D%B8-%ED%8C%A8%ED%84%B4#curriculum)강의를 듣고 작성한 노트입니다.
