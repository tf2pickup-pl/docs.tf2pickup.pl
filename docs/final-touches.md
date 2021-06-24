---
title: Final touches
---

## Adding site rules

You definitely want to define what things are allowed and what not, and because of that you should define site rules. You can do so through the Admin Panel. All instructions here are written in Markdown (based on [Marked.js](https://marked.js.org/)). Edits should be done on left side of the page, right one shows up a rule page preview.

:::caution

We discourage you to use inline HTML formatting, since it's buggy.

:::

![edit-rules](/img/content/edit-rules.png)

After setting up the rules, they will show up in a popup for every user joining the site for the very first time (right with Mumble requirement notification):

![edit-rules](/img/content/i-have-mumble.png)

![edit-rules](/img/content/accept-site-rules.png)

## Adding game servers to the website

Pickup games require game servers on which it can be set up. In order to do that, you have to add one by entering the **servers** section and clicking a button to add game server. Define it's public name in the **Name** section, add the server address, port and the RCON password to the server. Example:

```nolanguage
Name: tf2pickup.fi #1
Address: tf2pickup.fi
Port: 27015
RCON password: funny_rcon_password
```

![add-game-server](/img/content/add-game-server.png)

After saving settings, the site will have to check if it can connect to the server and set it up. In most cases, the server status colour should be changed from red to green.

![game-server-status](/img/content/game-server-status.png)

If that won't happen, click **Run diagnostics** button in order to perform server troubleshooting. The site will perform a few tests in order to see what may be a root cause of the problem.

![run-diagnostics](/img/content/run-diagnostics.png)

There you can see the diagnostics status. In this case everything went smooth and things seem to be fine.

![diagnostics-status](/img/content/diagnostics-status.png)

## Add admins to the site, set up whitelist, maps and skills

After the site start, you may want to add admins in order to make site moderation easier and faster. To do that, you have to open up the player profile, choose **roles** button and choose a right role for them:

![run-diagnostics](/img/content/player-profile.png)

- no role - default player role, no administrative access,
- admin - lets player set up everything on the website excluding managing game servers and player roles on the site,
- super user - unlimited administrative privileges, the user defined in the `.env` configuration has this role always assigned in.

![run-diagnostics](/img/content/player-roles.png)

For setting a whitelist [look there](/docs/website-settings#defining-a-whitelist), map pool settings can be seen [there](/docs/website-settings#map-pool-settings), and [there](/the-most-common-tasks#setting-up-players-skills) you can look at for the skill setup.

## Host system updates

Based on the Linux distribution you have (regardless if it's as a normal Linux installation or as a Windows Subsystem for Linux instance) just execute updates in a way suggested by a distribution documentation ([here's an example from Ubuntu](https://ubuntu.com/server/docs/upgrade-introduction) which is the same for Debian, as Ubuntu is a Debian-based distribution). In case you use Windows 10/Windows Server 2019, you may probably end up with Ubuntu too, so updating the system is being done in the same way, however upgrades between distribution versions is done by installing a new version of the Ubuntu application from Microsoft Store.
:::important

Please note that using WSL2 for hosting pickups is not recommended for the production, but it is completely fine for the development.

:::

## Pickup site updates

If you set up containers by using our `docker-compose.yml` sample, there are two ways of updating pickups - manually and automatically.

The manual way expects you to download (pull) images for your containers and then restart and replace old container images with the new ones. You can do so by executing commands in the folder with the configuration files ([tips are from there](https://stackoverflow.com/questions/31466428/how-to-restart-a-single-container-with-docker-compose)):

```bash
docker-compose pull
docker-compose stop
docker compose up -d
```

If your containers are not set up with docker-compose, you will have to pull all container images you use manually and recreate containers with the same port usage, links to the container and port definitions. However, if you want to do it once and immediately, you can use watchtower in order to do it automatically by executing:

```bash
docker run --rm \
    -v /var/run/docker.sock:/var/run/docker.sock \
    containrrr/watchtower \
    --run-once
```

:::caution

The example above will update all containers you have on your host! If you want to update specific containers, execute:

```bash
docker run --rm \
    -v /var/run/docker.sock:/var/run/docker.sock \
    containrrr/watchtower \
    --run-once \
    tf2pickupfi_gameserver1_1 \
    tf2pickupfi_gameserver2_1 \
    tf2pickupfi_mongodb_1 \
    tf2pickup \
    tf2pickupfi_client_1
```

:::

There you can see how it looks like in practice (this specific example is based on **tf2pickup.cz**):

```bash
tf2pickup@tf2pickup:~$ docker run --rm \
    -v /var/run/docker.sock:/var/run/docker.sock \
    containrrr/watchtower \
    --run-once
time="2021-06-23T10:48:56Z" level=info msg="Watchtower 1.3.0\nUsing no notifications\nChecking all containers (except explicitly disabled with label)\nRunning a one time update."
time="2021-06-23T10:49:05Z" level=info msg="Found new tf2pickuppl/tf2pickup.cz:latest image (586b0ef05dcd)"
time="2021-06-23T10:53:49Z" level=info msg="Found new tf2pickuppl/tf2-gameserver:latest image (7a86ac6e792a)"
time="2021-06-23T10:54:16Z" level=info msg="Found new mongo:latest image (e12d72fd1857)"
time="2021-06-23T10:54:26Z" level=info msg="Found new portainer/portainer-ce:latest image (45be17a5903a)"
time="2021-06-23T10:54:26Z" level=info msg="Stopping /portainer (087e341f7e51) with SIGTERM"
time="2021-06-23T10:55:00Z" level=info msg="Stopping /mongo (7d2f55013020) with SIGTERM"
time="2021-06-23T10:55:01Z" level=info msg="Stopping /tf2pickup-gameserver (1f7cc1e037ca) with SIGTERM"
time="2021-06-23T10:55:12Z" level=info msg="Stopping /tf2pickup-cz-frontend (8af1b342f0a4) with SIGTERM"
time="2021-06-23T10:55:13Z" level=info msg="Creating /tf2pickup-cz-frontend"
time="2021-06-23T10:55:17Z" level=info msg="Creating /tf2pickup-gameserver"
time="2021-06-23T10:55:17Z" level=info msg="Creating /mongo"
time="2021-06-23T10:55:19Z" level=info msg="Creating /portainer"
tf2pickup@tf2pickup:~$ docker ps -a
CONTAINER ID   IMAGE                               COMMAND                  CREATED          STATUS          PORTS                                            NAMES
dc4d44148848   portainer/portainer-ce:latest       "/portainer"             11 minutes ago   Up 11 minutes   0.0.0.0:8000->8000/tcp, 0.0.0.0:9000->9000/tcp   portainer
58d79c0eae41   mongo:latest                        "docker-entrypoint.s…"   11 minutes ago   Up 11 minutes   0.0.0.0:44999->27017/tcp                         mongo
0ac50282f207   tf2pickuppl/tf2-gameserver:latest   "./entrypoint.sh +sv…"   11 minutes ago   Up 11 minutes                                                    tf2pickup-gameserver
532925f38b93   tf2pickuppl/tf2pickup.cz:latest     "/docker-entrypoint.…"   11 minutes ago   Up 11 minutes   0.0.0.0:5309->80/tcp                             tf2pickup-cz-frontend
8bf4a113b4f9   tf2pickuppl/server:latest           "docker-entrypoint.s…"   2 months ago     Up 7 weeks                                                       tf2pickup-server
a292297b593f   cc6b1ab35b7b                        "./entrypoint.sh +sv…"   3 months ago     Up 2 months                                                      tf2pickup-gameserver-2
tf2pickup@tf2pickup:~$ docker run --rm     -v /var/run/docker.sock:/var/run/docker.sock     containrrr/watchtower     --run-once
time="2021-06-23T11:13:26Z" level=info msg="Watchtower 1.3.0\nUsing no notifications\nChecking all containers (except explicitly disabled with label)\nRunning a one time update."
time="2021-06-23T11:13:35Z" level=info msg="Found new tf2pickuppl/tf2-gameserver:latest image (7a86ac6e792a)"
time="2021-06-23T11:13:35Z" level=info msg="Stopping /tf2pickup-gameserver-2 (a292297b593f) with SIGTERM"
time="2021-06-23T11:13:45Z" level=info msg="Creating /tf2pickup-gameserver-2"
tf2pickup@tf2pickup:~$ docker ps -a
CONTAINER ID   IMAGE                               COMMAND                  CREATED          STATUS          PORTS                                            NAMES
cb236f93943e   tf2pickuppl/tf2-gameserver:latest   "./entrypoint.sh +sv…"   5 seconds ago    Up 4 seconds                                                     tf2pickup-gameserver-2
dc4d44148848   portainer/portainer-ce:latest       "/portainer"             18 minutes ago   Up 18 minutes   0.0.0.0:8000->8000/tcp, 0.0.0.0:9000->9000/tcp   portainer
58d79c0eae41   mongo:latest                        "docker-entrypoint.s…"   18 minutes ago   Up 18 minutes   0.0.0.0:44999->27017/tcp                         mongo
0ac50282f207   tf2pickuppl/tf2-gameserver:latest   "./entrypoint.sh +sv…"   18 minutes ago   Up 18 minutes                                                    tf2pickup-gameserver
532925f38b93   tf2pickuppl/tf2pickup.cz:latest     "/docker-entrypoint.…"   18 minutes ago   Up 18 minutes   0.0.0.0:5309->80/tcp                             tf2pickup-cz-frontend
8bf4a113b4f9   tf2pickuppl/server:latest           "docker-entrypoint.s…"   2 months ago     Up 7 weeks  
```

Alternatively, you can use a Watchtower container which can update all/specific containers automatically with a schedule. All you need to do is to deploy it with proper parameters ([the one in example will execute upgrades everyday at 5:00 AM](https://pkg.go.dev/github.com/robfig/cron@v1.2.0#hdr-CRON_Expression_Format)):

```bash
docker run -d \
    --name watchtower \
    --restart always \
    -v /var/run/docker.sock:/var/run/docker.sock \
    containrrr/watchtower \
    --cleanup --include-stopped --schedule "0 0 5 * * *"
```

Watchtower will pull images and replace container images automatically. It also deletes old images after being replaced by the new ones, so it will not waste your disk space.

## Backups

The best backup policy would be to:

- make full host backups (especially easy if you own a VPS, since your VPS provider can provide backups (even on automatic basis!), like OVH or Hetzner do), weekly basis are really fine already,
- store configuration files copy somewhere outside the server in case of armageddon,
- execute daily MongoDB backups and copy those on external storage, so if your server dies, you will be able to access those database dumps somehow.

Here's a backup script you can use for the backups:

```bash
#!/bin/bash
export PATH=/bin:/usr/bin:/usr/local/bin
TODAY=`date +"%d%b%Y"`
################################################################
################## Update below values  ########################

export LC_ALL=C
DB_BACKUP_PATH='/home/tf2pickup/tf2pickup.fi/backup' ## Make sure you create this folder before script execution
MONGODB_CONTAINER_NAME='tf2pickupfi_mongodb_1' # MongoDB container name in the tf2pickup stack
MONGODB_USERNAME='tf2pickup' # MongoDB username passed in the .env file
MONGODB_PASSWORD='yoursuperfunnypassword' # MongoDB password passed in the .env file
BACKUP_RETAIN_DAYS=7   ## Number of days to keep local backup copy

#################################################################

mkdir -p ${DB_BACKUP_PATH}/${TODAY}

/usr/bin/docker exec -i ${MONGODB_CONTAINER_NAME} '/bin/bash' \
     -c "mongodump --quiet --archive -u ${MONGODB_USERNAME} -p ${MONGODB_PASSWORD}" \
     | gzip > ${DB_BACKUP_PATH}/${TODAY}/tf2pickup-${TODAY}.dump.gz

if [ $? -eq 0 ]; then
  echo "tf2pickup Database backup successfully completed"
else
  echo "Error found during tf2pickup backup"
  exit 1
fi

##### Remove backups older than {BACKUP_RETAIN_DAYS} days  #####

DBDELDATE=`date +"%d%b%Y" --date="${BACKUP_RETAIN_DAYS} days ago"`

if [ ! -z ${DB_BACKUP_PATH} ]; then
      cd ${DB_BACKUP_PATH}
      if [ ! -z ${DBDELDATE} ] && [ -d ${DBDELDATE} ]; then
            rm -rf ${DBDELDATE}
      fi
fi

### End of script ####
```

These backups are done by a `tf2pickup` user, the same on which the config files and the backup folder is owned by. Make sure the `tf2pickup` is in the `docker` group, so it could execute commands against docker. Don't forget to add execution permission for the script by using `chmod o+x pickup-backup.sh` assuming `pickup-backup.sh` is a script filename. Then, you can also add a cronjob for the `tf2pickup` user by executing `crontab -e` as this user and adding a line with absolute path to the script:

```cron
0  3   * * *   bash /home/tf2pickup/tf2pickup.fi/pickup-backup.sh
```

This will let the script execute everyday at 3:00 AM as the user `tf2pickup`.

Lastly, you have to replicate those backups on external storage. You can do it manually or automatize it. It is really up to you how are you going to deal with it. You can order some FTP storage for the replication and just sync `backup/` folder contents with it, you can use NFS shares to do so, you can download files through SSH from your local machine - there are many ways and you are the one who is going to choose it.

If you have a local Linux host and you are able to set up a cronjob, you can use this command as the command syncing files from remote folder to your local one (assuming location `/home/mylocaluser/tf2pickup-backups` exist):

```bash
sync -a -e "ssh -p 22" "tf2pickup@tf2pickup.fi:/home/tf2pickup/tf2pickup.fi/backup/" "/home/mylocaluser/tf2pickup-backups" --info=progress2
```

This is probably the easiest way to replicate backups and it's called rsync over SSH.

### Restore

In order to restore backups, you have to choose the dump you would like to restore. Let's assume the filename of the backup archive is `tf2pickup-15Jun2021.gz`. In that case you need to execute:

```bash
gunzip tf2pickup-15Jun2021.gz
docker exec tf2pickupfi_mongodb_1 '/bin/bash' \
    -c 'mongorestore -d tf2pickup -u tf2pickup -p yoursuperfunnypassword --archive' < tf2pickup-15Jun2021.dump
```

## Firewall settings

TODO: add some firewall setting explanation and requirements

Example iptables setup:

IPv4:

```iptables
Chain INPUT (policy DROP)
target     prot opt source               destination
ACCEPT     all  --  anywhere             anywhere
ACCEPT     icmp --  anywhere             anywhere
ACCEPT     all  --  anywhere             anywhere             state RELATED,ESTABLISHED
ACCEPT     tcp  --  anywhere             anywhere             multiport dports https,http state NEW,ESTABLISHED
ACCEPT     tcp  --  anywhere             anywhere             tcp dpt:22 state NEW,ESTABLISHED
ACCEPT     udp  --  anywhere             anywhere             multiport dports 27014:27130
ACCEPT     tcp  --  anywhere             anywhere             multiport dports 27014:27130
ACCEPT     udp  --  anywhere             anywhere             udp dpt:9871
ACCEPT     udp  --  anywhere             anywhere             udp dpt:64738
ACCEPT     udp  --  anywhere             anywhere             udp spt:64738
ACCEPT     tcp  --  anywhere             anywhere             tcp dpt:64738
ACCEPT     tcp  --  anywhere             anywhere             tcp spt:64738

Chain FORWARD (policy DROP)
target     prot opt source               destination
DOCKER-USER  all  --  anywhere             anywhere
DOCKER-ISOLATION-STAGE-1  all  --  anywhere             anywhere
ACCEPT     all  --  anywhere             anywhere             ctstate RELATED,ESTABLISHED
DOCKER     all  --  anywhere             anywhere
ACCEPT     all  --  anywhere             anywhere
ACCEPT     all  --  anywhere             anywhere
ACCEPT     all  --  anywhere             anywhere             ctstate RELATED,ESTABLISHED
DOCKER     all  --  anywhere             anywhere
ACCEPT     all  --  anywhere             anywhere
ACCEPT     all  --  anywhere             anywhere

Chain OUTPUT (policy ACCEPT)
target     prot opt source               destination

Chain DOCKER (2 references)
target     prot opt source               destination
ACCEPT     tcp  --  anywhere             172.17.0.2           tcp dpt:9000
ACCEPT     tcp  --  anywhere             172.17.0.2           tcp dpt:8000
ACCEPT     tcp  --  anywhere             172.16.238.3         tcp dpt:http
ACCEPT     tcp  --  anywhere             172.16.238.2         tcp dpt:27017

Chain DOCKER-ISOLATION-STAGE-1 (1 references)
target     prot opt source               destination
DOCKER-ISOLATION-STAGE-2  all  --  anywhere             anywhere
DOCKER-ISOLATION-STAGE-2  all  --  anywhere             anywhere
RETURN     all  --  anywhere             anywhere

Chain DOCKER-ISOLATION-STAGE-2 (2 references)
target     prot opt source               destination
DROP       all  --  anywhere             anywhere
DROP       all  --  anywhere             anywhere
RETURN     all  --  anywhere             anywhere

Chain DOCKER-USER (1 references)
target     prot opt source               destination
RETURN     all  --  anywhere             anywhere
```

IPv6:

```ip6tables
Chain INPUT (policy DROP)
target     prot opt source               destination
ACCEPT     all  --  anywhere             anywhere
ACCEPT     icmp --  anywhere             anywhere
ACCEPT     all  --  anywhere             anywhere             state RELATED,ESTABLISHED
ACCEPT     tcp  --  anywhere             anywhere             multiport dports https,http state NEW,ESTABLISHED
ACCEPT     tcp  --  anywhere             anywhere             tcp dpt:22 state NEW,ESTABLISHED
ACCEPT     udp  --  anywhere             anywhere             multiport dports 27014:27130
ACCEPT     tcp  --  anywhere             anywhere             multiport dports 27014:27130
ACCEPT     udp  --  anywhere             anywhere             udp dpt:9871
ACCEPT     udp  --  anywhere             anywhere             udp dpt:64738
ACCEPT     udp  --  anywhere             anywhere             udp spt:64738
ACCEPT     tcp  --  anywhere             anywhere             tcp dpt:64738
ACCEPT     tcp  --  anywhere             anywhere             tcp spt:64738

Chain FORWARD (policy DROP)
target     prot opt source               destination
DOCKER-USER  all  --  anywhere             anywhere
DOCKER-ISOLATION-STAGE-1  all  --  anywhere             anywhere
ACCEPT     all  --  anywhere             anywhere             ctstate RELATED,ESTABLISHED
DOCKER     all  --  anywhere             anywhere
ACCEPT     all  --  anywhere             anywhere
ACCEPT     all  --  anywhere             anywhere
ACCEPT     all  --  anywhere             anywhere             ctstate RELATED,ESTABLISHED
DOCKER     all  --  anywhere             anywhere
ACCEPT     all  --  anywhere             anywhere
ACCEPT     all  --  anywhere             anywhere

Chain OUTPUT (policy ACCEPT)
target     prot opt source               destination

Chain DOCKER (2 references)
target     prot opt source               destination
ACCEPT     tcp  --  anywhere             172.17.0.2           tcp dpt:9000
ACCEPT     tcp  --  anywhere             172.17.0.2           tcp dpt:8000
ACCEPT     tcp  --  anywhere             172.16.238.3         tcp dpt:http
ACCEPT     tcp  --  anywhere             172.16.238.2         tcp dpt:27017

Chain DOCKER-ISOLATION-STAGE-1 (1 references)
target     prot opt source               destination
DOCKER-ISOLATION-STAGE-2  all  --  anywhere             anywhere
DOCKER-ISOLATION-STAGE-2  all  --  anywhere             anywhere
RETURN     all  --  anywhere             anywhere

Chain DOCKER-ISOLATION-STAGE-2 (2 references)
target     prot opt source               destination
DROP       all  --  anywhere             anywhere
DROP       all  --  anywhere             anywhere
RETURN     all  --  anywhere             anywhere

Chain DOCKER-USER (1 references)
target     prot opt source               destination
RETURN     all  --  anywhere             anywhere
root@tf2pickup:~# ip6tables -L
Chain INPUT (policy ACCEPT)
target     prot opt source               destination

Chain FORWARD (policy ACCEPT)
target     prot opt source               destination

Chain OUTPUT (policy ACCEPT)
target     prot opt source               destination
```

## Securing SSH access to the host

Since most of the setups are based on Linux installations, their hosts can be controlled through the SSH. There are a few things which you should do in order to make access to the server shell more secure:

- [use public key authentication only](https://serverfault.com/questions/2429/how-do-you-setup-ssh-to-authenticate-using-keys-instead-of-a-username-password),
- [do not allow logging in by root in any case](https://www.pragmaticlinux.com/2020/05/no-longer-permit-root-login-via-ssh/) (you can jump to the root account after logging into a standard one),
- use the latest version of your SSH server (whilst the most popular one is the OpenSSH) alongside with OpenSSL,
- [use custom SSH port](https://www.cyberciti.biz/faq/howto-change-ssh-port-on-linux-or-unix-server/) in order to [not get scanned by the botnets very often](https://www.shodan.io/search?query=ssh),
- [use](https://www.booleanworld.com/protecting-ssh-fail2ban/) [Fail2Ban](https://www.digitalocean.com/community/tutorials/how-to-protect-ssh-with-fail2ban-on-ubuntu-14-04) [for](https://www.linode.com/docs/guides/how-to-use-fail2ban-for-ssh-brute-force-protection/) blocking potential attackers,
- [use port knocking in order to limit access to your SSH port](https://www.rapid7.com/blog/post/2017/10/04/how-to-secure-ssh-server-using-port-knocking-on-ubuntu-linux/) per IP address or even setup OpenVPN or Wireguard server and let admin(s) connect to the SSH through the VPN connection only,
- use recommended and secure SSH server settings, [such as proposed by the Mozilla Observatory](https://infosec.mozilla.org/guidelines/openssh.html).

## HSTS Preload

In order to get the highest score in the site configuration tests, HSTS Preload should be configured for the domain. The Nginx configuration files meet the requirements for it and most of the browsers add the domains to their preload list automatically, but this is not the case for Chromium-based browsers, such as Google Chrome. For them, you are supposed to [register the site](https://hstspreload.org). The process is straightforward - you just have to enter the domain name, check boxes approving your domain ownership and accepting the service terms. After doing so, the website will check if your domain is eligible for the submission on the list and if yes, your domain will be added in a matter of a few days.
![hsts preload example](/img/content/hsts-preload.png)
