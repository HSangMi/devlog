---
title: '[Gatsby] Prismjs 코드블록 개선(2) 타이틀 추가하기'
date: 2024-06-04 18:30
category: 'Work & Dev/GrowingDevlog'
draft: false
tags:
    - Gatsby
    - React
    - prismjs
---
<aside>
<a href="https://github.com/JaeYeopHan">@Jbee</a> 님의 블로그 템플릿을 받아서 사용 중 인데, 코드블록 디자인에 몇가지 설정을 추가하고 싶었다.  <br/>
1. 테마 <br/>
<b>2. 타이틀</b> <br/>
2. 라인넘버 <br/>
3. 하이라이트  <br/>
</aside>

## 코드블록 타이틀 추가하기
### 1. 플러그인 설치
  ```bash
  npm i gatsby-remark-code-titles
  ```

* 플러그인을 설치하게되면 `package.json`에 추가됨
  ```json:title=package.json
  // ...
  dependencies : {
    // ...
      "gatsby-remark-code-titles": "^1.1.0",
    // ...
  }
  ```

### 2. gatsby-config에 추가
* `gatsby-transformer-remark` 플러그인 옵션 중 맨 위에 위치해야한다는 옵션이 있음
  ```js:title=gatsby-config.js
      resolve: `gatsby-transformer-remark`,
        options: {
          plugins: [
            {
              resolve: 'gatsby-remark-code-titles',
              options: {
                className: 'your-custom-class-name',  // 해당 classname으로 css설정 가능!
              },
            }, // IMPORTANT: this must be ahead of other plugins that use code blocks
            // ...
          ]
        }
  ```

* CSS 설정
  * 저는 별도 className을 지정하지 않고 기본 class(`gatsby-code-title`) 이름으로 지정 했습니다

  ```css:title=style/code.scss
    // md 코드블럭에 타이틀 추가
    .gatsby-code-title {
      margin-bottom: -0.8rem;
      padding: 0.5em 1em 0.5em 1em;
      font-family: Consolas, 'Andale Mono WT', 'Andale Mono', 'Lucida Console',
        'Lucida Sans Typewriter', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono',
        'Liberation Mono', 'Nimbus Mono L', Monaco, 'Courier New', Courier,
        monospace;

      background-color: #000000bd;
      color: white;
      z-index: 0;

      border-top-left-radius: 0.3em;
      border-top-right-radius: 0.3em;
    }
  ```

### 3. 타이틀 설정하는 방법
* `:title=제목` 추가
  ```text
    ```js:title=제목입니닷
      console.log("HELLO~");
  ```
* 적용 완료!

  ```js:title=제목입니닷
      console.log("HELLO~");
  ```
## 2. 코드블록 라인넘버 표시하기

```js:title=gatsby-config.js
module.exports = {
 // ...
  plugins: [
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
            //...
            {
                resolve: `gatsby-remark-prismjs`,
                options: {
                inlineCodeMarker: '%',
                // highlight-start
                showLineNumbers: true,  // 라인 번호 표시 활성화 
                },
                // highlight-end
            },
            //...
        ]
      }
    }
  ]
}
```
