---
title: "Coffee script Note"
description: coffee script note
date: '2019-07-09'
tags: ['Javascript']
---
## [CoffeeScript](https://coffeescript.org/)：JS子集？ &nbsp;
### 安裝
- `npm install --save-dev coffeescript`

---
### 優劣分析
- 優點
    - 同樣調用JavaScript方法與擴展
    - 開發速度更快
    - 可讀性更高
    - 自動識別作用域: 不會覆蓋全局變量
- 缺點
    - Debug 相對不易
    - 迭代快速，代碼調整頻率高

---
### 註釋
- Javascript
    ```javascript
    //單行註釋
    /*多行註釋*/
    ```
- Coffeescript
    ```coffeescript
    # 單行註釋
    ###多行註釋###
    ```

---
### 變量
- Javascript
    ```javascript
    var x, y, z;

    x = 3;
    y = "Hello";
    z = true;
    ```
- Coffeescript
    ```coffeescript
    x = 3
    y = "Hello"
    z = true
    ```

---
### 運算子
- Javascript
    ```javascript
    Math.pow(a, b);  /* a to the power of b */

    Math.floor(a / b);  /* to get the largest integer of a / b */

    (+a % (b = +b) + b) % b  /* get the remainder of a / b + b and divide it by b */
    ```
- Coffeescript
    ```coffeescript
    a ** b
    a // b
    a %% b
    ```

---
### 判斷
- Javascript
    ```javascript
    if (x === 3) {
        alert(x);
    } else if (x === 4) {
        alert(x - 5);
    } else {
        alert(x - 3);
    }
    ```
    ```javascript
    var x, b;
    if (b !== true)
    { x = 5; }
    ```
- Coffeescript
    ```coffeescript
    if x is 3
      alert x
    else if x is 4
      alert x - 5
    else
      alert x - 3
    ```
    ```coffeescript
    x = 5 unless b is true
    ```

---
### 比較運算子
- Javascript
    ```javascript
    === //全等
    !== //不等於
    !   //反
    ||  //或
    &&  //及
    true //真
    false //假
    ```
- Coffeescript
    ```coffeescript
    is
    isnt
    not
    or
    and
    true, yes, off
    false, no, off
    ```

---
### 函數定義
- Javascript
    ```javascript
    var dog;
    dog = function(shout) {
        return alert(shout);
    };
    dog("woof"); /* Alerts woof /*
    ```
    ```javascript
    dog = -> alert "woof"
    ```
- Coffeescript
    ```coffeescript
    dog = (shout)->
      alert shout
    dog "woof" # Alerts woof
    ```
    ```coffeescript
    dog = -> alert "woof"
    ```

---
### 數據結構
- String
    - 字串串接:
        - Javascript
        ```javascript
        var animal;
        animal = "Pig";
        "Everyone petted my pet " + animal;
        ```
        - Coffeescript
        ```coffeescript
        animal = "Pig"
        "Everyone petted my pet #{animal}"
        ```
- Array
    - 列表串接與複製
        - Javascript
         ```javascript
         middle = numbers.slice(2, -2);
         [].splice.apply(numbers, [3, 4].concat(ref = [-3, -4, -5, -6])), ref;
        ```
        - Coffeescript
        ```coffeescript
        middle = numbers[2...-2]
        numbers[3..5] = [-3, -4, -5] **### Replaces numbers 3 to 5 with [-3,-4,-5] ###**
        ```

---
### 循環: 可以類似列表推導式使用單行語法
- 剩餘運算子
    ```coffeescript
    animals = ["Pig", "Duck", "Bird", "Cat"]
    farm(first, second, rest...)->
    inTheMud = "The #{first} is playing in the mud" # The Pig is playing in the mud
    inTheLake = "The #{second} is in the lake" # The Duck is in the lake
    sleeping = "These #{rest} are all sleeping"
    
    farm animals... # Calling function with the animal array
    alert inTheMud
    alert inTheLake
    alert sleeping
    ```
- While
    ```coffeescript
    # one line while loop
    eat food while hungry
    # multi lines while loop
    num = 6
    lyrics = while num -= 1 # multi line while loop
    "#{num} little monkeys, jumping on the bed. One fell out and bumped his head."
    ```
- For loop
    ```coffeescript
    for toys in toysrus # for key in array
        do (toys)-> # do if there are toys
            alert "Im gonna play with #{toys}"
    # one line for loop
    alert "#{number} is #{position}" for number, position in ["one", "two", "three"]
    
    # set range steps
    evens  = (num for num in [1..10] by  2)
    ```

---
### 物件
- Javascript
    ```javascript
    bankDetails = {
        Nathan: {
            card_number: 12040590,
            balance: 20000
        },
        Sharon: {
            card_number: 24843950,
            balance: 10000
        }
    };
    ```
- Coffeescript
    ```coffeescript
    bankDetails = # master object
        Nathan: # parent object
            card_number: 12040590 # child object
            balance: 20000 # child object
        Sharon: # notice out dent for new parent object
            card_number: 24843950 # child object
            balance: 10000 # child object
    ```

---
### [類](https://learncoffeescript.wordpress.com/2015/03/28/learn-coffeescript-part-7-objects-and-classes/)
- `@` this
- `class  Circle  extends  Shape` 繼承
- `::` set prototye

---
### 學習資源
- [Coffee Script](https://learncoffeescript.wordpress.com/)
