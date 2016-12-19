#!/bin/bash

set -e

if [[ $@ == *"--skip-new"* ]]; then
  skip_new=true
else
  skip_new=false
fi

proj_dir_old=example
proj_dir_new=example_tmp

react_native_ver=$(cd $proj_dir_old && npm view react-native version)

files_to_copy=(
  $proj_dir_old/package.json
  $proj_dir_old/index.*.js
  $proj_dir_old/src
  $proj_dir_old/test
)

isOSX() {
  [ "$(uname)" == "Darwin" ]
}

###################
# BEFORE INSTALL  #
###################

# Check is OSX
! isOSX && echo "Current os is not OSX, setup for iOS will be skipped"
# Install react-native-cli if not exist
if ! type react-native > /dev/null; then
  npm install -g react-native-cli
fi

if $skip_new; then
  echo "Creating new example project skipped"
else
  # Remove old test project if exist
  rm -rf $proj_dir_new
  # Init new test project
  react-native init $proj_dir_new --version $react_native_ver
  # Copy necessary files from example project
  for i in ${files_to_copy[@]}; do
    if [ -e $i ]; then
      cp -rp $i $proj_dir_new
    fi
  done
fi

# Go to new test project
cd $proj_dir_new

###################
# INSTALL         #
###################

# Install dependencies
npm install
# Link project
react-native link

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
npm run build:android
# Build iOS app
isOSX && npm run build:ios

###################
# TESTS           #
###################

# Run Android e2e tests
npm run test:android
# Run iOS e2e tests
if isOSX
  then npm run test:ios
fi
