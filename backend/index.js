const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectionofDb = require("./config/connect.js");
const path = require("path");
const userSchema = require("./schemas/userModel");
const bcrypt = require("bcryptjs");

const app = express();

//////dotenv config/////////////////////
dotenv.config();

//////connection to DB/////////////////
async function seedAdminUser() {
  const adminEmail = "admin@admin.com";
  const adminPassword = "admin123";
  const adminName = "Admin";
  const adminType = "Admin";

  const existingAdmin = await userSchema.findOne({ email: adminEmail, type: adminType });
  if (!existingAdmin) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);
    await userSchema.create({
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      type: adminType
    });
    console.log("Default admin user created:", adminEmail, adminPassword);
  } else {
    console.log("Default admin user already exists.");
  }
}

connectionofDb();
seedAdminUser();


const PORT = process.env.PORT || 8001;


app.use(express.json());
app.use(cors({
  origin:'http://localhost:3000',
  methods:['GET','POST']
}));


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use('/api/user', require('./routes/userRoutes.js'))
app.use('/api/admin', require('./routes/adminRoutes'))
app.use('/api/owner', require('./routes/ownerRoutes'))



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});