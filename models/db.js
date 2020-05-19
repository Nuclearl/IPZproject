const mongoose = require('mongoose');
//mongodb connection-------------------------------------------
mongoose.connect('mongodb://localhost:27017/course_work', { useNewUrlParser: false, useUnifiedTopology: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./func.model');
