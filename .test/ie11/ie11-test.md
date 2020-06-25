
# Тест ie11 + babel + polyfill

Проверка только на ошибки с использованием polyfills для targets ie11.

Замена стандартному assert в ".test/ie11/assert".

* установить зависимости непосредственно в ".test/ie11"
* собрать `npm run webpack.build`
* запустить ".test/ie11/dist/index.html"


## Help

https://babeljs.io/docs/en/babel-cli   
https://babeljs.io/docs/en/babel-preset-env   

https://webpack.js.org/loaders/babel-loader/   
https://webpack.js.org/configuration/resolve/#resolvemodules   
https://webpack.js.org/plugins/copy-webpack-plugin/   

https://mochajs.org/#running-mocha-in-the-browser
https://www.chaijs.com/guide/styles/#assert

По дефолту webpack импортирует свои нерабочие полифиллы для NodeJS,   
НЕ работает deepStrictEqual(NaN, NaN, mess).
Отключить нерабочие полифиллы webpack-а `node: false`
https://webpack.js.org/configuration/node/

В конфиге должно быть
    
    node: false,
    resolve: {
      modules: [
        'node_modules', 
        // для поиска модулей в .test/ie11 относительно внешних файлов
        '.test/ie11/node_modules'
      ]
    }


## Ограничения IE11 и т.п.

IE не поддерживает lookbehind assertions(просмотр назад) и флаг sticky.  
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp

Ошибка 5018|Unexpected quantifier|Неизвестный числовой показатель
http://www.j-s.ru/oshibki-jscript-vremeni-vypolneniya/

Пример `/(?<=[^-])(?=([^-]|-$))/`   
Это не будет работать и с `new RegExp('(?<=[^-])(?=([^-]|-$))')`   


Не поддерживается `Bigint` (123n).
