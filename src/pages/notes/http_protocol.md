---
title: "HTTP Protocol Note"
description: HTTP protocol note
date: '2019-07-12'
tags: ['Http']
---
## Http protocol入門讀書隨手記 
### 請求方法：
- GET: 請求已經被URI識別的資源
- POST: likes as get, but there is something different, like as security?
- PUT: 傳檔案用，請求中包含文件內容，通常不會打開(problem of security)
- HEAD: 取得報文首部(包含有效性、資源更新日期與時間)
- DELETE: 刪除指定資源，和PUT相反，通常不會打開(problem of security)
- OPTIONS: 查詢請求的URI支持的方法
- TRACE: 用來確認連接過程中的操作，須設置Max-Forwards(此參數每過一個連接就會遞減1)
- CONNECT: 要求用隧道協議連接代理，主要使用SSL、TLS把通信內容加密後經網路隧道傳輸

---
### 持久連接與管線化：
- HTTP1.1過後實現TCP連接持久化，管線化技術出現，可以一次並行多個請求等待響應

---
### 無狀態組件＋Cookie：
- 服務器端發送Set-Cookie首部字段，通知客戶端保存客戶信息
- 下次再發送信息時，客戶端會自動加上

---   
### 報文與實體：
- 報文：composed by 8 bytes，報文主體通常用於傳輸實體主體
- 實體：請求或響應的數據，通常等同報文主體，唯有傳輸中進行編碼時，實體主體才會發生變化

---
### 編碼操作
- 內容編碼(壓縮)：
    - 保持實體信息原樣壓縮，由客戶端再解碼
    - 常用編碼：gzip compress deflate(zlib) identity(不進行編碼)
- 分塊傳輸編碼：
    - 將數據切分，方便逐步傳送、逐步顯示頁面，客戶端再組合
    - 每一塊用16進制來標記塊的大小
    - 實體主體最後一塊用CRLF(0)標記：TCP協議沒有標記，要應用層自己做標記

---
### 多部份對象集合：可以容納多種不同類型數據
- MIME(multiple internet mail extension):
    - 允許郵件處理文本、圖像、視頻
- HTTP同樣使用此：
    - ContentType:multipart/form-data
    - 如此可以在報文主體內包含多類型實體

---
### 內容協商
- 依據客戶端與服務器端響應內容，判斷給客戶端資源
- 通常會是響應的語言、字符集、編碼方式等判斷基準
- Accept-Charset、Accept-Encoding、Accept-Language、Content-Language
- 判斷可以由客戶端(JS)、服務器端、共同判斷

---
### Status Code:
- 1XX：informational，請求正在處理
- 2XX：成功狀態碼，代表處理完畢
- 3XX：重定向狀態碼，需要進行附加操作完成請求
- 4XX：客戶端錯誤狀態碼，服務器無法處理請求
- 5XX：服務器錯誤狀態碼，服務器處理請求錯誤
