const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('kitty')
        .setDescription('Replies with Random Cat Photos'),
    async execute(interaction) {
        const data = axios.get('https://api.thecatapi.com/v1/images/search')
            .then(response => {
                const url = response.data[0].url
                interaction.reply(url);
            })
    },
}