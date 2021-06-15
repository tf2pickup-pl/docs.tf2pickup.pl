---
title: Final touches
---

## Adding site rules

TODO: add setting up site rules

## Adding gameservers to the website

TODO: add adding servers to the website

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

TODO: secure ssh server access

## HSTS Preload

In order to get the highest score in the site configuration tests, HSTS Preload should be configured for the domain. The Nginx configuration files meet the requirements for it and most of the browsers add the domains to their preload list automatically, but this is not the case for Chromium-based browsers, such as Google Chrome. For them, you are supposed to [register the site](https://hstspreload.org). The process is straightforward - you just have to enter the domain name, check boxes approving your domain ownership and accepting the service terms. After doing so, the website will check if your domain is eligible for the submission on the list and if yes, your domain will be added in a matter of a few days.
![hsts preload example](/img/content/hsts-preload.png)
