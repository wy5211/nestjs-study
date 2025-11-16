# 安装与运行

NestJS Boilerplate 同时支持 [TypeORM](https://www.npmjs.com/package/typeorm) 与 [Mongoose](https://www.npmjs.com/package/mongoose)。默认情况下，TypeORM 使用 [PostgreSQL](https://www.postgresql.org/) 作为主数据库，你也可以替换为其他关系型数据库。

两种数据库的切换基于[六边形架构](architecture.md#hexagonal-architecture)，这让你能在不改动业务的前提下切换数据访问层。

---

## 目录 <!-- omit in toc -->

- [舒适的开发模式（PostgreSQL + TypeORM）](#舒适的开发模式postgresql--typeorm)
  - [视频指南（PostgreSQL + TypeORM）](#视频指南postgresql--typeorm)
- [舒适的开发模式（MongoDB + Mongoose）](#舒适的开发模式mongodb--mongoose)
- [快速运行（PostgreSQL + TypeORM）](#快速运行postgresql--typeorm)
- [快速运行（MongoDB + Mongoose）](#快速运行mongodb--mongoose)
- [常用链接](#常用链接)

---

## 舒适的开发模式（PostgreSQL + TypeORM）

1. 克隆代码仓库

   ```bash
   git clone --depth 1 https://github.com/brocoders/nestjs-boilerplate.git my-app
   ```

2. 进入目录并复制环境变量文件

   ```bash
   cd my-app/
   cp env-example-relational .env
   ```

3. 修改本机连接配置

   - 将 `DATABASE_HOST=postgres` 改为 `DATABASE_HOST=localhost`
   - 将 `MAIL_HOST=maildev` 改为 `MAIL_HOST=localhost`

4. 启动依赖容器（数据库、Adminer、Maildev）

   ```bash
   docker compose up -d postgres adminer maildev
   ```

5. 安装依赖

   ```bash
   npm install
   ```

6. 初始化项目（首次运行）

   ```bash
   npm run app:config
   ```

7. 运行数据库迁移

   ```bash
   npm run migration:run
   ```

8. 运行种子数据

   ```bash
   npm run seed:run:relational
   ```

9. 启动开发模式（热更新）

   ```bash
   npm run start:dev
   ```

10. 打开 <http://localhost:3000>

### 视频指南（PostgreSQL + TypeORM）

<https://github.com/user-attachments/assets/136a16aa-f94a-4b20-8eaf-6b4262964315>

---

## 舒适的开发模式（MongoDB + Mongoose）

1. 克隆代码仓库

   ```bash
   git clone --depth 1 https://github.com/brocoders/nestjs-boilerplate.git my-app
   ```

2. 进入目录并复制环境变量文件

   ```bash
   cd my-app/
   cp env-example-document .env
   ```

3. 修改本机 MongoDB 连接配置

   - 将 `DATABASE_URL=mongodb://mongo:27017` 改为 `DATABASE_URL=mongodb://localhost:27017`

4. 启动依赖容器（Mongo、Mongo Express、Maildev）

   ```bash
   docker compose -f docker-compose.document.yaml up -d mongo mongo-express maildev
   ```

5. 安装依赖

   ```bash
   npm install
   ```

6. 初始化项目（首次运行）

   ```bash
   npm run app:config
   ```

7. 运行种子数据

   ```bash
   npm run seed:run:document
   ```

8. 启动开发模式（热更新）

   ```bash
   npm run start:dev
   ```

9. 打开 <http://localhost:3000>

---

## 快速运行（PostgreSQL + TypeORM）

1. 克隆仓库并复制 `.env`

   ```bash
   git clone --depth 1 https://github.com/brocoders/nestjs-boilerplate.git my-app
   cd my-app/
   cp env-example-relational .env
   ```

2. 启动所有容器

   ```bash
   docker compose up -d
   ```

3. 查看容器日志

   ```bash
   docker compose logs
   ```

4. 打开 <http://localhost:3000>

---

## 快速运行（MongoDB + Mongoose）

1. 克隆仓库并复制 `.env`

   ```bash
   git clone --depth 1 https://github.com/brocoders/nestjs-boilerplate.git my-app
   cd my-app/
   cp env-example-document .env
   ```

2. 启动所有容器

   ```bash
   docker compose -f docker-compose.document.yaml up -d
   ```

3. 查看容器日志

   ```bash
   docker compose -f docker-compose.document.yaml logs
   ```

4. 打开 <http://localhost:3000>

---

## 常用链接

- Swagger（API 文档）：<http://localhost:3000/docs>
- Adminer（数据库客户端）：<http://localhost:8080>
- Mongo Express（MongoDB 客户端）：<http://localhost:8081/>
- Maildev（开发用邮件收件箱）：<http://localhost:1080>

---

- 上一页：[介绍](introduction.zh.md)
- 下一页：[架构](architecture.zh.md)