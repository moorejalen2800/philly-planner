const { Schema, model} = require('mongoose')


const outingSchema = new Schema({
  dateTime: {
      type: String,
  },

  outingName: {
      type: String,
      required: true,
      trim: true,
  },
  
  createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtValue) => moment(createdAtValue).format('MMM DD, YYYY [at] hh:mm a')
  },
  
  restaurants: [
      {
          restaurantName: {
              type: String,
              required: true,
          },
          restaurantURL: {
              type: String,
          },
          restaurantLocation: {
              type: String,
          }
      }
  ]

  },
  {
  toJSON: {
      virtuals: true,
      getters: true
  },
  id: false
  }
);

  

const Outing = model('Outing', outingSchema);

module.exports = Outing;
