# Release 0.3.3

# Release 0.3.2
- added network to website title (mainnet/testnet)

# Release 0.3.1
- added build and start script to npm script section
- Added git ignore file to exclude files from beeing commited
- Add missing jshintrc and prevent auto browser opening in docker container
- moved base app folder to root. renamed npm package name
- docker docker build. added nginx config used to serve dist files
- added docker build script
- upgrade dependencies
- changed image name to decentage/XXXX:latest
- changed image name in build script
- update angular version
- dependabot config
- removed package-lock.json file
- log request urls
- adjust browsersync to take port and public path from process env
- using docker nginx template mechanism
- removed node_env variable used for npm build
- added default value for NGINX_PATH and remove trailing slash in nginx config template
- run local gulp and bower
- envsub for config file in dev mode
- added env file replacement mechanism
