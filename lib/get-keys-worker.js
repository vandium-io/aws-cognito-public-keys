const getKeys = require( './get-keys' );

function init() {

  return async ( { userPoolId, region = process.env.AWS_REGION } ) => {

    return getKeys( userPoolId, region );
  }
}

module.exports = init;
