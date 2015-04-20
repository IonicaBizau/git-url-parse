// Dependencies
var GitUrlParse = require("../lib")
  , Assert = require("assert")
  ;

// Constants
const urls = {
    ssh: "git@github.com:IonicaBizau/node-giturlparse.git"
  , https: "https://github.com/IonicaBizau/node-giturlparse.git"
  , local: "/opt/git/project.git"
  , file: "file:///opt/git/project.git"
};

it("should parse ssh urls", function (cb) {
    var res = GitUrlParse(urls.ssh);
    Assert.strictEqual(res.protocol, "ssh");
    Assert.strictEqual(res.source, "github.com");
    Assert.strictEqual(res.owner, "IonicaBizau");
    Assert.strictEqual(res.name, "node-giturlparse");
    Assert.strictEqual(res._, urls.ssh);
    Assert.strictEqual(res.toString("https"), urls.https);
    cb();
});

it("should parse https urls", function (cb) {
    var res = GitUrlParse(urls.https);
    Assert.strictEqual(res.protocol, "https");
    Assert.strictEqual(res.source, "github.com");
    Assert.strictEqual(res.owner, "IonicaBizau");
    Assert.strictEqual(res.name, "node-giturlparse");
    Assert.strictEqual(res._, urls.https);
    Assert.strictEqual(res.toString("ssh"), urls.ssh);
    cb();
});

it("should parse https urls with ending slash", function (cb) {
    var res = GitUrlParse("https://github.com/IonicaBizau/node-giturlparse/");
    Assert.strictEqual(res.protocol, "https");
    Assert.strictEqual(res.source, "github.com");
    Assert.strictEqual(res.owner, "IonicaBizau");
    Assert.strictEqual(res.name, "node-giturlparse");
    Assert.strictEqual(res.toString("ssh"), urls.ssh);
    cb();
});
