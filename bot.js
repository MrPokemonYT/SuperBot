const { Client, MessageEmbed } = require('discord.js');
const Discord = require("discord.js");
var fs = require('fs');
var ytdl = require('ytdl-core');
var voiceChannel;
var pokemon = require('./db/pokemon');
const client = new Client({ partials: ['MESSAGE', 'REACTION']});
client.login(process.env.BOT_TOKEN);
let estados = [">>ping para ver el lag", "Se vienen nuevos comandos", "GG"]
let ac = ["WATCHING", "PLAYING"]

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






var prefix = (process.env.PREFIX);


client.on("message", (message) => {
const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();

if (message.content.startsWith(prefix+"pokemon")){
    var pkmn = message.content.toString().toLowerCase();
    pkmn = pkmn.substring(9);
    for(var i=0;i<pokemon.length;i++){
        if(pkmn == pokemon[i]._engName.toLowerCase() || pkmn == pokemon[i]._frName.toLowerCase() || pkmn == pokemon[i]._nb){
            const embed = new Discord.MessageEmbed() 
            .setColor("RANDOM")
            .setThumbnail(`https://cdn.glitch.com/d3872f22-6987-4c30-90d1-3e58e3f83953%2Fico.png?v=1595496208978`)
            .setTitle("**Pokémon**")
            .setAuthor('https://cdn.glitch.com/d3872f22-6987-4c30-90d1-3e58e3f83953%2Fpokedex.png?v=1595497624647', "PokeDex")
            .addField("*Número:*", pokemon[i]._nb, false)
            .addField("*Nombre:*", pokemon[i]._engName, false)
            .addField("*Tipo:*", pokemon[i]._type+" y "+pokemon[i]._type2, false)
            .addField("*Radio de captura:*", pokemon[i]._catchRate, false)
            .addField("*Tipo:*", pokemon[i]._type+" y "+pokemon[i]._type2, false)
            .addField("**__Estadísticas Base__**", false)
            .addField("*Salud:*", pokemon[i]._hp, false)
            .addField("*Ataque:*", pokemon[i]._atk, false)
            .addField("*Defensa:*", pokemon[i]._def, false)
            .addField("*Velocidad:*", pokemon[i]._spd, false)
            .addField("*Velocidad de ataque:*", pokemon[i]._sAtk, false)
            .addField("*Velocidad de defensa:*", pokemon[i]._sDef, false)

            var text = "__You selected__\n";
            text += "**N° "+pokemon[i]._nb+"** \n";
            text += "English name: **"+pokemon[i]._engName+"** \n";
             text += "French name: **"+pokemon[i]._frName+"** \n";
            text += "Type: **"+pokemon[i]._type+" "+pokemon[i]._type2+"**\n";
            text += "Catch Ratio: **"+pokemon[i]._catchRate+"**\n\n";
            text += "__Base Stats__\n";
            text += "HP: **"+pokemon[i]._baseStats._hp+"**\n";
            text += "Atk: **"+pokemon[i]._baseStats._atk+"**\n";
            text += "Def: **"+pokemon[i]._baseStats._def+"**\n";
            text += "S. Atk: **"+pokemon[i]._baseStats._sAtk+"**\n";
            text += "S. Def: **"+pokemon[i]._baseStats._sDef+"**\n";
            text += "Spd: **"+pokemon[i]._baseStats._spd+"**";
            message.channel.send(embed);
        }
    }
}




  if (message.content.startsWith(prefix+"ping")) {
  

    let ping = Math.floor(message.client.ping);
    
    message.channel.send(":ping_pong: Pong!")
      .then(m => {

          m.edit(`:incoming_envelope: Ping Mensajes: \`${Math.floor(m.createdTimestamp - Date.now())} ms`);
            
            });
            }

        });

