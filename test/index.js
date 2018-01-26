// Dependencies
const gitUrlParse = require("..")
    , tester = require("tester")
    ;

// Constants
const URLS = {
    ssh: "git@github.com:IonicaBizau/git-url-parse"
  , https: "https://github.com/IonicaBizau/git-url-parse"
  , ftp: "ftp://github.com/IonicaBizau/git-url-parse"
  , ftps: "ftps://github.com/IonicaBizau/git-url-parse"
  , gitSsh: "git+ssh://git@github.com/IonicaBizau/git-url-parse"
  , ref: "https://github.com/IonicaBizau/git-url-parse/blob/master/test/index.js"
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

        res.git_suffix = true
        test.expect(res.toString("https")).toBe(URLS.https + ".git");
        test.expect(res.toString("git+ssh")).toBe(URLS.gitSsh + ".git");
        test.expect(res.toString("ssh")).toBe(URLS.ssh + ".git");
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

    // https visual studio team services
    test.should("parse Visual Studio Team Services urls", () => {
        var res = gitUrlParse("https://companyname.visualstudio.com/_git/MyProject");
        test.expect(res.source).toBe("visualstudio.com");
        test.expect(res.owner).toBe("MyProject");
        test.expect(res.name).toBe("MyProject");

        res = gitUrlParse("https://companyname.visualstudio.com/MyProject/_git/MyRepo");
        test.expect(res.source).toBe("visualstudio.com");
        test.expect(res.owner).toBe("MyProject");
        test.expect(res.name).toBe("MyRepo");

        // Handle repositories and projects with spaces in the name
        res = gitUrlParse("https://companyname.visualstudio.com/My%20Project/_git/My%20Repo");
        test.expect(res.source).toBe("visualstudio.com");
        test.expect(res.owner).toBe("My Project");
        test.expect(res.name).toBe("My Repo");
    });

    // ref and filepath urls
    test.should("parse ref/filepath urls", () => {
        var res = gitUrlParse(URLS.ref);
        test.expect(res.protocol).toBe("https");
        test.expect(res.source).toBe("github.com");
        test.expect(res.owner).toBe("IonicaBizau");
        test.expect(res.name).toBe("git-url-parse");
        test.expect(res.href).toBe(URLS.ref);
        test.expect(res.ref).toBe("master");
        test.expect(res.filepathtype).toBe("blob");
        test.expect(res.filepath).toBe("test/index.js");
    });

    test.should("parse subdomains", () => {
        var res = gitUrlParse("https://gist.github.com/owner/id");
        test.expect(res.source).toBe("github.com");
        test.expect(res.resource).toBe("gist.github.com");
        test.expect(res.owner).toBe("owner");
        test.expect(res.name).toBe("id");
        test.expect(res.toString()).toBe("https://gist.github.com/owner/id");

        res = gitUrlParse("https://gist.github.com/id");
        test.expect(res.source).toBe("github.com");
        test.expect(res.resource).toBe("gist.github.com");
        test.expect(res.owner).toBe("");
        test.expect(res.name).toBe("id");
        test.expect(res.toString()).toBe("https://gist.github.com/id");
    });

    test.should("stringify token", () => {
        var res = gitUrlParse("https://github.com/owner/name.git");
        res.token = "token";
        test.expect(res.toString()).toBe("https://token@github.com/owner/name");

        var res = gitUrlParse("https://owner@bitbucket.org/owner/name");
        res.token = "token";
        test.expect(res.toString()).toBe("https://x-token-auth:token@bitbucket.org/owner/name");

        var res = gitUrlParse("git@github.com:owner/name");
        res.port = 22;
        test.expect(res.toString()).toBe("ssh://git@github.com:22/owner/name");

        var res = gitUrlParse("user@github.com:owner/name.git");
        test.expect(res.toString()).toBe("user@github.com:owner/name");

        var res = gitUrlParse("git@github.com:owner/name.git");
        res.port = 22;
        res.user = "user";
        test.expect(res.toString()).toBe("ssh://user@github.com:22/owner/name");

        var res = gitUrlParse("git+ssh://git@github.com/owner/name.git");
        res.port = 22;
        res.user = "user";
        test.expect(res.toString()).toBe("git+ssh://user@github.com:22/owner/name");
    });
});
