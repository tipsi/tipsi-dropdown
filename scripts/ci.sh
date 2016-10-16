#!/bin/bash

case "${TRAVIS_OS_NAME}" in
  linux)
    cd example
    npm run build:android
    npm run test
  ;;
esac
