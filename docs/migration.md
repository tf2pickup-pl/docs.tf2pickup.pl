---
title: Migration
---

:::tip

Before doing any migration **back up your database** in case the whole process goes south.

:::

## Version 10

### Website name

We introduced a new environment variable, `WEBSITE_NAME`. It identifies your _tf2pickup.org_ instance uniquely; for now, it will be used by the new [logs.tf](https://logs.tf/) uploader, but more use-cases are surely coming.

```
WEBSITE_NAME=tf2pickup.pl
```

We also added support for expansion of environment variables, so now you can re-use your `WEBSITE_NAME`, for example:

```
BOT_NAME=${WEBSITE_NAME}
```

### Redis

The new version requires a [Redis](https://redis.io/) database; it is used to cache some data and store game logs. Follow [site components deployment](site-components-deployment#docker-composeyml-for-the-website-only) documentation to learn how to set it up.

```
REDIS_URL=redis://localhost:6379
```

### logs.tf

Version 10 comes with an integrated [logs.tf](https://logs.tf/) uploader that captures in-game logs and uploads them when a match ends. It also lets you
access game server logs directly via the webpage.

For the integration to work, you need to grab your API key [here](https://logs.tf/uploader) and put it in your .env file:

```
LOGS_TF_API_KEY=your_logs_tf_api_key
```

### KEY_STORE_PASSPHRASE typo

In older versions of the tf2pickup.org project there was a typo in the environment file that we have fixed in version 9. However, the typo was still allowed alongside the correct variable name. We got rid of the typo in version 10, so make sure you take care of it in your .env file.

```
# Old variable name, wrong
# KEY_STORE_PASSPHARE=

# New variable name, typo fixed
KEY_STORE_PASSPHRASE=
```

### Review privacy policy

To be compliant with the [GDPR](https://en.wikipedia.org/wiki/General_Data_Protection_Regulation) we added a new document - privacy policy. It is stored on the server and can be edited via your admin panel. It is short and contains only necessary information, so please take a look at it and **update the link to your website**, as it defaults to [tf2pickup.pl](https://tf2pickup.pl/).

![privacy policy 1](/img/content/migration-privacy-policy-1.png)

![privacy policy 2](/img/content/migration-privacy-policy-2.png)


## Version 9

### Environment

In order for the new statistics module to represent correct times and dates, the correct timezone needs to be set. This is done via the `TZ` environment variable. Take a look [here](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) to see the list of valid timezones. Example:

```
TZ=Europe/Warsaw
```

There is also the new **serveme.tf integration** implemented that needs to be enabled using environment variables. Provided you have serveme.tf premium, grab your API key [here](https://serveme.tf/settings) and make sure it makes its way to your .env file:

```
# valid endpoints are:
# serveme.tf
# na.serveme.tf
# sea.serveme.tf
SERVEME_TF_API_ENDPOINT=serveme.tf
SERVEME_TF_API_KEY=your_serveme_tf_api_key
```

To configure how your tf2pickup.org instance uses serveme.tf go to the admin panel, click _Game servers_, then _Configure serveme.tf integration_. You will be able to select the preferred region for your future reservations.

![serveme.tf configuration](/img/content/serveme-tf-configuration.png)


### Mumble bot

Version 9 introduces a bot that keeps your Mumble server in order. Follow [this guide](site-components-deployment#mumble-server-setup) to configure it properly.
Also, as per-gameserver voice channels are no longer used, you can get rid of the `TF2PICKUPORG_VOICE_CHANNEL_NAME` environment variable from your _gameserver\_*.env_ files.


## Version 8

### Environment

The `MONGODB_*` values used in the .env file are deprecated and removed in favor of using just one - `MONGODB_URI`. This lets us have more flexibility when it comes to telling the MongoDB client how to connect to the database.

Open your `.env` file and find the following values:

* `MONGODB_HOST`
* `MONGODB_PORT`
* `MONGODB_DB`
* `MONGODB_USERNAME`
* `MONGODB_PASSWORD`

All of these are no longer used. Comment them out for now and add a new variable, named `MONGODB_URI`. If your database username and password were empty, the URI should look like this:

```
MONGODB_URI=mongodb://host:port/database
```

If you are using database authentication, the URI will look similar to the following:

```
MONGODB_URI=mongodb://username:password@host:port/database
```

#### Example

The following `.env` file:

```env
MONGODB_HOST=localhost
MONGODB_PORT=8001
MONGODB_DB=admin
MONGODB_USERNAME=tf2pickup
MONGODB_PASSWORD=yoursuperfunnypassword
```

should look like this after migration:

```env
MONGODB_URI=mongodb://tf2pickup:yoursuperfunnypassword@localhost:8001/admin
```


### Game Servers

With version 8 of the tf2pickup.org server, a new game server registration mechanism is introduced. Instead of adding them manually via the admin panel, game servers make use of the new [connector plugin](https://github.com/tf2pickup-org/connector). That way, managing game servers is not only easier, but also more stable and less error-prone.

#### Prerequisites

In order to make use of the new game server recognition mechanism, make sure you are on the latest version of the **server** project.

##### Upgrading [the tf2-gameserver docker image](https://hub.docker.com/r/tf2pickuppl/tf2-gameserver) to the latest version

:::note

This step applies only if you are using the _tf2-gameserver_ docker image to host your game servers.

:::

Make sure you have updated the image to the latest version. You can proceed directly to [generating the secret](#generating-the-game-server-secret).

##### Installing required game server plugins

:::note

This step applies only if you are hosting your game server without the use of Docker.

:::

Make sure the following plugins are installed:

- [system2](https://forums.alliedmods.net/attachment.php?attachmentid=188744&d=1618607414)
- [SteamWorks](https://github.com/KyleSanderson/SteamWorks/releases/download/1.2.3c/package-lin.tgz)
- [tf2pickup.org connector](https://github.com/tf2pickup-org/connector/releases/download/0.1.0/connector.smx)

Please keep in mind you need to keep track of any _tf2pickup.org connector_ plugin updates manually.

#### Generating the game server secret

The secret is used by the connector plugin to authorize to the tf2pickup.org server. You need to generate it manually, you may generate a secure one using [Secure Password Generator](https://passwordsgenerator.net/). Please keep in mind that the secret should not containy any special characters - stick to letters and numbers only. The generated secret should be at least **8 characters long**. For educational purposes, we are going to use the following secret in this documentation section: `UMx2s3xv`.

Put the generated secret under the `GAME_SERVER_SECRET` variable in your .env file:

```env
GAME_SERVER_SECRET=UMx2s3xv
```

#### Altering the docker-compose.yml file

:::note

This step applies only if you are using the _tf2-gameserver_ docker image to host your game servers.

:::

Add the following two variables to your `gameserver_{1,2}.env` files:

```env
TF2PICKUPORG_API_ADDRESS=https://api.tf2pickup.fi
TF2PICKUPORG_SECRET=UMx2s3xv
```

Replace `api.tf2pickup.pl` with your own backend URL address.

:::tip

If you are hosting the game servers on the same physical host as the tf2pickup.org server, you can use the `GAME_SERVER_SECRET` environment variable instead of providing the secret directly:

```env
TF2PICKUPORG_SECRET=${GAME_SERVER_SECRET}
```

:::

#### Altering the server.cfg file

:::note

This step applies only if you are hosting your game server without the use of Docker.

:::

Add the following two variables to your `server.cfg` file:

```cfg
sm_tf2pickuporg_api_address "https://api.tf2pickup.fi"
sm_tf2pickuporg_secret "UMx2s3xv"
```

Replace `api.tf2pickup.pl` with your own backend URL address.

#### Starting the game servers and the tf2pickup.org server

If everything was migrated successfully, game servers should register themselves within a minute and you should be able to see them in the _game servers_ page.

#### Switching the server container back to isolated network mode

:::note

This step applies only if you are running your tf2pickup.org server container in host network mode (`--network=host`).

:::

Go to your docker-compose.yml file and remove the following line from the `website:` service section:

```
network_mode: host
```

Also, uncomment the following lines in the same section:

```
ports:
 - '3000:3000'
 - '9871:9871/udp'
links:
 - mongodb
```

And finally, edit one line in your .env file:

```
MONGODB_URI=mongodb://tf2pickup:yoursuperfunnypassword@mongodb:8001/admin
```

Notice we changed MongoDB host from `localhost` to `mongodb`.
