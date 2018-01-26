## Documentation

You can see below the API reference of this module.

### `gitUrlParse(url)`
Parses a Git url.

#### Params

- **String** `url`: The Git url to parse.

#### Return
- **GitUrl** The `GitUrl` object containing:
 - `protocols` (Array): An array with the url protocols (usually it has one element).
 - `port` (null|Number): The domain port.
 - `resource` (String): The url domain (including subdomains).
 - `user` (String): The authentication user (usually for ssh urls).
 - `pathname` (String): The url pathname.
 - `hash` (String): The url hash.
 - `search` (String): The url querystring value.
 - `href` (String): The input url.
 - `protocol` (String): The git url protocol.
 - `token` (String): The oauth token (could appear in the https urls).
 - `source` (String): The Git provider (e.g. `"github.com"`).
 - `owner` (String): The repository owner.
 - `name` (String): The repository name.
 - `ref` (String): The repository ref (e.g., "master" or "dev").
 - `filepath` (String): A filepath relative to the repository root.
 - `filepathtype` (String): The type of filepath in the url ("blob" or "tree").
 - `full_name` (String): The owner and name values in the `owner/name` format.
 - `toString` (Function): A function to stringify the parsed url into another url type.
 - `organization` (String): The organization the owner belongs to. This is CloudForge specific.

### `stringify(obj, type)`
Stringifies a `GitUrl` object.

#### Params

- **GitUrl** `obj`: The parsed Git url object.
- **String** `type`: The type of the stringified url (default `obj.protocol`).

#### Return
- **String** The stringified url.

