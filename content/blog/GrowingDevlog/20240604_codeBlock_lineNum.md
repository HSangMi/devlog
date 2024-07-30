---
title: '[Gatsby] Prismjs 코드블록 개선(3) Line Numer 추가하기'
date: 2024-06-04 19:30
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
2. 타이틀 <br/>
<b>2. 라인넘버</b> <br/>
3. 하이라이트  <br/>
</aside>

## 라인넘버 표시하기

  > 더 자세한 설정은 공식 문서에서 확인 가능합니다!
  > [gatsby-remark-prismjs](https://www.gatsbyjs.com/plugins/gatsby-remark-prismjs/)

### 1. 플러그인 설치
* prismjs 플러그인 설치, 이전 포스팅에서 설치하고 `package.json`에 이미있으면 생략
  ```bash
  npm install gatsby-remark-prismjs prismjs
  ```

### 2. gatsby-config에 설정
* `gatsby-config.js` 플러그인 사용 활성화
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
                  // highlight-end
                  },
              },
              //...
          ]
        }
      }
    ]
  }
  ```

### 3. gatsby-browser에 기본 CSS 추가
* `gatsby-browser.js`에 기본 css 추가
  ```js:title=gatsby-browser.js
  require('intersection-observer')
  require("prismjs/themes/prism-tomorrow.css")
  require("prismjs/plugins/line-numbers/prism-line-numbers.css") // highlight-line
  ```

### 3. 커스텀 CSS추가
* `style/code.scss`에 커스텀 css 추가
  ```css:title=style/code.scss
  // highlight랑 number랑 같이 쓸거라 추가한 css
  .gatsby-highlight pre[class*="language-"].line-numbers {
    padding-left: 2.8em;
  }

  // 정렬이 안맞아서 추가한 css
  .line-numbers .line-numbers-rows {
    padding: 0em 0em 0em 0.5em;
    margin: 1em 0em;
    border-right: 1px solid #99999952;
  }
  ```
