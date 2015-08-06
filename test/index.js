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
    Assert.strictEqual(res.href, URLS.ssh);
    Assert.strictEqual(res.toString("https"), URLS.https);
    Assert.strictEqual(res.toString("git+ssh"), URLS.gitSsh);
    Assert.strictEqual(res.toString("ssh"), URLS.ssh);
    cb();
});

// HTTPS urls
it("should parse https urls", function (cb) {
    var res = GitUrlParse(URLS.https);
    Assert.strictEqual(res.protocol, "https");
    Assert.strictEqual(res.source, "github.com");
    Assert.strictEqual(res.owner, "IonicaBizau");
    Assert.strictEqual(res.name, "node-giturlparse");
    Assert.strictEqual(res.href, URLS.https);
    Assert.strictEqual(res.toString("https"), URLS.https);
    Assert.strictEqual(res.toString("git+ssh"), URLS.gitSsh);
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
    Assert.strictEqual(res.toString("https"), URLS.https);
    Assert.strictEqual(res.toString("git+ssh"), URLS.gitSsh);
    Assert.strictEqual(res.toString("ssh"), URLS.ssh);
    cb();
});

// git+ssh protocol
it("should parse git+ssh urls", function (cb) {
    var res = GitUrlParse(URLS.gitSsh);
    Assert.strictEqual(res.protocol, "ssh");
    Assert.strictEqual(res.source, "github.com");
    Assert.strictEqual(res.owner, "IonicaBizau");
    Assert.strictEqual(res.name, "node-giturlparse");
    Assert.strictEqual(res.toString("https"), URLS.https);
    Assert.strictEqual(res.toString("git+ssh"), URLS.gitSsh);
    Assert.strictEqual(res.toString("ssh"), URLS.ssh);
    cb();
});

// oauth
it("should parse oauth urls", function (cb) {
    var res = GitUrlParse("https://token:x-oauth-basic@github.com/owner/name.git");
    Assert.strictEqual(res.source, "github.com");
    Assert.strictEqual(res.owner, "owner");
    Assert.strictEqual(res.name, "name");
    cb();
});

// oauth bitbucket
it("should parse Bitbucket oauth urls", function (cb) {
    var res = GitUrlParse("https://x-token-auth:token@bitbucket.org/owner/name.git");
    Assert.strictEqual(res.source, "bitbucket.org");
    Assert.strictEqual(res.owner, "owner");
    Assert.strictEqual(res.name, "name");
    cb();
});

// https bitbucket
it("should parse Bitbucket https urls", function (cb) {
    var res = GitUrlParse("https://owner@bitbucket.org/owner/name");
    Assert.strictEqual(res.source, "bitbucket.org");
    Assert.strictEqual(res.owner, "owner");
    Assert.strictEqual(res.name, "name");
    cb();
});

// https cloudforge
it("should parse CloudForge urls", function (cb) {
    var res = GitUrlParse("https://owner@organization.git.cloudforge.com/name.git");
    Assert.strictEqual(res.source, "cloudforge.com");
    Assert.strictEqual(res.owner, "owner");
    Assert.strictEqual(res.organization, "organization");
    Assert.strictEqual(res.name, "name");
    cb();
});
