---
title: "Python的is跟==大不同"
description: 說說Python的logic operator
date: '2020-01-19'
tags: ['Python']
---
## 正文開始
身為Python後端工程師, 使用邏輯運算子是再平常不過的場景了, 再寫東西的時候喜歡判斷None的時候用is, 其他時候使用==來判斷是否相等, 但不過都沒仔細了解下兩種運算子的差異, 今天這篇小筆記就記錄下這兩種運算子的差異吧！

---
### 觀念小百科
- id: 對同instance的唯一標誌, 可以理解成使用相同記憶體位置的人有相同id
- type: 資料結構類型
- value: 值

---
### is
- 又稱做同一運算子
- 比對相同id者方返回True
- 嚴格程度五顆星星

---
### ==
- 比較運算子
- 比對type與值是否相等
- 調用`__eq__()`方法
- 嚴格程度四顆星星

---
### 看點code
- 可變系列: 數組或字典
  ```python
  a = [1, 2 , 3]
  b = a
  # True
  print(a is b)
  # True
  print(a == b)

  b = a[:]
  # False
  print(a is b)
  # 比較下id可知道
  print(id(a))
  print(id(b))
  # True
  print(a == b)
  ```

- 不可變系列: int, str
  ```python
  a = 256
  b = 256
  # True
  print(a is b)
  print(a == b)

  a = 1000
  b = 10**3
  # True
  print(a == b)
  # False
  print(a is b)
  ```

---
### 字串與整數有時相同有時不同的說明
- Python整數物件池小百科
  - Python把常用小數字[-5, 256], 統一存儲到`small_ints`的`instance_pool`中, 所以不另外創建, 但是對於超過範圍的整數會另外創建, 所以會出現256是同物件, 但是1000卻不同的情況。
- Python字串Intern池小百科：Python編譯機制有關, 這邊可以用dis模塊來分解動作
  - 主要原因就是當執行一個腳本時, Python在編譯過程會把不同作用域的變量區分為變量與常量(global), 當相同作用域時, 僅保存一份, 因此會引用相同位址, 由此編譯特性就會出現同一運算子結果相同的情形(因為是同個人)。
  - intern特性限制在只包含`[a-zA-Z0-9_]`, 若超過此範疇, 則不適用intern特性
- 上述特性都是為了避免過度創建過多instance。

---
### dis一下, 看看編譯過程
- scripts
  ```python
  i = "1 2"
  j = "1 2"
  print(i is j)
  
  def f():
      pass
  ```
- dis results
  - 這邊可以看見2, 3在`LOAD_CONST`都是從位址0讀取的, 所以id一致
  ```
      2         0 LOAD_CONST               0 ('1 2')
                  2 STORE_NAME               0 (i)
    
      3         4 LOAD_CONST               0 ('1 2')
                  6 STORE_NAME               1 (j)
    
      5         8 LOAD_CONST               1 (<code object f at 0x00000200F257CF60, file "small_int.py", line 5>)
                 10 LOAD_CONST               2 ('f')
                 12 MAKE_FUNCTION            0
                 14 STORE_NAME               2 (f)
                 16 LOAD_CONST               3 (None)
                 18 RETURN_VALUE
    
      Disassembly of <code object f at 0x00000200F257CF60, file "small_int.py", line 5>:
      6         0 LOAD_CONST               0 (None)
                  2 RETURN_VALUE
  ```

---
### Reference
- https://juejin.im/entry/5a3b62446fb9a0451f311b5c
- https://www.cnblogs.com/luoheng23/p/11023848.html
