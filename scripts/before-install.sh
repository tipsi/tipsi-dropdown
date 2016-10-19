#!/bin/bash

case "${TRAVIS_OS_NAME}" in
  osx)
    nvm install stable
    gem install cocoapods # Since Travis is not always on latest version
  ;;
  linux)
    nvm install stable
  ;;
esac
