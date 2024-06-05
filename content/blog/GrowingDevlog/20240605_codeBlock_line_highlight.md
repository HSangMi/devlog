---
title: '[Gatsby] Prismjs 코드블록 개선(4) Line HighLight 추가하기'
date: 2024-06-05 18:00
category: 'Dev/GrowingDevlog'
draft: false
tags:
    - Gatsby
    - React
    - prismjs
---
<aside>
<a href="https://github.com/JaeYeopHan">@Jbee</a> 님의 블로그 템플릿을 받아서 사용 중 인데, 코드블록 디자인에 몇가지 설정을 추가하고 싶었다.  <br/>
1. 테마 <br/>
2. 타이틀 <br/>
2. 라인넘버 <br/>
<b>3. 하이라이트</b>  <br/>
</aside>

## 하이라이트 표시하기

  > 더 자세한 설정은 공식 문서에서 확인 가능합니다!
  > [gatsby-remark-prismjs](https://www.gatsbyjs.com/plugins/gatsby-remark-prismjs/)  
  > [markdown으로 설명이 알아보기 힘들 때 참고](https://unpkg.com/browse/gatsby-remark-prismjs@3.2.4/README.md)  

### 1. 플러그인 설치
* prismjs 플러그인 설치, 이전 포스팅에서 설치하고 `package.json`에 이미있으면 생략
  ```bash
  npm install gatsby-remark-prismjs prismjs
  ```

### 2. css 설정
  * 몇가지 css 설정만 해주면 하이라이트가 표시된다!

  ```css:title=style/code.scss
  /* 하이라이트 라인 css 설정 */
  .gatsby-highlight-code-line {
    background-color: #9d9d9d3d;
    display: block;
    margin-right: -1em;
    margin-left: -2.8em;
    padding-right: 1em;
    padding-left: 2.5em;
    border-left: 0.25em solid #f99;
  }

  /**
  * Add back the container background-color, border-radius, padding, margin
  * and overflow that we removed from <pre>.
  */
  .gatsby-highlight {
    background-color: #3b3b3b; /* 사용할 codeblock 컬러로 설정 */
    border-radius: 0.3em;
    margin: 0.5em 0;
    // padding: 1em;
    overflow: auto;
  }

  /**
  * Remove the default PrismJS theme background-color, border-radius, margin,
  * padding and overflow.
  * 1. Make the element just wide enough to fit its content.
  * 2. Always fill the visible space in .gatsby-highlight.
  * 3. Adjust the position of the line numbers
  */
  
  .gatsby-highlight pre[class*="language-"] {
    background-color: transparent;
    /* margin: 0;
    // padding: 0;
    // overflow: initial; */
    overflow: hidden; /* 하이라이트 표시용 주석라인이 라인수를 증가시켜 y축 스크롤이 생기는 것으로 추정, hidden으로 바꿈 */
    /* x 축 스크롤이 생겼을 때, 스크롤을 이동해도 하이라이트가 표시되게 해주는 설정 */
    float: left; /* 1 */
    min-width: 100%; /* 2 */
  }

  /* highlight랑 number랑 같이 쓸거라 추가한 css */
  .gatsby-highlight pre[class*="language-"].line-numbers {
    padding-left: 2.8em;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
  }

  /* 하이라이트 라인과 코드라인 정렬이 안맞아서 추가한 css */
  .line-numbers .line-numbers-rows {
    padding: 0em 0em 0em 0.5em;
    margin: 1em 0em;
    margin: 0.5em 0em;
    border-right: 1px solid #99999952;
  }
  ```

### 3. 적용방법 1 : 주석사용

> highlight-line : highlights the current line;  
> highlight-next-line : highlights the next line;  
> highlight-start: highlights the lines until the matching hightlight-end;  
> highlight-range{1, 4-6} : will highlight the next line, and the fourth, fifth and sixth lines.  


* 사용 예시
  ```none
    ```javascript
      console.log("한 줄 주석 : this line"); // highlight-line  

      // highlight-next-line
      console.log("다음 한 줄 주석 : next line");

      console.log("-*-*-*-*-*-*-*-*-*-*-*-*");

      // highlight-start
      console.log("이건 범위 주석 ~" );
      const hello = "Hello~";
      console.log(hello);
      // highlight-end

      console.log("-*-*-*-*-*-*-*-*-*-*-*-*");

      /* highlight-range{1,3-5} */
      console.log("주석 다음라인 부터");
      console.log("라인 넘버에 해당하는 라인에 주석");
      console.log("1번라인과 3~5라인 주석");
      const status = "I'm hungry";
      console.log(status);
      console.log("-*-*-*-*-*-*-*-*-*-*-*-*");
  ```


* 적용모습
  ```javascript
    console.log("한 줄 주석 : this line"); // highlight-line  

    // highlight-next-line
    console.log("다음 한 줄 주석 : next line");

    console.log("-*-*-*-*-*-*-*-*-*-*-*-*");

    // highlight-start
    console.log("이건 범위 주석 ~" );
    const hello = "Hello~";
    console.log(hello);
    // highlight-end

    console.log("-*-*-*-*-*-*-*-*-*-*-*-*");
    /* highlight-range{1,3-5} */
    console.log("주석 다음라인 부터");
    console.log("라인 넘버에 해당하는 라인에 주석");
    console.log("1번라인과 3~5라인 주석");
    const status = "I'm hungry";

    console.log(status);
    console.log("-*-*-*-*-*-*-*-*-*-*-*-*");
  ```

### 3. 적용방법 2 : 코드블록 선언부에 설정하기
* 블록 선언부에 {라인, 범위(start-end), ...} 추가, title은 하이라이트 선언 뒤쪽에 추가 가능
```none
  ```javascript{1,4-6}:title=블록선언부_적용예시
    console.log("코드블록 선언부에 범위를 지정할 수도있음");
    console.log("line 2");
    console.log("line 3");
    console.log("line 4");
    console.log("line 5");
    console.log("line 6");
    console.log("line 7");
```

* 적용모습
  ```javascript{1,4-6}:title=블록선언부_적용예시
    console.log("코드블록 선언부에 범위를 지정할 수도있음");
    console.log("line 2");
    console.log("line 3");
    console.log("line 4");
    console.log("line 5");
    console.log("line 6");
    console.log("line 7");
  ```
