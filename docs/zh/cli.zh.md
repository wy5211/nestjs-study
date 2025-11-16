# 命令行（CLI）

---

## 目录 <!-- omit in toc -->

- [生成资源](#生成资源)
  - [面向文档型数据库（MongoDB + Mongoose）](#面向文档型数据库mongodb--mongoose)
  - [面向关系型数据库（PostgreSQL + TypeORM）](#面向关系型数据库postgresql--typeorm)
    - [视频指南（PostgreSQL + TypeORM）](#视频指南postgresql--typeorm)
  - [同时为两类数据库生成](#同时为两类数据库生成)
- [为资源添加属性](#为资源添加属性)
  - [文档型数据库的属性（MongoDB + Mongoose）](#文档型数据库的属性mongodb--mongoose)
  - [关系型数据库的属性（PostgreSQL + TypeORM）](#关系型数据库的属性postgresql--typeorm)
    - [视频指南：在关系型数据库中添加属性](#视频指南在关系型数据库中添加属性)
  - [同时为两类数据库添加属性](#同时为两类数据库添加属性)

---

## 生成资源

使用以下命令生成资源：

### 面向文档型数据库（MongoDB + Mongoose）

```bash
npm run generate:resource:document -- --name ResourceName
```

示例：

```bash
npm run generate:resource:document -- --name Category
```

### 面向关系型数据库（PostgreSQL + TypeORM）

```bash
npm run generate:resource:relational -- --name ResourceName
```

示例：

```bash
npm run generate:resource:relational -- --name Category
```

#### 视频指南（PostgreSQL + TypeORM）

<https://github.com/user-attachments/assets/f7f91a7d-f9ff-4653-a78a-152ac5e7a95d>

### 同时为两类数据库生成

```bash
npm run generate:resource:all-db -- --name ResourceName
```

示例：

```bash
npm run generate:resource:all-db -- --name Category
```

## 为资源添加属性

### 文档型数据库的属性（MongoDB + Mongoose）

```bash
npm run add:property:to-document
```

### 关系型数据库的属性（PostgreSQL + TypeORM）

```bash
npm run add:property:to-relational
```

#### 视频指南：在关系型数据库中添加属性

<https://github.com/user-attachments/assets/95b9d70a-70cf-442a-b8bf-a73d32810e0c>

### 同时为两类数据库添加属性

```bash
npm run add:property:to-all-db
```

---

- 上一页：[架构](architecture.zh.md)
- 下一页：[数据库](database.zh.md)
