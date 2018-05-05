#!/bin/bash

component="import React, { Component } from 'react'

import './$1.css'

export default class $1 extends Component {
  render () {
    return ()
  }
}"

style=""

index="import $1 from './$1'

export default $1"

echo "Creating component $1"
mkdir ./src/Components/$1
printf '%s\n' "$component" >> ./src/Components/$1/$1.js
printf '%s\n' "$style" >> ./src/Components/$1/$1.css
printf '%s\n' "$index" >> ./src/Components/$1/index.js
node ./Tools/createIndexExports.js ./src/Components
