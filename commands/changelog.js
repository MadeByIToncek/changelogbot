// File name: "ping.js"
// Folder "./commands"
// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
const request = require('request');
const DiscordJS = require('discord.js')


module.exports = {
    description: 'Pošle naši pozvánku na váš server pomocí webhooku.',
    category: "Changelog",
    permissions: ['MANAGE_CHANNELS'],
    minArgs: 2,
    guildOnly: true,
    expectedArgs: '<GithubUserName> <Repository>',
    callback: ({ client, message, args }) => {
        var options = {
            url: 'https://api.github.com/repos/' + args[0] +'/' + args[1] + '/releases/latest',
            headers: {
              'User-Agent': 'request'
            }
          };
        request(options, function (error, response, body) {
        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        var info = JSON.parse(body)
        // client.channels.cache.get(process.env.DISCORD_NOTIFY_CHANNEL).send("**" + info.name + "**  @  **" + info.tag_name + "** \n```diff\n" + info.body + "```");
        const id = '814161343631720489';
        const token = 'SJMLZr6yM9KklodSe9GiY0qgzEQh3CH7IaVv7wx1Q7lJie5Jvz5EHlmx36pw_UJt4AG2';
        
        const webhook = new DiscordJS.WebhookClient(id, token);
        
        webhook.send("**" + args[1] + "**  @  **" + info.tag_name + "** \n```diff\n" + info.body + "```\n *Toto vydání vydal " + info.author.login + ", Vydáno pomocí bota uživatelem " + message.member.user.tag + "*")
          .catch(console.error);
});
}
}