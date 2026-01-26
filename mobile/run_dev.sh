#!/bin/bash

adb reverse tcp:3000 tcp:3000
npx expo run:android