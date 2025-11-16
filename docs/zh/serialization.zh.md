# 序列化

样板使用 [class-transformer](https://www.npmjs.com/package/class-transformer) 与全局拦截器 `ClassSerializerInterceptor` 实现序列化。

---

## 目录 <!-- omit in toc -->

- [隐藏敏感字段](#隐藏敏感字段)
- [仅对管理员展示私有字段](#仅对管理员展示私有字段)

---

## 隐藏敏感字段

在需要隐藏的字段上使用 `@Exclude({ toPlainOnly: true })`。

```ts
// /src/users/entities/user.entity.ts
import { Exclude } from 'class-transformer';

@Entity()
export class User extends EntityRelationalHelper {
  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  password: string;
}
```

## 仅对管理员展示私有字段

1. 在仅管理员能访问的控制器方法上添加 `@SerializeOptions({ groups: ['admin'] })`：

```ts
// /src/users/users.controller.ts
@ApiBearerAuth()
@Roles(RoleEnum.admin)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @SerializeOptions({ groups: ['admin'] })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne({ id: +id });
  }
}
```

2. 在实体上对需暴露给管理员的字段添加 `@Expose({ groups: ['admin'] })`：

```ts
// /src/users/entities/user.entity.ts
import { Expose } from 'class-transformer';

@Entity()
export class User extends EntityRelationalHelper {
  @Column({ unique: true, nullable: true })
  @Expose({ groups: ['admin'] })
  email: string | null;
}
```

---

- 上一页：[认证](auth.zh.md)
- 下一页：[文件上传](file-uploading.zh.md)
