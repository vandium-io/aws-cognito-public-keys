const { expect } = require( 'chai' );

const sinon = require( 'sinon' );

const rewiremock = require( 'rewiremock/node' );

const awsSampleData = {
    "keys": [{
        "alg": "RS256",
        "e": "AQAB",
        "kid": "abcdefghijklmnopqrsexample=",
        "kty": "RSA",
        "n": "lsjhglskjhgslkjgh43lj5h34lkjh34lkjht3example",
        "use": "sig"
    }, {
        "alg":
        "RS256",
        "e": "AQAB",
        "kid": "fgjhlkhjlkhexample=",
        "kty": "RSA",
        "n": "sgjhlk6jp98ugp98up34hpexample",
        "use": "sig"
    }]
};

describe( 'get-keys', function() {

  let getKeys;

  let httpsAsyncStub;

  beforeEach( () => {

    httpsAsyncStub = sinon.stub();

    getKeys = rewiremock.proxy( '../get-keys', {
      '../async-https':  httpsAsyncStub
    });
  });

  describe( 'getKeys()', function() {

    it( 'normal operation', async () => {

      httpsAsyncStub.returns( Promise.resolve( JSON.stringify(awsSampleData) ));

      const result = await getKeys( 'my-pool', 'us-whatever-1' );

      expect( result ).to.eql( {

        'abcdefghijklmnopqrsexample=': awsSampleData.keys[0],
        'fgjhlkhjlkhexample=': awsSampleData.keys[1]
      });

      expect( httpsAsyncStub.firstCall.args[0] ).to.eql({

        hostname: 'cognito-idp.us-whatever-1.amazonaws.com',
        path: '/my-pool/.well-known/jwks.json',
        port: 443,
        method: 'GET'
      });
    });
  });
});
