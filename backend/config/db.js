const mongoose = require("mongoose");
try {
  mongoose.connect("mongodb+srv://ecuser:ec@123@eccluster.dbzbz7o.mongodb.net/?retryWrites=true&w=majority&appName=eccluster", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log("Database Connected Successfully");
} catch (err) {
  console.log(err);
}
