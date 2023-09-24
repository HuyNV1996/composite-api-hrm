## 🔨 Build

```bash
# npm
$ npm install
$ npm run build

# yarn
$ yarn install
$ yarn start
```
## 🔨 Deploy

```bash
# npm
$ npm install
$ npm run build

# yarn
$ yarn install
$ yarn start
```
## 🔨 Deploy sử dụng nginx
Tạo folder chứa source code
```
sudo mkdir -p /var/www/cms.gapsoftware.asia/html
```
Cấp quyền
```
sudo chown -R $USER:$USER /var/www/cms.gapsoftware.asia/html
sudo chmod -R 755 /var/www/cms.gapsoftware.asia
```
copy source code vào thư mục /var/www/cms.gapsoftware.asia/html
```
    server {
        server_name cms.gapsoftware.asia;

            root /var/www/cms.gapsoftware.asia/html;
        index index.html index.htm index.nginx-debian.html;
            location / {
                try_files $uri $uri/ /index.html;
            }
    }
```
```
sudo ln -s /etc/nginx/sites-available/cms.gapsoftware.asia /etc/nginx/sites-enabled/
```
Verify cấu hình và reload
```
nginx -t
nginx -s reload
```
Cài ssl
```
sudo certbot --nginx -d cms.gapsoftware.asia
```
## 🖥 Browsers support

Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Electron |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE11, Edge                                                                                                                                                                                                      | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                           | last 2 versions                                                                                                                                                                                                       |
