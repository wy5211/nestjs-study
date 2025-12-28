import { Exclude, Expose } from 'class-transformer';
import { FileType } from '../../files/domain/file';
import { Role } from '../../roles/domain/role';
import { Status } from '../../statuses/domain/status';
import { ApiProperty } from '@nestjs/swagger';

const idType = Number;

/*
  domain ：领域模型（业务核心模型）
  - 表达的是 业务世界里的“用户” ，跟数据库、HTTP 请求无关。
  - 一般是一个干净的类，字段是业务关心的属性（id、email、role、status 等）。
  - 不带 TypeORM、Swagger、class-validator 等框架装饰器。
  - 只关心“用户是什么”“用户能做什么”，是 业务逻辑的心脏 。

  可以理解为：
    domain 层 = 纯业务模型 + 业务规则，尽量不依赖技术细节。
*/

export class User {
  @ApiProperty({
    type: idType,
  })
  id: number | string;

  @ApiProperty({
    type: String,
    example: 'john.doe@example.com',
  })
  @Expose({ groups: ['me', 'admin'] })
  email: string | null;

  // 永远优先，不会返回 password 字段
  @Exclude({ toPlainOnly: true })
  password?: string;

  @ApiProperty({
    type: String,
    example: 'email',
  })
  @Expose({ groups: ['me', 'admin'] })
  provider: string;

  @ApiProperty({
    type: String,
    example: '1234567890',
  })
  @Expose({ groups: ['me', 'admin'] })
  socialId?: string | null;

  // 没有写 @Expose / @Exclude 的字段，默认是“全部都暴露”
  @ApiProperty({
    type: String,
    example: 'John',
  })
  firstName: string | null;

  @ApiProperty({
    type: String,
    example: 'Doe',
  })
  lastName: string | null;

  @ApiProperty({
    type: () => FileType,
  })
  photo?: FileType | null;

  @ApiProperty({
    type: () => Role,
  })
  role?: Role | null;

  @ApiProperty({
    type: () => Status,
  })
  status?: Status;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;
}
