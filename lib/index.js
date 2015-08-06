// Dependencies
var GitUp = require("git-up");

/**
 * GitUrlParse
 * Parses a Git url.
 *
 * @name GitUrlParse
 * @function
 * @param {String} url The Git url to parse.
 * @return {GitUrl} The `GitUrl` object containing:
 *
 *  - `protocols` (Array): An array with the url protocols (usually it has one element).
 *  - `port` (null|Number): The domain port.
 *  - `resource` (String): The url domain (including subdomains).
 *  - `user` (String): The authentication user (usually for ssh urls).
 *  - `pathname` (String): The url pathname.
 *  - `hash` (String): The url hash.
 *  - `search` (String): The url querystring value.
 *  - `href` (String): The input url.
 *  - `protocol` (String): The git url protocol.
 *  - `token` (String): The oauth token (could appear in the https urls).
 *  - `source` (String): The Git provider (e.g. `"github.com"`).
 *  - `owner` (String): The repository owner.
 *  - `name` (String): The repository name.
 *  - `toString` (Function): A function to stringify the parsed url into another url type.
 *  - `organization` (String): The organization the owner belongs to. This is CloudForge specific.
 */
function GitUrlParse(url) {

    if (typeof url !== "string") {
        throw new Error("The url must be a string.");
    }

    var urlInfo = GitUp(url)
      , sourceParts = urlInfo.resource.split(".")
      , splits = null
      ;

    urlInfo.toString = function (type) {
        return GitUrlParse.stringify(this, type);
    };

    urlInfo.source = sourceParts.length > 2
                   ? sourceParts.slice(-2).join(".")
                   : urlInfo.source = urlInfo.resource
                   ;

    urlInfo.name = urlInfo.pathname.substring(1).replace(/\.git$/, "");
    urlInfo.owner = urlInfo.user;
    urlInfo.organization = urlInfo.owner;

    switch (urlInfo.source) {
        case "cloudforge.com":
            urlInfo.owner = urlInfo.user;
            urlInfo.organization = sourceParts[0];
            break;
        default:
            splits = urlInfo.name.split("/");
            if (splits.length === 2) {
                urlInfo.owner = splits[0];
                urlInfo.name = splits[1];
            }
            break;
    }

    return urlInfo;
}

/**
 * stringify
 * Stringifies a `GitUrl` object.
 *
 * @name stringify
 * @function
 * @param {GitUrl} obj The parsed Git url object.
 * @param {String} type The type of the stringified url (default `obj.protocol`).
 * @return {String} The stringified url.
 */
GitUrlParse.stringify = function (obj, type) {
    type = type || obj.protocol;
    switch (type) {
        case "ssh":
            return "git@" + obj.source + ":" + obj.owner + "/" + obj.name + ".git";
        case "git+ssh":
            return "git+ssh://git@" + obj.source + "/" + obj.owner + "/" + obj.name + ".git";
        case "http":
        case "https":
            return type + "://" + obj.source + "/" + obj.owner + "/" + obj.name + ".git";
        default:
            return obj.href;
    }
};

module.exports = GitUrlParse;
