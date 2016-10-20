#!/bin/bash

case "${TRAVIS_OS_NAME}" in
  osx)
    xcrun simctl list
    cd example
    set -o pipefail && npm run build:ios | xcpretty -c -f `xcpretty-travis-formatter`
    npm run test:ios || true
    cat ../appium.out
    cat /Users/travis/Library/Logs/CoreSimulator/237D7619-4A4E-4624-8925-67A42A8A690A/system.log
  ;;
  linux)
    cd example
    npm run build:android
    npm run test:android
  ;;
esac
