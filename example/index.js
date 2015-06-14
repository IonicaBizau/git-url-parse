// Dependencies
var GitUrlParse = require("../lib");

console.log(GitUrlParse("git@github.com:IonicaBizau/node-git-url-parse.git"));
// => { protocol: 'ssh'
//    , source: 'github.com'
//    , owner: 'IonicaBizau'
//    , name: 'node-git-url-parse'
//    , _: 'git@github.com:IonicaBizau/node-git-url-parse.git'
//    , toString: [Function] }

console.log(GitUrlParse("https://github.com/IonicaBizau/node-git-url-parse.git"));
// => { protocol: 'https'
//    , source: 'github.com'
//    , owner: 'IonicaBizau'
//    , name: 'node-git-url-parse'
//    , _: 'https://github.com/IonicaBizau/node-git-url-parse.git'
//    , toString: [Function] }

console.log(GitUrlParse("https://github.com/IonicaBizau/node-git-url-parse.git").toString("ssh"));
// => 'git@github.com:IonicaBizau/node-git-url-parse.git.git'

console.log(GitUrlParse("git@github.com:IonicaBizau/node-git-url-parse.git").toString("https"));
// => 'https://github.com/IonicaBizau/node-git-url-parse.git'
