const { SlashCommandBuilder } = require('discord.js');
const user = require('../models/user.ts')
const axios = require('axios');
const mongoose = require('mongoose')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('count')
        .setDescription('Tells you how many times you have used the kitty command'),
    async execute(interaction) {
        const GetData = async () => {
            const kitty = await user.find({ "username": interaction.user.username }, { _id: 0, __v: 0 })
            const kittyimage = JSON.parse(JSON.stringify(kitty))
            interaction.reply('You have used the kitty command **' + kittyimage[0].cats + '** times')
        }
        GetData()
    }
}