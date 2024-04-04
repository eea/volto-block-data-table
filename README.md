# volto-block-data-table

[![Releases](https://img.shields.io/github/v/release/eea/volto-block-data-table)](https://github.com/eea/volto-block-data-table/releases)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-block-data-table%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-block-data-table/job/master/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-block-data-table-master&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-block-data-table-master)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-block-data-table-master&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-block-data-table-master)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-block-data-table-master&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-block-data-table-master)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-block-data-table-master&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-block-data-table-master)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-block-data-table%2Fdevelop&subject=develop)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-block-data-table/job/develop/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-block-data-table-develop&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-block-data-table-develop)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-block-data-table-develop&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-block-data-table-develop)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-block-data-table-develop&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-block-data-table-develop)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-block-data-table-develop&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-block-data-table-develop)


[Volto](https://github.com/plone/volto) add-on. The block creates an html table from a given data source. It supports pagination (only with arrows), choose to show/hide headers, max results, different table styles (stripe, compact etc.).

## Features

![DataConnected Table Block](https://raw.githubusercontent.com/eea/volto-block-data-table/develop/docs/volto-block-data-table.png "DataConnected Table Block")

## Getting started

### Try volto-block-data-table with Docker

      git clone https://github.com/eea/volto-block-data-table.git
      cd volto-block-data-table
      make
      make start

Go to http://localhost:3000

### Add volto-block-data-table to your Volto project

1. Make sure you have a [Plone backend](https://plone.org/download) up-and-running at http://localhost:8080/Plone

   ```Bash
   docker compose up backend
   ```

1. Start Volto frontend

* If you already have a volto project, just update `package.json`:

   ```JSON
   "addons": [
       "@eeacms/volto-block-data-table"
   ],

   "dependencies": {
       "@eeacms/volto-block-data-table": "*"
   }
   ```

* If not, create one:

   ```
   npm install -g yo @plone/generator-volto
   yo @plone/volto my-volto-project --canary --addon @eeacms/volto-block-data-table
   cd my-volto-project
   ```

1. Install new add-ons and restart Volto:

   ```
   yarn
   yarn start
   ```

1. Go to http://localhost:3000

1. Happy editing!

## Release

See [RELEASE.md](https://github.com/eea/volto-block-data-table/blob/master/RELEASE.md).

## How to contribute

See [DEVELOP.md](https://github.com/eea/volto-block-data-table/blob/master/DEVELOP.md).

## Copyright and license

The Initial Owner of the Original Code is European Environment Agency (EEA).
All Rights Reserved.

See [LICENSE.md](https://github.com/eea/volto-block-data-table/blob/master/LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
