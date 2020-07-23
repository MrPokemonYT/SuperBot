const { Client, MessageEmbed } = require('discord.js');
const client = new Client({ partials: ['MESSAGE', 'REACTION']});
const { getPokemon } = require('./utils/pokemon');
client.login(process.env.BOT_TOKEN);
const guildInvites = new Map();
let estados = [">>ping para ver el lag", "Se vienen nuevos comandos", "GG"]
let ac = ["WATCHING", "PLAYING"]

client.on('inviteCreate', async invite => guildInvites.set(invite.guild.id, await invite.guild.fetchInvites()));
client.on('ready', () => {
    setInterval(function(){
        let estado = estados[Math.floor(Math.random()*estados.length)]
        let acs = ac[Math.floor(Math.random()*ac.length)]
        client.user.setPresence({ activity: {type: acs, name: estado  },  status:'online'});
      }, 5000)
    console.log(`${client.user.tag} listo`);
    client.guilds.cache.forEach(guild => {
        guild.fetchInvites()
            .then(invites => guildInvites.set(guild.id, invites))
            .catch(err => console.log(err));
    });
});




client.on('guildMemberAdd', async member => {

    const cachedInvites = guildInvites.get(member.guild.id);
    const newInvites = await member.guild.fetchInvites();
    guildInvites.set(member.guild.id, newInvites);
    try {
        const usedInvite = newInvites.find(inv => cachedInvites.get(inv.code).uses < inv.uses);
        const embed = new MessageEmbed()
            .setDescription(`${member.user.tag} es el  ${member.guild.memberCount} en unirse.\nSe ha unido usando la invitacion de  ${usedInvite.inviter.tag}\nNumero de usos de la invitacion: ${usedInvite.uses}`)
            .setTimestamp()
            .setTitle(`${usedInvite.url}`);
        const welcomeChannel = member.guild.channels.cache.find(channel => channel.id === '725411095631757476');
        if(welcomeChannel) {
            welcomeChannel.send(embed).catch(err => console.log(err));
        }
    }
    catch(err) {
        console.log(err);
    }
});


var prefix = (process.env.PREFIX);


client.on("message", (message) => {
const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();

  if (command === 'ping') {
  

    let ping = Math.floor(message.client.ping);
    
    message.channel.send(":ping_pong: Pong!")
      .then(m => {

          m.edit(`:incoming_envelope: Ping Mensajes: \`${Math.floor(m.createdTimestamp - Date.now())} ms`);
            
            });
            }


});
client.on('message', async message => {
    if(message.author.bot) return;
    if(message.content.toLowerCase().startsWith('>>pokemon')) {
        const pokemon = message.content.toLowerCase().split(" ")[1];
        try {
            const pokeData = await getPokemon(pokemon);
            const { 
                sprites, 
                stats, 
                weight, 
                name, 
                id, 
                base_experience,
                abilities,
                types
            } = pokeData;
            const embed = new MessageEmbed();
            embed.setTitle(`${name} #${id}`)
            embed.setThumbnail(`${sprites.front_default}`);
            stats.forEach(stat => embed.addField(stat.stat.name, stat.base_stat, true));
            types.forEach(type => embed.addField('Type', type.type.name, true));
            embed.addField('Weight', weight);
            embed.addField('Base Experience', base_experience);
            message.channel.send(embed);
        }
        catch(err) {
            console.log(err);
            message.channel.send(`Pokemon ${pokemon} does not exist.`);
        }
    }
});

