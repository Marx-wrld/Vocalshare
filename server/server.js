const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const app = express();

app.post('/login', (req, res) => {
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000'.
        clientId: '8b945ef10ea24755b83ac50cede405a0',
        clientSecret: 'a77f115b3c6f4a69b9dabe787460861' 
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