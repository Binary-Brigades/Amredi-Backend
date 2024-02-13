const { userModel } = require("../models/userModel");
require("dotenv").config();
const { ObjectId } = require("mongodb");
const axios = require("axios")

const getNearbyUsers = async (radius, location, userId) => {
  const users = await userModel
    .find({
      _id: { $ne: new ObjectId(userId) },
      //  _id: { $ne:  new mongoose.Types.ObjectId(userId) },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: location.coordinates,
          },
          $maxDistance: radius,
          $minDistance: 0,
        },
      },
    })
    .limit(process.env.userLimit);
  return users;
};

async function getLocation(log, lat) {
  const params = {
    latlng: `${lat},${log}`,
    key: process.env.goggleApiKey,
  };
  const res = await axios.get(
    "https://maps.googleapis.com/maps/api/geocode/json",
    {
      params: params,
    }
  );
  const data = await res.data;
  const compound_code = data["plus_code"]["compound_code"];
  return compound_code;
}

exports.formatUserData = async (radius, location, userId) => {
  const users = await getNearbyUsers(radius, location, userId);
  model = [];
  for (let i = 0; i < users.length; i++) {
    let log = users[i].location.coordinates[0];
    let lat = users[i].location.coordinates[1];
    let location = await getLocation(log, lat)
    model.push({
      first_name: users[i].first_name,
      last_name: users[i].last_name,
      location: location.slice(9)
    });
  }
  return model;
};
