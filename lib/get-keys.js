const httpsAsync = require( './async-https' );

const PORT = 443;

const METHOD = 'GET';

async function getKeys( userPoolId, region = process.env.AWS_REGION ) {

  // from https://aws.amazon.com/premiumsupport/knowledge-center/decode-verify-cognito-json-token/
  const hostname = `cognito-idp.${region}.amazonaws.com`;

  const path = `/${userPoolId}/.well-known/jwks.json`;

  const result = await httpsAsync( { hostname, path, port: PORT, method: METHOD } );

  const { keys } = JSON.parse( result );

  return keys.reduce( (keyMap, key ) => { keyMap[ key.kid ] = key; return keyMap }, {} );
}

// export default
module.exports = getKeys;
