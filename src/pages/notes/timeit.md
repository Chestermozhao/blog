---
title: "Mass testing with python timeit"
description: 用timeit幫助你大量測試
date: '2020-05-06'
tags: ['Python']
---
## Timeit幫助大量測試
時常在code優化或重構時, 需要對兩種版本的內容做測試, 而timeit擴展可以方便讓我們對不同版本的代碼內容做大量測試。
此公開庫為Python內置庫, 無需另外install便可直接使用, 主要有幾種使用方式。
1. 測試單一語句。`python3 -m timeit '"-".join(str(n) for n in range(100))'`
2. 引入依賴在python腳本內測試。`import timeit`
無論透過命令行或者在腳本內處理, timeit都提供更多的支持, 將再下面說說。

---
### 在命令行大量測試
- 測試次數: `-n, --number`
- 重複次數: `-r, --repeat`, default is 3
- 初始化或環境導入語句: `-s, --setup`
- 進程時間: `-p, --process`
- 輸出時間單位: `-u, --unit`

---
### 在腳本中三格常用函數與公共class
- 常用函數
1. `timeit.timeit`
  - `stmt`: 需要測試的語句或函數
  - `setup`: 初始化需要的語句
  - `timer`: 計時函數
  - `number`: 函數執行的次數

2. `timeit.repeat`
  - `stmt`: 需要測試的語句或函數
  - `setup`: 初始化需要的語句
  - `timer`: 計時函數
  - `repeat`: 重複測試次數
  - `number`: 函數執行的次數

3. `timeit.default_timer`
  - 計時器

- 公共class與class function
- class timeit.Timer(stmt, setup, timer)
  - timeit
  - repaet
  - print_exc
- 使用範例
`timeit.Timer('for i in range(10):oct(i)', 'gc.enable()').timeit()`

---
### Reference
- https://docs.python.org/zh-cn/3.8/library/timeit.html
- https://www.zybuluo.com/kingwhite/note/138504
