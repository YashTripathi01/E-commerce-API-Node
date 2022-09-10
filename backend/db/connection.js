const mongoose = require('mongoose')


try {
  mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  console.log('Connection to database successful!');

} catch (error) {
  console.error(error);
}