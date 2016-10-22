#!/bin/bash

case "${TRAVIS_OS_NAME}" in
  osx)
    rm -rf example/node_modules/tipsi-dropdown
  ;;
  linux)
    rm -rf example/node_modules/tipsi-dropdown
    rm -f $HOME/.gradle/caches/modules-2/modules-2.lock
  ;;
esac
