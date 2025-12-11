// 是领域模型（业务层数据结构），用于服务、控制器与序列化展示，不绑定 ORM；
// 它携带 Swagger 元数据和 class-transformer 的序列化规则
import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

const idType = Number;

export class Status {
  @Allow()
  @ApiProperty({
    type: idType,
  })
  id: number | string;

  @Allow()
  @ApiProperty({
    type: String,
    example: 'active',
  })
  name?: string;
}
