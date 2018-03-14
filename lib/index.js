"use strict";

const gitUp = require("git-up");
const parseDomain = require('parse-domain');
/**
 * gitUrlParse
 * Parses a Git url.
 *
 * @name gitUrlParse
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
 *  - `ref` (String): The repository ref (e.g., "master" or "dev").
 *  - `filepath` (String): A filepath relative to the repository root.
 *  - `filepathtype` (String): The type of filepath in the url ("blob" or "tree").
 *  - `full_name` (String): The owner and name values in the `owner/name` format.
 *  - `toString` (Function): A function to stringify the parsed url into another url type.
 *  - `organization` (String): The organization the owner belongs to. This is CloudForge specific.
 *  - `git_suffix` (Boolean): Whether to add the `.git` suffix or not.
 *
 */
function gitUrlParse(url) {

    if (typeof url !== "string") {
        throw new Error("The url must be a string.");
    }

    let urlInfo = gitUp(url)
      , sourceParts = urlInfo.resource.split(".")
      , splits = null
      ;

      urlInfo.toString = function (type) {
        return gitUrlParse.stringify(this, type);
    };

    const parsedResource = parseDomain(urlInfo.resource)
    urlInfo.source = parsedResource.domain + '.' + parsedResource.tld;

    // Note: Some hosting services (e.g. Visual Studio Team Services) allow whitespace characters
    // in the repository and owner names so we decode the URL pieces to get the correct result
    urlInfo.name = decodeURIComponent(urlInfo.pathname.substring(1).replace(/\.git$/, ""));
    urlInfo.owner = decodeURIComponent(urlInfo.user);
    urlInfo.git_suffix = false;

    switch (urlInfo.source) {
        case "cloudforge.com":
            urlInfo.owner = urlInfo.user;
            urlInfo.organization = sourceParts[0];
            break;
        case "visualstudio.com":
            splits = urlInfo.name.split("/");
            if (splits.length === 2) {
                urlInfo.owner = splits[1];
                urlInfo.name = splits[1];
            } else if (splits.length === 3) {
              urlInfo.owner = splits[0] === 'DefaultCollection' ? splits[2] : splits[0];
              urlInfo.name = splits[2];
            } else if (splits.length === 4) {
              urlInfo.owner = splits[1];
              urlInfo.name = splits[3];
            }
            urlInfo.organization = urlInfo.owner;
            break;
        default:
            splits = urlInfo.name.split("/");
            let nameIndex = splits.length - 1;
            if (splits.length >= 2) {
                const blobIndex = splits.indexOf("blob", 2);
                const treeIndex = splits.indexOf("tree", 2);
                nameIndex = blobIndex > 0 ? blobIndex - 1
                          : treeIndex > 0 ? treeIndex - 1
                          : nameIndex;

                urlInfo.owner = splits.slice(0, nameIndex).join('/');
                urlInfo.name = splits[nameIndex];
            }

            urlInfo.ref = "";
            urlInfo.filepathtype = "";
            urlInfo.filepath = "";
            if ((splits.length > nameIndex + 2) && (["blob", "tree"].indexOf(splits[nameIndex + 1]) >= 0)) {
                urlInfo.filepathtype = splits[nameIndex + 1];
                urlInfo.ref = splits[nameIndex + 2];
                if (splits.length > nameIndex + 3) {
                    urlInfo.filepath = splits.slice(nameIndex + 3).join('/');
                }
            }
            urlInfo.organization = urlInfo.owner;
            break;
    }

    urlInfo.full_name = urlInfo.owner;
    if (urlInfo.name) {
        urlInfo.full_name && (urlInfo.full_name += "/");
        urlInfo.full_name += urlInfo.name;
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
gitUrlParse.stringify = function (obj, type) {
    type = type || ((obj.protocols && obj.protocols.length) ? obj.protocols.join('+') : obj.protocol);
    const port = obj.port ? `:${obj.port}` : '';
    const user = obj.user || 'git';
    const maybeGitSuffix = obj.git_suffix ? ".git" : ""
    switch (type) {
        case "ssh":
            if (port)
                return `ssh://${user}@${obj.resource}${port}/${obj.full_name}${maybeGitSuffix}`;
            else
                return `${user}@${obj.resource}:${obj.full_name}${maybeGitSuffix}`;
        case "git+ssh":
        case "ssh+git":
        case "ftp":
        case "ftps":
            return `${type}://${user}@${obj.resource}${port}/${obj.full_name}${maybeGitSuffix}`;
        case "http":
        case "https":
            let token = "";
            if (obj.token) {
              token = buildToken(obj);
            }
            return `${type}://${token}${obj.resource}${port}/${obj.full_name}${maybeGitSuffix}`;
        default:
            return obj.href;
    }
};

/*!
 * buildToken
 * Builds OAuth token prefix (helper function)
 *
 * @name buildToken
 * @function
 * @param {GitUrl} obj The parsed Git url object.
 * @return {String} token prefix
 */
function buildToken(obj) {
    switch (obj.source) {
      case "bitbucket.org":
        return `x-token-auth:${obj.token}@`;
      default:
        return `${obj.token}@`
    }
}

module.exports = gitUrlParse;
