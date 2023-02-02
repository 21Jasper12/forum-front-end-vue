# forum-front-end-vue

### 【瀏覽網站前要先行前準備】

1. 下載server相關資料
```
git clone https://github.com/ALPHACamp/forum-express.git
```

2. 進到相關資料夾
```
cd forum-express
```

3. 下載node_modules
```
npm install
```

4. 安裝 MySQL 與圖形化介面 Workbench ， 並使用 MySQL 和 MySQL Workbench 建立本地伺服器連線


5. 使用 MySQL Workbench 建立 forum 資料庫


6. SQL相關設定
```
npx sequelize db:migrate
```

7. SQL相關設定
```
npx sequelize db:seed:all
```

8. 啟動server
```
npm run dev
```


### 【網站連結】
> https://21jasper12.github.io/forum-front-end-vue/


### 【測試帳號】
* 帳號：root@example.com
* 密碼：12345678

# 餐廳清單
![image](https://github.com/21Jasper12/forum-front-end-vue/blob/main/src/image/front-end-vue.jpg)

## 介紹
---
這是一個餐廳論壇平台。

###  功能
* 使用者可以新增或刪除餐廳評論
* 使用者可以觀看到餐廳資訊
* 使用者可以標註喜歡的餐廳
* 使用者可以追隨其他使用者
* 使用者可以觀看其他使用者的基本資訊
* 管理者可以新增、修改和移除餐廳資訊
* 管理者可以給予其他使用者後台使用權限

## 開發工具
* Vue

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
