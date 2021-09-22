---
title: Discord server setup
---

## Discord server template

Here you can see how to configure a Discord server from scratch, by using one of our examples. [Here you can find our Discord template](https://discord.new/UeNaSR5pQaMS), however it is not ready to use and there are some additional steps to take care of in order to have it properly set up for the public use. The bots described in the setup are ones proposed by us to use on the Discord server. You may use different bots for the same purpose or just use different purpose bots.

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
  - `#ticket-history` - all Ticket Tool logs and ticket logs are sent there,
  - `#admins` - private admin discussion channel,
  - `Admin` (voice channel) - private admin discussion voice channel.

Additionally there is an empty `tf2pickup.org support` category for admin requests from the Ticket Tool. The server also contains the following roles in the final:

- `crown remover` - this rule has an `Administrator` permission and it's not assigned to anybody in order to hide a server owner's crown next to the nickname,
- `carl-bot` - Carl-bot's role, it has to be under user roles in order to be able to manage them,
- `AltDentifier` - AltDentifier's role, works in the same way as Carl-bot's one,
- `Streamcord` - Streamcord's role, it has to be above the live role in order to let it work,
- `watch me now` - a Streamcord's live role, it's being assigned to players who are streaming on Twitch at the moment,
- `Admin` - a pickup admin role, in the same time it's a Discord server moderator role,
- `ping me when sub needed` - a ping role used for the tf2pickup.org site used for pinging players when a substitute is needed,
- `Merc` - a ping role for mercs, people can assign it through a reaction role and then, if someone needs a merc, they can just ping it in order to find somebody to play,
- `Muted` - mute role for naughty gamers,
- `verification` - verification role used against people being verified through a AltDentifier,
- `payload-neo` - payload-neo's role, not used in any certain way specifically, but it's created on bot join on the server.

## Bot setup

Crucial part of the server configuration are bots. These cannot be bundled with the server template and their settings and permissions have to be set separately by the Discord server owner.

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

The last thing you should do is to add `Manage Server` permission for the `AltDentifier` role, so the AltDentifier could be able to track invites from which people join on the server. Make sure you move a AltDentifier role on the top of the list, but below the `crown remover` role.

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

In the end make sure to move the `carl-bot` Discord role to the top of the list, but below the `crown remover` role:

![carlbot-set-role-on-top](/img/content/carlbot-set-role-on-top.png)

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

Statbot is a bot letting you count server usage statistics in the last 30 days. It counts user messages, time spent on voice channels, game activities and more. After going to [Statbot's site](https://statbot.net/) click on [**Start Tracking Now!**](https://discord.com/oauth2/authorize?client_id=491769129318088714&scope=bot&permissions=270126169).

![statbot-start-tracking](/img/content/statbot-start-tracking.png)

Uncheck `Administrator`, `Manage Roles` and `Manage Channels` permission from the bot. It's unneeded for our use case. After adding the bot on the server, go back to the main page and click **Dashboard** button on the top right corner.

![statbot-invite](/img/content/statbot-invite.png)

Click on *Statbot Dashboard* and choose to **Log in** from the dropdown list.

![statbot-log-in](/img/content/statbot-log-in.png)

After logging in, choose **My Servers** from the top right dropdown list.

![statbot-my-servers](/img/content/statbot-my-servers.png)

Then, choose the server you want to set up the bot by hovering on its icon and clicking **Manage**.

![statbot-choose-server](/img/content/statbot-choose-server.png)

Change the *Command Access Level* to **Admin Only**, as this is not needed at all for the bot in order to work.

![statbot-setup-1](/img/content/statbot-setup-1.png)

Then set *Dashboard Access Level* to **Public**. Save all changes by clicking on **Save**. After that, go to the **Stats** section on left side of the website.

![statbot-setup-2](/img/content/statbot-setup-2.png)

Then scroll down and change the *Lookback* time to **All**. In the *Channels* section choose:

- `Staff Logs` section,
- `tf2pickup.org` section,
- `Staff` section,
- `welcome`, `rules` and `twitch` channels.

These settings are made in order to exclude logging on these channels. Make sure the *Blacklist* option is selected.

![statbot-setup-3](/img/content/statbot-setup-3.png)

![statbot-setup-4](/img/content/statbot-setup-4.png)

In the end scroll down to the bottom and add some games people on the server usually play, so it can be shown in the stats when these gets gathered.

![statbot-setup-5](/img/content/statbot-setup-5.png)

After that the bot should be up. This is an [example server dashboard](https://statbot.net/settings/516366706751438868/stats) where you can watch user stats on the server.

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

Ticket Tool is a utility bot letting you have a support queue for player queries, for instance if someone notice a cheater or abusive behaviour, this bot lets people report and have a conversation with the server staff about it. After setting a bot, player could be able to open a ticket by clicking a button like this:

![ticket-tool-panel-on-discord](/img/content/ticket-tool-panel-on-discord.png)

In this guide, this ticket panel will be placed in the `#rules` channel.

#### Ticket Tool configuration

In order to invite the bot, enter [this website](https://tickettool.xyz/) and click **Invite Ticket Tool**.

![ticket-tool-main-site](/img/content/ticket-tool-main-site.png)

Then make sure you'll live all permissions ticket and click **Authorize**.

![ticket-tool-invite](/img/content/ticket-tool-invite.png)

After that, go back to the main page and choose **Manage Servers**. You will have to choose the server you want to set up Ticket Tool for. In our case it's `tf2pickup.org server template`.

![ticket-tool-choose-server](/img/content/ticket-tool-choose-server.png)

After that, you will see a window with the bot server permissions. The **Administrator** permissions should remain unticked. Select **Panel Configs** tab on left.

![ticket-tool-server-permissions](/img/content/ticket-tool-server-permissions.png)

That menu lets you create a new panel - it will be used for creating tickets and in the end it will create an "open ticket" button you saw above. Click **Create Panel**, define a panel name `tf2pickup.org support` in the **Panel Name**, assign an admin role `Admin` to the **Support Team Roles** and leave **Panel Channel** empty. The panel will be added in the end of this guide.

![ticket-tool-create-panel](/img/content/ticket-tool-create-panel.png)

After that, the panel should be created. Click **Settings** in order to open up the support queue settings.

![ticket-tool-panel-settings](/img/content/ticket-tool-panel-settings.png)

:::caution
You have to click **Save** after every single setting section, otherwise you will lose all changes made in them.
:::

Make sure to leave **Two step Close** and **Two step Ticket** selected and **Auto Pin Ticket** unselected.

In the **Category Options**, select category `tf2pickup.org`. That will let support queue open ticket under that channel category. After that, you will have to set up permissions for the sections. We suggest you to set them like on the images below:

![ticket-tool-panel-setup-1](/img/content/ticket-tool-panel-setup-1.png)

![ticket-tool-panel-setup-2](/img/content/ticket-tool-panel-setup-2.png)

![ticket-tool-panel-setup-3](/img/content/ticket-tool-panel-setup-3.png)

![ticket-tool-panel-setup-4](/img/content/ticket-tool-panel-setup-4.png)

![ticket-tool-panel-setup-5](/img/content/ticket-tool-panel-setup-5.png)

![ticket-tool-panel-setup-6](/img/content/ticket-tool-panel-setup-6.png)

![ticket-tool-panel-setup-7](/img/content/ticket-tool-panel-setup-7.png)

![ticket-tool-panel-setup-8](/img/content/ticket-tool-panel-setup-8.png)

![ticket-tool-panel-setup-9](/img/content/ticket-tool-panel-setup-9.png)

After setting all permissions, open **Logging Options** and choose the following options:

- Transcript Channel - `ticket-history`,
- Logging Channel - `ticket-history`,
- *Ticket Created*, *Ticket Closed*, *Ticket Opened*, *Ticket Renamed*, *Ticket Deleted* and *Transcript Saved* should be selected.

![ticket-tool-panel-setup-10](/img/content/ticket-tool-panel-setup-10.png)

Finally, open **Ticket Options** and click **Edit Ticket Message** in order to edit it.

![ticket-tool-panel-setup-11](/img/content/ticket-tool-panel-setup-11.png)

There you can set a message of your own (in the **Message Text** section). Here is an example you can use on your server:

```ticket
Hello {user}.
Once an admin is available they will respond to your request in this channel. Please provide any relevant info while you are waiting.
```

![ticket-tool-panel-setup-12](/img/content/ticket-tool-panel-setup-12.png)

After that, you will have to set up permissions on channels `#ticket-history` and `#rules` and the `tf2pickup.org support` channel section.

Aforementioned channels require the following permissions for the `Ticket Tool` role or bot account:

- `View Channel`,
- `Send Messages`,
- `Embed Links`,
- `Attach Files`,
- `Add Reactions`,
- `Use External Emoji`,
- `Manage Messages`,
- `Read Message History`.

Moreover, `tf2pickup.org support` channel section requires:

- `View Channel`,
- `Manage Channels`,
- `Manage Permissions`,
- `Send Messages`,
- `Embed Links`,
- `Attach Files`,
- `Add Reactions`,
- `Use External Emoji`,
- `Mention @everyone, @here and All Roles`,
- `Manage Messages`,
- `Read Message History`.

![ticket-tool-discord-permissions](/img/content/ticket-tool-discord-permissions.png)

Finally, you can add the ticket panel to the `#rules` channel by selecting this channel from the *Select a channel to send the panel..* dropdown list and clicking **Send**.

![ticket-tool-panel-settings](/img/content/ticket-tool-panel-settings.png)

From that point, creating tickets is possible.

#### Ticket Tool usage

This is a quick overview how the admin requests looks from the admin point of view.

After someone creates a ticket, it always possible to close it at any moment. All you have to do is to click on the **Close** button.

![ticket-tool-example-1](/img/content/ticket-tool-example-1.png)

You will be asked for a close confirmation.

![ticket-tool-example-2](/img/content/ticket-tool-example-2.png)

After closing the case, it becomes invisible for the requester. At this point you can reopen it by clicking **Open**, save a ticket transcript (which we recommend to do so) by clicking **Transcript** and remove the case by clicking **Delete**.

![ticket-tool-example-3](/img/content/ticket-tool-example-3.png)

And this is how it looks like from the `#ticket-history` channel, where all ticket notifications and transcripts are sent:

![ticket-tool-example-4](/img/content/ticket-tool-example-4.png)

### MEE6

MEE6 is yet another general purpose Discord bot we use for the auto-moderation. It serves many options, but we are going to use the automod feature only since this bot does the job better than the Carl-bot.

To start the bot setup, open the [MEE6 website](https://mee6.xyz/), log into your Discord account, choose `tf2pickup.org server template` server from the list and click **Set up MEE6** next to its name.

![mee6-get-started](/img/content/mee6-get-started.png)

![mee6-choose-server](/img/content/mee6-choose-server.png)

That will let you invite the bot. Leave all permissions checked.

![invite-mee6](/img/content/invite-mee6.png)

First of all, disable all features which are enabled in the bot by unselecting them.

![mee6-disable-features](/img/content/mee6-disable-features.png)

You have to confirm every single feature disable.

![mee6-disable-feature-confirmation](/img/content/mee6-disable-feature-confirmation.png)

After that, enable the **Moderator** feature and confirm it.

![mee6-enable-moderator-feature](/img/content/mee6-enable-moderator-feature.png)

![mee6-enable-feature-confirmation](/img/content/mee6-enable-feature-confirmation.png)

Open **Moderator** settings by clicking on it. There you can set all moderation and automod settings. Start from selecting an `Admin` role as a moderator role. In the **Audit Logging** set `#moderation-notifications` as the **Logging Channel**, leave all **Moderation Events** checked and all **Message Events** unchecked. This will let MEE6 post only notifications about the automod infractions, as we log different things by the Carl-bot.

![mee6-moderator-settings-1](/img/content/mee6-moderator-settings-1.png)

In the **Auto-Moderator** section, choose **Delete Message & Warn Member** for:

- Bad words,
- Excessive spoilers,
- Repeated text,
- Excessive caps (70% > CAPS),
- Excessive mentions,
- Excessive emojis,
- Zalgo.

![mee6-moderator-settings-2](/img/content/mee6-moderator-settings-2.png)

After that, click the setting icon for the **Bad words** option. Here you can add words you'd like to ban on the server. Also, there you can see an option to disable moderation on certain channels, as the `#admins` channel is here on the exclusion list. You can do so for every single automod feature.

![mee6-moderator-settings-3](/img/content/mee6-moderator-settings-3.png)

We suggest to change default **Excessive mentions** settings from 5 to 10, because sometimes people ping around 5-6 other users and usually this is not a spam.

![mee6-moderator-settings-4](/img/content/mee6-moderator-settings-4.png)

After that, scroll down to the bottom of the Moderation settings and disable all commands except `/clear-all-infractions` and `/infractions`.

![mee6-moderator-settings-5](/img/content/mee6-moderator-settings-5.png)

The last step you could do is to add bot permissions for the `#moderation-notifications` channel. Since it has the Administrator permission, it does not need any permissions on any channel at all, because this role overrides all permissions, but it's a good measure to do so, so for instance if a Discord admin would like to set up Discord server more restrictively, then they could take the Administrator permission off from the bot.

The bot role should have the following permissions:

- `View Channel`,
- `Send Messages`,
- `Embed Links`,
- `Attach Files`,
- `Add Reactions`,
- `Use External Emoji`,
- `Manage Messages`,
- `Read Message History`.

This is how the automod looks like in practice:

![mee6-automod-result](/img/content/mee6-automod-result.png)

### MonitoRSS

This bot enables automatic channel announcements based on RSS feeds. When a site you want to follow posts a news, a message about it can be sent on a chosen channel, in our case on `#tf2news` channel. At the moment we are aware of two popular TF2 feeds which are from [ETF2L](https://etf2l.org/) and [teamfortress.tv](https://www.teamfortress.tv/).

In order to add the bot to your server enter [this website](https://monitorss.xyz/) and click **Invite Me!**.

![monitorss-get-started](/img/content/monitorss-get-started.png)

After that, choose **With Role**.

![monitorss-with-role](/img/content/monitorss-with-role.png)

Leave checkboxes checked for the bot permissions, they're sufficient.

![invite-monitorss](/img/content/invite-monitorss.png)

After adding the bot, set up bot permissions for the channel `#tf2news` for role `MonitoRSS`:

- `View Channel`,
- `Send Messages`,
- `Embed Links`,
- `Attach Files`,
- `Add Reactions`,
- `Use External Emoji`,
- `Manage Messages`,
- `Read Message History`.

After that come back to the main page and this time choose **Control Panel**. Choose a server you want to set up RSS feeds for, in our case `tf2pickup.org server template`.

![monitorss-choose-server](/img/content/monitorss-choose-server.png)

In order to add the feeds, you have to provide their name, RSS feed link and the channel the notification should go for. In our case it would be:

- ETF2L:
  - URL - `https://etf2l.org/feed/`
  - Channel - `#tf2news`
  - Title (optional) - `ETF2L`
- teamfortress.tv:
  - URL - `https://www.teamfortress.tv/rss`
  - Channel - `#tf2news`
  - Title (optional) - `teamfortress.tv`

![monitorss-add-feeds](/img/content/monitorss-add-feeds.png)

After adding the feeds, when you choose **Message** submenu on left, you'll be able to see preview of the last RSS feed messages and test sending them our on a specific channel. This is good, because you can test, if the bot has proper rights in order to post messages in the `#tf2news` channel.

![monitorss-feed-options](/img/content/monitorss-feed-options.png)

Click **Send Original to Discord** and choose `#tf2news` from the dropdown list.

![monitorss-feed-test](/img/content/monitorss-feed-test.png)

The message should appear on the aforementioned channel.

![monitorss-feed-response](/img/content/monitorss-feed-response.png)

### PatchBot

PatchBot is a bot sending notifications when game updates are released for many games such as League of Legends, Fortnite and many others you don't care about, because what we care about is the Team Fortress 2 which is on the supported game list. Basically after setting the bot up, every TF2 update will be announced in the `#tf2news` channel.

In order to start, open up [PatchBot website](https://patchbot.io/) and click **Get Started**. You will have to log into your Discord account.

![patchbot-get-started](/img/content/patchbot-get-started.png)

After that, your Discord server list will show up on left side of the page. Hover over the **tf2pickup.org server template** server logo and click on the button with its name.

![patchbot-choose-server](/img/content/patchbot-choose-server.png)

Since obviously you don't have a bot invited on the server *yet*, you will have to do it by clicking **Continue to Discord**.

![patchbot-start-setup](/img/content/patchbot-start-setup.png)

Select `tf2pickup.org server template` server from the list, untick `Manage Roles` and **Authorize** the bot.

![patchbot-invite-bot](/img/content/patchbot-invite-bot.png)

After that, simply scroll down on a game list on left and click on the Team Fortress 2 logo. Select the `#tf2news` channel from the list. After that click the paper kite icon in order to test out the channel.

![patchbot-choose-channel](/img/content/patchbot-choose-channel.png)

You should see a notification like this:

![patchbot-notification](/img/content/patchbot-notification.png)

If that's the case, the PatchBot configuration is done.

## Final touches

After setting up bots it's time to finalize the server setup. Here's what you can do:

### Adding public announcement feed

Some of the public feeds are covered by the MonitoRSS bot, but some of them are not. This is where you can make a good use of the broadcasting channels on other popular servers. Obviously, it's up to you what channels are you going to follow, but we can imagine having a general feed from the TF2 community is a good way to keep your community informed about the things going on around. The follow example is based on teamfortress.tv's `#announcements` channel where all casted games and newsposts are announced when they are live.

In order to follow the channel, just open it up, click **Follow** on the top right corner, choose the server where you want to enable these notifications and choose the channel for it.

![discord-follow-announcements](/img/content/discord-follow-announcements.png)

![discord-follow-select-channel](/img/content/discord-follow-select-channel.png)

In that way we recommend to follow these channels:

- `#announcements` on [teamfortress.tv](https://discord.gg/0if53iRT2W4nyL6t) (we suggest selecting the `#twitch` channel for this specific feed since there are LOADS of the annoucnements going on),
- `#announce-kritzkast` on [KritzKast](https://discord.com/invite/9vTwpEJ),
- `#announcements` on [EssentialsTF](https://discord.com/invite/hyQrEjw),
- `#announcements` on [RGL NA Official Discord](https://discord.com/invite/3hJsWu7),
- `#announcements` on [UGC League](https://discord.com/invite/ugcleague) in the `Team Fortress 2` section.

### Adding private moderation feed

Private moderation feed is a good things for admins/mods, because it lets them know if something is going on with the bot(s) like bot updates, maintenances, outages etc. These notifications should be sent to the `#bot-notifications` channel and here is the list of the channels you should follow in it:

- `#altdentifier-updates` in [Auxim Solutions](https://discord.com/invite/k3Ggcwg),
- `#outages` in [Carl-bot Help](https://discord.gg/DSg744v),
- `#announcements` in [Statbot](https://discord.gg/bEqx5Skkqu),
- `#announcements` and `#bot-status` in [Streamcord](https://discord.gg/streamcord),
- `#announcements` and `#releases` in [payload-neo](https://discord.com/invite/gYnnMYz),
- `#status-updates` in [MEE6 Support](https://discord.gg/mee6),
- `#bot-news` in [Ticket Tool Support](https://discord.com/invite/tUM9Xcv),
- `#downtime-updates` and `#news` in [MonitoRSS Support (Formerly Discord.RSS)](https://discord.com/invite/pudv7Rx).

### Setting up the server as a `community` type

In the end it's good to set up a `community` type server, because it lets you:

- have a welcome screen showing up for all users on server join,
- announcement channels made as a broadcasting channels, they are like the channels you've followed earlier,
- having a look at the server insights,
- discovery option in a Discord server browser for very big servers.

In order to start, go to your **Server Settings**.

![discord-enter-server-settings](/img/content/discord-enter-server-settings.png)

Go to the **Enable Community** section and click **Get started**.

![discord-enable-community-1](/img/content/discord-enable-community-1.png)

Make sure your email address is verified on your Discord account, also tick an option **Scan media content from all members**. In our case we had these options set already, so they were grayed out. After that, go next.

![discord-enable-community-2](/img/content/discord-enable-community-2.png)

Choose channels for the rules and community updates going directly from Discord. In our case they should be `#rules` and `#bot-notifications`.

![discord-enable-community-3](/img/content/discord-enable-community-3.png)

As in the first menu, the security options are ticked and the last thing we have to do is to accept the Community Guidelines and click **Finish setup**.

![discord-enable-community-4](/img/content/discord-enable-community-4.png)

Now we can make use of the **Community** server features. Let's start with Membership Screening which lets you force the user to accept the rules before posting any message on the server. Click **Set up Membership Screening** in order to start.

![discord-membership-screening-1](/img/content/discord-membership-screening-1.png)

Feel free to add any description you want like we did here. In order to add rules, click **Get started**.

![discord-membership-screening-2](/img/content/discord-membership-screening-2.png)

This is the place you can write the rules. Feel free to click on the buttons below the text field, so you can use predefined rules or make your own ones.

![discord-membership-screening-3](/img/content/discord-membership-screening-3.png)

When it's done like on an example below, click **Save**.

![discord-membership-screening-4](/img/content/discord-membership-screening-4.png)

Before applying the settings you always have an option to see a rules preview. Click **Preview** in order to show it up.

![discord-membership-screening-preview](/img/content/discord-membership-screening-preview.png)

That concludes Membership Screening setup. Now let's get over to the Welcome Screen settings. Click **Set up Welcome Screen** to start.

![discord-welcome-screen-1](/img/content/discord-welcome-screen-1.png)

After adding a channel a popup window with its settings will show up. Select the channel, write a short description for the channel and optionally choose a matching emote to it. After that, click **Save**. You can add up to 5 channels to the Welcome Screen in this way.

![discord-welcome-screen-2](/img/content/discord-welcome-screen-2.png)

After adding more channels, define a server description below the server name.

![discord-welcome-screen-3](/img/content/discord-welcome-screen-3.png)

After that, before saving make sure the Welcome Screen looks like you want to. Click **Preview**, so you can have a look on it.

![discord-welcome-screen-preview](/img/content/discord-welcome-screen-preview.png)

### Setting general Discord server settings

Finally, there are only a few options to set on the server in order to make it great. Start off from the **Moderation** section. Choose **High** moderation level. This is the best compromise between restrictive and safe setup. All big community servers usually set this to the **Highest** in order to let spammers have harder time, but we think it's not needed in small communities. Moreover, make sure to enable the 2FA (two-factor authentication) requirement for the administrators/moderators, so they could be safer meaning getting access to an account of them is even harder than usual. Click **Enable 2FA requirement**, type in your token and click it again.

![discord-moderation-settings](/img/content/discord-moderation-settings.png)

![discord-enable-admin-2fa-requirement](/img/content/discord-enable-admin-2fa-requirement.png)

After that, it's good to have some server emojis, so people could interact in a way they want to. We recommend to add emotes with transparency in the background - these looks the best. All you need to do is to upload emojis by clicking **Upload emoji**, choosing emoji pictures and naming them in a way you want to let use them.

![discord-add-emojis](/img/content/discord-add-emojis.png)

Another good thing you can do is to create your server template. This lets you create a clone of your whole server without bots, so if you'd like to make some of your own changes on the server, you can always test these first on a testing server you can make by using a template. You have to update it every single time you make a change on the server like channel permissions, role setting etc. Click **Sync template** in order to sync changes to a template. In that way you could [use a link from this image below](https://discord.new/UeNaSR5pQaMS) to make your own server based on all descriptions we made here.

![discord-create-server-template](/img/content/discord-create-server-template.png)
