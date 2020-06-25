
# Стилизация идентификаторов

См. [_stylecase/index.js_](../stylecase/index.js)

Под идентификаторами подразумевается:

* имена файлов
* переменных/классов/объектов

Сюда так же включены `titleCase` и `sentenceCase`, которые вставляют пробел между отдельными словами и приводят к соответствующему стилю.
Все функции(кроме `titleCase`, `sentenceCase`, `firstUpperCase` и `firstLocaleUpperCase`) удаляю символы соответствующие выражению `/^[^$a-z]+|[^$a-z0-9]+$/ig` и разбивают текст по `/[^$a-z0-9]+/i` или `/(?<=[^$]).{0}(?=\$?[A-Z])/`(заглавные буквы). Изменение регистра производится `toLowerCase` и `toUpperCase` соответственно.

Если первым символом в части строки, елемент массива после `split`, окажется `$`, он будет пропущен при преобразовании первого символа.

    pascalCase($kebab-case)
    // => $KebabCase

Допустимыми символами для вышеуказанных преобразований являются: `[$A-Za-z0-9._-]`.

`titleCase` и `sentenceCase` нормализуют строку с помощью [cleanSpace(string)](./string.md#cleanspacestring), после чего приводят к соответствующему формату используя `toLocaleLowerCase` и `toLocaleUpperCase`. Эти функции не удаляют символы разделители.

`firstUpperCase` и `firstLocaleUpperCase` не обрабатывают строки. Обе функции приводят первый символ строки в верхний регистр, остальные в нижний.

Доступ:

```js
// stylecase.camelCase(string)
import { camelCase, snakeCase, ... } from 'lmjs/stylecase'
import pascalCase from 'lmjs/stylecase/pascalCase'
```

Поле Name содержит имена доступных функций:

| Format                   | Name                 |
| ------------------------ | -------------------- |
| camelCase                | camelCase            |
| PascalCase               | pascalCase           |
| kebab-case               | kebabCase            |
| snake_case               | snakeCase            |
| dot.case                 | dotCase              |
| UPPER-KEBAB-CASE         | upperKebabCase       |
| UPPER_SNAKE_CASE         | upperSnakeCase       |
| UPPER.DOT.CASE           | upperDotCase         |
| Title just like this.    | titleCase            |
| Sentence Just Like This. | sentenceCase         |
| Title                    | firstUpperCase       |
| Title                    | firstLocaleUpperCase |

Некоторые преобразования с символом `$` могут показаться неожиданными.

Примеры [_examples/stylecase.js_](../examples/stylecase.js)
