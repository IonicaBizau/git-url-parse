/**
 * GitUrlParse
 * Parses a Git url.
 *
 * @name GitUrlParse
 * @function
 * @param {String} url The Git url to parse.
 * @return {GitUrl} The `GitUrl` object containing:
 *
 *  - `protocol` (String): The url protocol.
 *  - `source` (String): The Git provider (e.g. `"github.com"`).
 *  - `owner` (String): The repository owner.
 *  - `name` (String): The repository name.
 *  - `_` (String): The original url which was parsed.
 *  - `toString` (Function): A function to stringify the parsed url into another url type.
 */
function GitUrlParse(url) {

    if (typeof url !== "string") {
        throw new Error("The url must be a string.");
    }

    var urlInfo = {
            protocol: null
          , source: null
          , owner: null
          , name: null
          , _: url
          , toString: function (type) {
                return GitUrlParse.stringify(this, type);
            }
        }
      , match = null
      ;

    // SSH protocol
    check_git: if (/^git\@/.test(url)) {
        match = url.match(/^git@(.*):(.*)\/(.*).git$/);
        if (!match) { break check_git; }
        urlInfo.source = match[1];
        urlInfo.owner = match[2];
        urlInfo.name = match[3];
        urlInfo.protocol = "ssh";
    } else

    // HTTP(S) protocol
    check_https: if (/^https?:\/\//.test(url)) {
        url = url.replace(/(\/|\.git)$/, "");
        match = url.match(/^(https?):\/\/(.*)\/(.*)\/(.*)\/?$/);
        if (!match) { break check_https; }
        urlInfo.protocol = match[1];
        urlInfo.source = match[2];
        urlInfo.owner = match[3];
        urlInfo.name = match[4];
    } else {
        urlInfo.protocol = "file";
        // Feel free to add more parsers
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
        case "http":
        case "https":
            return type + "://" + obj.source + "/" + obj.owner + "/" + obj.name + ".git";
        default:
            return obj._;
    }
};

module.exports = GitUrlParse;
