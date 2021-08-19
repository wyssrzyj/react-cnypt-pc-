#### 代码规范

> vscode Eslint \
> vscode 安装 Eslint 插件之后 File -> Preferences -> settings -> 搜索 settings.json
> 将下面的内容添加进去

```json
{
  // 默认使用prettier格式化支持的文件
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  // 自动设定eslint工作区
  "eslint.workingDirectories": [
    {
      "mode": "auto"
    }
  ],
  "eslint.run": "onType",
  "eslint.validate": ["javascript", "javascriptreact", "vue", "html"],
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  "eslint.alwaysShowStatus": true,
  "editor.formatOnSave": true,
  "[json]": {
    "editor.quickSuggestions": {
      "strings": true
    },
    "editor.suggest.insertMode": "replace"
  },
  "editor.formatOnPaste": true,
  "eslint.format.enable": true,
  "explorer.confirmDelete": false // 开启保存格式化
}
```

#### 代码提交

使用`git cz`代替`git commit`

#### 项目启动

`npm start`

#### 项目打包

`npm run build`

#### 状态管理器使用 Mobx

#### 阿里云 oss 图片参数处理

`?x-oss-process=image/resize,limit_0,m_fill,w70,h_70/quality,q_100`
