const https = require( 'https' )

async function httpsRequest( params ) {

  return new Promise( ( resolve, reject ) => {

    const req = https.request (params, ( res ) => {

      // reject on bad status
      if (res.statusCode < 200 || res.statusCode >= 300) {

          return reject( new Error( 'statusCode=' + res.statusCode ) );
      }

      const body = [];

      res.on( 'data', (chunk) => body.push(chunk) );

      res.on( 'end', () => {

        try {

          resolve( Buffer.concat( body ).toString() );
        }
        catch( err ) {

          reject( err );
        }
      });
    });

    // reject on request error
    req.on('error', reject );

    req.end();
  });
}

// export default
module.exports = httpsRequest;
