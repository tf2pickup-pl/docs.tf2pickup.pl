---
title: Discord server setup
---

## Discord server template

There you can see how to configure a Discord server from scratch, by using one of our examples. [Here you can find our Discord template](https://discord.new/UeNaSR5pQaMS), however it is not ready to use and there are some additional steps to prepare in order to let it be properly set up for the public. The bots described in the setup are ones proposed by us to use on the Discord server. You may use different bots for the same purpose or just use different purpose bots.

The Discord consists with the following channels:

- public channels:
  - `#welcome` - join channel, AltDentifier verification warnings gets dropped there,
  - `#rules` - users can read the server rules here,
  - `#tf2news` - a feed for the latest Discord updates from the most important places in the TF2 competitive world,
  - `#twitch` - streaming feed from players residing on the server to others,
  - `#general` - general purpose discussion channels,
  - `#memes` - self-explanatory channel,
  - `#feedback` - self-explanatory channel,
  - `#flex-time` - a good place to post logs/clips/movies on which players has great scores,
  - `#mix-merc` - a channel for looking for gamers for a mix/merc,
- private channels:
  - `#carlbot-logs` - all server related logs gets sent there,
  - `#altdentifier-logs` - all AltDentifier logs are sent here, mostly related with the verifications of the Discord users,
  - `#moderation-notifications` - all moderations such us (un)mutes/kicks/(un)bans gets logged there,
  - `#bot-notifications` - moderation notification sent by the Discord due to a community setup are sent there along with the all Discord bot notifications such us updates or outages,
  - `#moderation-spam` - a separate channel for the Discord administration letting them execute commands privately without having to spam an admin discussion channel,
  - `#pickup-notifications` - all skill changes, force-closed games, (un)bans, role changes get logged there,
  - `#admins` - private admin discussion channel,
  - `#Admin` (voice channel) - private admin discussion voice channel.

## Bot setup

A crucial part of the server configuration are bots. These cannot be bundled with the server template and their settings and permissions has to be set separately by a Discord server owner.

The bots described in this guide are:

- AltDentifier - used for checking potential alt accounts and user verification,
- Carl-bot - general purpose bot, used mostly for reaction roles and moderation,
- Streamcord - creates a stream feed of Discord users streaming at the moment, it also adds a live role,
- Statbot - gathers statistics about the server usage,
- payload-neo - generates a lot of cool stuff TF2 related such us Steam connect strings into Steam URI (clickable connects) and more,
- Ticket Tool - lets you talk about the incidents happening on the pickups in a private and professional manner.

### AltDentifier

This bot lets you control what people join on the server and check some Discord account against the Steam account verification. A player who would undergo a verification process (which can be automatic or manually enforced by a Discord moderator) has to log in through a AltDentifier website by using their Steam account and then the SteamID is checked if it was used by a different Discord user. If yes, the verification process is failed and the bot executed an action selected in the configuration (in our cases, bans user from the server). Otherwise it lets user through and leaves an information about the SteamID in the logs.

#### Invite the bot

In order to invite the bot, open this [link](https://altdentifier.com/invite?ref=web), choose the server and click `Continue` and later `Authorize` to proceed.

![invite-altdentifier-1](/img/content/invite-altdentifier-1.png)

![invite-altdentifier-2](/img/content/invite-altdentifier-2.png)

Verify yourself in an anti-bot protection tool.

![invite-altdentifier-3](/img/content/invite-altdentifier-3.png)

#### Initial AltDentifier setup

In this step you will have to define initial bot settings.

![altdentifier-initial-setup-1](/img/content/altdentifier-initial-setup-1.png)

Select the language you want to use for the moderation.

![altdentifier-initial-setup-2](/img/content/altdentifier-initial-setup-2.png)

Choose verification role, so people who will get this role during the `verification` process will not see the contents of the server.

![altdentifier-initial-setup-3](/img/content/altdentifier-initial-setup-3.png)

Enable logging and choose `#altdentifier-logs` as the log channel. Later you will select certain things to log on the channel.

![altdentifier-initial-setup-4](/img/content/altdentifier-initial-setup-4.png)

Choose `#altdentifier-logs` as the bot channel. This settings will let all verification details to be sent in the one common place for this bot.

![altdentifier-initial-setup-5](/img/content/altdentifier-initial-setup-5.png)

Warning channel is basically a channel where the user who has to verify themselves gets the notification about it. The AltDentifier sends a message on DMs and on this channel, so it's crucial to let people with the `verification` role see it.

![altdentifier-initial-setup-6](/img/content/altdentifier-initial-setup-6.png)\

And that's it. Click `Dashboard` in order to enter the bot status on the server and change more specific settings.

![altdentifier-initial-setup-7](/img/content/altdentifier-initial-setup-7.png)

#### AltDentifier main setup

In this step you will have to set mostly the same settings as they're presented on the screenshots. That will make it way easier to set things up, however you should remind that is an example configuration. As you can see, some parts of the configuration are incorrect, since the **AltDentifier Heartbeat** is in the warning state. Make sure you click **Save settings** button at the top of the page after setting all options.

In the server setup the only thing you have to change is the **Language** and the **Timezone** configuration. Set it to something what fits you best.

![altdentifier-setup-1](/img/content/altdentifier-setup-1.png)

In the **Verification tab** set:

- Timeout Time - `45 minutes`,
- Timeout Action - `Kick`,
- Incorrect Account Action - `Ban`,
- Verification Alerts - `Yes`,
- Disallow VPN users from verification - `Yes`,
- Verification Methods:
  - Steam Verification - `Everyone`,
  - other methods - `Disabled`.

![altdentifier-setup-2](/img/content/altdentifier-setup-2.png)

In the **Logging** section, unselect the following logging options:

- Message Deleted,
- Message Edited,
- Channel Created,
- Channel Deleted,
- Role Created,
- Role Deleted,
- Nickname and Role Changes,
- Voice Channel Changes.

![altdentifier-setup-3](/img/content/altdentifier-setup-3.png)

In the **Access Control** section, scroll down to the bottom of the site and add your moderation role (in our case `tf2pickup.org`) on Discord and add it to the **Mod Roles**.

![altdentifier-setup-4](/img/content/altdentifier-setup-4.png)

#### AltDentifier Discord channel setup

The last step of the AltDentifier setup is to give permissions for the AltDentifier bot on certain channels. Permissions can be given based on roles and Discord accounts directly (regardless if account belongs to a human or a bot). In this example the permissions are assigned to a bot role called `AltDentifier` and the permissions assigned are:

- `View Channel`,
- `Send Messages`,
- `Embed Links`,
- `Attach Files`,
- `Add Reactions`,
- `Use External Emoji`,
- `Mention @everyone, @here and All Roles`,
- `Manage Messages`,
- `Read Message History`.

![altdentifier-discord-channel-setup-1](/img/content/altdentifier-discord-channel-setup-1.png)

![altdentifier-discord-channel-setup-2](/img/content/altdentifier-discord-channel-setup-2.png)

![altdentifier-discord-channel-setup-3](/img/content/altdentifier-discord-channel-setup-3.png)

![altdentifier-discord-channel-setup-4](/img/content/altdentifier-discord-channel-setup-4.png)

These permissions should be set on a channels: `#welcome`, `#altdentifier-logs`, `#moderation-spam`. After applying those changes, we can see the bot status changed to green:

![altdentifier-final-result](/img/content/altdentifier-final-result.png)

### Carl-bot

asd

### Streamcord

asd

### Statbot

asd

### payload-neo

asd

### Ticket Tool

asd

## Discord server channel final setup

asd
