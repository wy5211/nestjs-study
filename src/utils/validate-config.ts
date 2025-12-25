import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { ClassConstructor } from 'class-transformer/types/interfaces';

function validateConfig<T extends object>(
  config: Record<string, unknown>,
  envVariablesClass: ClassConstructor<T>,
) {
  // 反序列化 config 对象，将其转换为 envVariablesClass 类的实例。
  // enableImplicitConversion 选项确保在转换过程中自动处理类型转换（例如，将字符串转换为数字）。
  const validatedConfig = plainToClass(envVariablesClass, config, {
    // 自动将字符串类型的环境变量（例如 .env 中的 "3000"）转换为目标类属性期望的类型（例如 number）
    enableImplicitConversion: true,
  });
  // 同步地检查 validatedConfig 实例是否符合 envVariablesClass 定义的所有 @Is... 验证规则。
  const errors = validateSync(validatedConfig, {
    // 确保如果缺少任何必要的配置属性（例如，一个被标记为 @IsNotEmpty() 的属性），验证器也会报告错误。
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}

export default validateConfig;
