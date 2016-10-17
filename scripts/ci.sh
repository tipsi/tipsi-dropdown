#!/bin/bash

case "${TRAVIS_OS_NAME}" in
  osx)
    cd example
    npm run build:ios
  ;;
  linux)
    cd example
    npm run build:android
    npm run test
  ;;
esac
