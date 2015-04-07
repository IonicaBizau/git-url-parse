// Dependencies
var GitUrlParse = require("../lib");

// Constants
const urls = {
    ssh: "git@github.com:IonicaBizau/node-giturlparse.git"
  , https: "https://github.com/IonicaBizau/node-giturlparse.git"
  , local: "/opt/git/project.git"
  , file: "file:///opt/git/project.git"
};

// Parse
console.log(GitUrlParse(urls.ssh));
console.log(GitUrlParse(urls.https));
console.log(GitUrlParse(urls.local));
console.log(GitUrlParse(urls.file));

// Stringify
console.log(GitUrlParse(urls.ssh).toString("http"));
console.log(GitUrlParse(urls.ssh).toString("https"));
console.log(GitUrlParse(urls.https).toString("ssh"));
