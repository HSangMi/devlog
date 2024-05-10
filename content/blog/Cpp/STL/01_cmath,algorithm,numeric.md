---
title: 'C++ STL/cmath, algorithm, numeric'
date: 2024-05-08
category: 'Language/C++'
draft: false
tags: 
- c++
---
> C++로 알고리즘 문제를 해결하는데 필요했던 문법을 정리해 둔 것입니다.

# cmath
```cpp
#include<cmath>
// 거듭제곱
int num = 2;
pow(num. 4); //16
```


# algorithm

- sort

```cpp
#include<algorithm>

// default 오름차순
sort(arr, arr+n);
sort(v.begin(), v.end());
sort(v.begin(), v.end(), compare);      // 사용자정의 비교함수
sort(v.begin(), v.end(), greater<T>()); // 내림차순
```

- reverse

```cpp
#include<algorithm>

vector<int> vec = {1, 2, 3, 4, 5};
string my_string ="Hello";
// 배열뒤집기
reverse(vec.begin(), vec.end());

// 문자열뒤집기
reverse(my_string.begin(),my_string.end());
```

# numeric

- reduce

```cpp
#include<numeric>

vector<int> vec = {1, 2, 3, 4, 5};
reduce(vec.begin(), vec.end(), 0);      // C++17 이후지원
accumulate(vec.begin(), vec.end(), 0);
accumulate(vec.begin()+3, vec.end(), 0); // 3번째 요소부터 누적

// 이항연산자 지정가능
// plus, minus, multiplies, bit_and ...
reduce(vec.begin(), vec.end(), 0, plus<int>());
reduce(vec.begin(), vec.end(), 1, multiplies<int>());
// 사용자 정의 함수도 가능
// 람다식 예시 ,
reduce(vec.begin(), vec.end(), 0, [](int x, int y) {
        return x + y;
})
// accumulate도 람다식 가능!
accumulate(vec.begin(), vec.end(),0,[](int acc, int num){ return (acc+num)%10007;});

// 사용자 정의 함수 객체 활용
struct CustomAdd {
    int operator()(int x, int y) const {
        return x + y;
    }
};
reduce(vec.begin(), vec.end(), 0, CustomAdd());

```