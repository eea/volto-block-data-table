# @eeacms/volto-block-data-table

[![Releases](https://img.shields.io/github/v/release/eea/volto-block-data-table)](https://github.com/eea/volto-block-data-table/releases)
[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-block-data-table%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-block-data-table/job/master/display/redirect)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-block-data-table&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-block-data-table)

[Volto](https://github.com/plone/volto) add-on. The block creates an html table from a given data source. It supports pagination (only with arrows), choose to show/hide headers, max results, different table styles (stripe, compact etc.).

## Features

![DataConnected Table Block](https://raw.githubusercontent.com/eea/volto-block-data-table/master/docs/volto-block-data-table.png "DataConnected Table Block")

## Requirements

### Backend

- [Plone](https://plone.org/download)
- [plone.restapi](https://pypi.org/project/plone.restapi/)

### Frontend

- Node.js: `>=22.0.0`

## Installation

1. Make sure you have a [Plone backend](https://plone.org/download) up-and-running at http://localhost:8080/Plone

   ```Bash
   docker compose up backend
   ```

1. Start Volto frontend

* If you already have a volto project, just update `package.json`:

   ```JSON
   "dependencies": {
       "@eeacms/volto-block-data-table": "*"
   }
   ```

   and `volto.config.js`:

   ```JavaScript
   const addons = ['@eeacms/volto-block-data-table'];
   ```

* If not, create one with Cookieplone, as recommended by the official Plone documentation for Volto 18+:

   ```
   uvx cookieplone project
   cd project-title
   ```

1. Install or update dependencies, then start the project:

   ```
   make install
   ```

   For a Cookieplone project, start the backend and frontend in separate terminals:

   ```
   make backend-start
   make frontend-start
   ```

1. Go to http://localhost:3000

1. Happy editing!

## License

See [LICENSE.md](LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
