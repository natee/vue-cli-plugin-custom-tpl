# vue-cli-plugin-custom-tpl

[Vue CLI 3.0](https://github.com/vuejs/vue-cli) 自定义模板插件

## 特性
脚手架默认开启如下功能：
- less处理器
- router
- axios

## 安装

### 使用preset自动安装插件
```
vue create --preset natee/vue-cli-plugin-custom-tpl my-app
```

**preset.json**
```json
{
  "useConfigFiles": true,
  "router": true,
  "cssPreprocessor": "less",
  "plugins": {
    "@vue/cli-plugin-babel": {},
    "@vue/cli-plugin-eslint": {
      "config": "prettier",
      "lintOn": [
        "save"
      ]
    },
    "vue-cli-plugin-custom-tpl": {
      "replaceTemplates": true,
      "router": true
    }
  }
}
```

### 手动安装插件
使用vue-cli 3.0 常规创建一个项目
```
vue create my-app
```

```
cd my-app
vue add custom-tpl
```

## 目录结构

```
src
├── App.vue
├── api
│   └── index.js
├── assets
├── components
│   └── HelloWorld.vue
├── main.js
├── router.js
├── store.js
└── views
    ├── Hello.vue

```

## 自主开发
1. Fork本项目到username/vue-cli-plugin-name
2. 修改模板内容，npm publish包
3. 修改username/vue-cli-plugin-name中的preset.json内容
4. `vue create --preset username/vue-cli-plugin-name my-app`

## 其它

Vue CLI 2.x 定制化模板 [natee/webpack](https://github.com/natee/webpack)

