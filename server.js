const app = require('./app.js');
const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT;

app.listen(port, () => {
  console.log(
    `🔥 Server is running at http://localhost:${port} 🚀`
  );
});
