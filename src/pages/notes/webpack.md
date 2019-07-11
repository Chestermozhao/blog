---
title: "Webpack Note"
description: webpack note
date: '2019-07-11'
tags: ['Javascript']
---
## Webpack深入淺出閱讀筆記：一個壓縮打包的建構工具？ &nbsp;
### 構建工具:
- 功能:
    - 代碼轉換: ES6 -> ES5 / SCSS -> CSS
    - 文件優化: 壓縮代碼與圖片
    - 代碼分割: 提取公共代碼
    - 模塊合併
    - 自動刷新: 熱更新
    - 代碼校驗: 代碼檢查與測試校驗
    - 自動發布: 自動上線
- 構建工具s:
    - Npm Script
    - Grunt
    - Gulp
    - Fis3
    - Webpack
    - Rollup
- Webpack
    - ##### 優勢:
        - 完整生態鏈: 社群發達
        - 功能完整
    - ##### 安裝:
        - `npm i -g webpack`

---
### Webpack.config.js 基礎名詞與參數介紹
- context: 類似PYTHONPATH, 所有相對路徑會從這個配置為基礎
- Entry: 入口文件
    - string / array / object
        - string and array: 只生成一個Chunk, Chunk名稱為main
        - object: 生成多個Chunk, Chunk名稱為key
- Output: 出口文件
    - object
        - filename: `[name].js`
            - 內置變量:
                - id: Chunk唯一標誌, 從0開始
                - name: Chunk的名稱
                - hash: Chunk唯一標誌的Hash值
                - chunkhash: Chunk內容的Hash值
        - chunkFilename: 無Entry的Chunk輸出時的文件名稱, 內置變量與filename相同
        - path: 指定輸出的目錄**絕對路徑**
            - `path: path.resolve(__dirname, "dist")`
        - publicPath: 加載後的資源要放置的URL地址
        - crossOriginLoading: 透過JSONP動態插入script標籤
            - anonymous: 不帶入用戶Cookie
            - use-credentials: 會帶入用戶Cookie
- Module
    - rules: 配置Loader, 數組類型, 每個數組內為物件, 物件內每個參數都可以是數組
        - 參數介紹
            - test: 指定作用文件
            - use: 使用的loader
            - include: 指定搜索目錄
            - exclude: 排除搜索目錄
            - noParse: 忽略內容
            - parser: 哪些模塊可以被語法解析哪些不可以, 包含了noParse的作用
        - 常用loader介紹
            - Babel
                - `test: /\.js$/`: 指定作用的文件, 可以用正則匹配
                - `use: ['babel-loader?cacheDirectory']`:
                    - babel-loader: 轉換JS代碼, ES6 -> ES5
                    - ?cacheDirectory: 傳給loader的參數, 代表使用緩存
                    ```javascript
                    // 其他傳參方式
                    use: [
                        {
                            loader: 'babel-loader',
                            options:{
                                cacheDirectory: true,
                            }
                            enforce: 'post'
                        }
                    ]
                ```
                - `include: path.resolve(__dirname, 'src')`: 只對src目錄下用babel轉換, 減少搜索時間, 若不指定將從context目錄往下搜索所有JS文件
            - SCSS
                - `test: /\.scss$/`
                - `use: ['style-loader', 'css-loader', 'sass-loader']`
                    - 放入數組執行序由後往前
                - `exclude: path.resolve(__dirname, 'node_modules')`: 排除node_modules目錄下的文件
            - FileLoader
                - `test: /\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf)$/`
                - `use" ['file-loader']`
