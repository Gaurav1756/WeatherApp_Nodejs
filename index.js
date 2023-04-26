const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const db = require("./config/mongoose");
const User = require("./models/users");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const users = [
  { email: "gauravsenger2167@gmail.com", password: "12345678" },
  { email: "vs82343431@gmail.com", password: "12345678" },
  { email: "user3@gmail.com", password: "password3" },
];

app.get("/", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (user) => user.email === username && user.password === password
  );
  const temp = req.body;
  console.log(temp);

  User.create(temp, function (err, temp) {
    if (err) {
      console.log("error", "Error in creating the user");
      return;
    }
    console.log("success", "Signed up successfully!", temp);
  });

  if (user) {
    // res.send(`Welcome, ${user.email}!`);
    res.render("index", { weather: null, error: null });
  } else {
    res.send("Invalid email or password.");
  }
});
app.get("/weather", async (req, res) => {
  // Get the city from the query parameters
  const city = req.query.city;
  const apiKey = "4a1d36184b2322559b8523ef621953c3";

  // Add your logic here to fetch weather data from the API
  const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  let weather;
  let error = null;
  try {
    const response = await axios.get(APIUrl);
    weather = response.data;
  } catch (error) {
    weather = null;
    error = "Error, Please try again";
  }
  // Render the index template with the weather data and error message
  res.render("index", { weather, error });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
