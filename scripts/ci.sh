#!/bin/bash

case "${TRAVIS_OS_NAME}" in
  osx)
    cd example
    set -o pipefail && npm run build:ios | xcpretty -c
  ;;
  linux)
    cd example
    npm run build:android
    npm run test
  ;;
esac
