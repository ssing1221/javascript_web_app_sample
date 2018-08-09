# JYMMotto

Motto management system for submitting or reading motto.

http://www.jymmotto.com/

## System Architecture

![AngularJS](http://www.zluck.com/wp-content/uploads/2016/11/angularjs-development-logo-uai-258x272.png)
<img src="https://upload.wikimedia.org/wikipedia/commons/e/ea/Boostrap_logo.svg" width="29%" height="29%" />

Front end: AngularJS + Bootstrap


![node.js](https://upload.wikimedia.org/wikipedia/commons/7/7e/Node.js_logo_2015.svg)

Back end: node.js + express.js with restful web service


![MongoDB](https://upload.wikimedia.org/wikipedia/en/thumb/4/45/MongoDB-Logo.svg/527px-MongoDB-Logo.svg.png)

Database: MongoDB

### Prerequisites


Use unix as a server platform.


Install Ubuntu Server 16.04.1 LTS for server running.

### Installing


Install node.js


```
// install node.js
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get update
```
Install npm


```
// install npm
sudo apt-get install npm
sudo apt-get update
```
Install MongoDB


```
// install mongoDB
sudo apt install mongodb-server
sudo mkdir -p /data/db
```


## Deployment

Get the latest version of this project.
```
git clone {this gitHub link}
```
Install libraries by npm


```
 npm install
```


## Start server


```
nodejs server.js
```


## Directory Structure

```
jymmotto-master
    │  config.json
    │  gConstant.json
    │  package.json
    │  README.md
    │  server.js
    │
    ├─app
    │  │  app.js
    │  │  globalFunc.js
    │  │  index.html
    │  │
    │  ├─all
    │  │      all.controller.js
    │  │      all.html
    │  │
    │  ├─app-content
    │  │  ├─css
    │  │  │      bootstrap.min.css
    │  │  │      main_theme.css
    │  │  │
    │  │  ├─font-awesome
    │  │  │  ├─css
    │  │  │  │      font-awesome.css
    │  │  │  │      font-awesome.min.css
    │  │  │  │
    │  │  │  ├─fonts
    │  │  │  │      fontawesome-webfont.eot
    │  │  │  │      fontawesome-webfont.svg
    │  │  │  │      fontawesome-webfont.ttf
    │  │  │  │      fontawesome-webfont.woff
    │  │  │  │      FontAwesome.otf
    │  │  │  │
    │  │  │  ├─less
    │  │  │  │      bordered-pulled.less
    │  │  │  │      core.less
    │  │  │  │      fixed-width.less
    │  │  │  │      font-awesome.less
    │  │  │  │      icons.less
    │  │  │  │      larger.less
    │  │  │  │      list.less
    │  │  │  │      mixins.less
    │  │  │  │      path.less
    │  │  │  │      rotated-flipped.less
    │  │  │  │      spinning.less
    │  │  │  │      stacked.less
    │  │  │  │      variables.less
    │  │  │  │
    │  │  │  └─scss
    │  │  │          font-awesome.scss
    │  │  │          _bordered-pulled.scss
    │  │  │          _core.scss
    │  │  │          _fixed-width.scss
    │  │  │          _icons.scss
    │  │  │          _larger.scss
    │  │  │          _list.scss
    │  │  │          _mixins.scss
    │  │  │          _path.scss
    │  │  │          _rotated-flipped.scss
    │  │  │          _spinning.scss
    │  │  │          _stacked.scss
    │  │  │          _variables.scss
    │  │  │
    │  │  ├─img
    │  │  │  │  ajax-loader.gif
    │  │  │  │  favicon.ico
    │  │  │  │  tree.svg
    │  │  │  │
    │  │  │  └─portfolio
    │  │  │          cabin.png
    │  │  │          cake.png
    │  │  │          circus.png
    │  │  │          game.png
    │  │  │          profile.png
    │  │  │          safe.png
    │  │  │          submarine.png
    │  │  │
    │  │  ├─js
    │  │  │      main_theme.js
    │  │  │
    │  │  └─lang
    │  │          trans_en.json
    │  │          trans_zh.json
    │  │
    │  ├─app-controller
    │  │      lang.controller.js
    │  │
    │  ├─app-service
    │  │      entry.service.js
    │  │      log.service.js
    │  │      user.service.js
    │  │
    │  ├─gConstant
    │  │      gConstant.js
    │  │
    │  ├─login
    │  │      login.controller.js
    │  │      login.html
    │  │
    │  ├─main
    │  │      main.controller.js
    │  │      main.html
    │  │
    │  ├─pending
    │  │      pending.controller.js
    │  │      pending.html
    │  │
    │  ├─search
    │  │      search.controller.js
    │  │      search.html
    │  │
    │  └─under_con
    │          underCon.controller.js
    │          under_con.html
    │
    ├─controller
    │      entry.controller.js
    │      log.controller.js
    │      user.controller.js
    │
    └─service
            entry.service.js
            log.service.js
            user.service.js
```
