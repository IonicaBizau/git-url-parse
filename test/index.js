// Dependencies
const gitUrlParse = require("..")
    , tester = require("tester")
    ;

// Constants
const URLS = {
    ssh: "git@github.com:42IonicaBizau/git-url-parse"
  , https: "https://github.com/42IonicaBizau/git-url-parse"
  , ftp: "ftp://github.com/42IonicaBizau/git-url-parse"
  , ftps: "ftps://github.com/42IonicaBizau/git-url-parse"
  , gitSsh: "git+ssh://git@github.com/42IonicaBizau/git-url-parse"
  , ref: "https://github.com/42IonicaBizau/git-url-parse/blob/master/test/index.js"
  , shorthand: "42IonicaBizau/git-url-parse"
  , commit: "https://github.com/42IonicaBizau/git-url-parse/commit/9c6443245ace92d237b7b274d4606a616e071c4e"
};

tester.describe("parse urls", test => {

    // SSH urls
    test.should("parse ssh urls", () => {
        var res = gitUrlParse(URLS.ssh);
        test.expect(res.protocol).toBe("ssh");
        test.expect(res.source).toBe("github.com");
        test.expect(res.owner).toBe("42IonicaBizau");
        test.expect(res.name).toBe("git-url-parse");
        test.expect(res.full_name).toBe("42IonicaBizau/git-url-parse");
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
        test.expect(res.owner).toBe("42IonicaBizau");
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
        test.expect(res.owner).toBe("42IonicaBizau");
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
        test.expect(res.owner).toBe("42IonicaBizau");
        test.expect(res.name).toBe("git-url-parse");
        test.expect(res.href).toBe(URLS.https);
        test.expect(res.toString("https")).toBe(URLS.https);
        test.expect(res.toString("git+ssh")).toBe(URLS.gitSsh);
        test.expect(res.toString("ssh")).toBe(URLS.ssh);
    });

    // HTTPS with ending slash
    test.should("parse https urls with ending slash", () => {
        var res = gitUrlParse("https://github.com/42IonicaBizau/git-url-parse/");
        test.expect(res.protocol).toBe("https");
        test.expect(res.source).toBe("github.com");
        test.expect(res.owner).toBe("42IonicaBizau");
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
        test.expect(res.owner).toBe("42IonicaBizau");
        test.expect(res.name).toBe("git-url-parse");
        test.expect(res.toString("https")).toBe(URLS.https);
        test.expect(res.toString("git+ssh")).toBe(URLS.gitSsh);
        test.expect(res.toString("ssh")).toBe(URLS.ssh);
    });

    // HTTPS with basic auth
    test.should("parse https urls with basic auth", () => {
        var res = gitUrlParse("https://user:password@github.com/42IonicaBizau/git-url-parse");
        test.expect(res.protocol).toBe("https");
        test.expect(res.source).toBe("github.com");
        test.expect(res.owner).toBe("42IonicaBizau");
        test.expect(res.name).toBe("git-url-parse");
        test.expect(res.user).toBe("user");
        test.expect(res.password).toBe("password");
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

    // bitbucket cloud src file
    test.should("parse Bitbucket Cloud src file", () => {
        var res = gitUrlParse("https://bitbucket.org/owner/name/src/master/README.md");
        test.expect(res.owner).toBe("owner");
        test.expect(res.name).toBe("name");
        test.expect(res.filepath).toBe("README.md");
        test.expect(res.ref).toBe("master");
        test.expect(res.filepathtype).toBe("src");
    });

    // bitbucket cloud raw file
    test.should("parse Bitbucket Cloud raw file", () => {
        var res = gitUrlParse("https://bitbucket.org/owner/name/raw/master/README.md");
        test.expect(res.owner).toBe("owner");
        test.expect(res.name).toBe("name");
        test.expect(res.filepath).toBe("README.md");
        test.expect(res.ref).toBe("master");
        test.expect(res.filepathtype).toBe("raw");
    });

    // https bitbucket server
    test.should("parse Bitbucket Server clone over http", () => {
        var res = gitUrlParse("https://user@bitbucket.companyname.com/scm/owner/name.git");
        test.expect(res.owner).toBe("owner");
        test.expect(res.name).toBe("name");
    });

    // ssh bitbucket server
    test.should("parse Bitbucket Server clone over ssh", () => {
        var res = gitUrlParse("ssh://git@bitbucket.companyname.com/owner/name.git");
        test.expect(res.owner).toBe("owner");
        test.expect(res.name).toBe("name");
    });

    // bitbucket server raw file
    test.should("parse Bitbucket Server raw file", () => {
        var res = gitUrlParse("https://bitbucket.mycompany.com/projects/owner/repos/name/raw/README.md?at=master");
        test.expect(res.owner).toBe("owner");
        test.expect(res.name).toBe("name");
        test.expect(res.filepath).toBe("README.md")
        test.expect(res.ref).toBe("master");
        test.expect(res.filepathtype).toBe("raw");
    });

    // bitbucket server raw file
    test.should("parse Bitbucket Server raw file without ref", () => {
        var res = gitUrlParse("https://bitbucket.mycompany.com/projects/owner/repos/name/raw/README.md");
        test.expect(res.owner).toBe("owner");
        test.expect(res.name).toBe("name");
        test.expect(res.filepath).toBe("README.md")
        test.expect(res.ref).toBe("");
        test.expect(res.filepathtype).toBe("raw");
    });

    test.should("parse Bitbucket server browse repository", () => {
        var res = gitUrlParse("https://bitbucket.mycompany.com/projects/owner/repos/name/browse");
        test.expect(res.owner).toBe("owner");
        test.expect(res.name).toBe("name");
        test.expect(res.filepathtype).toBe("browse");
    });

    test.should("parse Bitbucket server browse repository with a trailing slash", () => {
        var res = gitUrlParse("https://bitbucket.mycompany.com/projects/owner/repos/name/browse/");
        test.expect(res.owner).toBe("owner");
        test.expect(res.name).toBe("name");
        test.expect(res.filepathtype).toBe("browse");
    });

    test.should("parse Bitbucket server browse file", () => {
        var res = gitUrlParse("https://bitbucket.mycompany.com/projects/owner/repos/name/browse/README.md?at=master");
        test.expect(res.owner).toBe("owner");
        test.expect(res.name).toBe("name");
        test.expect(res.filepath).toBe("README.md");
        test.expect(res.ref).toBe("master");
        test.expect(res.filepathtype).toBe("browse");
        test.expect(res.toString()).toBe("https://bitbucket.mycompany.com/scm/owner/name")
    });

    test.should("parse Bitbucket Server personal repository browse url", () => {
        var res = gitUrlParse("https://bitbucket.mycompany.com/users/owner/repos/name/browse/README.md?at=master");
        test.expect(res.owner).toBe("~owner");
        test.expect(res.name).toBe("name");
        test.expect(res.filepath).toBe("README.md");
        test.expect(res.ref).toBe("master");
        test.expect(res.filepathtype).toBe("browse");
    });

    test.should("parse Bitbucket Server personal repository raw url", () => {
        var res = gitUrlParse("https://bitbucket.mycompany.com/users/owner/repos/name/raw/README.md?at=master");
        test.expect(res.owner).toBe("~owner");
        test.expect(res.name).toBe("name");
        test.expect(res.filepath).toBe("README.md");
        test.expect(res.ref).toBe("master");
        test.expect(res.filepathtype).toBe("raw");
        test.expect(res.toString()).toBe("https://bitbucket.mycompany.com/scm/~owner/name")
    });

    test.should("parse Bitbucket Server personal repository clone over ssh", () => {
        var res = gitUrlParse("ssh://git@bitbucket.mycompany.com/~owner/name.git");
        test.expect(res.owner).toBe("~owner");
        test.expect(res.name).toBe("name");
    });

    test.should("parse Bitbucket Server personal repository clone over http", () => {
        var res = gitUrlParse("https://bitbucket.mycompany.com/scm/~owner/name.git");
        test.expect(res.owner).toBe("~owner");
        test.expect(res.organization).toBe("~owner")
        test.expect(res.name).toBe("name");
        test.expect(res.full_name).toBe("~owner/name")
    });

    test.should("parse Bitbucket Server root endpoint", () => {
      var res = gitUrlParse("https://bitbucket.mycompany.com/projects/owner/repos/name")
      test.expect(res.owner).toBe("owner");
      test.expect(res.organization).toBe("owner");
      test.expect(res.name).toBe("name");
      test.expect(res.full_name).toBe("owner/name");
    });

    test.should("parse Bitbucket Server root endpoint with trailing slash", () => {
      var res = gitUrlParse("https://bitbucket.mycompany.com/projects/owner/repos/name/")
      test.expect(res.owner).toBe("owner");
      test.expect(res.organization).toBe("owner");
      test.expect(res.name).toBe("name");
      test.expect(res.full_name).toBe("owner/name");
    });

    test.should("parse Bitbucket Server commit endpoint", () => {
      var res = gitUrlParse("https://bitbucket.mycompany.com/projects/owner/repos/name/commits/9c6443245ace92d237b7b274d4606a616e071c4e")
      test.expect(res.owner).toBe("owner");
      test.expect(res.organization).toBe("owner");
      test.expect(res.name).toBe("name");
      test.expect(res.full_name).toBe("owner/name");
      test.expect(res.commit).toBe("9c6443245ace92d237b7b274d4606a616e071c4e")
    });

    test.should("parse Bitbucket Server with subfolder", () => {
      var res = gitUrlParse("https://bitbucket.mycompany.com/projects/owner/repos/name/browse/entities/filename.yaml")
      test.expect(res.filepath).toBe("entities/filename.yaml");
    });

    // https cloudforge
    test.should("parse CloudForge urls", () => {
        var res = gitUrlParse("https://owner@organization.git.cloudforge.com/name.git");
        test.expect(res.source).toBe("cloudforge.com");
        test.expect(res.owner).toBe("owner");
        test.expect(res.organization).toBe("organization");
        test.expect(res.name).toBe("name");
    });

    // https Azure DevOps (formerly Visual Studio Team Services)
    test.should("parse Azure DevOps HTTPS urls", () => {
        // Parse URL for matching project and repo names
        var res = gitUrlParse("https://dev.azure.com/MyOrganization/MatchedName/MyTeam/_git/MatchedName?path=%2Ftest%2Findex.js");
        test.expect(res.source).toBe("azure.com");
        test.expect(res.owner).toBe("MatchedName");
        test.expect(res.name).toBe("MatchedName");
        test.expect(res.filepath).toBe("test/index.js");

        // Parse URL for non-matching project and repo names
        res = gitUrlParse("https://dev.azure.com/MyOrganization/MyProject/_git/MyRepo?path=%2Ftest%2Findex.js");
        test.expect(res.source).toBe("azure.com");
        test.expect(res.owner).toBe("MyProject");
        test.expect(res.name).toBe("MyRepo");
        test.expect(res.filepath).toBe("test/index.js");
    });

    // https Azure DevOps (formerly Visual Studio Team Services)
    test.should("parse Azure DevOps HTTPS urls with branch", () => {
        // Parse URL for matching project and repo names
        var res = gitUrlParse("https://dev.azure.com/MyOrganization/MatchedName/MyTeam/_git/MatchedName?path=%2Ftest%2Findex.js&version=GBother");
        test.expect(res.source).toBe("azure.com");
        test.expect(res.owner).toBe("MatchedName");
        test.expect(res.name).toBe("MatchedName");
        test.expect(res.filepath).toBe("test/index.js");
        test.expect(res.ref).toBe("other");

        // Parse URL for non-matching project and repo names with branch
        res = gitUrlParse("https://dev.azure.com/MyOrganization/MyProject/_git/MyRepo?path=%2Ftest%2Findex.js&version=GBother");
        test.expect(res.source).toBe("azure.com");
        test.expect(res.owner).toBe("MyProject");
        test.expect(res.name).toBe("MyRepo");
        test.expect(res.filepath).toBe("test/index.js");
        test.expect(res.ref).toBe("other");
    });

    // ssh Azure DevOps (formerly Visual Studio Team Services)
    test.should("parse Azure DevOps SSH urls", () => {
        // Parse URL for matching project and repo names
        var res = gitUrlParse("git@ssh.dev.azure.com:v3/CompanyName/ProjectName/RepoName");
        test.expect(res.source).toBe("dev.azure.com");
        test.expect(res.owner).toBe("ProjectName");
        test.expect(res.name).toBe("RepoName");
    });

    // https Visual Studio Team Services (VSTS)
    test.should("parse Visual Studio Team Services (VSTS) HTTPS urls", () => {
        var res = gitUrlParse("https://companyname.visualstudio.com/_git/MyProject");
        test.expect(res.source).toBe("visualstudio.com");
        test.expect(res.owner).toBe("MyProject");
        test.expect(res.name).toBe("MyProject");
        test.expect(res.toString()).toBe("https://companyname.visualstudio.com/_git/MyProject");

        res = gitUrlParse("https://companyname.visualstudio.com/MyProject/_git/MyRepo");
        test.expect(res.source).toBe("visualstudio.com");
        test.expect(res.owner).toBe("MyProject");
        test.expect(res.name).toBe("MyRepo");
        test.expect(res.toString()).toBe("https://companyname.visualstudio.com/MyProject/_git/MyRepo");

        // Legacy URLs
        res = gitUrlParse("https://companyname.visualstudio.com/DefaultCollection/_git/MyRepo");
        test.expect(res.source).toBe("visualstudio.com");
        test.expect(res.owner).toBe("MyRepo");
        test.expect(res.name).toBe("MyRepo");
        test.expect(res.organization).toBe("DefaultCollection");
        test.expect(res.toString()).toBe("https://companyname.visualstudio.com/DefaultCollection/_git/MyRepo");

        res = gitUrlParse("https://companyname.visualstudio.com/DefaultCollection/MyProject/_git/MyRepo");
        test.expect(res.source).toBe("visualstudio.com");
        test.expect(res.owner).toBe("MyProject");
        test.expect(res.name).toBe("MyRepo");
        test.expect(res.organization).toBe("DefaultCollection");
        test.expect(res.toString()).toBe("https://companyname.visualstudio.com/DefaultCollection/MyProject/_git/MyRepo");
    });

    // ssh Visual Studio Team Services (VSTS)
    // TODO Check why this does not work anymore.
    // test.should("parse Visual Studio Team Services (VSTS) SSH urls", () => {
    //     var res = gitUrlParse("CompanyName@vs-ssh.visualstudio.com:v3/CompanyName/ProjectName/RepoName");
    //     test.expect(res.source).toBe("visualstudio.com");
    //     test.expect(res.owner).toBe("ProjectName");
    //     test.expect(res.name).toBe("RepoName");
    // });

    // custom git hosted URL with 2 parts SLD
    test.should("parse Gih hosted urls with two parts SLD", () => {
        var res = gitUrlParse("https://domain.git.com.cn/owner/name.git");
        test.expect(res.source).toBe("git.com.cn");
        test.expect(res.owner).toBe("owner");
        test.expect(res.name).toBe("name");
    });

    // Handle URL encoded names of owners and repositories
    test.should("https URLs with URL encoded characters", () => {
      var res = gitUrlParse("https://companyname.visualstudio.com/My%20Project/_git/My%20Repo");
      test.expect(res.source).toBe("visualstudio.com");
      test.expect(res.owner).toBe("My Project");
      test.expect(res.name).toBe("My Repo");
    });

    // ref and filepath urls
    test.should("parse ref/filepath urls", () => {
        var res = gitUrlParse(URLS.ref);
        test.expect(res.protocol).toBe("https");
        test.expect(res.source).toBe("github.com");
        test.expect(res.owner).toBe("42IonicaBizau");
        test.expect(res.name).toBe("git-url-parse");
        test.expect(res.href).toBe(URLS.ref);
        test.expect(res.ref).toBe("master");
        test.expect(res.filepathtype).toBe("blob");
        test.expect(res.filepath).toBe("test/index.js");

        res = gitUrlParse("https://gitlab.com/a/b/c/d/blob/master/test/index.js");
        test.expect(res.protocol).toBe("https");
        test.expect(res.source).toBe("gitlab.com");
        test.expect(res.owner).toBe("a/b/c");
        test.expect(res.name).toBe("d");
        test.expect(res.href).toBe("https://gitlab.com/a/b/c/d/blob/master/test/index.js");
        test.expect(res.ref).toBe("master");
        test.expect(res.filepathtype).toBe("blob");
        test.expect(res.filepath).toBe("test/index.js");

        res = gitUrlParse("https://gitlab.com/a/b/c/d/-/blob/master/test/index.js");
        test.expect(res.protocol).toBe("https");
        test.expect(res.source).toBe("gitlab.com");
        test.expect(res.owner).toBe("a/b/c");
        test.expect(res.name).toBe("d");
        test.expect(res.href).toBe("https://gitlab.com/a/b/c/d/-/blob/master/test/index.js");
        test.expect(res.ref).toBe("master");
        test.expect(res.filepathtype).toBe("blob");
        test.expect(res.filepath).toBe("test/index.js");
    });

    // shorthand urls
    test.should("parse shorthand urls", () => {
        var res = gitUrlParse(URLS.shorthand);
        test.expect(res.owner).toBe("42IonicaBizau");
        test.expect(res.name).toBe("git-url-parse");
        test.expect(res.href).toBe(URLS.shorthand);
        test.expect(res.full_name).toBe("42IonicaBizau/git-url-parse");
        test.expect(res.href).toBe("42IonicaBizau/git-url-parse");
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

    // subgroups
    test.should("parse gitlab subgroups", () => {
        var res = gitUrlParse("https://gitlab.com/group/subgroup/id");
        test.expect(res.protocol).toBe("https");
        test.expect(res.source).toBe("gitlab.com");
        test.expect(res.owner).toBe("group/subgroup");
        test.expect(res.name).toBe("id");
        test.expect(res.href).toBe("https://gitlab.com/group/subgroup/id");
        test.expect(res.toString("https")).toBe("https://gitlab.com/group/subgroup/id");
        test.expect(res.toString("git+ssh")).toBe("git+ssh://git@gitlab.com/group/subgroup/id");
        test.expect(res.toString("ssh")).toBe("git@gitlab.com:group/subgroup/id");
        test.expect(res.toString()).toBe("https://gitlab.com/group/subgroup/id");

        res = gitUrlParse("git@gitlab.com:a/b/c/d.git");
        test.expect(res.protocol).toBe("ssh");
        test.expect(res.source).toBe("gitlab.com");
        test.expect(res.owner).toBe("a/b/c");
        test.expect(res.name).toBe("d");
        test.expect(res.href).toBe("git@gitlab.com:a/b/c/d.git");
        test.expect(res.toString("https")).toBe("https://gitlab.com/a/b/c/d.git");
        test.expect(res.toString("git+ssh")).toBe("git+ssh://git@gitlab.com/a/b/c/d.git");
        test.expect(res.toString("ssh")).toBe("git@gitlab.com:a/b/c/d.git");
        test.expect(res.toString()).toBe("git@gitlab.com:a/b/c/d.git");
    });

    test.should("stringify token", () => {
        var res = gitUrlParse("https://github.com/owner/name.git");
        res.token = "token";
        test.expect(res.toString()).toBe("https://token@github.com/owner/name.git");

        var res = gitUrlParse("https://gitlab.com/group/subgroup/name.git");
        res.token = "token";
        test.expect(res.toString()).toBe("https://token@gitlab.com/group/subgroup/name.git");

        var res = gitUrlParse("https://owner@bitbucket.org/owner/name");
        res.token = "token";
        test.expect(res.toString()).toBe("https://x-token-auth:token@bitbucket.org/owner/name");

        var res = gitUrlParse("git@github.com:owner/name");
        res.port = 22;
        test.expect(res.toString()).toBe("ssh://git@github.com:22/owner/name");

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

        var res = gitUrlParse("https://github.com/owner/name.git");
        res.user = "user";
        test.expect(res.toString()).toBe("https://user@github.com/owner/name.git");

        var res = gitUrlParse("http://github.com/owner/name.git");
        res.user = "user";
        test.expect(res.toString()).toBe("http://user@github.com/owner/name.git");
    });

    // commits
    test.should("parse commit urls", () => {
        var res = gitUrlParse(URLS.commit);
        test.expect(res.name).toBe("git-url-parse");
        test.expect(res.commit).toBe("9c6443245ace92d237b7b274d4606a616e071c4e");
    });
});
