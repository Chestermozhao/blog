---
title: "Redis Pub/Sub"
description: redis訂閱與發布
date: '2019-06-28'
tags: ['Python']
---
## Redis Pub / Sub&nbsp;
![sub channel](https://redisbook.readthedocs.io/en/latest/_images/graphviz-58f7b1f1f52b28f59291d194555fc9f4b1462a4c.svg)
![pub push](https://redisbook.readthedocs.io/en/latest/_images/graphviz-84c95abf88d6c0ac55b007da08805a4b9a582fdf.svg)
- 重要名詞
    - 通道(channel): 可以想像成頻道，只有發布方插入的頻道與訂閱方監聽的頻道相同才能實現消息訂閱
    - 發布方(pub): 往頻道插入消息的人
    - 訂閱方(sub): 監聽頻道消息的人
- Redis發送Message Queue實現 pub / sub
    - 發布方在通道插入訊息
    - 訂閱方透過監聽取得通道訊息

---
### [Redis Command Line](https://www.tutorialspoint.com/redis/pub_sub_psubscribe.htm)
- PSUBSCRIBE pattern: 訂閱符合pattern的頻道
- PUBSUB subcommand: 返回正在使用的頻道列表
- PUBLISH channel message: 發布消息到頻道
- PUNSUBSCRIBE pattern: 取消訂閱符合pattern的頻道
- SUBSCRIBE channel: 訂閱頻道
- UNSUBSCRIBE channel: 取消訂閱頻道

---
### [Python實現](https://blog.csdn.net/liao392781/article/details/81180999)
#### Pub(發布)
   ```python
   #coding:utf-8
   import redis
   
   news_lst = ['300033', '300032', '300031', '300030']
   # 連上redis使用第三張表
   rc = redis.StrictRedis(host='***', port='6379', db=3, password='********')
   for news in news_lst:
    rc.publish("chester", news) #發布news到chester頻道
   ```

#### Sub(訂閱)
```python
#coding:utf-8
import redis
rc = redis.StrictRedis(host='****', port='6379', db=3, password='******')
ps = rc.pubsub()
ps.subscribe('chester') #訂閱chester頻道的消息
for item in ps.listen(): #監聽：一有消息就觸發
    if item['type'] == 'message':
        print item['channel']
        print item['data']
```

#### 取消訂閱
```python
#coding:utf-8
import redis
rc = redis.StrictRedis(host='****', port='6379', db=3, password='******')
ps = rc.pubsub()
ps.unsubscribe('chester') #取消訂閱chester頻道
```
---
### Reference
- [https://redisbook.readthedocs.io/en/latest/feature/pubsub.html](https://redisbook.readthedocs.io/en/latest/feature/pubsub.html)
- [https://blog.csdn.net/liao392781/article/details/81180999](https://blog.csdn.net/liao392781/article/details/81180999)
- [https://www.tutorialspoint.com/redis/redis_pub_sub.htm](https://www.tutorialspoint.com/redis/redis_pub_sub.htm)
