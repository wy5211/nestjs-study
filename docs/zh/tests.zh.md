# 测试

## 目录 <!-- omit in toc -->

- [单元测试](#单元测试)
- [端到端测试（E2E）](#端到端测试e2e)
- [在 Docker 中运行测试](#在-docker-中运行测试)
  - [关系型数据库](#关系型数据库)
  - [文档型数据库](#文档型数据库)

## 单元测试

```bash
npm run test
```

## 端到端测试（E2E）

```bash
npm run test:e2e
```

## 在 Docker 中运行测试

### 关系型数据库

```bash
npm run test:e2e:relational:docker
```

### 文档型数据库

```bash
npm run test:e2e:document:docker
```

---

- 上一页：[文件上传](file-uploading.zh.md)
- 下一页：[压测](benchmarking.zh.md)