- Resolve: webpack依賴搜尋的路徑替換
    - alias: 別名映射
        - components -> ./src/components
        - key可以正則匹配, components$ -> 只匹配components結尾者
        - ```javascript
          resolve:{
            alias:{
                components: './src/components'
            }
          }
            ```
    - mainFields: 入口文件匹配優先級, 順序匹配, 通常用於多個代碼版本在同一個項目中
        - 優先匹配Es6入口文件
        - `mainFields: ['es6:main', 'es5:main']`
    - extensions: 依賴匹配後綴列表
        - `extension: ['.ts', '.js', '.json']`
    - modules: 導入模塊目錄, 如果除了node_modules外仍有其他目錄大量被引用, 可以加入此配置項
        - `modules: ['./src/components', 'node_modules']`
    - descriptionFiles: 描述三方模塊的文件
        - `descriptionFiles: ['package.json']`
    - enforceExtension: 導入模塊強制後綴
    - enforceModuleExtension: 導入模塊強制後綴, 僅對node_modules目錄下有效
- Plugin: 接受一個數組, 數組內為Plugin實例
- DevServer: 通常用於開發環境提升開發效率使用
    - hot: 熱更新模式, 異動模塊替換取代頁面刷新
    - inline: 構建完成時會將更新注入運行頁面中
    - historyApiFallback: url只向特定的html文件, 通常用於H5 SPA
        - ```javascript
          historyApiFallback: {
            rewrites: [
                {from: /^\/user/, to: '/user.html'},
                {from: /^\/game/, to: '/game.html'},
                {from: /./, to: '/index.html'}
            ]
          }
            ```
    - DevServer其他配置項: 通常不會調整
        - contentBase: 服務器文件根目錄, 是否暴露本地文件
        - host
        - port
        - allowedHosts: 接受訪問白名單
        - disableHostCheck
        - https: key, cert, ca
        - clientLogLevel: none, error, warning, info
        - compress
        - open
- 其他配置項
    - Target: 建構不同環境的JS代碼
        - web
        - node
        - async-node
        - webworker
        - electron-main
        - electron-renderer
    - Devtool: 生成source map
        - `devtool: 'source-map'`
    - watch: 文件改變時重新編譯, 在DevServer開啟時默認開啟
        - watchOptions: 在watch模式開啟時才被執行
            - ignored: 忽略watch的目錄
            - aggregateTimeout: 建構延時時間(ms)
            - poll: 每秒詢問次數
    - Externals: 外部文件, 建構時不打包, 通常用於外部模塊如jquery, bootstrap
        - ```javascript
          module.export = {
            // import中的jquery替換成全局變量JQuery
            externals: {
                jquery: "jQuery"
            }
             }
            ```

---
### 環境變量或參數控制不同構建方式
- CMD: `webpack --env.production --env.bao=foo`
- webpack.config.js
    ```javascript
    const path = require('path')
    const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin')
    module.exports = function(env = {}, argv) {
        const plugins = [];
        const isProduction = env['production'];
        if (isProduction) {
            plugins.push(
                // 壓縮JS代碼
                new UglifyJsPlugin()
            )
        }
        return {
            plugins: plugins,
            devtool: isProduction ? undefined : 'source-map';
        };
    }
    ```

