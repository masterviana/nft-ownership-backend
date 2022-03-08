const DiscordOauth2 = require("discord-oauth2");
const oauth = new DiscordOauth2();

oauth.tokenRequest({
	clientId: "947877511910527066",
	clientSecret: "TIUzojKikcBLMlzkgY7jO3rmsy36g5hJ",

	code: "query code",
	scope: "identify guilds",
	grantType: "authorization_code",
	
	redirectUri: "http://localhost:9000/callback",
}).then(console.log)
