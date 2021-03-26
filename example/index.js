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
//   filepathtype: 'blob',
//   filepath: 'test/index.js',
//   full_name: 'IonicaBizau/git-url-parse' }

console.log(GitUrlParse("https://github.com/IonicaBizau/node-git-url-parse.git").toString("ssh"));
// => "git@github.com:IonicaBizau/node-git-url-parse.git"

console.log(GitUrlParse("git@github.com:IonicaBizau/node-git-url-parse.git").toString("https"));
// => "https://github.com/IonicaBizau/node-git-url-parse.git"

console.log(GitUrlParse("https://bitbucket.company.tld/scm/~oleg.andreyev/my-project.git"));
// {
//     protocols: [ 'https' ],
//     protocol: 'https',
//     port: null,
//     resource: 'bitbucket.company.tld',
//     user: '',
//     pathname: '/scm/~oleg.andreyev/my-project.git',
//     hash: '',
//     search: '',
//     href: 'https://bitbucket.company.tld/scm/~oleg.andreyev/my-project.git',
//     query: {},
//     token: '',
//     source: 'bitbucket-server',
//     git_suffix: true,
//     name: 'my-project',
//     owner: 'oleg.andreyev',
//     commit: undefined,
//     ref: '',
//     filepathtype: '',
//     filepath: '',
//     organization: 'oleg.andreyev',
//     full_name: 'oleg.andreyev/my-project'
// }

console.log(GitUrlParse("ssh://git@bitbucket.company.tld/~oleg.andreyev/my-project.git"));
// {
//     protocols: [ 'ssh' ],
//     protocol: 'ssh',
//     port: null,
//     resource: 'bitbucket.company.tld',
//     user: 'git',
//     pathname: '/~oleg.andreyev/my-project.git',
//     hash: '',
//     search: '',
//     href: 'ssh://git@bitbucket.company.tld/~oleg.andreyev/my-project.git',
//     query: {},
//     token: '',
//     source: 'bitbucket-server',
//     git_suffix: true,
//     name: 'my-project',
//     owner: 'oleg.andreyev',
//     commit: undefined,
//     ref: '',
//     filepathtype: '',
//     filepath: '',
//     organization: 'oleg.andreyev',
//     full_name: 'oleg.andreyev/my-project'
// }

console.log(GitUrlParse('ssh://git@bitbucket.ecentria.tools/opc/my-project.git'));
// {
//     protocols: [ 'ssh' ],
//     protocol: 'ssh',
//     port: null,
//     resource: 'bitbucket.company.tld',
//     user: 'git',
//     pathname: '/opc/my-project.git',
//     hash: '',
//     search: '',
//     href: 'ssh://git@bitbucket.company.tld/opc/my-project.git',
//     query: {},
//     token: '',
//     source: 'ecentria.tools',
//     git_suffix: true,
//     name: 'my-project',
//     owner: 'opc',
//     commit: undefined,
//     ref: '',
//     filepathtype: '',
//     filepath: '',
//     organization: 'opc',
//     full_name: 'opc/my-project'
// }
console.log(GitUrlParse('https://bitbucket.company.tld/scm/opc/my-project.git'));
// {
//     protocols: [ 'https' ],
//     protocol: 'https',
//     port: null,
//     resource: 'bitbucket.company.tld',
//     user: '',
//     pathname: '/scm/opc/my-project.git',
//     hash: '',
//     search: '',
//     href: 'https://bitbucket.company.tld/scm/opc/my-project.git',
//     query: {},
//     token: '',
//     source: 'bitbucket-server',
//     git_suffix: true,
//     name: 'my-project',
//     owner: 'opc',
//     commit: undefined,
//     ref: '',
//     filepathtype: '',
//     filepath: '',
//     organization: 'opc',
//     full_name: 'opc/my-project'
// }
