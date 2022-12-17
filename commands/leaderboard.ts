
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const user = require('../models/user.ts')
const mongoose = require('mongoose')
module.exports = {
    data: new SlashCommandBuilder()
        .setName("leaderboard")
        .setDescription("Displays the top 3 people with the most uses of the cat command"),
    async execute(interaction) {
        const GetData = async () => {
            const kitty = await user.find({}, { _id: 0, __v: 0 }).sort({ cats: -1 })
            const kittydata = await JSON.parse(JSON.stringify(kitty))
            const kittyarray = []
            for (let i = 0; i < Object.keys(kitty).length; i++) {
                kittyarray.push(Object.values(kittydata[i]))
            }
            console.log(kittyarray[0][1])
            const KittyLeaderBoardEmbeded = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle("Top 3 Kitty Command Users")
                .addFields({
                    name: kittyarray[0][0] + '',
                    value: kittyarray[0][1] + ' times'
                }, {
                    name: kittyarray[1][0] + '',
                    value: kittyarray[1][1] + ' times'
                }, {
                    name: kittyarray[2][0] + '',
                    value: kittyarray[2][1] + ' times'
                });
            interaction.reply({ embeds: [KittyLeaderBoardEmbeded] })
        }
        GetData()
    }
}