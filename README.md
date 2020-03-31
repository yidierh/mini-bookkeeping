## 记账小程序

### 技术栈

taro: https://taro.aotu.io/

taro-ui: https://taro-ui.jd.com/

---
### 开始
```nodemon
# 要先全局安装 Taro-cli
# 使用 npm 安装 CLI
npm install -g @tarojs/cli
# OR 使用 yarn 安装 CLI
yarn global add @tarojs/cli
# OR 安装了 cnpm，使用 cnpm 安装 CLI
cnpm install -g @tarojs/cli
```
> 可能需要兼容Taro版本
```text
taro update self [提示版本]
```
> 使用要点

1. 开发时，进入 client 目录，在此目录下运行相关编译预览或打包命令
2. 使用微信开发者工具调试项目，请将项目 整个文件夹 作为运行目录。 注意： 不是 client 中生成的 dist 文件夹

```nodemon
# 安装依赖包
npm install
# 编译 & 打包
npm run dev:weapp
npm run build:weapp
```



### 项目目录

```text
├── client                                  小程序端目录
│   ├── config                              配置目录
│   │   ├── dev.js                          开发时配置
│   │   ├── index.js                        默认配置
│   │   └── prod.js                         打包时配置
│   ├── dist                                编译结果目录
│   ├── package.json
│   ├── src                                 源码目录
│   │   ├── app.scss                        项目总通用样式
│   │   ├── app.js                          项目入口文件
│   │   ├── components                      组件文件目录
│   │   │   └── login                       login 组件目录
│   │   │       └── index.weapp.js          login 组件逻辑
│   │   └── pages                           页面文件目录
├── cloud                                   服务端目录
│   └── functions                           云函数目录
│    ├── login                              login 云函数
│    │    ├── index.js                      login 函数逻辑
│    │    └── package.json
│    └── statistics                         订阅消息 & 统计云函数
│         ├── index.js                      statistics 函数逻辑   
│         ├── common.js                     公有方法
│         ├── config.json                   云函数接口授权 & 触发器配置
│         └── package.json
├── project.config.json                     小程序项目配置
│
└── mini.config.json                        个人小程序配置文件
```

### 编译前准备
> 需要在根目录下新建一个 mini.config.json
```text
{
  "appName": "your app name",
  "cloud_dev": "dev env",
  "cloud_prod": "prod env",
  "tmplIds": [""] // 订阅消息ID，不需要可以在 start 页面去掉
}
```

### 邮箱

yidierh@gmail.com



### 线上小程序

![记账I](./code.jpg)
