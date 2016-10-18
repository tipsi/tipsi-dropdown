#!/bin/bash

case "${TRAVIS_OS_NAME}" in
  osx)
    cd example
    pod install --project-directory=ios
    npm install
  ;;
  linux)
    cd example
    npm install
  ;;
esac
