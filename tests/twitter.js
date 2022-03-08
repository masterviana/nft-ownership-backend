

// https://github.com/plhery/node-twitter-api-v2/blob/HEAD/doc/auth.md

const TWITTER_CONSUMER_KEY="Robaa3okbCmUHv67QuSyQgpEu"
const TWITTER_CONSUMER_SECRET="hdbZt0XQo5le6YNiy9D7Ex1CnbfbUdLA0pEJeTDNlwARVvNSPy"
const TWITTER_CALLBACK="http://127.0.0.1:9000/"


// twitter app callback tokens :  {
//     oauth_token: 'TT-1BQAAAAABZqZuAAABf02c5Xg',
//     oauth_verifier: '8Xg1aWJ0XrGUHPCLqGHQArmrYshlEMgl',
//     tokenSecret: 'X3eyCJ9qUZrTzuI9tb40gQ7COIk8v3Gc'
//   }

const {TwitterApi} = require('twitter-api-v2');




let getAuthLink = async function()
{
    let client = new TwitterApi({ appKey: TWITTER_CONSUMER_KEY, appSecret: TWITTER_CONSUMER_SECRET });

    const authLink = await client.generateAuthLink(TWITTER_CALLBACK, { linkMode: 'authorize' });
    return authLink;
}

/** oauth authenticate 
 * 
 *  https://github.com/plhery/node-twitter-api-v2/blob/HEAD/doc/auth.md#create-the-auth-link
 */
async function  runAuth(){
    let a = await getAuthLink();
    console.log('Result ', a)
}

async function persistent(){

    let oauth_token = 'O0hZZQAAAAABZqZuAAABf025arU'
    let oauth_token_secret = '3I12bMD4y4GLZhmmfvDhuRRspDCE1D8a'
    let oauth_verifier = 'tnLxuHgIW51kVkJdEkAf1DDHx3LdOxMh'

    const client = new TwitterApi({
        appKey: TWITTER_CONSUMER_KEY,
        appSecret: TWITTER_CONSUMER_SECRET,
        accessToken: oauth_token,
        accessSecret: oauth_token_secret,
    });

    client.login(oauth_verifier)
    .then(({ client: loggedClient, accessToken, accessSecret }) => {
      // loggedClient is an authenticated client in behalf of some user
      // Store accessToken & accessSecret somewhere
      console.log('access token ; ',accessToken );
      console.log('accessSecret token ; ',accessSecret );
      console.log('login client ',  loggedClient);

    })
    .catch((ex) => console.log('error logon ', ex) );

}


/**
 * 
 * user context authenticate 
 * https://github.com/plhery/node-twitter-api-v2/blob/HEAD/doc/auth.md#oauth2-user-wide-authentication-flow
 * 
 */
let getUserScopeLink = async function()
{
    const client = new TwitterApi({ clientId: 'MUJUZ2hNTGRQVElPNzJtVThyaW06MTpjaQ', clientSecret: 'VeNljXz1HLXuINlU9fvQOssMh6fqGHzuZpRTC3Im5BAoastCYk' });

    const { url, codeVerifier, state } = client.generateOAuth2AuthLink(TWITTER_CALLBACK, { scope: ['tweet.read', 'users.read', 'follows.read', 'offline.access'] });
    console.log('URL  : ', url )
    console.log('codeVerifier :   ', codeVerifier )
    console.log('state  ', state )

}

/**
 * 
 * https://github.com/plhery/node-twitter-api-v2/blob/HEAD/doc/auth.md#collect-returned-auth-codes-and-get-access-token
 * state=2jJ-xGzIFd3Rr19jAgYuX9OqIik2M7KF&code=T3lJTUtnb2VfemhFUU12WmtxYjhYZ1hPS21HbVpETzY2NGl2OVRZUk9GZ1lKOjE2NDYyNzcwNzY4MDc6MToxOmFjOjE

 */
let userOauth2Token = async function()
{
    let state = 'LjZtKHtdb2_y3H0xwTAuNn8pgxN3b~gZ'
    let code = 'ZFhVWjd5Wm1RTGdPcXZmVUFkREhVdlRySnlteE1lUTR1V2lkQTlGWkF4VVEwOjE2NDYzMDAwMDk5NDQ6MToxOmFjOjE'
    let codeVerifier = 'q.OrjUmE0a1UaRaDLyWUdNSZDXffj1iOc-g0L3mhSKCrqjfWbrD5B9IXV-e11lGZlVqjS54IIK3Eem~g3PKsZVirh~22sX_PeFa-c24oIrCJV2c-fkdWCFbZK~FMFyuL'

    const client = new TwitterApi({ clientId: 'MUJUZ2hNTGRQVElPNzJtVThyaW06MTpjaQ', clientSecret: 'VeNljXz1HLXuINlU9fvQOssMh6fqGHzuZpRTC3Im5BAoastCYk' });


    client.loginWithOAuth2({ code, codeVerifier, redirectUri: TWITTER_CALLBACK })
    .then( async ({ client: loggedClient, accessToken, refreshToken, expiresIn }) => {
      // {loggedClient} is an authenticated client in behalf of some user
      // Store {accessToken} somewhere, it will be valid until {expiresIn} is hit.
      // If you want to refresh your token later, store {refreshToken} (it is present if 'offline.access' has been given as scope)
       
      console.log('accessToken : ', accessToken);
      console.log('refreshToken : ', refreshToken);

      // Example request
      const { data: userObject } = await loggedClient.v2.me();
      console.log('user data : ', userObject );

     



    })
    .catch((ex) => console.log('error getting user info ',ex ) );

}


// runAuth();
// persistent()

//getUserScopeLink()
 userOauth2Token()
