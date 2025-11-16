# 翻译与多语言

## 目录 <!-- omit in toc -->

- [如何新增一种语言](#如何新增一种语言)
- [前端如何使用翻译](#前端如何使用翻译)
- [代码中如何使用翻译](#代码中如何使用翻译)

## 如何新增一种语言

1. 复制 `en` 目录并重命名为目标语言代码（如 `zh`）
2. 翻译目录中的所有 JSON 文件

## 前端如何使用翻译

- 给请求添加头 `x-custom-lang` 指定语言

## 代码中如何使用翻译

```typescript
import { I18nContext } from 'nestjs-i18n';

@Injectable()
export class SomeService {
  async someMethod(): Promise<void> {
    const i18n = I18nContext.current();
    if (!i18n) {
      throw new Error('I18nContext is not available');
    }
    const emailConfirmTitle = await i18n.t('common.confirmEmail');
  }
}
```

---

- 上一页：[自动更新依赖](automatic-update-dependencies.zh.md)
