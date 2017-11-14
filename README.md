# Conversations Application

## Pre-requisites
Install the following apps on your computer before you begin

0. [Git] (https://git-scm.com/downloads)

0. [Nodejs] (https://nodejs.org/en/download/)

0. [Ruby] (https://rubyinstaller.org/downloads/)

## Usage

To develop on this project please clone it and follow the steps below: 

0.  Generate your ssh key and add it to Gitlab.  Click [here] (https://confluence.atlassian.com/bitbucketserver/creating-ssh-keys-776639788.html) for instructions

0.  Clone the project in your desired location by running the following command : `git clone git@gitlab.zailab.com:application-frontend/conversations.git`

0.  Type : `cd conversations` to get inside the project folder

0.  Checkout the develop branch : `git checkout develop`

0.  Run `gem install sass`

0.  Run : `npm install`

0.  Run the following command once : `npm install jspm -g`

0.  Run the following command once : `npm install gulp -g`

0.  Run the following command once : `npm install jspm-git -g`

0.  Run the following command once : `jspm registry create gitlab jspm-git`, then enter the following base url when prompted `ssh://git@gitlab.zailab.com/` 

0.  Configure your github credentials with the following command : `jspm registry config github`

0.  Run the following command : `jspm install -y`

0.  Run application: `gulp`.

## Unit Tests

0. Coming soon!