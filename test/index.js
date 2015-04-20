// Dependencies
var GitUrlParse = require("../lib")
  , Assert = require("assert")
  ;

// Constants
const URLS = {
    ssh: "git@github.com:IonicaBizau/node-giturlparse.git"
  , https: "https://github.com/IonicaBizau/node-giturlparse.git"
  , gitSsh: "git+ssh://git@github.com/IonicaBizau/node-giturlparse.git"
};

// SSH urls
it("should parse ssh urls", function (cb) {
    var res = GitUrlParse(URLS.ssh);
    Assert.strictEqual(res.protocol, "ssh");
    Assert.strictEqual(res.source, "github.com");
    Assert.strictEqual(res.owner, "IonicaBizau");
    Assert.strictEqual(res.name, "node-giturlparse");
    Assert.strictEqual(res._, URLS.ssh);
    Assert.strictEqual(res.toString("https"), URLS.https);
    cb();
});

// HTTPS urls
it("should parse https urls", function (cb) {
    var res = GitUrlParse(URLS.https);
    Assert.strictEqual(res.protocol, "https");
    Assert.strictEqual(res.source, "github.com");
    Assert.strictEqual(res.owner, "IonicaBizau");
    Assert.strictEqual(res.name, "node-giturlparse");
    Assert.strictEqual(res._, URLS.https);
    Assert.strictEqual(res.toString("ssh"), URLS.ssh);
    cb();
});

// HTTPS with ending slash
it("should parse https urls with ending slash", function (cb) {
    var res = GitUrlParse("https://github.com/IonicaBizau/node-giturlparse/");
    Assert.strictEqual(res.protocol, "https");
    Assert.strictEqual(res.source, "github.com");
    Assert.strictEqual(res.owner, "IonicaBizau");
    Assert.strictEqual(res.name, "node-giturlparse");
    Assert.strictEqual(res.toString("ssh"), URLS.ssh);
    cb();
});

// HTTPS with ending slash
it("should parse git+ssh urls", function (cb) {
    var res = GitUrlParse(URLS.gitSsh);
    Assert.strictEqual(res.protocol, "git+ssh");
    Assert.strictEqual(res.source, "github.com");
    Assert.strictEqual(res.owner, "IonicaBizau");
    Assert.strictEqual(res.name, "node-giturlparse");
    Assert.strictEqual(res.toString("ssh"), URLS.ssh);
    Assert.strictEqual(res.toString("https"), URLS.https);
    cb();
});
