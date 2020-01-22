const rpc = require('sync-rpc');

const getKeysSyncClient = rpc( __dirname + '/get-keys-worker.js', 'keys-worker' );

function getKeysSync( userPoolId, region = process.env.AWS_REGION ) {

  return getKeysSyncClient( { userPoolId, region } );
}

module.exports = getKeysSync;
