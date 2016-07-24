# poketerkep-web
PokéTérkép Web

Install project frontend dependencies:
------------
1. Install NodeJS (with include path variable option)
2. Open project directory in command promt
3. `sudo npm install -g gulp`
4. `sudo npm install -g bower`
5. `npm install`
6. `bower install`

Local run:
------------
1. `gulp clean`
2. `gulp serve`

Build production:
------------
1. `gulp clean`
2. `gulp index --production`

Run tests:
------------
1. `gulp clean`
2. `gulp test`

Extra options:
------------
- `gulp clean serve --host=http://localhost:8080`
- `gulp clean serve --proxy=http://localhost:8080`
- `gulp clean serve --production`
- `gulp clean serve --debug`

Config files:
------------
- `src/main/app/configDev.json`
- `src/main/app/configProd.json`

Side note:
------------
Current default host is now: [NOT SET]

If you run local backend, you can use proxy also:
- modify configDev.json file: put `/api/` into apiEndpoint property
- run gulp with defined proxy `gulp clean serve --proxy=http://localhost:8080` (default proxy is localhost:8080 also)
- in this case you won't have any access origin problems, because gulp proxy can handle this
