---
title: SQL复习
date: 2017-6-3
categories: 计算机基础
---

## Basis

### Basic Usage

```sql
/* Select */
SELECT column_name,column_name
FROM table_name;

SELECT * FROM table_name;

/* Insert */
INSERT INTO table_name
VALUES (value1,value2,value3,...);

INSERT INTO table_name (column1,column2,column3,...)
VALUES (value1,value2,value3,...);

/* Update */
UPDATE table_name
SET column1=value1,column2=value2,...
WHERE some_column=some_value;

/* Delete */
DELETE FROM table_name
WHERE some_column=some_value;
```

### Where

```sql
SELECT column_name,column_name
FROM table_name
WHERE column_name operator value;
```

### Distinct

Choose the only one

```sql
SELECT DISTINCT column_name,column_name
FROM table_name;
```

### Order by

```sql
SELECT column_name,column_name
FROM table_name
ORDER BY column_name,column_name ASC|DESC;
```

Note that **ASC** is the default way.

---

## Advanced

### 演示数据库说明

#### Websites表

```
+----+--------------+---------------------------+-------+---------+
| id | name         | url                       | alexa | country |
+----+--------------+---------------------------+-------+---------+
| 1  | Google       | https://www.google.cm/    | 1     | USA     |
| 2  | 淘宝          | https://www.taobao.com/   | 13    | CN      |
| 3  | 菜鸟教程      | http://www.runoob.com/    | 4689  | CN      |
| 4  | 微博          | http://weibo.com/         | 20    | CN      |
| 5  | Facebook     | https://www.facebook.com/ | 3     | USA     |
| 7  | stackoverflow | http://stackoverflow.com/ |   0 | IND     |
+----+---------------+---------------------------+-------+---------+
```

#### Access_log 表

```
+-----+---------+-------+------------+
| aid | site_id | count | date       |
+-----+---------+-------+------------+
|   1 |       1 |    45 | 2016-05-10 |
|   2 |       3 |   100 | 2016-05-13 |
|   3 |       1 |   230 | 2016-05-14 |
|   4 |       2 |    10 | 2016-05-14 |
|   5 |       5 |   205 | 2016-05-14 |
|   6 |       4 |    13 | 2016-05-15 |
|   7 |       3 |   220 | 2016-05-15 |
|   8 |       5 |   545 | 2016-05-16 |
|   9 |       3 |   201 | 2016-05-17 |
+-----+---------+-------+------------+
```

#### apps表

```
+----+------------+-------------------------+---------+
| id | app_name   | url                     | country |
+----+------------+-------------------------+---------+
|  1 | QQ APP     | http://im.qq.com/       | CN      |
|  2 | 微博 APP | http://weibo.com/       | CN      |
|  3 | 淘宝 APP | https://www.taobao.com/ | CN      |
+----+------------+-------------------------+---------+
```

### 通配符

在 SQL 中，通配符与 SQL LIKE 操作符一起使用，SQL 通配符用于搜索表中的数据。

| 通配符             | 描述            |
| --------------- | ------------- |
| _               | 代替一个字符        |
| %               | 代替0或多个字符      |
| [字符串]           | 字符串中的任意一个字符   |
| [^字符串] 或 [!字符串] | 不在字符串中的任意一个字符 |

```sql
SELECT * FROM Websites
WHERE url LIKE 'https%';
```

### 正则表达式

```sql
/* 正则表达式匹配 */
SELECT * FROM Websites
WHERE name REGEXP '^[GFs]';

/* 正则表达式匹配 否定形式 */
SELECT * FROM Websites
WHERE name NOT REGEXP '^[GFs]';
```

### IN

IN 操作符允许您在 **WHERE** 子句中**规定多个值**。

```sql
SELECT * FROM Websites
WHERE name IN ('Google','菜鸟教程');
```

### BETWEEN

BETWEEN 操作符用于选取介于两个值之间的数据范围内的值。

```sql
SELECT column_name(s)
FROM table_name
WHERE column_name BETWEEN value1 AND value2;
```

### AS

通过使用 SQL，可以为表名称或列名称指定别名。

```sql
SELECT column_name AS alias_name
FROM table_name;
```

### JOIN

#### INNER JOIN

