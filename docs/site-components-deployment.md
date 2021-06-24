---
title: Site components deployment
---

In order to allow for a quick site setup, we make use of Docker containers. That let us set up the website (client and server with its database), gameservers and optionally a Mumble server. In order to start the site, you have to have all files specified below. Examples are based on [tf2pickup.fi](https://tf2pickup.fi) website, domain and their Discord server.

## Prerequisites

- have everything mentioned in the [reverse proxy deployment](/docs/reverse-proxy-deployment) set up,
- have modern Docker and docker-compose version installed in your system, for docker-compose [use this guide](https://docs.docker.com/compose/install/) and for Docker feel free to use guides for:
  - [Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04),
  - [Debian 10](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-debian-10),
  - [Arch Linux](https://wiki.archlinux.org/title/docker#Installation),
- prepare the following files in a separate folder, name it `tf2pickup.fi`, then place inside:
  - `.env` - stores variables needed for setting client, server, database and mumble containers up
  - `gameserver_1.env` - stores settings for the first game server _(optional)_
  - `gameserver_2.env` - stores settings for the second game server _(optional)_
  - `gameserver_3.env` - stores settings for the second game server _(optional)_
  - `docker-compose.yml` - contains all container settings
  - `data/murmur.ini` - contains all mumble server settings excluding SuperUser account password _(optional)_
  - `maps/` folder - it should contain all maps available for the game servers, both in `.bsp` and `.bsp.bz2`, example:

Files `gameserver_{1,2,3}.env` are useful if you want to host game servers on the same host as the website. There is no `gameserver_3.env` example, but in fact the file syntax is the same, so you can basically edit values and just uncomment the part of the configuration in the `docekr-compose.yml` file. In the same way, if you want to host 1 game server, just comment parts of the second game server and if you want to run game servers separately, just comment all parts of it in the aforementioned file.

The same rule goes for the Mumble server - if you want to run it outside Docker, aka use a local system installation, just don't provide needed configs for it and comment the part of the `docker-compose.yml` file for it.

```sh
root@tf2pickup:~# ls /home/tf2pickup/tf2pickup.fi/maps/ -al
total 1259216
drwxr-xr-x 2 tf2pickup tf2pickup      4096 Jun  8 22:35 .
drwxrwxr-x 4 tf2pickup tf2pickup      4096 Jun  9 21:09 ..
-rw-r--r-- 1 tf2pickup tf2pickup  25981141 Nov 16  2017 cp_badlands.bsp
-rw-r--r-- 1 tf2pickup tf2pickup  48651296 Mar 16  2017 cp_granary_pro_rc8.bsp
-rw-r--r-- 1 tf2pickup tf2pickup  18710602 Mar 16  2017 cp_granary_pro_rc8.bsp.bz2
-rw-r--r-- 1 tf2pickup tf2pickup  38912080 Feb  4 12:51 cp_gullywash_f3.bsp
-rw-r--r-- 1 tf2pickup tf2pickup  17992573 Feb  4 12:51 cp_gullywash_f3.bsp.bz2
-rw-r--r-- 1 tf2pickup tf2pickup  24500234 Jan 11  2019 cp_gullywash_final1.bsp
-rw-r--r-- 1 tf2pickup tf2pickup  24061268 Jan 11  2019 cp_gullywash_final1.bsp.bz2
-rw-r--r-- 1 tf2pickup tf2pickup  28731812 May 22  2020 cp_logjam_rc12f.bsp
-rw-r--r-- 1 tf2pickup tf2pickup  12693814 May 22  2020 cp_logjam_rc12f.bsp.bz2
-rw-r--r-- 1 tf2pickup tf2pickup  29100584 Jan 14  2019 cp_logjam_rc9.bsp
-rw-r--r-- 1 tf2pickup tf2pickup  12987328 Jan 14  2019 cp_logjam_rc9.bsp.bz2
-rw-r--r-- 1 tf2pickup tf2pickup  18970621 Dec  8  2019 cp_metalworks.bsp
-rw-r--r-- 1 tf2pickup tf2pickup  18687571 Dec  8  2019 cp_metalworks.bsp.bz2
-rw-r--r-- 1 tf2pickup tf2pickup  18312502 Nov 29  2020 cp_process_f7.bsp
-rw-r--r-- 1 tf2pickup tf2pickup  18024376 Nov 29  2020 cp_process_f7.bsp.bz2
-rw-r--r-- 1 tf2pickup tf2pickup  49282532 Apr 15  2017 cp_process_final.bsp
-rw-r--r-- 1 tf2pickup tf2pickup  21364357 Apr 15  2017 cp_process_final.bsp.bz2
-rw-r--r-- 1 tf2pickup tf2pickup  77921396 Jul 22  2018 cp_prolands_b6.bsp
-rw-r--r-- 1 tf2pickup tf2pickup  23282904 Jul 22  2018 cp_prolands_b6.bsp.bz2
-rw-r--r-- 1 tf2pickup tf2pickup  72041100 Jan  3  2019 cp_prolands_rc2p.bsp
-rw-r--r-- 1 tf2pickup tf2pickup  31122834 Jan  3  2019 cp_prolands_rc2p.bsp.bz2
-rw-r--r-- 1 tf2pickup tf2pickup  32477488 Apr 25  2020 cp_reckoner_rc6.bsp
-rw-r--r-- 1 tf2pickup tf2pickup  32243941 Apr 25  2020 cp_reckoner_rc6.bsp.bz2
-rw-r--r-- 1 tf2pickup tf2pickup  20378888 Jan 31  2019 cp_snakewater_final1.bsp
-rw-r--r-- 1 tf2pickup tf2pickup  20126408 Jan 31  2019 cp_snakewater_final1.bsp.bz2
-rw-r--r-- 1 tf2pickup tf2pickup  30319857 Dec  8  2019 cp_sunshine.bsp
-rw-r--r-- 1 tf2pickup tf2pickup  29938052 Dec  8  2019 cp_sunshine.bsp.bz2
-rw-r--r-- 1 tf2pickup tf2pickup  19277592 Feb  7 17:44 koth_clearcut_b15d.bsp
-rw-r--r-- 1 tf2pickup tf2pickup   9010068 Feb  7 17:44 koth_clearcut_b15d.bsp.bz2
-rw-r--r-- 1 tf2pickup tf2pickup  17218901 May 11  2019 koth_product_rcx.bsp
-rw-r--r-- 1 tf2pickup tf2pickup  17056131 May 11  2019 koth_product_rcx.bsp.bz2
```

Then, these are templates for the aforementioned files:

## `.env`

```env
### Configuration for the Server

# An URL to where this server instance will be accessed
API_URL=https://api.tf2pickup.fi

# An URL to where the client is hosted
CLIENT_URL=https://tf2pickup.fi

# The bot name; it can be changed via the web client afterwards
BOT_NAME=tf2pickup.fi

# MongoDB
MONGODB_HOST=localhost
MONGODB_PORT=8001
MONGODB_DB=admin
MONGODB_USERNAME=tf2pickup
MONGODB_PASSWORD=yoursuperfunnypassword

# Steam API key
# Get your key at https://steamcommunity.com/dev/apikey
STEAM_API_KEY=1234567890ABCDEF1234567890ABCDEF

# A passphare that is used to encrypt the keystore file.
# NOTE: For production, get a random password (i.e. from https://passwordsgenerator.net/)
# and do not change it afterwards. If you change the passphare all JWT tokens will no longer
# be valid, so all clients will be logged out.
KEY_STORE_PASSPHARE=XDXDXDXDXDXDXDXDXD

# SteamID of the super-user
# NOTE: Use the SteamID64 format.
SUPER_USER=76561198011558250

# Which gamemode to run; see src/configs/queue for different gamemodes, possible values: 6v6, 9v9
QUEUE_CONFIG=6v6

# Mumble channel configuration
MUMBLE_SERVER_URL=tf2pickup.fi
MUMBLE_CHANNEL_NAME=tf2pickup
# This variable is used for passing a root tree channel name in which the pickup backend can
# generate links to the channel for the games, this setup allows for 3 games running in the same time.
# tf2pickup
# ├───1
# │   ├───BLU
# │   └───RED
# ├───2
# │   ├───BLU
# │   └───RED
# └───3
#     ├───BLU
#     └───RED

# Log relay
# The log relay uses one UDP port to receive logs from the TF2 game servers. These are used
# to determine when the match starts, ends, when users connect, etc.
# It should be the same address as API_URL, but without the https schema.
LOG_RELAY_ADDRESS=tf2pickup.fi
LOG_RELAY_PORT=9871

# Discord (optional)
# You will find a bot token at https://discord.com/developers/applications
DISCORD_BOT_TOKEN=XDXDXDXDXDXDXDXDXDXDXDXDXDXDXDXDXDXDXDXDXDXDXDXDXDXDXDXDXDX
DISCORD_GUILD=tf2pickup.fi
DISCORD_QUEUE_NOTIFICATIONS_CHANNEL=tf2pickupfi-yleinen
DISCORD_QUEUE_NOTIFICATIONS_MENTION_ROLE=Sotilas
DISCORD_ADMIN_NOTIFICATIONS_CHANNEL=admin-ilmoitukset

# twitch.tv integration (optional)
# https://dev.twitch.tv/console, while setting up a new app,
# use OAuth Redirect URL: https://api.tf2pickup.fi/twitch/auth/return
TWITCH_CLIENT_ID=XDXDXDXDXDXDXDXDXDXDXDXDXDXDXD
TWITCH_CLIENT_SECRET=XDXDXDXDXDXDXDXDXDXDXDXDXDXDXD


### Mumble Server Configuration

# Timezone
MUMBLE_TZ=Europe/Helsinki
MUMBLE_SUPERUSER_PASSWORD=XDXDXDXDXDXDXDXDXDXDXDXDXDXDXDXDXDXDXDXDXDXDXDXDXD
```

### Setting up Steam API key

This is probably the easiest API key to get from all tasks here - open [Steam Web API Key site](https://steamcommunity.com/dev/apikey), enter `tf2pickup.fi` in the **Domain Name** field, agree for *Steam Web API Terms of Use* and click **Register**.

![steam-api-key-register](/img/content/steam-api-key-register.png)

Then, copy and pass **Key** value to a `STEAM_API_KEY` variable.

![steam-api-key-registered](/img/content/steam-api-key-registered.png)

### Setting up Discord bot

:::tip

This step is optional.

:::

TODO: add Discord bot setup

### Setting up Discord channels

:::tip

This step is optional.

:::

TODO: add Discord channels setup

### Setting up Twitch stream integration

:::tip

This step is optional.

:::

Setting it enables site users to integrate their tf2pickup accounts with Twitch, letting access their Twitch profiles through a Twitch link in an icon.

![player-profile](/img/content/player-profile.png)

Moreover, it will show up all Twitch streams on a left site of the main page.

![tf2pickup.fi](/img/content/tf2pickup.fi.png)

Go to the [Twitch Developers console](https://dev.twitch.tv/console) and register your new application by clicking **Register Your Application**:

![twitch-dev-console-register-your-application](/img/content/twitch-dev-console-register-your-application.png)

Define application name as `tf2pickup.fi` with OAuth Redirect URLs as `https://api.tf2pickup.fi/twitch/auth/return`. Choose any category - the best one for that purpose would be `Website Integration`. After defining that verify that you are not a bot and save.

Then, you will see the application list. Find `tf2pickup.fi` and select **Manage**. You will be able to see the **Client ID**, the value used in `TWITCH_CLIENT_ID` variable. The Client Secret will be hidden, press New Secret and confirm it in the popup. The Client Secret will show up like on the screenshot below:

![twitch-dev-console-tf2pickup.fi-api-settings](/img/content/twitch-dev-console-tf2pickup.fi-api-settings.png)

Pass this secret value to a `TWITCH_CLIENT_SECRET` variable.

### Mumble channel setup example

Here you can find one more example of how the Mumble channels should be set up in practice:
![mumble-channel-scheme](/img/content/mumble-channel-scheme.png)

## `gameserver_1.env`

```env
# TF2 Game server Configuration

PORT=27015
CLIENT_PORT=27016
STEAM_PORT=27018
STV_PORT=27020

RCON_PASSWORD=funny_rcon_password
SERVER_HOSTNAME=tf2pickup.fi #1
SERVER_PASSWORD=some_random_password
STV_NAME=tf2pickup.fi TV
STV_TITLE=tf2pickup.fi Source TV

# Get your logs.tf API key from https://logs.tf/uploader
LOGS_TF_APIKEY=XDXDXDXDXDXDXDXDXDXDXDXDXDXDXDXD
LOGS_TF_PREFIX=tf2pickup.fi
# Get your demos.tf API key from https://demos.tf/upload
DEMOS_TF_APIKEY=XDXDXDXDXDXDXDXDXDXDXD..XD.XDXDXDXDXDXDXDXDXDXDXDXDXDXDXDXDXDXDXD
```

## `gameserver_2.env`

```env
# TF2 Gameserver Configuration

PORT=27025
CLIENT_PORT=27026
STEAM_PORT=27028
STV_PORT=27030

RCON_PASSWORD=funny_rcon_password
SERVER_HOSTNAME=tf2pickup.fi #2
SERVER_PASSWORD=some_random_password
STV_NAME=tf2pickup.fi TV
STV_TITLE=tf2pickup.fi Source TV
# Get your logs.tf API key from https://logs.tf/uploader
LOGS_TF_APIKEY=XDXDXDXDXDXDXDXDXDXDXDXDXDXDXDXD
LOGS_TF_PREFIX=tf2pickup.fi
# Get your demos.tf API key from https://demos.tf/upload
DEMOS_TF_APIKEY=XDXDXDXDXDXDXDXDXDXDXD..XD.XDXDXDXDXDXDXDXDXDXDXDXDXDXDXDXDXDXDXD
```

## `docker-compose.yml`

```docker
version: '2.4'

services:
  website:
    network_mode: host
    container_name: 'tf2pickup'
    depends_on:
      - mongodb
    image: tf2pickuppl/server
    restart: always
    # ports:
    # - '3000:3000'
    # - '9871:9871/udp'
    volumes:
    - './.env:/tf2pickup.pl/.env'
    - './.migrate:/tf2pickup.pl/.migrate'
    # links:
    #  - mongodb
## COMMENT/DELETE THIS PART IF YOU DON'T USE MUMBLE ##
  mumble-server:
    image: phlak/mumble
    ports:
      - '64738:64738/tcp'
      - '64738:64738/udp'
    restart: unless-stopped
    volumes:
      - ./data:/etc/mumble
      - /etc/localtime:/etc/localtime:ro
      - /etc/letsencrypt/live/tf2pickup.fi:/cert/live/tf2pickup.fi:ro
      - /etc/letsencrypt/archive/tf2pickup.fi:/cert/archive/tf2pickup.fi:ro
    environment:
    #  - SUPERUSER_PASSWORD=${MUMBLE_SUPERUSER_PASSWORD}
      - TZ=${MUMBLE_TZ}
## COMMENT/DELETE THIS PART IF YOU DON'T USE MUMBLE ##
  mongodb:
    image: mongo:4.0
    restart: unless-stopped
    ports:
     - '8001:27017'
    volumes:
    - database-data:/data/db
    environment:
      - MONGO_INITDB_ROOT_USERNAME=${MONGODB_USERNAME}
      - MONGO_INITDB_ROOT_PASSWORD=${MONGODB_PASSWORD}
      - MONGO_INITDB_DATABASE=${MONGODB_DB}
## COMMENT/DELETE THIS PART IF YOU DON'T USE 1ST GAME SERVER ##
  gameserver1:
    image: tf2pickuppl/tf2-gameserver
    network_mode: host
    tty: true
    stdin_open: true
    restart: always
    volumes:
    - ./maps:/home/tf2/server/tf/maps:ro
    env_file:
    - ./gameserver_1.env
## COMMENT/DELETE THIS PART IF YOU DON'T USE 1ST GAME SERVER ##

## COMMENT/DELETE THIS PART IF YOU DON'T USE 2ND GAME SERVER ##
  gameserver2:
    image: tf2pickuppl/tf2-gameserver
    network_mode: host
    tty: true
    stdin_open: true
    restart: always
    volumes:
    - ./maps:/home/tf2/server/tf/maps:ro
    env_file:
    - ./gameserver_2.env
## COMMENT/DELETE THIS PART IF YOU DON'T USE 2ND GAME SERVER ##

## COMMENT/DELETE THIS PART IF YOU DON'T USE 3RD GAME SERVER ##
  #gameserver3:
  #  image: tf2pickuppl/tf2-gameserver
  #  network_mode: host
  #  tty: true
  #  stdin_open: true
  #  restart: always
  #  volumes:
  #  - ./maps:/home/tf2/server/tf/maps:ro
  #  env_file:
  #  - ./gameserver_3.env
## COMMENT/DELETE THIS PART IF YOU DON'T USE 3RD GAME SERVER ##
  client:
    image: tf2pickuppl/tf2pickup.fi
    restart: always
    ports:
     - '4000:80'
    volumes:
    - staticwebsite:/usr/share/nginx/html
volumes:
## COMMENT/DELETE THIS PART IF YOU DON'T USE MUMBLE ##
  mumble-data:
## COMMENT/DELETE THIS PART IF YOU DON'T USE MUMBLE ##
  database-data:
  staticwebsite:
    driver: local 
    driver_opts:
        type: none
        o: bind
        device: /var/www/client/

networks:
    default: 
        enable_ipv6: true
        ipam:
            driver: default
            config:
              - subnet: 172.16.238.0/24
              - subnet: fc00::/64
```

## `data/murmur.ini`

```ini
# Murmur configuration file.
#
# General notes:
# * Settings in this file are default settings and many of them can be overridden
#   with virtual server specific configuration via the Ice or DBus interface.
# * Due to the way this configuration file is read some rules have to be
#   followed when specifying variable values (as in variable = value):
#     * Make sure to quote the value when using commas in strings or passwords.
#        NOT variable = super,secret BUT variable = "super,secret"
#     * Make sure to escape special characters like '\' or '"' correctly
#        NOT variable = """ BUT variable = "\""
#        NOT regex = \w* BUT regex = \\w*

# Path to database. If blank, will search for
# murmur.sqlite in default locations or create it if not found.
database=/etc/mumble/murmur.sqlite
registerName=tf2pickup.fi
icesecretwrite=
# How many login attempts do we tolerate from one IP
# inside a given timeframe before we ban the connection?
# Note that this is global (shared between all virtual servers), and that
# it counts both successfull and unsuccessfull connection attempts.
# Set either Attempts or Timeframe to 0 to disable.
autobanAttempts = 10
autobanTimeframe = 120
autobanTime = 300
# Specifies the file Murmur should log to. By default, Murmur
# logs to the file 'murmur.log'. If you leave this field blank
# on Unix-like systems, Murmur will force itself into foreground
# mode which logs to the console.
logfile=/etc/mumble/mumble-server.log
# The below will be used as defaults for new configured servers.
# If you're just running one server (the default), it's easier to
# configure it here than through D-Bus or Ice.
#
# Welcome message sent to clients when they connect.
welcometext="Tervetuloa <A href=\"https://tf2pickup.fi/\">tf2pickup.fi</A> mumbleen.<br>Suomi TF2 discord: <A href=\"https://discord.gg/T6PfVC3bqQ\">linkki</A><br>"
# Port to bind TCP and UDP sockets to.
port=64738
# Specific IP or hostname to bind to.
# If this is left blank (default), Murmur will bind to all available addresses.
#host=
# Password to join server.
serverpassword=
# Maximum bandwidth (in bits per second) clients are allowed
# to send speech at.
bandwidth=130000
# Maximum number of concurrent clients allowed.
users=150
# Regular expression used to validate channel names.
# (Note that you have to escape backslashes with \ )
#channelname=[ \\-=\\w\\#\\[\\]\\{\\}\\(\\)\\@\\|]+
# Regular expression used to validate user names.
# (Note that you have to escape backslashes with \ )
#username=[-=\\w\\[\\]\\{\\}\\(\\)\\@\\|\\.]+
uname=mumble
# If this options is enabled, only clients which have a certificate are allowed
# to connect.
#certrequired=False
sslCert=/cert/live/tf2pickup.fi/fullchain.pem
sslKey=/cert/live/tf2pickup.fi/privkey.pem
sslDHParams=@ffdhe4096
[Ice]
Ice.Warn.UnknownProperties=1
Ice.MessageSizeMax=65536
```

## `docker-compose up -d`

In order to create and start all containers needed for letting site working, you just have to enter the `tf2pickup.fi` folder with all files prepared for a launch and execute `docker-compose up -d`. Each time you would like to stop the application stack, you are supposed to execute command `docker-compose stop` and `docker-compose start -d` when you start the stack. Containers have a `restart always` policy meaning the containers will always restart on fail, so it will also always start on a system boot as long as `docker.service` service is also starting on system boot.

## Using Mumble outside Docker stack

When doing it, you may end up with Mumble server service crashing, since it won't have needed permissions and files ownership for the `mumble-server` service user to let it read the certificate contents. We suggest you to use this in order to change them. You can save it as `mumble-certs.sh`, give it execution rights, run it manually and then leave it in crontab in the same way like you renew the certificates through `certbot`, so every time you get a certificate, the Mumble server will refresh the file permissions/ownership and refresh the Mumble server without restarting it.

- `mumble-certs.sh`:

```sh
#!/usr/bin/env sh
sudo chmod 755 /etc/letsencrypt/archive/
sudo chmod 755 /etc/letsencrypt/live/
sudo chgrp mumble-server -- /etc/letsencrypt/archive/tf2pickup.fi/privkey*.pem
sudo chmod 640 -- /etc/letsencrypt/archive/tf2pickup.fi/privkey*.pem
exec pkill -USR1 -F /run/mumble-server/mumble-server.pid
```

You can find an example how to set up the crontab jobs (in order to edit it, use `crontab -e` command as `root`) below:

```cron
0  1   20 * *   certbot certonly --non-interactive -d tf2pickup.fi -d '*.tf2pickup.fi' --dns-cloudflare --dns-cloudflare-credentials /root/.secrets/cloudflare --rsa-key-size 4096 --must-staple
0  1   25 * *   systemctl restart nginx
0  1   25 * *   sh /etc/mumble-certs.sh
```

Moreover, `/etc/mumble-server.ini` should have values for the `sslCert` and `sslKey` changed from:

```sh
sslCert=/cert/live/tf2pickup.fi/fullchain.pem
sslKey=/cert/live/tf2pickup.fi/privkey.pem
```

to:

```sh
sslCert=/etc/letsencrypt/live/tf2pickup.fi/fullchain.pem
sslKey=/etc/letsencrypt/live/tf2pickup.fi/privkey.pem
```
