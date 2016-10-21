#!/bin/bash

case "${TRAVIS_OS_NAME}" in
  osx)
    source ~/.nvm/nvm.sh
    nvm install stable
    gem install cocoapods --pre # Since Travis is not always on latest version
    pod repo update
  ;;
  linux)
    source ~/.nvm/nvm.sh
    nvm install stable
  ;;
esac
