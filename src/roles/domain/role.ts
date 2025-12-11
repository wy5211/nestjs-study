import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

const idType = Number;

export class Role {
  // 用于在全局 ValidationPipe 开启 whitelist: true 时，标记该属性为“允许保留”的字段，即使它没有其他校验装饰器也不会被剔除。
  @Allow()
  @ApiProperty({
    type: idType,
  })
  id: number | string;

  @Allow()
  // 用于给类属性添加 OpenAPI 元数据，让 Swagger 文档正确生成属性的类型、示例、描述等。
  @ApiProperty({
    type: String,
    example: 'admin',
  })
  name?: string;
}
