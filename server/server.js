const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const app = express();

app.post('/login', function(req, res) => {
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000'.
        clientId: 
        clientSecret: 
    })

    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    })
    //incase we bump into errors
    .catch(() => {
        res.sendStatus(400)
    })
})