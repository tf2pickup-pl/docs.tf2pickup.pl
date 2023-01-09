---
title: Troubleshooting
---

Here you can find how to resolve potential technical problems when setting up your own tf2pickup.org instance.

## Mumble bot is not connecting to the server

That is mostly because of two reasons:

### Firewall blocks connections between site backend and mumble

Check firewall rules if they let your backend container make a connection in the same way as clients are supposed to. In general for mumble you should create rule in the INPUT chain letting services connect to it (both TCP/UDP traffic), as well as a rule letting your firewall forward traffic to it (TCP/UDP as well).

### Mumble server uses old version of the TLS and/or self-signed certificates

This problem is a bit more tricky, because it may happen even if you have your firewall set and all data set properly in the Voice chat configuration. It happens when you use free servers from `mumble-de.cleanvoice.com` or `mumble-de.cleanvoice.ru` and it's because these servers use TLS 1.0/1.1 encryption instead of TLS 1.2/1.3 (safest ones at the time of writing, TLS 1.0 is unsafe and TLS 1.1 is deprecated).
In that case you should add the following command to the `backend` clause in your website's `docker-compose.yml`:

```docker-compose
version: '3.9'

services:
  backend:
    networks:
      - tf2pickup-it-net
    container_name: 'tf2pickup-it-server'
    depends_on:
      - mongodb
    image: tf2pickuppl/server:stable
    restart: always
    ports:
     - '18001:3000'
     - '18871:18871/udp'
    volumes:
    - './.env:/tf2pickup.pl/.env'
    command: ["node", "--tls-min-v1.0", "dist/src/main"]
```

The last line enables usage for older versions of the TLS protocol like 1.0 and 1.1.

## Logs are not being sent to logs.tf

This problem can happen for reasons beyond our control like logs.tf service failure or it having a very high load at the moment, however from the setup side problems can be the following:

- invalid firewall configuration not letting backend connect to logs.tf
- API key is invalid, outdated or not present

The second options is more likely a problem. Since v10 the backend is supposed to send the logs and there is no logs.tf API key set in the .env configuration, it will throw an error in the container log like this one:

```dockerlog
[Nest] 1  - 01/07/2023, 8:46:19 PM     LOG [GameEventHandlerService] game #71 ended
[Nest] 1  - 01/07/2023, 8:46:19 PM     LOG [LogCollectorService] uploading logs for game #71...
[Nest] 1  - 01/07/2023, 8:46:20 PM   ERROR [LogCollectorService] uploading logs for game #71 failed: Error: logs.tf upload error: Invalid API key
```

Add lines the following lines to your `.env` file with proper values:

```env
WEBSITE_NAME=tf2pickup.fi
LOGS_TF_API_KEY=your_logs_tf_api_key
```

Afterwards, restart your backend container.

## Website works, nobody (even the first existing user) can log in

This means your Steam API key used in the backend configuration is invalid, invalidated or expired. It can be indicated by the following entries in the log:

```dockerlog
[Nest] 1  - 12/17/2022, 11:14:37 AM    WARN [AuthController] Login error: 403 Error: Check your API key is correct
[Nest] 1  - 12/17/2022, 6:56:01 PM    WARN [AuthController] Login error: 403 Error: Check your API key is correct
```

To fix this, update `STEAM_API_KEY` property in `.env` file and restart your backend container.
