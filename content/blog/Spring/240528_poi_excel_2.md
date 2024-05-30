---
title: '[SpringBoot] Apache POI, AbstractView - 엑셀 파일 생성 후 다운로드 (2)'
date: 2024-05-29 18:00
category: 'Framework/Spring'
draft: false
tags:
    - SpringBoot
    - ApachePOI
---

## XSSF 형식으로 엑셀 다운로드 해보기

### 프로젝트 설정

먼저, Apache POI와 Spring Boot Starter Web 의존성을 프로젝트에 추가합니다.

#### Maven (pom.xml):

```xml
<dependencies>
    <!-- Spring Boot Starter Web -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <!-- Apache POI for Excel -->
    <dependency>
        <groupId>org.apache.poi</groupId>
        <artifactId>poi-ooxml</artifactId>
        <version>5.2.3</version>
    </dependency>
</dependencies>
```

#### Gradle (build.gradle):

```groovy
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.apache.poi:poi-ooxml:5.2.3'
}
```

### AbstractXlsxView 구현

`AbstractXlsxView`를 확장하여 Excel 파일을 생성하는 클래스를 작성합니다.
* buildExcelDocument 메서드 : 이 메서드는 실제로 Excel 파일의 내용을 작성하는 곳입니다. 서브클래스에서 이 메서드를 구현하여 Excel 파일의 내용을 작성합니다.

```java
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.web.servlet.view.document.AbstractXlsxView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

public class ExcelView extends AbstractXlsxView {

    @Override
    protected void buildExcelDocument(Map<String, Object> model, Workbook workbook,
                                      HttpServletRequest request, HttpServletResponse response) throws Exception {
        
        // 파일명을 설정합니다.
        response.setHeader("Content-Disposition", "attachment; filename=\"example.xlsx\"");
        
        // 시트를 생성합니다.
        Sheet sheet = workbook.createSheet("Sheet1");
        
        // 모델에서 데이터를 가져옵니다.
        List<String> data = (List<String>) model.get("data");
        
        // 헤더 행을 생성합니다.
        Row header = sheet.createRow(0);
        Cell headerCell = header.createCell(0);
        headerCell.setCellValue("Data");

        // 데이터 행을 생성합니다.
        int rowNum = 1;
        for (String datum : data) {
            Row row = sheet.createRow(rowNum++);
            Cell cell = row.createCell(0);
            cell.setCellValue(datum);
        }
    }
}
```

### Controller 작성

컨트롤러에서 Excel 파일을 반환하는 메서드를 작성합니다.

```java
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.Arrays;
import java.util.List;

@Controller
public class ExcelController {

    @GetMapping("/download/excel")
    public ModelAndView downloadExcel(Model model) {
        // Excel 파일에 포함될 데이터를 준비합니다.
        List<String> data = Arrays.asList("Row1", "Row2", "Row3");
        
        // 모델에 데이터를 추가합니다.
        model.addAttribute("data", data);
        
        // Excel 뷰를 반환합니다.
        return new ModelAndView(new ExcelView(), model.asMap());
    }
}
```

### 애플리케이션 실행

위의 설정을 완료한 후 애플리케이션을 실행합니다. 브라우저에서 `http://localhost:8080/download/excel`로 접근하면 Excel 파일이 다운로드됩니다.

### 전체 프로젝트 구조

프로젝트 구조는 다음과 같이 구성됩니다:

```
src/main/java/
|-- com.example.demo/
|   |-- DemoApplication.java
|   |-- controller/
|   |   |-- ExcelController.java
|   |-- view/
|       |-- ExcelView.java
src/main/resources/
|-- application.properties
```

### 추가 설정 및 주의사항

- **Content-Disposition 헤더**: `response.setHeader("Content-Disposition", "attachment; filename=\"example.xlsx\"");`를 사용하여 브라우저가 파일을 다운로드하도록 설정합니다.
- **데이터 유효성 검증**: 실제 사용 시에는 모델에 포함된 데이터의 유효성을 검증하는 로직을 추가합니다.
- **예외 처리**: 예외 상황을 처리하는 로직을 추가하여 안정성을 높입니다.

