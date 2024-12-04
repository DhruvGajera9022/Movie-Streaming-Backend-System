const cheerio = require('cheerio');
const color = require('colors');

const convertOverview = async (overview) => {
    try {
        // check overview is a valid string
        if (!overview || typeof overview !== 'string') {
            throw new Error('Invalid overview format');
        }

        // Load the HTML with cheerio
        const $ = cheerio.load(overview);

        // Extract and clean the text
        const text = $('body').text().trim() || $('p').text().trim() || $.text().trim();

        return text;
    } catch (error) {
        console.log(`Error in convertOverview: ${error.message}`.bgRed.white);
        return '';
    }
};

module.exports = convertOverview;
