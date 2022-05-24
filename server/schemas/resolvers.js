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
    
    
    createMatchup: async (parent, args) => {
      const matchup = await Matchup.create(args);
      return matchup;
    },
    createVote: async (parent, { _id, techNum }) => {
      const vote = await Matchup.findOneAndUpdate(
        { _id },
        { $inc: { [`tech${techNum}_votes`]: 1 } },
        { new: true }
      );
      return vote;
    },
  },
};

module.exports = resolvers;
