const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://manthan_jain_9530:jain1234@cluster0.n1vnnj2.mongodb.net/");

// Image storage engine
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });
app.use('/images', express.static('upload/images'));

app.get("/", (req, res) => {
  res.send("Express App is Running");
});

app.post("/upload", upload.single('product'), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

// Product Schema
const productSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  new_price: { type: Number, required: true },
  old_price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true },
});

const Product = mongoose.model("Product", productSchema);

app.post('/addproduct', async (req, res) => {
  let products = await Product.find({});
  let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

  try {
    const product = new Product({
      id: id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
    });
    await product.save();
    res.json({ success: true, name: req.body.name });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error saving product" });
  }
});

app.post('/removeproduct', async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  res.json({ success: true });
});

app.get('/allproducts', async (req, res) => {
  let products = await Product.find({});
  res.send(products);
});

// User Schema
const Users = mongoose.model('Users', {
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  cartData: { type: Object },
  date: { type: Date, default: Date.now },
});

app.post('/signup', async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({ success: false, errors: "Existing user found with the same email address" });
  }

  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }

  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });

  await user.save();

  const data = { user: { id: user.id } };
  const token = jwt.sign(data, 'secret_ecom');
  res.json({ success: true, token });
});

app.post('/login', async (req, res) => {
  let user = await Users.findOne({ email: req.body.email, password: req.body.password });
  if (!user) {
    return res.status(400).json({ success: false, errors: "Invalid credentials" });
  }

  const data = { user: { id: user.id } };
  const token = jwt.sign(data, 'secret_ecom');
  res.json({ success: true, token });
});

app.post('/getcart', fetchUser, async (req, res) => {
  let user = await Users.findOne({ _id: req.user.id });
  res.json(user.cartData);
});

app.post('/addtocart', fetchUser, async (req, res) => {
  let user = await Users.findOne({ _id: req.user.id });
  user.cartData[req.body.itemId]++;
  await user.save();
  res.json(user.cartData);
});

app.post('/removefromcart', fetchUser, async (req, res) => {
  let user = await Users.findOne({ _id: req.user.id });
  user.cartData[req.body.itemId]--;
  await user.save();
  res.json(user.cartData);
});

function fetchUser(req, res, next) {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send("Access denied");

  try {
    const data = jwt.verify(token, 'secret_ecom');
    req.user = data.user;
    next();
  } catch {
    return res.status(401).send("Invalid token");
  }
}

app.listen(port, () => console.log(`Server started on port ${port}`));
