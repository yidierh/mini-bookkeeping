## 记账小程序

### 技术栈

```text
taro: https://taro.aotu.io/
taro-ui: https://taro-ui.jd.com/
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
│       └── login                           login 云函数
│           ├── index.js                    login 函数逻辑
│           └── package.json
├── project.config.json                     小程序项目配置
│
└── config.json                             个人小程序配置文件
```

### 编译前准备
> 需要在根目录下新建一个 config.json
```text
{
  "appName": "your app name",
  "cloud_dev": "dev env",
  "cloud_prod": "prod env"
}
```

### 邮箱

yidierh@gmail.com



### 线上小程序

![记账I](./code.jpg)
