const { SlashCommandBuilder } = require('discord.js');
const user = require('../models/user.ts')
const axios = require('axios');
const mongoose = require('mongoose')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('kitty')
        .setDescription('Replies with Random Cat Photos'),
    async execute(interaction) {
        const data = axios.get('https://api.thecatapi.com/v1/images/search')
            .then(response => {
                const url = response.data[0].url
                const GetData = async () => {
                    const kitty = await user.find({ "username": interaction.user.username }, { _id: 0, __v: 0 })
                    if (JSON.stringify(kitty)[4] === undefined) {
                        const res = await user.create({ "username": interaction.user.username })
                        console.log(res)
                        interaction.reply(url);
                    }
                    else {
                        const res = await user.updateOne({ "username": interaction.user.username }, { $inc: { cats: 1 } })
                        interaction.reply(url);
                    }
                }
                GetData()
            })
    },
}
