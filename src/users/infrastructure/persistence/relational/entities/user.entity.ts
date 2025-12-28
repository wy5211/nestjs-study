import {
  Column, // 普通字段列
  CreateDateColumn, // 创建时间自动列
  DeleteDateColumn, // 软删除时间自动列
  Entity, // 声明实体类映射表
  Index, // 为字段创建索引
  ManyToOne, // 多对一关系
  PrimaryGeneratedColumn, // 自增主键列
  UpdateDateColumn, // 更新时间自动列
  JoinColumn, // 指定外键列
  OneToOne, // 一对一关系
} from 'typeorm';
import { RoleEntity } from '../../../../../roles/infrastructure/persistence/relational/entities/role.entity';
import { StatusEntity } from '../../../../../statuses/infrastructure/persistence/relational/entities/status.entity';
import { FileEntity } from '../../../../../files/infrastructure/persistence/relational/entities/file.entity';

import { AuthProvidersEnum } from '../../../../../auth/auth-providers.enum';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper'; // 提供基础实体能力与序列化


/* 
  infrastructure/persistence：持久化层（实体、仓库）
  路径： src/users/infrastructure/persistence/relational/...

  - entities ：例如 user.entity.ts
    - 带 @Entity 、 @Column 等 TypeORM 装饰器；
    - 字段贴合数据库结构（表名、列名、索引、关系等）；
    - 面向的是 关系型数据库 ，是“表结构的代码表示”。

  - repositories ：
    - 比如 UsersRelationalRepository 实现 UserRepository 接口；
    - 负责“怎么查库、怎么分页、怎么保存”等具体实现；
    - 里面通过 UserMapper 在 UserEntity 和 User （domain 模型）之间做转换。
  可以理解为：
    persistence = “如何存储和读写数据” entity = “表结构 + 关系” repository = “用 ORM 操作表的具体细节”。
*/


// 仓库注入：只有标注为 @Entity 的类，才能通过 TypeOrmModule.forFeature([UserEntity]) 注册仓库，并在代码中用 @InjectRepository(UserEntity) 注入
@Entity({
  name: 'user', // 指定数据库表名为 user
})
export class UserEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn() // 主键，自增整数
  id: number;

  // For "string | null" we need to use String type.
  // More info: https://github.com/typeorm/typeorm/issues/2567
  @Column({ type: String, unique: true, nullable: true }) // 字符串列，允许 null，唯一约束
  email: string | null;

  @Column({ nullable: true }) // 允许为空的密码列
  password?: string;

  @Column({ default: AuthProvidersEnum.email }) // 登录提供方，默认 email
  provider: string;

  @Index() // 为 socialId 创建索引
  @Column({ type: String, nullable: true }) // 第三方平台用户 ID，可为空
  socialId?: string | null;

  @Index() // 为 firstName 创建索引
  @Column({ type: String, nullable: true }) // 名，可为空
  firstName: string | null;

  @Index() // 为 lastName 创建索引
  @Column({ type: String, nullable: true }) // 姓，可为空
  lastName: string | null;

  @OneToOne(() => FileEntity, {
    eager: true, // 查询用户时自动加载头像文件
  })
  // 标记一对一关系的“拥有方”（外键存放在哪张表），使该方的表生成并维护外键列。
  @JoinColumn({ name: 'photoId', referencedColumnName: 'id' })
  // 不传参数，
  // 1. 将当前关系的“拥有方”确定为本实体（外键存放在当前表）。
  // 2. 外键列名按关系属性名加被引用主键名的组合生成，通常是 <属性名><被引用主键名> 。在你的代码里是 photo 指向 FileEntity.id ，因此默认列名为 photoId ，被引用列为 file.id 。
  // @JoinColumn() 等同于 @JoinColumn({ name: 'photoId', referencedColumnName: 'id' })
  photo?: FileEntity | null;

  // 多个用户可以有相同的角色
  @ManyToOne(() => RoleEntity, {
    // 在每次加载用户时自动可用，省去手动关联，但要权衡性能与查询控制。
    // 指定为 false 时，查询用户时不会自动加载角色信息，需要通过 userRepository.find({ relations: { role: true } }) 来关联查询 role 信息
    eager: true, // 查询用户时自动加载角色
  })
  role?: RoleEntity | null;

  @ManyToOne(() => StatusEntity, {
    eager: true, // 查询用户时自动加载状态
  })
  status?: StatusEntity;

  @CreateDateColumn() // 记录创建时间，自动维护
  createdAt: Date;

  @UpdateDateColumn() // 记录最后更新时间，自动维护
  updatedAt: Date;

  @DeleteDateColumn() // 记录软删除时间，未删除时为 null
  deletedAt: Date;
}
