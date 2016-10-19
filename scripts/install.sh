#!/bin/bash

case "${TRAVIS_OS_NAME}" in
  osx)
    cd example
    npm install
    pod install --project-directory=ios --repo-update
  ;;
  linux)
    cd example
    npm install
  ;;
esac
