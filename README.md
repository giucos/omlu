#### Minimale Standalone OMLU Installation für das Modul STUEMTEC


#### Setup
   * get your local webserver ready (incl. php)
   * clone the repository to web-root/omlu
   * setup virtual server omlu.localhost
   * edit your `.htaccess` to contain:
      ```Header always set Access-Control-Allow-Origin "*"
      RewriteEngine on
      RewriteBase /
      RewriteRule ^$ index.html [QSA,L]
      RewriteCond "%{REQUEST_FILENAME}"   !-f
      RewriteRule ^(.*) proxy.php?ref=$1 [QSA,L]
      ```
   * Open your app on `omlu.localhost/#[appname]`
   * Commit your changes


   * https://exorciser.ch/di/ba20/stuemtec/setup-localhost-minimal

#### How to use
   * Start APP http://omlu.localhost/#plain 
   * Start App with Config http://omlu.localhost/config.html#plain 

#### More Apps
   * https://github.com/exorciser-ch/gem
