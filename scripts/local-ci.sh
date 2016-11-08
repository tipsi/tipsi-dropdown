#!/bin/bash

isOSX() {
  [ "$(uname)" == "Darwin" ]
}

###################
# BEFORE INSTALL  #
###################

# Check is OSX
! isOSX && echo "Current os is not OSX, setup for iOS will be skipped"
# Go to example project
cd example
# Remove tipsi-dropdown dependency
rm -rf node_modules/tipsi-dropdown

###################
# INSTALL         #
###################

# Install dependencies
npm install
# Install pods
isOSX && pod install --project-directory=ios

###################
# BEFORE BUILD    #
###################

# Run appium
appiumPID=$(ps -A | grep -v grep | grep appium | awk '{print $1}')
if [ -z $appiumPID ]; then
  npm run appium > /dev/null 2>&1 &
else
  echo "appium is already running, restart appium"
  kill -9 $appiumPID
  npm run appium > /dev/null 2>&1 &
fi

###################
# BUILD           #
###################

# Build Android app
npm run build:android || true
# Build iOS app
isOSX && (npm run build:ios || true)

###################
# TESTS           #
###################

# Run Android e2e tests
npm run test:android || true
# Run iOS e2e tests
isOSX && (npm run test:ios || true)
