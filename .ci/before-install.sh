#!/bin/bash

case "${TRAVIS_OS_NAME}" in
  osx)
    source ~/.nvm/nvm.sh
    nvm install stable
    gem install cocoapods --pre # Since Travis is not always on latest version
    pod repo update
  ;;
  linux)
    . $HOME/.nvm/nvm.sh
    nvm install stable
    nvm use stable
    node -v
    npm -v
  ;;
esac
