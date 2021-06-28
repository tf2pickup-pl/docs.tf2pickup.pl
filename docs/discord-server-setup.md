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

Additionally there is an empty `tf2pickup.org support` category for admin requests from the Ticket

## Bot setup

A crucial part of the server configuration are bots. These cannot be bundled with the server template and their settings and permissions has to be set separately by a Discord server owner.

The bots described in this guide are:

- [AltDentifier](https://altdentifier.com/?lang=en) - used for checking potential alt accounts and user verification,
- [Carl-bot](https://carl.gg/) - general purpose bot, used mostly for reaction roles and moderation,
- [Streamcord](https://streamcord.io/twitch/) - creates a stream feed of Discord users streaming at the moment, it also adds a live role,
- [Statbot](https://statbot.net/) - gathers statistics about the server usage,
- [payload-neo](https://payload.tf/) - generates a lot of cool stuff TF2 related such us Steam connect strings into Steam URI (clickable connects) and more,
- [Ticket Tool](https://tickettool.xyz/) - lets you talk about the incidents happening on the pickups in a private and professional manner,
- [MEE6](https://mee6.xyz/) - general purpose bot, we only use auto-mod functionality from this bot since it works way better than Carl-bot auto-moderation options,
- [MonitoRSS](https://monitorss.xyz/) - RSS forwarders, lets you send notifications from popular sites such as etf2l.org or teamfortress.tv,
- [PatchBot](https://patchbot.io/) - sends game update notifications for various games, Team Fortress 2 is one of them.

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

The last thing you should do is to add `Manage Server` permission for the `AltDentifier` role, so the AltDentifier could be able to track invites from which people join on the server. Make sure you move a AltDentifier role on the top of the list, but below the `crown deleter` role.

![altdentifier-set-role-on-top](/img/content/altdentifier-set-role-on-top.png)

![altdentifier-set-manage-server-permission](/img/content/altdentifier-set-manage-server-permission.png)

For more you can find AltDentifier command list [here](https://altdentifier.com/commands?lang=en).

### Carl-bot

This bot combines many different moderation tools in one and we recommend it just because we have very good experience with it on many Discord servers. The most important features are:

- moderation tools aka warnings, (un)mutes, kicks, (un)bans by a command which lets you make temporary mutes/bans with an option to add a moderation reason and with an option to message the offender while some action against him is taken (like a mute),
- extensive logging options, from the moderation logging up to even the smallest things like avatar/nickname changes,
- reaction role support,
- word filters,
- many more.

Use [this link](https://discord.com/oauth2/authorize?&client_id=235148962103951360&scope=applications.commands+bot&permissions=2088234230&response_type=code&redirect_uri=https://carl.gg/api/server_auth) in order to add the bot. You don't have to untick any roles for this specific bot.

![invite-carlbot](/img/content/invite-carlbot.png)

In this step, feel free to skip the initial configuration, since you get a setting list to set in the dashboard.

![carlbot-skip-fast-setup](/img/content/carlbot-skip-fast-setup.png)

First, in the **Bot settings** delete the `?` prefix, so `!` prefix would be the only one available for the Carl-bot.

![carlbot-dashboard-settings-1](/img/content/carlbot-dashboard-settings-1.png)

Then, scroll down to the **Commands** and set a *Bot manager role* the `Admin` role.

![carlbot-dashboard-settings-2](/img/content/carlbot-dashboard-settings-2.png)

Next, go to the **Automod** tab and set:

- Log actions to - `#carlbot-logs`,
- Muterole - `Muted`.

![carlbot-dashboard-settings-3](/img/content/carlbot-dashboard-settings-3.png)

In the **Moderations** tab, under the **Moderation settings** section, set:

- Modlogs channel - `#moderation-notifications`,
- Send reports to - `#moderation-notifications`,
- Logged events - **select all**.

The rest of the settings in this tab defines how bans, warns, hardmutes, mutes, kicks and tempbans are done. In all these settings, make sure you will choose a notification option `Send server, action and reason` for an offender, so the offender will get a message on DMs that they got banned/warned/hardmuted/muted/kicked/tempbanned.

![carlbot-dashboard-settings-4](/img/content/carlbot-dashboard-settings-4.png)

![carlbot-dashboard-settings-5](/img/content/carlbot-dashboard-settings-5.png)

Next, in the **Logging** tab, under **Channel Selection** section, choose options from the list:

- Default log channel - `#carlbot-logs`,
- Member log channel - `#carlbot-logs`,
- Server log channel - `#carlbot-logs`,
- Voice log channel - `#carlbot-logs`,
- Message log channel - `#carlbot-logs`,
- Join/leave log channel - `#carlbot-logs`,
- Ignored channels - leave empty.

In the **Server Events**, **Message Events**, **Member Events** and **Members joining and leaving** select all options. Deselect all of them in the **Voice Events** section.

![carlbot-dashboard-settings-6](/img/content/carlbot-dashboard-settings-6.png)

![carlbot-dashboard-settings-7](/img/content/carlbot-dashboard-settings-7.png)

Eventually, go to the **Autoroles** tab and under **Sticky roles** section select `Reassign roles upon rejoining` option and add `Admin` role to the blacklist. In that way, if someone leaves the server, they will get all roles assigned back on the rejoin. It's important to have it set, because otherwise, if you mute someone, then that person could escape the mute by rejoining the server. The `Admin` role is in the blacklist, because if someone who is an admin leaves the server, that will let you have an option to freely readd the role to this person in a time you want, so that will prevent potential situation where some ex-admin could rejoin the server in order to abuse their admin rights given by that role by for example banning everyone on the server.

![carlbot-dashboard-settings-8](/img/content/carlbot-dashboard-settings-8.png)

The last part of the configuration in the dashboard would be to disable command groups. We suggest to disable the following command groups:

- `Blizzard`,
- `Config`,
- `Feeds`,
- `Greetings`,
- `Levels`,
- `Suggestions`,
- `Tags`.

![carlbot-dashboard-disable-commands-1](/img/content/carlbot-dashboard-disable-commands-1.png)

![carlbot-dashboard-disable-commands-2](/img/content/carlbot-dashboard-disable-commands-2.png)

![carlbot-dashboard-disable-commands-3](/img/content/carlbot-dashboard-disable-commands-3.png)

![carlbot-dashboard-disable-commands-4](/img/content/carlbot-dashboard-disable-commands-4.png)

![carlbot-dashboard-disable-commands-5](/img/content/carlbot-dashboard-disable-commands-5.png)

![carlbot-dashboard-disable-commands-6](/img/content/carlbot-dashboard-disable-commands-6.png)

![carlbot-dashboard-disable-commands-7](/img/content/carlbot-dashboard-disable-commands-7.png)

### Streamcord

This bot lets you make two things related to the Twitch streams:

- create a Twitch feed where you can see who's live on Twitch,
- create a live role being assigned to people streaming on Twitch in order to highlight them on Discord user list and with nickname colour.

Invite bot to the Discord server by [this invite link](https://discord.com/oauth2/authorize?client_id=375805687529209857&permissions=842452040&scope=bot%20applications.commands). Unselect `Administrator`, `Connect`, `Speak` and `Use Voice Activity` permissions since they are not really needed for this bot.

![invite-streamcord-bot](/img/content/invite-streamcord-bot.png)

Choose the server you want to use the bot from the list.

#### Streamcord settings on Discord

The website part is done, now you have to set up a proper channel permissions on the `#twitch` channel for the `Streamcord` role (it gets added on bot join on the server). It should have the following list of permissions on this channel:

- `View Channel`,
- `Send Messages`,
- `Embed Links`,
- `Attach Files`,
- `Add Reactions`,
- `Use External Emoji`,
- `Mention @everyone, @here and All Roles`,
- `Manage Messages`,
- `Read Message History`.

After the channel permissions are set, set up a role called `watch me now`. It should be below moderation bot roles and it can be above the administration role if your server is small (otherwise put it under the admin role on the list). Edit the role.

![streamcord-set-live-role-1](/img/content/streamcord-set-live-role-1.png)

Assign the colour `#6441a5` to the role, make sure `Display role members separately from online members` and `Allow anyone to @mention this role` is checked. Also, head over to the **Permissions** tab and unselect all permissions from this role.

![streamcord-set-live-role-2](/img/content/streamcord-set-live-role-2.png)

#### Streamcord website settings

![streamcord-choose-server](/img/content/streamcord-choose-server.png)

Then go to the **Live Role** tab and click **Add a Live Role** button.

![streamcord-add-live-role-1](/img/content/streamcord-add-live-role-1.png)

Choose `watch me now` **Role** from the list, leave **Filter** role empty, tick **Enable notifications**, select channel named `#twitch` and use a template you want to. The template used in the example below is:

```example
{user.name} is now live! Watch them at {user.twitch_url}
```

After filling all values, click **Save changes** to save it.

![streamcord-add-live-role-2](/img/content/streamcord-add-live-role-2.png)

In the end, the Twitch feed should look like this:

![streamcord-twitch-feed](/img/content/streamcord-set-live-role-2.png)

Moreover, the Streamcord live role should be noticable in this way:

![streamcord-live-role](/img/content/streamcord-live-role.png)

### Statbot

asd

### payload-neo

The payload-neo bot is a result of the development of [sharky](https://sharky.cool/), later developed by [24](https://steamcommunity.com/id/chab133). The bot is open-source and its source code can be found [here](https://github.com/payload-bot). The bot command list can be found [here](https://payload.tf/docs). The most important features are:

- connect string conversion to a clickable Steam URI,

![payload-connect-steam-uri](/img/content/payload-connect-steam-uri.png)

- ETF2L/UGC team profile previews,

![payload-etf2l-team-preview](/img/content/payload-etf2l-team-preview.png)

![payload-ugc-team-preview](/img/content/payload-ugc-team-preview.png)

- logs.tf game previews,

![payload-log-preview](/img/content/payload-log-preview.png)

- teamfortress.tv thread previews.

![payload-tftv-preview](/img/content/payload-tftv-preview.png)

This bot does not need any specific configuration, as long as it's allowed to speak on public channels. Just [invite it](https://payload.tf/invite) as you do with the other bots and that should be it.

![invite-payload-bot](/img/content/invite-payload-bot.png)

### Ticket Tool

TODO: describe ticket tool

### MEE6

TODO: describe MEE6

### MonitoRSS

TODO: describe MonitoRSS configuration

### PatchBot

TODO: describe PatchBot configuration

## Discord server channel final settings

### Adding public announcement feed

TODO: describe adding public announcement feed

### Adding private moderation feed

TODO: describe adding private moderation feed

### Setting up the server as a `community` type

TODO: describe setting up the server as a community type
