---
title: Migration
---

:::tip

Before doing any migration **back up your database** in case the whole process goes south.

:::

## Version 10

### Website name

We introduced a new environment variable, `WEBSITE_NAME`. It identifies your _tf2pickup.org_ instance uniquely; for now, it will be used by the new [logs.tf](https://logs.tf/) uploader, but more use-cases are surely coming.

```env
WEBSITE_NAME=tf2pickup.eu
```

We also added support for expansion of environment variables, so now you can re-use your `WEBSITE_NAME`, for example:

```env
BOT_NAME=${WEBSITE_NAME}
```

### Redis

The new version requires a [Redis](https://redis.io/) database; it is used to cache some data and store game logs. Follow [site components deployment](site-components-deployment#docker-composeyml-for-the-website-only) documentation to learn how to set it up.

```env
REDIS_URL=redis://tf2pickup-eu-redis:6379
```

### logs.tf

Version 10 comes with an integrated [logs.tf](https://logs.tf/) uploader that captures in-game logs and uploads them when a match ends. It also lets you
access game server logs directly via the webpage.

For the integration to work, you need to grab your API key [here](https://logs.tf/uploader) and put it in your .env file:

```env
LOGS_TF_API_KEY=your_logs_tf_api_key
```

Uploading logs via the backend means that you need to disable log upload on your gameservers; otherwise all the logs are going to be doubled.
To disable uploading logs to logs.tf on your gameservers empty the `LOGS_TF_APIKEY` env variable:

```env
# gameserver.env
LOGS_TF_APIKEY=
```

### KEY_STORE_PASSPHRASE typo

In older versions of the tf2pickup.org project there was a typo in the environment file that we have fixed in version 9. However, the typo was still allowed alongside the correct variable name. We got rid of the typo in version 10, so make sure you take care of it in your .env file.

```env
# Old variable name, wrong
# KEY_STORE_PASSPHARE=

# New variable name, typo fixed
KEY_STORE_PASSPHRASE=
```

### Review privacy policy

To be compliant with the [GDPR](https://en.wikipedia.org/wiki/General_Data_Protection_Regulation) we added a new document - privacy policy. It is stored on the server and can be edited via your admin panel. It is short and contains only necessary information, so please take a look at it and **update the link to your website**, as it defaults to [tf2pickup.pl](https://tf2pickup.pl/).

![edit-privacy-policy](/img/content/final-touches/edit-privacy-policy.png)
