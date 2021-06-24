---
title: Components introduction
---

In order to run a fully fledged tf2pickup.org instance, you are going to set up and configure a couple of components. These compoents can be served by a docker-compose container stack in Docker. That lets server administrators set up the project quickly, without any need of deep understanding of how certain elements of the site work, such us MongoDB configuration. Site deployment through Docker not only saves a lot of time for having a good understanding of how setup works, but also lets administrators run it in a separated environment, meaning there is no need for having anything very specific installed in your host system (besides Docker and docker-compose and the reverse proxy server).

## The reverse proxy server

This part of the setup is not currently delivered together with the tf2pickup.org container stack (however we plan to change it in the future). It lets users access the client lets them communicate with the backend, for instance when they log in to the site. This should be delivered together with SSL certificates, regardless if they are paid or free. We described all setup steps for both [here](/docs/setup-prerequisites).

## The server

This is the backend of the whole system. It is responsible for accessing the database, configuring game servers and many, many more.
Read how to deploy and configure one [here](/docs/site-components-deployment).

## The client

This is the frontend, the webpage itself. You can configure your own look'n'feel so that the service looks unique.
It communicates with the server and presents the data to the user in a accessible, eye-catching and friendly way.
[Here](/docs/building-a-custom-client) you will find the documentation on how to prepare your own branding, how to build the client and how to deploy it.

## The voice server

Currently, tf2pickup.org supports only [Mumble](https://www.mumble.info/), but there are plans to support Discord voice
channels as well.

## The game server

To launch a game, at least one game server is needed. In order to let the game server work properly with the server, it is expected to have specific extensions/plugins installed:

- [SourceMod 1.10](https://www.sourcemod.net/downloads.php) (the latest stable version),
- [Metamod:Source 1.11](https://www.sourcemm.net/downloads.php?branch=stable) (the latest stable version),
- [TFTrue Extension](https://tftrue.esport-tools.net/)
- [DHooks 2 Extension](https://github.com/peace-maker/DHooks2),
- [tf2-comp-fixes plugin](https://github.com/ldesgoui/tf2-comp-fixes),
- [updated-pause-plugin](https://github.com/l-Aad-l/updated-pause-plugin),
- [cURL SourceMod Extension](https://code.google.com/archive/p/sourcemod-curl-extension/downloads),
- [ETF2L server configuration files](https://etf2l.org/rules/configs/) "with the latest configs and whitelists",
- [SrcTV+ Extension](https://github.com/dalegaard/srctvplus),
- [TF2Stadium SourceMod Plugin](https://github.com/tf2pickup-org/stadium-sm-plugin),

We provide a [docker image](https://github.com/tf2pickup-org/tf2-gameserver)
that has all the plugins and configuration. [Here](/docs/site-compoents-deployment) you can find some information how to set them up fast.
