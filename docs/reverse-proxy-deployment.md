---
title: Reverse proxy deployment
---

## Introduction and setup target

Currently all tf2pickup.org instances use reverse proxy server configuration based on [Nginx](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/) with [certbot](https://certbot.eff.org/instructions) for obtaining free certificates from [Let's Encrypt](https://letsencrypt.org/). They are hosted on Debian-based distributions (Ubuntu 20.04, Debian 10), but it does not exclude an option for a deployment on any other Linux distribution, or with usage of different reverse proxy like [Apache](https://httpd.apache.org/docs/2.4/howto/reverse_proxy.html) or [Caddy](https://caddyserver.com/docs/quick-starts/reverse-proxy) or different tools for obtaining certificates such us [acme.sh](https://github.com/acmesh-official/acme.sh) or even [win-acme](https://www.win-acme.com/). We have confirmed the website to be working on Windows 10 with Docker containers using [Linux Subsystem for Windows (version 2)](https://docs.microsoft.com/en-us/windows/wsl/install-win10).

The following guide should be taken as an example, which is based on:

- Ubuntu 20.04 Linux distribution,
- Cloudflare as a domain API provider for DNS zone dynamic updates,
- Certbot as certificate obtaining tool,
- Nginx as a reverse proxy,
- tf2pickup.org client and server hosted as containers on ports TCP 3000 for the server and TCP 4000 for the client.

Following to these instructions should lead to a configuration assessed as [A+ in Qualsys SSL Labs](https://www.ssllabs.com/ssltest/analyze.html?d=tf2pickup.de) and [A+ in Mozilla Observatory](https://observatory.mozilla.org/analyze/tf2pickup.de) tests.

## Domain name setup

We encourage for purchasing domains on OVH since they provide a API allowing for dynamic DNS zone updates. If a pickup domain was not purchased on OVH nor any domain registrar for which certbot DNS API plugin was made, we encourage for parking the DNS domain zone in Cloudflare, since they provide their domain zone services for free and their API is pretty easy to use.

## Certbot setup

We discourage using certbot version from the repository, since their versions are very old. EFF encourages to download a binary manually or to use a certbot snap package, in which we seem the snap package as a better option due to automatic package updates made by the `snapd` service. At the moment of writing this guide the certbot version in the official Ubuntu repository is:

```sh
# certbot --version
certbot 0.40.0
```

while in the meanwhile the snap version is:

```sh
# certbot --version
certbot 1.14.0
```

```sh
sudo apt install snapd
sudo systemctl enable snapd.service
sudo snap install core
sudo snap install certbot --classic
sudo snap set certbot trust-plugin-with-root=ok
sudo snap install certbot-dns-cloudflare
```

```crontab
0  1   20 * *   certbot certonly --non-interactive -d tf2pickup.pl -d '*.tf2pickup.pl' --dns-cloudflare --dns-cloudflare-credentials /root/.secrets/cloudflare --rsa-key-size 4096 --must-staple
```

## Nginx setup

```sh
openssl dhparam -out /etc/letsencrypt/ssl-dhparams.pem 4096
```

``/etc/nginx/nginx.conf``:

```nginx
user www-data;
worker_processes auto;
pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;
events {
        worker_connections 768;
        # multi_accept on;
}

http {

        ##
        # Basic Settings
        ##
        ssl_session_cache shared:ssl_session_cache:10m;
        sendfile on;
        tcp_nopush on;
        tcp_nodelay on;
        keepalive_timeout 65;
        types_hash_max_size 2048;
        server_tokens off;
        server_names_hash_bucket_size 64;
        # server_name_in_redirect off;

        include /etc/nginx/mime.types;
        default_type application/octet-stream;

        ##
        # SSL Settings
        ##

        ssl_protocols TLSv1.3 TLSv1.2;
        ssl_prefer_server_ciphers off;
        ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
        ssl_ecdh_curve secp521r1:secp384r1;
        # Logging Settings
        ##
        access_log /var/log/nginx/access.log;
        error_log /var/log/nginx/error.log;

        ##
        # Gzip Settings
        ##

        gzip off;
        ##
        # Virtual Host Configs
        ##

        include /etc/nginx/conf.d/*.conf;
        include /etc/nginx/sites-enabled/*;
        # Security Settings

        add_header X-Frame-Options DENY;
        add_header X-Content-Type-Options nosniff;
        add_header X-XSS-Protection "1; mode=block";
}
```

``/etc/nginx/nginx/sites-available/tf2pickup.pl``:

```nginx
map $http_upgrade $connection_upgrade {
        default upgrade;
        ''      close;
}
server {
        listen 80;
        listen [::]:80;
        server_name yu.tf2pickup.pl;
        return 302 https://tf2pickup.pl$request_uri;
}
server {
        access_log /var/log/nginx/tf2pickup.pl-access.log;
        error_log /var/log/nginx/tf2pickup.pl-error.log;
        listen 443 ssl http2;
        listen [::]:443 ssl http2;
        server_name tf2pickup.pl;
        ssl_certificate /etc/letsencrypt/live/tf2pickup.pl/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/tf2pickup.pl/privkey.pem;
        ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
        ssl_stapling on;
        ssl_stapling_verify on;
        ssl_session_cache shared:ssl_session_cache:10m;
        ssl_trusted_certificate /etc/letsencrypt/live/tf2pickup.pl/chain.pem;
        location / {
                proxy_pass http://127.0.0.1:4000;
                add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload";
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade; # allow websockets
                proxy_set_header Connection $connection_upgrade;
                proxy_set_header X-Forwarded-For $remote_addr; # preserve client IP
                }
}
```

``/etc/nginx/nginx/sites-available/api.tf2pickup.pl``:

```nginx
map $http_upgrade $connection_upgrade {
        default upgrade;
        ''      close;
}
server {
        listen 80;
        listen [::]:80;
        server_name api.tf2pickup.pl;
        return 302 https://api.tf2pickup.pl$request_uri;
}
server {
        access_log /var/log/nginx/api.tf2pickup.pl-access.log;
        error_log /var/log/nginx/api.tf2pickup.pl-error.log;
        listen 443 ssl http2;
        listen [::]:443 ssl http2;
        server_name api.tf2pickup.pl;
        ssl_certificate /etc/letsencrypt/live/api.tf2pickup.pl/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/api.tf2pickup.pl/privkey.pem;
        ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
        ssl_stapling on;
        ssl_stapling_verify on;
        ssl_session_cache shared:ssl_session_cache:10m;
        ssl_trusted_certificate /etc/letsencrypt/live/api.tf2pickup.pl/chain.pem;
        location / {
                proxy_pass http://127.0.0.1:3000;
                add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload";
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade; # allow websockets
                proxy_set_header Connection $connection_upgrade;
                proxy_set_header X-Forwarded-For $remote_addr; # preserve client IP
                }
}
```

```sh
ln -s /etc/nginx/sites-available/api.tf2pickup.pl /etc/nginx/sites-enabled/api.tf2pickup.pl
ln -s /etc/nginx/sites-available/tf2pickup.pl /etc/nginx/sites-enabled/tf2pickup.pl
```
