const { Schema, model} = require('mongoose')


const outtingSchema = new Schema({
  location: {
      type: String,
      required: true
     
  },
  createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtValue) => moment(createdAtValue).format('MMM DD, YYYY [at] hh:mm a')
  },
  username: {
      type: String,
      required: true
  },
  choices: [outtingSchema]
  },
  {
  toJSON: {
      virtuals: true,
      getters: true
  },
  id: false
  }
);

  

const Outting = model('Outting', outtingSchema);

module.exports = Outting;
