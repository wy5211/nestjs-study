import {
  // common
  Module,
} from '@nestjs/common';

import { UsersController } from './users.controller';

import { UsersService } from './users.service';
import { RelationalUserPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { FilesModule } from '../files/files.module';

const infrastructurePersistenceModule = RelationalUserPersistenceModule;

@Module({
  // 一个模块在 imports 中引入其他模块后，可以使用被引入模块在其 exports 中暴露的提供者（providers）。
  // 可用范围”只限于当前模块内部，不能跨模块访问。
  imports: [
    // import modules, etc.
    infrastructurePersistenceModule,
    FilesModule,
  ],
  controllers: [UsersController],
  // 在当前模块“注册并提供”可注入的依赖（类/值/工厂）。它们只在本模块内部可见（本模块的 providers 、 controllers 可以注入使用）。
  // 把 providers 看作“本模块内注册的可注入资源”， exports 看作“把其中一部分公开给导入者
  providers: [UsersService],
  // 选择把当前模块内“已存在”的依赖对外公开，让其他“导入了本模块”的模块也能注入使用。 exports 本身不创建实例，只是做可见性转发。
  exports: [UsersService, infrastructurePersistenceModule],
})
export class UsersModule {}
