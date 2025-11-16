# 数据库

## 目录 <!-- omit in toc -->

- [关于数据库选择](#关于数据库选择)
- [数据库结构（TypeORM）](#数据库结构typeorm)
  - [生成迁移](#生成迁移)
  - [运行迁移](#运行迁移)
  - [回滚迁移](#回滚迁移)
  - [删除所有表](#删除所有表)
- [数据库结构（Mongoose）](#数据库结构mongoose)
  - [创建 Schema](#创建-schema)
- [数据播种（TypeORM）](#数据播种typeorm)
  - [创建种子（TypeORM）](#创建种子typeorm)
  - [运行种子（TypeORM）](#运行种子typeorm)
  - [工厂与 Faker（TypeORM）](#工厂与-fakertypeorm)
- [数据播种（Mongoose）](#数据播种mongoose)
  - [创建种子（Mongoose）](#创建种子mongoose)
  - [运行种子（Mongoose）](#运行种子mongoose)
- [性能优化（PostgreSQL + TypeORM）](#性能优化postgresql--typeorm)
  - [索引与外键](#索引与外键)
  - [最大连接数](#最大连接数)
- [性能优化（MongoDB + Mongoose）](#性能优化mongodb--mongoose)
  - [Schema 设计](#schema-设计)
- [PostgreSQL 切换到 MySQL](#postgresql-切换到-mysql)

---

## 关于数据库选择

样板支持两类数据库：使用 TypeORM 的 PostgreSQL 与使用 Mongoose 的 MongoDB。可按业务需求选择其一或同时支持两者。两类数据库的并存由[六边形架构](architecture.md#hexagonal-architecture)实现。

## 数据库结构（TypeORM）

### 生成迁移

1. 新建实体文件（`.entity.ts`），例如 `post.entity.ts`：

```ts
// /src/posts/infrastructure/persistence/relational/entities/post.entity.ts
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity()
export class Post extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;

  // 需要的其它字段
}
```

2. 生成迁移文件：

```bash
npm run migration:generate -- src/database/migrations/CreatePostTable
```

3. 应用迁移到数据库：见[运行迁移](#运行迁移)

### 运行迁移

```bash
npm run migration:run
```

### 回滚迁移

```bash
npm run migration:revert
```

### 删除所有表

```bash
npm run schema:drop
```

---

## 数据库结构（Mongoose）

### 创建 Schema

1. 新建文档实体文件（`.schema.ts`），例如 `post.schema.ts`：

```ts
// /src/posts/infrastructure/persistence/document/entities/post.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostSchemaDocument = HydratedDocument<PostSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true, getters: true },
})
export class PostSchemaClass extends EntityDocumentHelper {
  @Prop()
  title: string;

  @Prop()
  body: string;

  // 需要的其它字段
}

export const PostSchema = SchemaFactory.createForClass(PostSchemaClass);
```

---

## 数据播种（TypeORM）

### 创建种子（TypeORM）

1. 创建种子：

```bash
npm run seed:create:relational -- --name Post
```

2. 进入 `src/database/seeds/relational/post/post-seed.service.ts` 补充逻辑
3. 在 `run` 方法中实现写入
4. 运行：[npm run seed:run:relational](#运行种子typeorm)

### 运行种子（TypeORM）

```bash
npm run seed:run:relational
```

### 工厂与 Faker（TypeORM）

1. 安装 faker：

```bash
npm i --save-dev @faker-js/faker
```

2. 新建 `src/database/seeds/relational/user/user.factory.ts` 并按需生成用户：

```ts
import { faker } from '@faker-js/faker';
import { RoleEnum } from '../../../../roles/roles.enum';
import { StatusEnum } from '../../../../statuses/statuses.enum';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from '../../../../roles/infrastructure/persistence/relational/entities/role.entity';
import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { StatusEntity } from '../../../../statuses/infrastructure/persistence/relational/entities/status.entity';

@Injectable()
export class UserFactory {
  constructor(
    @InjectRepository(UserEntity) private repositoryUser: Repository<UserEntity>,
    @InjectRepository(RoleEntity) private repositoryRole: Repository<RoleEntity>,
    @InjectRepository(StatusEntity) private repositoryStatus: Repository<StatusEntity>,
  ) {}

  createRandomUser() {
    return () => {
      return this.repositoryUser.create({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: this.repositoryRole.create({ id: RoleEnum.user, name: 'User' }),
        status: this.repositoryStatus.create({ id: StatusEnum.active, name: 'Active' }),
      });
    };
  }
}
```

3. 在 `user-seed.service.ts` 中使用工厂批量生成：

```ts
import { UserFactory } from './user.factory';
import { faker } from '@faker-js/faker';

@Injectable()
export class UserSeedService {
  constructor(private userFactory: UserFactory) {}

  async run() {
    await this.repository.save(
      faker.helpers.multiple(this.userFactory.createRandomUser(), { count: 5 }),
    );
  }
}
```

4. 在 `user-seed.module.ts` 中导入需要的实体并注册提供者

5. 最终运行：

```bash
npm run seed:run
```

---

## 数据播种（Mongoose）

### 创建种子（Mongoose）

1. 创建种子：

```bash
npm run seed:create:document -- --name Post
```

2. 在 `src/database/seeds/document/post/post-seed.service.ts` 中实现逻辑
3. 运行：[npm run seed:run:document](#运行种子mongoose)

### 运行种子（Mongoose）

```bash
npm run seed:run:document
```

---

## 性能优化（PostgreSQL + TypeORM）

### 索引与外键

PostgreSQL 默认不会为外键自动创建索引，必要时请手动添加。
参考：<https://stackoverflow.com/a/970605/18140714>

### 最大连接数

在 `/.env` 中设置应用的数据库最大连接数（并发连接容量）：

```txt
DATABASE_MAX_CONNECTIONS=100
```

## 性能优化（MongoDB + Mongoose）

### Schema 设计

MongoDB 的 Schema 设计与关系型数据库差异较大。建议参考：

1. [MongoDB Schema Design Anti-Patterns](https://www.mongodb.com/developer/products/mongodb/schema-design-anti-pattern-massive-arrays)
2. [MongoDB Schema Design Best Practices](https://www.mongodb.com/developer/products/mongodb/mongodb-schema-design-best-practices/)

## PostgreSQL 切换到 MySQL

按照[安装与运行](installing-and-running.md)完整流程准备好工程后，进行如下改动即可替换数据库：

**修改 `.env`：**

```env
DATABASE_TYPE=mysql
# 本机运行用 localhost；容器内运行可用 mysql
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USERNAME=root
DATABASE_PASSWORD=secret
DATABASE_NAME=app
```

**修改 `docker-compose.yml`：**

```yml
services:
  mysql:
    image: mysql:9.2.0
    ports:
      - ${DATABASE_PORT}:3306
    volumes:
      - mysql-boilerplate-db:/var/lib/mysql
    environment:
      MYSQL_USER: ${DATABASE_USERNAME}
      MYSQL_PASSWORD: ${DATABASE_PASSWORD}
      MYSQL_ROOT_PASSWORD: ${DATABASE_PASSWORD}
      MYSQL_DATABASE: ${DATABASE_NAME}

  # 其它服务...

volumes:
  # 其它卷...
  mysql-boilerplate-db:
```

**运行 Docker：**

```bash
docker compose up -d mysql adminer maildev
```

**安装 MySQL 客户端：**

```bash
npm i mysql2 --save
```

**重新生成并应用迁移：**

```bash
npm run migration:generate -- src/database/migrations/newMigration --pretty=true
npm run migration:run
```

**运行种子与开发模式：**

```bash
npm run seed:run:relational
npm run start:dev
```

打开 <http://localhost:3000>

Adminer 访问：<http://localhost:8080>

---

- 上一页：[命令行（CLI）](cli.zh.md)
- 下一页：[认证](auth.zh.md)
