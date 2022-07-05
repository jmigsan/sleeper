const asyncHandler = require("express-async-handler");

const test = asyncHandler(async (req, res) => {
  try {
    res.status(200).json('yo');
  } 
  
  catch (err) {
    throw new Error(err);
  }

});

module.exports = {
  test,
};