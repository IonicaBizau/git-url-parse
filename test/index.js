// Dependencies
const gitUrlParse = require("..")
    , tester = require("tester")
    ;

// Constants
const URLS = {
    ssh: "git@github.com:IonicaBizau/git-url-parse.git"
  , https: "https://github.com/IonicaBizau/git-url-parse.git"
  , ftp: "ftp://github.com/IonicaBizau/git-url-parse"
  , ftps: "ftps://github.com/IonicaBizau/git-url-parse"
  , gitSsh: "git+ssh://git@github.com/IonicaBizau/git-url-parse.git"
};

tester.describe("parse urls", test => {

    // SSH urls
    test.should("parse ssh urls", () => {
        var res = gitUrlParse(URLS.ssh);
        test.expect(res.protocol).toBe("ssh");
        test.expect(res.source).toBe("github.com");
        test.expect(res.owner).toBe("IonicaBizau");
        test.expect(res.name).toBe("git-url-parse");
        test.expect(res.full_name).toBe("IonicaBizau/git-url-parse");
        test.expect(res.href).toBe(URLS.ssh);
        test.expect(res.toString("https")).toBe(URLS.https);
        test.expect(res.toString("git+ssh")).toBe(URLS.gitSsh);
        test.expect(res.toString("ssh")).toBe(URLS.ssh);
    });

    // FTP urls
    test.should("parse ftp urls", () => {
        var res = gitUrlParse(URLS.ftp);
        test.expect(res.protocol).toBe("ftp");
        test.expect(res.source).toBe("github.com");
        test.expect(res.owner).toBe("IonicaBizau");
        test.expect(res.name).toBe("git-url-parse");
        test.expect(res.href).toBe(URLS.ftp);
        test.expect(res.toString("https")).toBe(URLS.https);
        test.expect(res.toString("git+ssh")).toBe(URLS.gitSsh);
        test.expect(res.toString("ssh")).toBe(URLS.ssh);
    });

    // FTPS urls
    test.should("parse ftps urls", () => {
        var res = gitUrlParse(URLS.ftps);
        test.expect(res.protocol).toBe("ftps");
        test.expect(res.source).toBe("github.com");
        test.expect(res.owner).toBe("IonicaBizau");
        test.expect(res.name).toBe("git-url-parse");
        test.expect(res.href).toBe(URLS.ftps);
        test.expect(res.toString("https")).toBe(URLS.https);
        test.expect(res.toString("git+ssh")).toBe(URLS.gitSsh);
        test.expect(res.toString("ssh")).toBe(URLS.ssh);
    });

    // HTTPS urls
    test.should("parse https urls", () => {
        var res = gitUrlParse(URLS.https);
        test.expect(res.protocol).toBe("https");
        test.expect(res.source).toBe("github.com");
        test.expect(res.owner).toBe("IonicaBizau");
        test.expect(res.name).toBe("git-url-parse");
        test.expect(res.href).toBe(URLS.https);
        test.expect(res.toString("https")).toBe(URLS.https);
        test.expect(res.toString("git+ssh")).toBe(URLS.gitSsh);
        test.expect(res.toString("ssh")).toBe(URLS.ssh);
    });

    // HTTPS with ending slash
    test.should("parse https urls with ending slash", () => {
        var res = gitUrlParse("https://github.com/IonicaBizau/git-url-parse/");
        test.expect(res.protocol).toBe("https");
        test.expect(res.source).toBe("github.com");
        test.expect(res.owner).toBe("IonicaBizau");
        test.expect(res.name).toBe("git-url-parse");
        test.expect(res.toString("https")).toBe(URLS.https);
        test.expect(res.toString("git+ssh")).toBe(URLS.gitSsh);
        test.expect(res.toString("ssh")).toBe(URLS.ssh);
    });

    // git+ssh protocol
    test.should("parse git+ssh urls", () => {
        var res = gitUrlParse(URLS.gitSsh);
        test.expect(res.protocol).toBe("ssh");
        test.expect(res.source).toBe("github.com");
        test.expect(res.owner).toBe("IonicaBizau");
        test.expect(res.name).toBe("git-url-parse");
        test.expect(res.toString("https")).toBe(URLS.https);
        test.expect(res.toString("git+ssh")).toBe(URLS.gitSsh);
        test.expect(res.toString("ssh")).toBe(URLS.ssh);
    });

    // oauth
    test.should("parse oauth urls", () => {
        var res = gitUrlParse("https://token:x-oauth-basic@github.com/owner/name.git");
        test.expect(res.source).toBe("github.com");
        test.expect(res.owner).toBe("owner");
        test.expect(res.name).toBe("name");
    });

    // oauth bitbucket
    test.should("parse Bitbucket oauth urls", () => {
        var res = gitUrlParse("https://x-token-auth:token@bitbucket.org/owner/name.git");
        test.expect(res.source).toBe("bitbucket.org");
        test.expect(res.owner).toBe("owner");
        test.expect(res.name).toBe("name");
    });

    // https bitbucket
    test.should("parse Bitbucket https urls", () => {
        var res = gitUrlParse("https://owner@bitbucket.org/owner/name");
        test.expect(res.source).toBe("bitbucket.org");
        test.expect(res.owner).toBe("owner");
        test.expect(res.name).toBe("name");
    });

    // https cloudforge
    test.should("parse CloudForge urls", () => {
        var res = gitUrlParse("https://owner@organization.git.cloudforge.com/name.git");
        test.expect(res.source).toBe("cloudforge.com");
        test.expect(res.owner).toBe("owner");
        test.expect(res.organization).toBe("organization");
        test.expect(res.name).toBe("name");
    });

    test.should("parse subdomains", () => {
        var res = gitUrlParse("https://gist.github.com/owner/id");
        test.expect(res.source).toBe("github.com");
        test.expect(res.resource).toBe("gist.github.com");
        test.expect(res.owner).toBe("owner");
        test.expect(res.name).toBe("id");
        test.expect(res.toString()).toBe("https://gist.github.com/owner/id.git");

        res = gitUrlParse("https://gist.github.com/id");
        test.expect(res.source).toBe("github.com");
        test.expect(res.resource).toBe("gist.github.com");
        test.expect(res.owner).toBe("");
        test.expect(res.name).toBe("id");
        test.expect(res.toString()).toBe("https://gist.github.com/id.git");
    });

    test.should("stringify token", () => {
        var res = gitUrlParse("https://github.com/owner/name.git");
        res.token = "token";
        test.expect(res.toString()).toBe("https://token@github.com/owner/name.git");

        var res = gitUrlParse("https://owner@bitbucket.org/owner/name");
        res.token = "token";
        test.expect(res.toString()).toBe("https://x-token-auth:token@bitbucket.org/owner/name.git");

        var res = gitUrlParse("git@github.com:owner/name.git");
        res.port = 22;
        test.expect(res.toString()).toBe("ssh://git@github.com:22/owner/name.git");

        var res = gitUrlParse("user@github.com:owner/name.git");
        test.expect(res.toString()).toBe("user@github.com:owner/name.git");

        var res = gitUrlParse("git@github.com:owner/name.git");
        res.port = 22;
        res.user = "user";
        test.expect(res.toString()).toBe("ssh://user@github.com:22/owner/name.git");

        var res = gitUrlParse("git+ssh://git@github.com/owner/name.git");
        res.port = 22;
        res.user = "user";
        test.expect(res.toString()).toBe("git+ssh://user@github.com:22/owner/name.git");
    });
});
