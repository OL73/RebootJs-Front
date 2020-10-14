const axios = require('axios');

axios.get('https://pokeapi.co/')
    .then(res => res.data)
    .then(data => console.log(data))
    .catch(_err => console.log(_err));