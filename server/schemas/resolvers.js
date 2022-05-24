const { AuthenticationError } = require('apollo-server-express');
const { User, Outing } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
  Query: {
    user: async (parent, { name }) => {
      return User.findOne({ name }).populate('thoughts');
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
    login: async (parent, { email, password }) => {
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
    
    addRestaurant: async (parent, args) => {
      const outing = await Outing.create(args);
      return outing;
    },

    addRestaurant: async (parent, args) => {
      if (args.restaurant_name) {
        let restaurant = await Outing.findOneAndUpdate(
          args._id,
          { $add: { args.restaurant_name:  } },
          { new: true }
        );

      }
      
      let vote = await Matchup.findOneAndUpdate(
        args._id,
        { $inc: { [`tech${techNum}_votes`]: 1 } },
        { new: true }
      );
      return vote;
    },
  },
};

module.exports = resolvers;