---
### Loader vs Plugin
![https://i.stack.imgur.com/P7hTM.png](https://i.stack.imgur.com/P7hTM.png)
- Loader: [`加載某些資源文件。因為webpack本身只能打包commonjs規範的js文件，對於其他資源例如 css，圖片，或者其他的語法集，比如jsx，coffee，是沒有辦法加載的。這就需要對應的loader將資源轉化，加載進來。從字面意思也能看出，loader是用於加載的，它作用於一個個文件上。`](https://blog.csdn.net/wp270280522/article/details/51496436)
- Plugin: [`擴展webpack的功能。它直接作用於 webpack，擴展了它的功能。當然loader也時變相的擴展了 webpack ，但是它只專注於轉化文件（transform）這一個領域。而plugin的功能更加的豐富，而不僅局限於資源的加載。`](https://blog.csdn.net/wp270280522/article/details/51496436)
---
### [常用工具webpack配置介紹](http://webpack.wuhaolin.cn/3%E5%AE%9E%E6%88%98/3-1%E4%BD%BF%E7%94%A8ES6%E8%AF%AD%E8%A8%80.html)
- [Babel](https://www.babeljs.cn/docs/babel-preset-react): ES6 -> ES5
- [SCSS / SASS](https://github.com/lmk123/blog/issues/28)
    - [funny commit message](https://github.com/sass/node-sass/commit/b8050efbe0effb68b0617d28276c72eef1fb15ef)
    - node-sass在aws上, 網路時常不穩定, 可以點擊上面link從阿里鏡像下載
    - 也可以用dart-sass替代(api都相同), 但是要記得把sass-loader引入模塊調整下
- PostCSS: 可以使用下一代css語法以及各種擴展
- React: JSX語法
- Vue

---
### 構建綜合練習
- 管理一個單頁應用:
    - 需求:
        - ES6語法
        - React JSX語法
        - css引入
        - 打包後css與js代碼分離
        - css代碼壓縮
        - js代碼壓縮
        - 為頁面加入全局擴展
    - webpack.config.js
        - ExtractTextPlugin: 提取Chunk中的css到單獨文件中
            - ```javascript
              {
                test: /\.css/,
                use: ExtractTextPlugin.extract({
                  use: ['css-loader?minimize'] //壓縮css
                }),
              },
                ```
        - `?_inline`: 代碼需要內嵌到當前標籤
        - Webplugin: 一個WebPlugin對應一個html文件
            - ```javascript
              new WebPlugin({
                template: './template.html', // HTML模版文件所在的文件路径
                filename: 'index.html' // 输出的HTML的文件名称
              }),
                ```
        - UglifyJsPlugin: 壓縮JS代碼(只能壓縮ES5)
            - ```javascript
              new UglifyJsPlugin({
                  // 最紧凑的输出
                  beautify: false,
                  // 删除所有的注释
                  comments: false,
                  compress: {
                    // 在UglifyJs删除没有用到的代码时不输出警告
                    warnings: false,
                    // 删除所有的 `console` 语句，可以兼容ie浏览器
                    drop_console: true,
                    // 内嵌定义了但是只用到一次的变量
                    collapse_vars: true,
                    // 提取出出现多次但是没有定义成变量去引用的静态值
                    reduce_vars: true,
                  }
              }),
                ```
- 管理多個單頁應用:
    - 需求:
        - 方才需求變成很多個template.html, 要輸出很多個index.html
    - webpack.config.js
        - AutoWebPlugin:
            - 把pages下每個目錄看成一個單頁應用

---
### 代碼檢查
- 檢查什麼？
    - 代碼風格
    - 潛在問題
- 檢查者們
    - Javascript: ESLint
    - Typescript: TSLint
    - Css: stylelint
- 檢查的小秘密: 喜憂參半
    - 壞消息們
        - 計算量大, 建構速度變慢
        - 整合代碼報錯只顯示行號, 不像console.log可以看到是哪裡
    - 好消息
        - git husky
            - package中配置後: 每次代碼推到倉庫之前即進行檢查

---
### [優化: 快還要更快](http://webpack.wuhaolin.cn/4%E4%BC%98%E5%8C%96/)
- 縮小文件搜索範圍:
    - loader
        - include, exclude
    - resolve
        - modules
        - mainFields: 針對不同環境用不同代碼
        - alias
        - extensions:
            - 列表盡可能小
            - 頻率最高的後綴放列表前面
            - 盡可能寫後綴
- 多進程建構: 減少build時間
    - HappyPack
        - id: 唯一標識符, 代表當前的happypack是處理特定文件
        - loaders: 與過去loaders中的use相同
            - loaders中調整為: `['happypack/loader?id=css']`, id與上面標識符需相同
        - threads: 開啟幾個子進程去處理這類文件, 默認是三個
        - verbose: 是否輸出日誌, 默認true
        - threadPool: 使用哪個共享進程池, 默認不使用
- 壓縮代碼
    - ParrallelUglifyPlugin
        - test
        - include
        - exclude
        - cacheDir
        - workerCount: CPU - 1
        - sourceMap
        - uglifyJS: ES5
        - uglifyES: ES6
    - cssnano: 其實已經集成到cssloader?minimize
- 刪除不必要代碼
    - Tree shaking: 僅支持ES6
        - ES6 Only
            - ```javascript
              // ES5引入語法可能在語句中, tree-shaking無法
              module.export={...}
              if(x){require('./util')}
                ```
        - 指出為使用代碼 -> UglifyESPlugin來幫忙剔除
- 提取公共代碼
    - [CommonChunkPlugin](https://webpack.docschina.org/plugins/commons-chunk-plugin/)
        - Why common chunk?
            - 避免相同資源重複加載
            - 頁面資源過多, 導致首屏加載速度過慢, 用戶體驗不佳
                - 可以減少後續頁面加載時間
        - ```javascript
          new CommonChunkPlugin({
            // 最少出現次數
            minChunks: 2,
            chunks: ['a', 'b'],
            // (选择所有被选 chunks 的子 chunks)
            children: true,
            name: 'common',
          })
            ```
- 分割代碼: 按需加載
    - 必須支持PromiseAPI的瀏覽器才可以, 否則要注入Promise polyfill
- 開啟Scope Hoisting
    - [沒有比較沒有傷害](https://imweb.io/topic/5a43064fa192c3b460fce360)
    - 作用域提升減少代碼量
        - 減少聲明語句
    - 因為要分析引入關係, 也僅支持ES6
- 可視化調優工具: 
    - 建構輸出文件
        - `--profile`: 輸出建構過程耗時信息
        - `--json`: 輸出建構成果
        - `--profile --json > stats.json`
    - [官方: Webpack Analyse](http://webpack.github.io/analyse/)
        - modules: 所有模塊, 以及彼此關係
        - chunks: 代碼塊, 以及彼此依賴關係
        - assets: 輸出的文件資源, 包含js css imgs
        - warnings: 建構的警告信息
        - errors: 建構的錯誤信息
        - hints: 建構的耗時信息
    - [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)
        - install: `sudo npm i -g webpack-bundle-analyzer`
        - 運行他: `webpack-bundle-analyzer stats.json`
        - [調優應用](https://medium.com/frochu/webpack-commons-chunk-plugin-f2e4bd853c26)

---
###  [原理: 資源在這裡, 可以一起看看, 一起交流, 點我看電子書](http://webpack.wuhaolin.cn/5%E5%8E%9F%E7%90%86/)
- Webpack建構流
- 自己動手做Loader
- 自己動手做Plugin
- `create-react-app`: webpack_config.js

---
### 工作上的好夥伴
- Loader
    - i18n-loader
    - ignore-loader
    - markdown-loader
    - ymal-loader
    - svg-inline-loader
    - url-loader
- Plugin
    - serviceworker-webpack-plugin
    - i18n-webpack-plugin
    - web-webpack-plugin
    - html-webpack-plugin
    - [terser-webpack-plugin](https://github.com/webpack-contrib/terser-webpack-plugin)

---
### 參考資料
- [https://github.com/gwuhaolin](https://github.com/gwuhaolin)
- [http://webpack.github.io/analyse/](http://webpack.github.io/analyse/)
- [https://medium.com/frochu/webpack-commons-chunk-plugin-f2e4bd853c26](https://medium.com/frochu/webpack-commons-chunk-plugin-f2e4bd853c26)
- [https://www.npmjs.com/package/webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)
- [https://webpack.docschina.org/plugins/commons-chunk-plugin/](https://webpack.docschina.org/plugins/commons-chunk-plugin/)
- [http://webpack.wuhaolin.cn/](http://webpack.wuhaolin.cn/)
- [https://www.babeljs.cn/docs/babel-preset-react](https://www.babeljs.cn/docs/babel-preset-react)
- [https://github.com/lmk123/blog/issues/28](https://github.com/lmk123/blog/issues/28)
- [https://blog.csdn.net/wp270280522/article/details/51496436](https://blog.csdn.net/wp270280522/article/details/51496436)
- [https://webpack.js.org/guides](https://webpack.js.org/guides)
