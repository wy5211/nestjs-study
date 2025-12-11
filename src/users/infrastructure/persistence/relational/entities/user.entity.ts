import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { RoleEntity } from '../../../../../roles/infrastructure/persistence/relational/entities/role.entity';
import { StatusEntity } from '../../../../../statuses/infrastructure/persistence/relational/entities/status.entity';
import { FileEntity } from '../../../../../files/infrastructure/persistence/relational/entities/file.entity';

import { AuthProvidersEnum } from '../../../../../auth/auth-providers.enum';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

// 仓库注入：只有标注为 @Entity 的类，才能通过 TypeOrmModule.forFeature([UserEntity]) 注册仓库，并在代码中用 @InjectRepository(UserEntity) 注入
@Entity({
  name: 'user',
})
export class UserEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  // For "string | null" we need to use String type.
  // More info: https://github.com/typeorm/typeorm/issues/2567
  @Column({ type: String, unique: true, nullable: true })
  email: string | null;

  @Column({ nullable: true })
  password?: string;

  @Column({ default: AuthProvidersEnum.email })
  provider: string;

  @Index()
  @Column({ type: String, nullable: true })
  socialId?: string | null;

  @Index()
  @Column({ type: String, nullable: true })
  firstName: string | null;

  @Index()
  @Column({ type: String, nullable: true })
  lastName: string | null;

  @OneToOne(() => FileEntity, {
    eager: true,
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
    eager: true,
  })
  role?: RoleEntity | null;

  @ManyToOne(() => StatusEntity, {
    eager: true,
  })
  status?: StatusEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
