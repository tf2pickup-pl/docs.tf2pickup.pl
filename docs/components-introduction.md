---
title: Components introduction
---

In order to run a fully fledged tf2pickup.org instance, you are going to set up and configure a couple of components.

## The server

This is the backend of the whole system. It is responsible for accessing the database, configuring game servers and many, many more.
Read how to deploy and configure one [here](/docs/site-components-deployment).

## The client

This is the frontend, the webpage itself. You can configure your own look'n'feel so that the service looks unique.
It communicates with the server and presents the data to the user in a accessible, eye-catching and friendly way.
Here you will find the documentation on how to prepare your own branding, how to build the client and how to deploy it.

## The voice server

Currently, tf2pickup.org supports only [Mumble](https://www.mumble.info/), but there are plans to support Discord voice
channels as well.

## The game server

To launch a game, a game server is needed. We provide a [docker image](https://github.com/tf2pickup-pl/tf2-gameserver)
that has all the plugins and configuration.
