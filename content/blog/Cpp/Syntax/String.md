---
title: 'C++ Syntax/String'
date: 2024-05-07
category: 'Language/C++'
draft: false
tags: 
- c++
---
> C++로 알고리즘 문제를 해결하는데 필요했던 문법을 정리해 둔 것입니다.

# String

- [string].size()  == [string].length();
    
    ```cpp
    string test ="Hello";
    cout << test.size();    // 5
    cout << test.length();  // 5
    ```
    

- string ⇒ char[n]의 모임
    - string[n] 직접 인덱스에 접근하여 값 변경 가능
    
    ```cpp
    string test = "Hello";
    test[1] = 'a';
    cout << test ; // "Hallo";
    ```
    

- 대소문자 변환
    - +- 32
    
    ```cpp
    string str = "hello";
    char A = 'A'; // 65 
    char a = 'a'; // 97
    
    str[0] -= 32;
    cout << str ;          // "Hello"
    cout << char('a'-32) ; // 'A'
    cout << char('A'+32) ; // 'a'
    
    ```
    
    - tolower(c), toupper(c)
    
    ```cpp
    cout << tolower('A'); // 'a'
    cout << toupper('a'); // 'A'
    ```
    

- 각 자리 문자 순회하기
    
    ```cpp
    string str = "Hello";
    
    for (int i = 0; i <str.size(); <i++){}  // size(), length() 둘 다 가능
    for (char c : str){}
    for (auto c : str){}  // 값 복사(성능이슈) => string 값에 영향x
    for (auto& c : str){} // 참조로 가져옴 => string에 영향을 줌
    ```
    

- 특수 문자 출력하기
    
    ```cpp
    // 이스케이프 문자열 사용
    cout << "\""; 
    ```
    
    ```cpp
    // 리터럴 사용
    cout << R"(!@#$%^&*(\'"<>?:;)";
    ```
    

- 문자열 치환
    
    ```cpp
    // [string].replace(시작인덱스,시작인덱스부터 몇자리, 교체할 문자열)
    my_string.replace(s,overwrite_string.size(),overwrite_string);
    ```
    

- 문자열 연결하기
    
    ```cpp
    string str ="hello";
    str +=" ";
    str.append("world");
    str.push_back("!");
    // "hello world!"
    ```
    
- 문자열 배열 합치기 ( 순차열 합치기)
    
    ```cpp
    vector<string> arr = {"adf", "qwe"};
    accumulate(arr.begin(), arr.end(), string(""));
    ```
    

- string → int, int → string 형변환
    
    ```cpp
    // #include<string>
    
    // stoi : string -> int
    string numStr = "12345";
    int num = stoi(numStr);
    
    // to_string() : int -> string
    string str = to_string(num);
    
    // char -> int
    char ch1 = '1';
    int num1 = ch1 - '0';
    ```
    
- 문자열 뒤집기
    
    ```cpp
    // string 생성자 사용
    string(my_string.rbegin(), my_string.rend());
    
    // algorithm stl 사용
    reverse(my_string.begin(),my_string.end());
    ```
    
- 반복 출력
    
    ```cpp
    // string 생성자 사용
    // (반복횟수, char)
    string(3,'*'); // "***"
    ```

# + StringStream

- 문자열 자르기(split 구현)
    ```cpp
    #include<iostream>
    #include<vector>
    #include<string>
    #include<sstream>
    using namespace std;

    // s : 문자열, d : 자를 구분자
    vector<string> split(string s, char d){
        vector<string> tokens;
        stringstream ss;
        string token;

        while(getline(ss, token, d){
            tokens.push_back(token);
        }

        return tokens;
    }
    int main(){
       
       // cin 앞에 사용했다면, 버퍼에 담긴 '\n' 지우기
       // cin.ignore();
        string s = getline(cin, s, '\n');   // getline(인풋스트립, 담을 문자열 변수, 구분자)

        return 0;
    }
    ```
