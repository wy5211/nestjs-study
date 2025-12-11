import { Module } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { UsersRelationalRepository } from './repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

// 一句话总结 forFeature 负责“注册仓库”， @InjectRepository 负责“把仓库注入进来”；两者成对出现，缺一不可。

@Module({
  // 注册 TypeOrmModule 并指定要使用的实体（Entity）。
  // 这会在当前模块的 DI 容器中注册 UserEntity 的仓库提供者（Repository），
  // 使其他提供者（如服务、控制器）可以通过 @InjectRepository(UserEntity) 注入该仓库。
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    // 任何地方依赖 UserRepository ，都会获得一个 UsersRelationalRepository 的实例，实现了“面向抽象编程、注入具体实现”的解耦
    // 为什么要这样设计
    // 依赖抽象、可替换实现：后续可以在不同环境把 UserRepository 绑定到另一个实现（如 UsersMongoRepository 或 Mock），业务层无需改动。
    // 便于测试：测试模块里用 provide: UserRepository, useClass: MockUsersRepository 或 useValue 快速替代
    {
      // 声明依赖注入的令牌（token）。令牌可以是类、抽象类、字符串或 Symbol 。这里用抽象仓库 UserRepository 充当令牌
      provide: UserRepository,
      // 指定当请求该令牌时实际注入的具体实现类。这里把 UsersRelationalRepository 绑定到 UserRepository 令牌
      useClass: UsersRelationalRepository,
    },
  ],
  exports: [UserRepository],
})

// Persistence 持久化模块
export class RelationalUserPersistenceModule {}
