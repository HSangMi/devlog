---
title: '[Postgresql] 프로시저 내부 실행계획 - 부제 : 실행계획은 문제없는거 같은데 왜 점점 느려질까?'
date: 2024-08-12 18:30
category: 'Database/SQL'
draft: false
tags:
    - SQL
    - Postgresql
    - workLog
---

> - 유지보수팀에서 고객사의 우리 솔루션 DB를 oracle에서 postgres로 전환하려고 개발계에서 테스트중인데 속도가 현저히 느려진 서비스가 있어, 분석하게 되었다
> - 문자열로 넘어온 경로를 split한 뒤 순차적으로 경로의 정합성을 체크하고, 해당경로에 해당하는 key값을 반환하는 데이터 보정 프로시저이다.
> - 예를들어 /AAA/BBB/CCC/DDD/EEE 경로를 검증할 때, AAA,BBB까진 조회속도가 빠르지만, CCC 아래경로부터는 같은 쿼리라도 조회속도가 현저히 느려졌다.

<br/>
결론을 말하자면, postgreSQL에서 프로시저 내부 쿼리의 실행계획을 결정짓는 방식이 oracle과 달랐기 때문이었다.

<aside>
PostgreSQL에서는 함수나 프로시저 내부에서 사용되는 쿼리의 실행 계획이 함수가 처음 실행될 때 결정됩니다.  <br/>
만약 테이블의 통계가 함수 실행 중 변경되거나, 함수의 인자가 실행마다 달라질 경우, 최초 생성된 실행 계획이 비효율적일 수 있습니다.<br/>   
이로 인해, 독립적으로 실행된 쿼리보다 느리게 동작할 수 있습니다.  
</aside>


위와 같은 이류로 조회하는 바인딩 변수가 바뀌면서, 데이터 분포에따라 이전 실행계획이 비효율적으로 동작한 것 같다.
해결방법은 문제가 된 조회쿼리(`select ~ into ...`) 대신 `EXECUTE '~~' into ...`키워드를 사용하여 동적 SQL를 실행하도록 하여, 프로시저 내부에서도 매번 최적화된 실행계획을 처리할 수 있도록 하는것이다. 이렇게 처리하니 2초이상 걸리던게 xx ms단위로 떨어졌다
<br/>

오라클의 경우엔 쿼리 플래닝과 실행계획 캐싱이 postgreSQL과 달라, 이런 이슈가 발생하지 않았다.   
(실행계획 캐싱, 변수 바인딩 시 동적 실행계획, 자동 통계정보 업데이트 등) 역시 유료...  
<br/>

~~그러나 다른 pg를 사용하는 고객사 말고 이 사이트만 유독 느렸던게 통계정보를 업데이트 안한 이유가 큰 듯하다. (이후 포스팅 예정...)~~  



> * 출처  
> [Query Planning and Execution](https://www.postgresql.org/docs/current/using-explain.html)  
> [PL/pgSQL Dynamic SQL](https://www.postgresql.org/docs/current/plpgsql-control-structures.html#PLPGSQL-STATEMENTS-EXECUTING-DYN)