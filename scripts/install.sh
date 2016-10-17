#!/bin/bash

case "${TRAVIS_OS_NAME}" in
  ios)
    cd example
    npm install
  ;;
  linux)
    cd example
    npm install
  ;;
esac
