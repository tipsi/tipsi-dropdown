#!/bin/bash

case "${TRAVIS_OS_NAME}" in
  osx)
    cd example
    npm install
    pod install --project-directory=ios
  ;;
  linux)
    node -v
    npm -v
    cd example
    npm install
  ;;
esac
