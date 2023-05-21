const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
require('dotenv').config()
const cors = require('cors')
const port = process.env.port || 5000;

app.use(cors())
app.use(express.json())


console.log(process.env.USER_NAME)
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.qygdymi.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    await client.connect();

    const data = client.db('allSuperMan').collection('superman');
    app.get('/superman',async(req,res)=> {
        const cursor =data.find()
        const result =await cursor.toArray()
        res.send(result)
    });
    app.get('/superman/:id', async(req,res)=> {
      const oneUser = req.params.id;
      const query = {_id: new ObjectId(oneUser)};
      const options = {
        projection:{name:1, price:1, picture:1, rating:1},
      }
      const result = await data.findOne(query,options)
      res.send(result)
    })

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})




