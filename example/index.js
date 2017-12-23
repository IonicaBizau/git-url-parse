// Dependencies
const GitUrlParse = require("../lib");

console.log(GitUrlParse("git@github.com:IonicaBizau/node-git-url-parse.git"));
// => {
//     protocols: []
//   , port: null
//   , resource: "github.com"
//   , user: "git"
//   , pathname: "/IonicaBizau/node-git-url-parse.git"
//   , hash: ""
//   , search: ""
//   , href: "git@github.com:IonicaBizau/node-git-url-parse.git"
//   , token: ""
//   , protocol: "ssh"
//   , toString: [Function]
//   , source: "github.com"
//   , name: "node-git-url-parse"
//   , owner: "IonicaBizau"
// }

console.log(GitUrlParse("https://github.com/IonicaBizau/node-git-url-parse.git"));
// => {
//     protocols: ["https"]
//   , port: null
//   , resource: "github.com"
//   , user: ""
//   , pathname: "/IonicaBizau/node-git-url-parse.git"
//   , hash: ""
//   , search: ""
//   , href: "https://github.com/IonicaBizau/node-git-url-parse.git"
//   , token: ""
//   , protocol: "https"
//   , toString: [Function]
//   , source: "github.com"
//   , name: "node-git-url-parse"
//   , owner: "IonicaBizau"
// }

console.log(GitUrlParse("https://github.com/IonicaBizau/git-url-parse/blob/master/test/index.js"));
// { protocols: [ 'https' ],
//   protocol: 'https',
//   port: null,
//   resource: 'github.com',
//   user: '',
//   pathname: '/IonicaBizau/git-url-parse/blob/master/test/index.js',
//   hash: '',
//   search: '',
//   href: 'https://github.com/IonicaBizau/git-url-parse/blob/master/test/index.js',
//   token: '',
//   toString: [Function],
//   source: 'github.com',
//   name: 'git-url-parse',
//   owner: 'IonicaBizau',
//   organization: '',
//   ref: 'master',
//   filepath: 'test/index.js',
//   full_name: 'IonicaBizau/git-url-parse' }

console.log(GitUrlParse("https://github.com/IonicaBizau/node-git-url-parse.git").toString("ssh"));
// => "git@github.com:IonicaBizau/node-git-url-parse.git"

console.log(GitUrlParse("git@github.com:IonicaBizau/node-git-url-parse.git").toString("https"));
// => "https://github.com/IonicaBizau/node-git-url-parse.git"
