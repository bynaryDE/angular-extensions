#!/usr/bin/env bash

# clear the docs directory before generating new docs
rm -rf ../docs/*

# generate docs
npx typedoc --options typedoc.json
