---
title: '[SQL window 함수] 페이징하면서, 토탈카운트 가져오기'
date: 2024-07-30 18:30
category: 'Database/SQL'
draft: false
tags:
    - SQL
---

### 방법 1. 두 번 조회하기

* 두 번 조회로 성능 문제가 있을 수 있음

```sql
-- 페이징된 데이터 조회
SELECT * FROM users WHERE department_id = ? LIMIT ? OFFSET ?;
-- 총 사용자 수 조회
SELECT COUNT(*) FROM users WHERE department_id = ?;
```

### 방법 2. 윈도우 함수 사용

* 데이터베이스에 따라 성능 차이 있음

```sql
SELECT *, COUNT(*) OVER() AS total_count
FROM users
WHERE department_id = ?
ORDER BY user_id
LIMIT ? OFFSET ?;
```

----

### 윈도우 함수란?
* 윈도우 함수(Window Function)는 SQL에서 데이터를 **그룹별로 나누어 특정 연산을 수행**할 수 있게 하는 함수
* 일반적인 집계 함수(Aggregate Function)와 달리, 윈도우 함수는 결과 집합의 각 행에 대해 연산을 수행하고 그 결과를 해당 행에 추가로 포함시켜 반환
* 즉, 데이터를 요약하면서도 개별 행의 정보도 함께 제공


#### 윈도우 함수 구조
```sql
<윈도우 함수> OVER ([PARTITION BY <기준 컬럼>] [ORDER BY <정렬 기준>] [WINDOW_FRAME])
```
* `PARTITION BY`는 데이터를 그룹으로 나누는 기준을, `ORDER BY`는 각 그룹 내에서 행을 정렬하는 기준을, `WINDOW_FRAME`은 특정 범위의 행을 지정하는 옵션

#### 윈도우 함수 예시

#### ROW_NUMBER()
* 각 행에 대해 그룹 내에서의 순번을 반환
```sql
SELECT user_id, department_id, 
       ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY user_id) AS row_num
FROM users;
```

#### RANK()
* 각 행에 대해 그룹 내에서 순위를 반환하지만, 동일 순위가 있을 경우 다음 순번을 건너뜀.
```sql
SELECT user_id, department_id, 
       RANK() OVER (PARTITION BY department_id ORDER BY user_id) AS rank
FROM users;
```

#### DENSE_RANK()
* 각 행에 대해 그룹 내에서 순위를 반환하며, 동일 순위가 있을 경우 다음 순번을 건너뛰지 않음
```sql
SELECT user_id, department_id, 
       DENSE_RANK() OVER (PARTITION BY department_id ORDER BY user_id) AS dense_rank
FROM users;
```

#### SUM(), AVG(), COUNT(), MIN(), MAX() 등 집계 함수
* 그룹 내에서 집계 연산을 수행
```sql
SELECT user_id, department_id, 
       COUNT(*) OVER (PARTITION BY department_id) AS dept_count
FROM users;
```