![SQL INNER JOIN](http://www.runoob.com/wp-content/uploads/2013/09/img_innerjoin.gif)

语法如下：

```sql
SELECT column_name(s)
FROM table1
INNER JOIN table2
ON table1.column_name=table2.column_name;

/*或者*/
SELECT column_name(s)
FROM table1
JOIN table2
ON table1.column_name=table2.column_name;

/* 实例 */
SELECT Websites.name, access_log.count, access_log.date
FROM Websites
INNER JOIN access_log
ON Websites.id=access_log.site_id
ORDER BY access_log.count;
```

举例如下：

![img](http://www.runoob.com/wp-content/uploads/2013/09/inner-join1.jpg)

#### LEFT JOIN

LEFT JOIN 关键字从**左表（table1）返回所有的行**，即使右表（table2）中没有匹配。如果右表中**没有匹配**，则结果**为** **NULL**。**(RIGHT JOIN 则相反)**

![SQL LEFT JOIN](http://www.runoob.com/wp-content/uploads/2013/09/img_leftjoin.gif)

```sql
SELECT column_name(s)
FROM table1
LEFT JOIN table2
ON table1.column_name=table2.column_name;
```

![img](http://www.runoob.com/wp-content/uploads/2013/09/left-join1.jpg)

#### FULL OUTER JOIN

FULL OUTER JOIN 关键字只要左表（table1）和右表（table2）其中一个表中存在匹配，则返回行。

![SQL FULL OUTER JOIN](http://www.runoob.com/wp-content/uploads/2013/09/img_fulljoin.gif)

```sql
SELECT column_name(s)
FROM table1
FULL OUTER JOIN table2
ON table1.column_name=table2.column_name;
```

### UNION

UNION 操作符用于合并两个或多个 SELECT 语句的结果集。

**Attention：** UNION 内部的每个 SELECT 语句必须拥有相同数量的列。列也必须拥有相似的数据类型。同时，每个 SELECT 语句中的列的顺序必须相同。

```sql
SELECT column_name(s) FROM table1
UNION
SELECT column_name(s) FROM table2;

/*默认地，UNION 操作符选取不同的值。如果允许重复的值，请使用 UNION ALL。*/
SELECT column_name(s) FROM table1
UNION ALL
SELECT column_name(s) FROM table2;
```

![img](http://www.runoob.com/wp-content/uploads/2013/09/union1.jpg)![img](http://www.runoob.com/wp-content/uploads/2013/09/union2.jpg)

另外，带where的union all会这样：

![img](http://www.runoob.com/wp-content/uploads/2013/09/AAA99C7B-36A5-43FB-B489-F8CE63B62C71.jpg)

### INSERT INTO SELECT

INSERT INTO SELECT 语句从一个表复制数据，然后把数据插入到一个已存在的表中。目标表中任何已存在的行都不会受影响。

```sql
INSERT INTO table2
(column_name(s))
SELECT column_name(s)
FROM table1;
```

### EXISTS

结果集是否为空。比如说，选出有人访问的网站：

```sql
SELECT * FROM Websites
WHERE EXISTS (SELECT * FROM access_log
             WHERE access_log.site_id = Websites.id)
```

还有NOT EXISTS搭配使用。

---

## SQL Function

### GROUP BY

GROUP BY 语句用于**结合聚合函数**，根据一个或多个列对结果集进行分组。

```sql
SELECT column_name, aggregate_function(column_name)
FROM table_name
WHERE column_name operator value
GROUP BY column_name;
```

![img](http://www.runoob.com/wp-content/uploads/2013/09/groupby1.jpg)

### HAVING

在 SQL 中增加 HAVING 子句原因是，**WHERE 关键字无法与聚合函数一起使用**。

HAVING 子句可以让我们**筛选分组后的各组数据**。

```sql
SELECT column_name, aggregate_function(column_name)
FROM table_name
WHERE column_name operator value
GROUP BY column_name
HAVING aggregate_function(column_name) operator value;
```

查找访问量大于200的网站

```sql
SELECT Websites.name, Websites.url, SUM(access_log.count) AS nums FROM (access_log
INNER JOIN Websites
ON access_log.site_id=Websites.id)
GROUP BY Websites.name
HAVING SUM(access_log.count) > 200;
```

### 聚合(Aggregate)函数

SQL Aggregate 函数计算从列中取得的值，返回一个单一的值。

有用的 Aggregate 函数：

- AVG() - 返回平均值
- COUNT() - 返回行数
- FIRST() - 返回第一个记录的值
- LAST() - 返回最后一个记录的值
- MAX() - 返回最大值
- MIN() - 返回最小值
- SUM() - 返回总和