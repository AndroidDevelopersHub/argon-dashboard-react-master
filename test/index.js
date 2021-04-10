const  express = require('express')
const app = express()
const bcrypt = require('bcrypt');
const saltRounds = 12;
const myPlaintextPassword = '12';

app.listen('3000')
app.get('/', async  (req,res)=>{
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(myPlaintextPassword, salt);

    const result = bcrypt.compareSync('123', hash);
    res.json(hash)
})

