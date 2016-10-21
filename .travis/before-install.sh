#!/bin/bash

case "${TRAVIS_OS_NAME}" in
  osx)
    gem install cocoapods --pre # Since Travis is not always on latest version
  ;;
esac
