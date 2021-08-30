# COBRA

- [COBRA](#cobra)
  - [About](#about)
  - [WARNING](#warning)
  - [Setup](#setup)
  - [Running](#running)
  - [Feature Timeline](#feature-timeline)
    - [Main](#main)
    - [Other](#other)
  - [Schema](#schema)


## About
(More info coming later)

Puts basic obfuscation infront of nginx with passwords or long stream keys.

Allows stream keys to be scoped and expire by date/time for easier collaboration with 3rd parties.

Neat admin interface for managing keys.

GraphQL data interface for Nginx RTMP module (polls stat page ever second and sends updates over gql subscriptions)

Split from old Monorepo into separate client and software (too many headaches with browser security in development)

client software auth done by checking cookies for cookie "token" containing jwt with the data form {..., perms: [{..., name: "SuperUser"}]}
## WARNING

The "passwords" for the streamkeys might be sent from clients over the insecure rtmp and should be treated as such! Please do not use an actual password as they can also be viewed by the admin pannel. The "passwords" are only to provide a layer more complexity to people trying to brute force onto a streaming server.

Similarly with the admin interface, this does not natively support https yet so traffic sent will be insecure! We suggest using a reverse proxy from an SSL enabled nginx server on a secure network for now.

Finally this is very alpha software right now, more development is intended but use in production at your own risk.

## Setup
Requires yarn

Modify nginx config...(more details later)

send nginx rtmp on_publish to {address}/key-check

stream should go to rtmp://{nginx_address}:1935/{application}/{streamkey}?pwd={password}

## Running
Be sure to set the environment variables in both the root of the project and in the client folder (the latter especially if you are running a live dev copy)

`yarn start` - launches compiled server

`yarn build` - builds server

---

`yarn dev` - launches both client and server interactively

`yarn lint`

`yarn generate` - generates prisma client and graphql to ts types based on the respective schemas

---

`npx prisma migrate deploy` - creates a new blank sqlite DB with all tables or updates your old cobra table to a newer schema

This site uses jwt cookies which are assumed to be from the same domain this is being run on. To get this to work for development so your browser actually sends the cookies:
* modify your hosts file

to make safari work on mac
* run `openssl req -nodes -new -x509 -keyout certs/server.key -out certs/server.cert`
* import the item into Keychain Access
* go to info for the cert, and in the trust dropdown set to always
* close keychain access and refresh



## Feature Timeline
### Main
- [x] Milestone 1 - streamkeys
- [ ] Milestone 2 - ffmpeg forwarding to RTMP (SRT, Icecast)
- [ ] Milestone 3 - ASP & BOA support

### Other
- [x] SRT support via SLS
- [ ] Playback authentication
- [ ] Setup guide
- [ ] NGINX RTMP control module support
- [ ] Other database support