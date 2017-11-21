const Discord = require("discord.js");
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  // By default, I'll leave the bot's game on that
  client.user.setGame('with goddy | !!help')
});

const prefix = "!!";

const answers = [
  'Hell yeah!', 'Yeaaah I dunno', 'Yes', 'Nigga idfk!!', 'Sure whatever...', 'Maybe', 'Huhmmm', 'I\'m not too sure', 'Without a doubt', 'Never!'
]

client.on('message', msg => {
  if (msg.content.startsWith(prefix + 'ping')) {
    msg.channel.send(':ping_pong: Pong!')
  }

  if (msg.content.startsWith(prefix + '8ball')) {
  let args = msg.content.split(" ").slice(1);
  let question = args[0]
  if (!msg.content.endsWith('?')) {
    return msg.channel.send('You must ask me a question, first!')
} else {
  msg.channel.send(`:8ball: | ${answers[Math.floor(Math.random() * answers.length)]}`);
  }
}

if (msg.content.startsWith(prefix + 'help')) {
  const embed = new Discord.RichEmbed()
.setTitle("Here is the help menu")
.setColor(0x36393e)
.addField("ping", "Who knows tbh.")
.addField("8ball", "Ask the magic 8ball a question m8.")
.addField("prefix", "Shows the bots current prefix")
.addField("ban", "Bans the user specified")
.addField("kick", "Kicks the user specified")

msg.channel.send({embed});
}

let args = msg.content.split(" ").slice(1);

  if (msg.content.startsWith(prefix + 'ban')) {
    var reason = msg.content.split(' ').slice(2).join(' ');
    if (!msg.member.permissions.has("BAN_MEMBERS")) return msg.channel.send("ERR: Insufficient Permissions").catch(console.error);
    if (!msg.guild.member(client.user).permissions.has("BAN_MEMBERS")) return msg.channel.send("ERR: Bot has insufficient permissions").catch(console.error);

  if (msg.mentions.users.size === 0) return msg.channel.send("ERR: No user provided, *shrugs*")
  let userToBan = msg.guild.member(msg.mentions.users.first())
  if (!userToBan)
    return msg.channel.send("ERR: Can't find a user to ban! Try again...")

    if (msg.mentions.users.first === msg.author)
      return msg.channel.send("ERR: You can't ban yourself!")
      // The real error is that your doing the same code x2, but in different ways. *facepalm*
      if(msg.author.id === msg.mentions.users.first().id)
        return msg.channel.send("ERR: You can't ban yourself!")

  userToBan.ban().then(() => {
    msg.channel.send(`Success!\nUser was successfully banned\nReason: ${reason}`)
    })
  }

  if (msg.content.startsWith(prefix + 'kick')) {
    var reason = msg.content.split(' ').slice(2).join(' ');
    if (!msg.member.permissions.has("KICK_MEMBERS")) return msg.channel.send("ERR: Insufficient Permissions").catch(console.error);
    if (!msg.guild.member(client.user).permissions.has("KICK_MEMBERS")) return msg.channel.send("ERR: Bot has insufficient permissions").catch(console.error);

  if (msg.mentions.users.size === 0) return msg.channel.send("ERR: No user provided, *shrugs*")
  let userToKick = msg.guild.member(msg.mentions.users.first())
  if (!userToKick)
    return msg.channel.send("ERR: Can't find a user to kick! Try again...")

    if(msg.author.id === msg.mentions.users.first().id)
      return msg.channel.send("ERR: You can't kick yourself!")

  userToKick.kick().then(() => {
    msg.channel.send(`Success!\nUser was successfully kicked\nReason: ${reason}`)
    })
  }

});

client.login('yourTokenHere');
