> Fork 于 [shadowsocks-heroku](https://github.com/mrluanma/shadowsocks-heroku) 项目

# shadowsocks-heroku
[Heroku](https://www.heroku.com/) 是一个支持多种编程语言的云平台即服务，shadowsocks-heroku 则是可部署在 Heroku 平台的 ss 服务。
和 [shadowsocks](https://github.com/clowwindy/shadowsocks) 不同的是 shadowsocks-heroku 使用的 WebSocket 代替原本的 sockets。

## 如果遇到问题
1. 请先检查是否遵循步骤（再次阅读一遍教程）
2. 请先自行通过Google/[Github](https://github.com/onplus/shadowsocks-heroku/search?utf8=%E2%9C%93&q=&type=)寻找答案
3. 如果还没有解决，欢迎通过[ issue](https://github.com/onplus/shadowsocks-heroku/issues?q=is%3Aissue+is%3Aclosed+label%3Asolved) 提问（贴日志和配置的时候注意隐藏密码&个人ip）

## 准备

### 1. 注册 Heroku 帐号
Heroku 提供免费账号，部分介绍如下：
- 512 MB RAM per dyno
- Free apps sleep automatically after 30 mins of inactivity to conserve your dyno hours
- Free apps wake automatically when a web request is received
- https://devcenter.heroku.com/articles/limits
- https://devcenter.heroku.com/articles/free-dyno-hours#usage

注册地址：https://signup.heroku.com/ （注册和部署过程可能需要梯子[#10](https://github.com/onplus/shadowsocks-heroku/issues/10)，[#14](https://github.com/onplus/shadowsocks-heroku/issues/14)）

## 部署
1. 点击 [![](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/onplus/shadowsocks-heroku/tree/re)，[一键部署到heroku](https://heroku.com/deploy?template=https://github.com/onplus/shadowsocks-heroku/tree/re)
  
    也可以选择另一个版本的服务端[shadowsocks-websocket-python](https://github.com/onplus/shadowsocks-websocket-python/blob/deploy/README.md)

1. 设置 加密算法和app 密码

![deploy](https://user-images.githubusercontent.com/31188782/31343896-ab0a868a-ad43-11e7-8a83-369cf5e385b0.jpg)

[](https://user-images.githubusercontent.com/31188782/31310674-e783c9e4-abce-11e7-87d2-48f328e74169.JPG)

支持的加密算法类型如下https://github.com/mrluanma/shadowsocks-heroku#supported-ciphers

## 启动本地 Client
1. 下载release https://github.com/onplus/shadowsocks-heroku/releases （[备份](https://github.com/onplus/archive/tree/master/tool)）

2. 修改config.json参数，运行ss-h.exe 或 start.vbs (或 [win托盘工具taskbar.exe](https://github.com/onplus/shadowsocks-heroku/issues/39))

5. 启动成功，命令行显示：`server listening at { address: '127.0.0.1', family: 'IPv4', port: 1080 }`

## 配置代理
1. 下载：Chrome 浏览器 [SwitchyOmega](https://github.com/FelisCatus/SwitchyOmega/releases) 插件（[参考教程](https://github.com/FelisCatus/SwitchyOmega/wiki/GFWList), 导入备份文件[SSHeroku.Bak.zip](https://github.com/onplus/shadowsocks-heroku/files/1371313/SSHeroku.zip)）

2. 安装：打开浏览器的扩展程序页面 `chrome://extensions`，把 `SwitchyOmega.crx` 文件拖放到浏览器扩展程序页面安装 

3. 配置：添加SwitchyOmega代理服务器
```
    代理协议： SOCKS5
    代理服务器local_address：127.0.0.1 
    代理端口local_port： 1080 
```
    
## 可选：
1. 使用无污染DNS https://www.zhihu.com/question/32229915
2. cow/meow智能代理  https://github.com/cyfdecyf/cow#cow-climb-over-the-wall-proxy
```
    #rc配置文件
    listen = http://127.0.0.1:7777
    proxy = socks5://127.0.0.1:1080
```
3. 网站导航 http://www.ipv6daohang.com/

## 送人玫瑰手留余香🌹（[参考教程](https://github.com/521xueweihan/shadowsocks-heroku/tree/master)）
