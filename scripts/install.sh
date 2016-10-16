#!/bin/bash

case "${TRAVIS_OS_NAME}" in
  linux)
    cd example
    npm install
  ;;
esac
