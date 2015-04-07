![](http://i.imgur.com/HlfMsVf.png)

# `giturlparse`
Parses and stringifies git urls.

## Installation

```sh
$ npm install giturlparse
```

## Example

```js
var GitUrlParse = require("giturlparse")

GitUrlParse("git@github.com:IonicaBizau/node-giturlparse.git")
// { protocol: 'ssh'
// , source: 'github.com'
// , owner: 'IonicaBizau'
// , name: 'node-giturlparse'
// , _: 'git@github.com:IonicaBizau/node-giturlparse.git'
// , toString: [Function] }

GitUrlParse("https://github.com/IonicaBizau/node-giturlparse.git")
//{ protocol: 'https'
//, source: 'github.com'
//, owner: 'IonicaBizau'
//, name: 'node-giturlparse.git'
//, _: 'https://github.com/IonicaBizau/node-giturlparse.git'
//, toString: [Function] }

GitUrlParse("https://github.com/IonicaBizau/node-giturlparse.git").toString("ssh")
// 'git@github.com:IonicaBizau/node-giturlparse.git.git'

GitUrlParse("git@github.com:IonicaBizau/node-giturlparse.git").toString("https")
// 'https://github.com/IonicaBizau/node-giturlparse.git'
```

## Documentation
### `GitUrlParse(url)`
Parses a Git url.

#### Params
- **String** `url`: The Git url to parse.

#### Return
- **GitUrl** The `GitUrl` object containing:
 - `protocol` (String): The url protocol.
 - `source` (String): The Git provider (e.g. `"github.com"`).
 - `owner` (String): The repository owner.
 - `name` (String): The repository name.
 - `_` (String): The original url which was parsed.
 - `toString` (Function): A function to stringify the parsed url into another url type.

### `stringify(obj, type)`
Stringifies a `GitUrl` object.

#### Params
- **GitUrl** `obj`: The parsed Git url object.
- **String** `type`: The type of the stringified url (default `obj.protocol`).

#### Return
- **String** The stringified url.

## How to contribute
1. File an issue in the repository, using the bug tracker, describing the
   contribution you'd like to make. This will help us to get you started on the
   right foot.
2. Fork the project in your account and create a new branch:
   `your-great-feature`.
3. Commit your changes in that branch.
4. Open a pull request, and reference the initial issue in the pull request
   message.

## License
See the [LICENSE](./LICENSE) file.
