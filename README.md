# cashbook-4
[우아한 가계부](https://www.woowahan.club)
![image](https://user-images.githubusercontent.com/35404137/128445372-fff183df-7b09-418b-9b0e-577794cdc06b.png)

|메인|달력|
|:---:|:---:|
|<img src="https://user-images.githubusercontent.com/35404137/128637383-400aadd8-26c9-40e3-8cc5-94d3ed94ed59.gif">|<img src="https://user-images.githubusercontent.com/35404137/128637438-28fd861d-e506-4fe9-aec9-3594720b617f.gif">|
|**차트**|
|<img src="https://user-images.githubusercontent.com/35404137/128637483-f658d76a-1c7c-4dcf-b65d-e82789c53988.gif">|

## 팀원
* 지승보 [@SecretJuJu](https://github.com/SecretJuJu)
* 이재윤 [@ag502](https://github.com/ag502)

<!-- https://img.shields.io/badge/-Webpack-8DD6F9?&logo=WebPack&logoColor=white -->
## Stack
<img src="https://img.shields.io/badge/-Javascript-F7DF1E?&logo=JavaScript&logoColor=white"> <img src="https://img.shields.io/badge/-Webpack-8DD6F9?&logo=WebPack&logoColor=white"> <img src="https://img.shields.io/badge/Babel-F9DC3E?&logo=Babel&logoColor=white"> <img src="https://img.shields.io/badge/-Node.js-339933?&logo=Node.js&logoColor=yellow"> <img src="https://img.shields.io/badge/-Express-white?&logo=express&logoColor=black"> <img src="https://img.shields.io/badge/-MYSQL-4479A1?&logo=MYSQL&logoColor=white"> <img src="https://img.shields.io/badge/-mocha-A47449?&logo=mocha&logoColor=black"> <img src="https://img.shields.io/badge/-Sequelize-52B0E7?&logo=Sequelize&logoColor=white"> <img src="https://img.shields.io/badge/-Shell-FFD500?&logo=Sequelize&logoColor=white"> <img src="https://img.shields.io/badge/-Amazon%20AWS-232F3E?&logo=Amazon%20AWS&logoColor=white"> <img src="https://img.shields.io/badge/-pm2-2B037A?&logo=pm2&logoColor=white"> <img src="https://img.shields.io/badge/-nginx-009639?&logo=NGINX&logoColor=white"> <img src="https://img.shields.io/badge/-JWT-000000?&logo=JSON%20Web%20Tokens&logoColor=white"> <img src="https://img.shields.io/badge/-SVG-FFB13B?&logo=SVG&logoColor=white"/> <img src="https://img.shields.io/badge/-ESLint-4B32C3?&logo=ESLint&logoColor=white"/>
## 프로젝트 구조

```
frontend
└── src
    ├── api
    ├── assets
    │   ├── fonts
    │   └── icon
    ├── common
    │   ├── styles
    │   └── utils
    ├── models
    └── views
        ├── components
        │   ├── auth
        │   ├── calendar
        │   ├── categoryBadge
        │   ├── dayAccount
        │   ├── header
        │   ├── historyContainer
        │   ├── icons
        │   ├── modal
        │   ├── screenSaver
        │   └── statistic
        └── pages
            ├── calenderPage
            ├── mainPage
            └── statisticPage
```

```
backend
├── src
│   ├── api
│   │   ├── middlewares
│   │   └── routes
│   ├── config
│   ├── errors
│   ├── loader
│   ├── models
│   ├── services
│   └── utils
└── test
```

## DB 스키마

![image](https://user-images.githubusercontent.com/35404137/128448477-7c7f18a1-29f3-4c44-9a2b-af0c167c0cad.png)

## 배포

```bash
chmod +x deploy.sh
./deploy.sh
```
