const { AuthenticationError } = require('apollo-server-express');
const { User, Outing } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
  Query: {
    user: async (parent, { name }) => {
      return User.findOne({ name }).populate('outings');
    },
    outings: async (parent, { name }) => {
      const params = name ? { name } : {};
      return Outing.find(params).sort({created_at: -1});
    },
    outing: async (parent, { outingId }) => {
      return Outing.findOne({_id: outingId})
    }

  },
  Mutation: {
    addUser: async (parent, { name, email, password }) => {
      const user = await User.create({ name, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { name, email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    
    addOuting: async (parent, { dateTime, outingName, outingCreator }) => {
      const outing = await Outing.create({ dateTime, outingName, outingCreator });

      await User.findOneAndUpdate(
        {name: outingCreator},
        { $addToSet: { outings: outing._id }}
      )
      return outing;
    },

    addRestaurant: async (parent, { outingId, restaurantName, restaurantURL, restaurantLocation }) => {
      console.log(outingId);
      console.log(restaurantName);
      return Outing.findOneAndUpdate(
        { _id : outingId},
        { $addToSet: { restaurants: { restaurantName, restaurantURL, restaurantLocation } } },
        { new: true, runValidators: true, }
      );
    },

    removeOuting: async (parent, { outingId }) => {
      return Outing.findOneAndDelete({ _id: outingId });
    },

    removeRestaurant: async (parent, { outingId, restaurantId }) => {
      return Outing.findOneAndUpdate(
        { _id : outingId},
        { $pull: { restaurants: { _id: restaurantId } }},
        { new: true }
      );
    }
  },
};

module.exports = resolvers;
