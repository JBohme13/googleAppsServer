const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
app.use(morgan('common'));
app.use(cors());

const playStore = require('./playStore');

app.get('/apps', (req, res) => {
    const { genres, sort} = req.query;
    
    if(sort) {
        if(!['title', 'rank']) {
            return res
                   .status(400)
                   .send('sort must be one of title or rank');
        }
    }

    if(genres) {
        if(!['Action', 'Strategy', 'Casual', 'Arcade', 'Card', 'Puzzle']) {
            return res
                   .status(400)
                   .send('genre must be one of; Action, Arcade, Card, Casual, Puzzle, or Strategy');
        }
    }

    let results = playStore;

    if(genres) {
         results = playStore.filter(app => {
                        return(
                          app.Genres
                          .toLowerCase()
                          .includes(genres.toLowerCase())
                        )
                    })
                }
                    

    if(sort) {
        results.sort((a, b) => {
                     a[sort] > b[sort] ? 1 : b[sort] > a[sort] ? -1 : 0;
                 })
    }
    
    res.json(results);
})

app.listen(8000, () => {
    console.log('app is listening on port 8000');
})


