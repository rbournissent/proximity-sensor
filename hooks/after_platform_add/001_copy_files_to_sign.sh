#!/bin/bash

if [ -d "platforms/android" ]; then
  echo "Copying keystore and release-signing.properties files"
  cp ProximitySensor.keystore platforms/android/
  cp release-signing.properties platforms/android/
fi
