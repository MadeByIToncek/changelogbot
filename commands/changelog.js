// File name: "ping.js"
// Folder "./commands"
// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
const request = require('request');


module.exports = {
    description: 'Pošle naši pozvánku na váš server pomocí webhooku.',
    category: "Changelog",
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
        console.log('body:', body); // Print the HTML for the Google homepage.
        var info = JSON.parse(body);
        console.log(info)
        client.channels.cache.get(process.env.DISCORD_NOTIFY_CHANNEL).send("**" + info.name + "** \n```diff\n" + info.body + "```");
});
}
}