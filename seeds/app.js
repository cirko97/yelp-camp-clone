const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '631ef7af58ad3c6cb63c161d',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
              type: 'Point',
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude
              ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/duzrj6fgt/image/upload/v1663587913/YelpCamp/camp1_rhpfpt.jpg',
                  filename: 'YelpCamp/fm6zxd959inod0kgeamk'
                },
                {
                  url: 'https://res.cloudinary.com/duzrj6fgt/image/upload/v1663587914/YelpCamp/camp2_gggoev.jpg',
                  filename: 'YelpCamp/typpltcbqp2lgo92o0ge',
                }
              ],
            description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio 
            quod quas iure quae beatae aspernatur repellendus consequuntur, id quidem 
            soluta vel cumque ipsa assumenda nisi omnis fugit! Perferendis, repellat maxime.`,
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})