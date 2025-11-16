# 架构

---

## 目录 <!-- omit in toc -->

- [六边形架构](#六边形架构)
- [动机](#动机)
- [模块结构说明](#模块结构说明)
- [实践建议](#实践建议)
  - [仓储（Repository）](#仓储repository)
- [常见问题](#常见问题)
  - [如何用六边形架构生成资源（控制器、服务、DTO 等）？](#如何用六边形架构生成资源控制器服务dto-等)
- [链接](#链接)

---

## 六边形架构

本样板基于[六边形架构（Ports and Adapters）](https://en.wikipedia.org/wiki/Hexagonal_architecture_(software))。

![六边形架构示意图](https://github.com/brocoders/nestjs-boilerplate/assets/6001723/6a6a763e-d1c9-43cc-910a-617cda3a71db)

## 动机

将业务逻辑与基础设施解耦。这样可以在不触及业务层的情况下，替换数据库、文件上传方式，以及其他基础设施。

## 模块结构说明

```txt
.
├── domain
│   └── [DOMAIN_ENTITY].ts
├── dto
│   ├── create.dto.ts
│   ├── find-all.dto.ts
│   └── update.dto.ts
├── infrastructure
│   └── persistence
│       ├── document
│       │   ├── document-persistence.module.ts
│       │   ├── entities
│       │   │   └── [SCHEMA].ts
│       │   ├── mappers
│       │   │   └── [MAPPER].ts
│       │   └── repositories
│       │       └── [ADAPTER].repository.ts
│       ├── relational
│       │   ├── entities
│       │   │   └── [ENTITY].ts
│       │   ├── mappers
│       │   │   └── [MAPPER].ts
│       │   ├── relational-persistence.module.ts
│       │   └── repositories
│       │       └── [ADAPTER].repository.ts
│       └── [PORT].repository.ts
├── controller.ts
├── module.ts
└── service.ts
```

- `[DOMAIN ENTITY].ts`：领域实体，仅服务于业务逻辑，不依赖数据库或其它基础设施
- `[SCHEMA].ts`：文档型数据库（MongoDB）的数据结构
- `[ENTITY].ts`：关系型数据库（PostgreSQL）的数据结构
- `[MAPPER].ts`：数据库实体与领域实体的双向映射
- `[PORT].repository.ts`：仓储“端口”，定义数据交互接口
- `[ADAPTER].repository.ts`：仓储“适配器”，实现端口以操作具体数据库
- `infrastructure`：存放所有基础设施相关能力，如 `persistence`、`uploader`、`senders` 等。每类能力均以 Port + Adapter 组织

## 实践建议

### 仓储（Repository）

避免设计“万能查询”，因为它们在项目演进中难以扩展；用职责单一、语义明确的方法来表达查询意图。

```typescript
// ❌
export class UsersRelationalRepository implements UserRepository {
  async find(condition: UniversalConditionInterface): Promise<User> {
    // ...
  }
}

// ✅
export class UsersRelationalRepository implements UserRepository {
  async findByEmail(email: string): Promise<User> {
    // ...
  }
  async findByRoles(roles: string[]): Promise<User> {
    // ...
  }
  async findByIds(ids: string[]): Promise<User> {
    // ...
  }
}
```

---

## 常见问题

### 如何用六边形架构生成资源（控制器、服务、DTO 等）？

使用内置 [CLI](cli.zh.md) 命令可一键生成符合六边形架构的资源。

---

## 链接

- 使用 NestJS 的[依赖反转原则](https://trilon.io/blog/dependency-inversion-principle)

---

- 上一页：[安装与运行](installing-and-running.zh.md)
- 下一页：[命令行（CLI）](cli.zh.md)