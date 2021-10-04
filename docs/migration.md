---
title: Migration
---

## Version 8

### Game servers

With version 8 of the tf2pickup.org server the new game server registration mechanism is introduced. Instead of adding them manually via the admin panel, game servers make use of the new [connector plugin](https://github.com/tf2pickup-org/connector). That way, managing game servers is not only easier, but also more stable and less error-prone.

#### Prerequisites

In order to make use of the new game server recognition mechanism, make sure you are on the latest version of the **server** project.

##### If you are using [the tf2-gameserver docker image](https://hub.docker.com/r/tf2pickuppl/tf2-gameserver)

Make sure you have updated the image to the latest version. You can proceed directly to [generating the secret](#generate-the-game-server-secret).

##### If you are hosting game servers without Docker

Make sure the following plugins are installed:

- [system2](https://forums.alliedmods.net/attachment.php?attachmentid=188744&d=1618607414)
- [SteamWorks](https://github.com/KyleSanderson/SteamWorks/releases/download/1.2.3c/package-lin.tgz)
- [tf2pickup.org connector](https://github.com/tf2pickup-org/connector/releases/download/0.1.0/connector.smx)

Please keep in mind you need to keep track of any _tf2pickup.org connector_ plugin updates manually.

#### Generate the game server secret

The secret is used by the connector plugin to authorize to the tf2pickup.org server. You need to generate it manually, using, for example, [Secure Password Generator](https://passwordsgenerator.net/). Please keep in mind that the secret should not containy any special characters - stick to letters and numbers only. The generated secret should be at least **8 characters long**. For educational purposes, we are going to use the following secret in this documentation section: `UMx2s3xv`.

#### Modify the environment

Put the generated secret under the `GAME_SERVER_SECRET` variable in your .env file:

```env
GAME_SERVER_SECRET=UMx2s3xv
```

#### Alter your docker-compose.yml file

:::note

This step applies only if you are using the _tf2-gameserver_ docker image to host your game servers.

:::

Add the following two variables to your `gameserver_{1,2}.env` files:

```env
TF2PICKUPORG_API_ADDRESS: api.tf2pickup.pl
TF2PICKUPORG_SECRET: UMx2s3xv
```

Replace `api.tf2pickup.pl` with your own backend URL address.

:::tip

If you are hosting the game servers on the same physical host as the tf2pickup.org server, you can use the `GAME_SERVER_SECRET` environment variable instead of providing the secret directly:

```env
TF2PICKUPORG_SECRET: ${GAME_SERVER_SECRET}
```

:::

#### Alter your server.cfg file

:::note

This step applies only if you are hosting your game server without the use of Docker.

:::

Add the following two variables to your `server.cfg` file:

```cfg
sm_tf2pickuporg_api_address api.tf2pickup.pl
sm_tf2pickuporg_secret UMx2s3xv
```

Replace `api.tf2pickup.pl` with your own backend URL address.

#### Start the game servers and the tf2pickup.org server

If everything was migrated successfully, game servers should register themselves within a minute and you should be able to see them in the _game servers_ page.