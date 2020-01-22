---
title: "Redis Expire with Python"
description: redis的過期魔法
date: '2020-01-22'
tags: ['Python']
---
## Redis竟然可以使用過期魔法？
Redis作為常見的緩存資料庫，他的高效與透過主從備份實現的高可用方案都已經為人熟知，這次主要介紹下Redis如何設定key的過期時間，讓被訪問頻次較低的資料可以被刪除，避免浪費存儲空間。

---
### 過期魔法: EXPIRE
- 從文檔就可以看見
  - Redis默認插入是沒有默認過期時間的，也就是你不刪除他就一直存在
  - 對於最基礎的資料結構(鍵值對)
    - 可以於插入時候指定`ex=<second>`, `px=<msecond>`, 簡單指定過期時間
    - `SETEX <key> <second> <value>`也可以是你的好朋友
    - `PSETEX <key> <msecond> <value>`也可以是你的好朋友
  - 對於其他資料結構(hash table, set table...)
    - 透過`expire key <second>`, `pexpire key <msecond>`指定過期時間
    - 目前對於hash table沒有辦法對hash_key指定過期時間，主流做法是將hash_key設置爲時間戳，透過排程腳本將過期者刪除

---
### 魔法的眼鏡TTL
- TTL key
  - response:
    - `>0`: 剩餘秒數
    - `-1`: 沒設定過期時間
    - `-2`: key不存在

---
### 你不要走之我們回得去？PERSIST
- PERSIST KEY
  - response
    - `0`: 原本就沒過期時間，或根本不存在此key
    - `1`: 成功
- TTL key
  - 應該就是-1喔～

---
### Python是你的小魔杖
```python
from redis import StrictRedis
# redis://[:password@]host[:port][/database]
redis_url = "redis://localhost:6379/0"
redis_instance = StrictRedis.from_url(redis_url)

# set with ex, px
# nx: 只在不存在時作用
# xx: 只在存在時作用
redis_instance.set("test", "apple", ex=10)

# 上面命令等價於此
redis_instance.setex("test", 10, "apple")

# 其他資料結構的過期魔法
redis_instance.hset("fruit", "timestamp", "apple1")
redis_instance.expire("fruit", 10)

# 如果要在hash table自己製作hash key過期魔法
# 把timestamp字串改成真的timestamp
# 如果量很大可以用pipeline處理
objs = redis_instance.hgetall("fruit")
for k, v in objs.items():
    timedelta = now() - k
    if timedelta > 2days:
        redis_instance.hdel("fruit", k)

# 永恆魔法
redis_instance.persist("fruit")

# 魔法的眼鏡
redis_instance.ttl("fruit")
```

---
### Reference
