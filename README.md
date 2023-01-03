# Satellite Data Pooling Server
Satellite data pooling server for development and production.

this server fetches data at 30 minutes of every hour.

# Contents

1. [Requirements](#requirements)
2. [Installation](#installation)
3. [Data Providers](#data-providers)

# Requirements

* [Node.js](https://nodejs.org/)

# Installation

1. Clone this repository to your local by using command.
```
git clone https://github.com/winrecker/satellite-data-server.git
```
* If you want to change the local repository name, add desired name after repository link.
```
git clone https://github.com/winrecker/satellite-data-server.git <repo-name>
```
2. Change directory into local repository.
```
cd <repo-name>
```
3. Install dependencies from package.json to your local using command.
```
npm install
```
4. Run the project using command
* Development (with Nodemon)
```
npm run dev
```
* Production (without Nodemon)
```
npm start
```

# Data Providers

![Celestrak Logo](https://celestrak.org/images/CT-logo-lg-horz-1600x550TM.png)
* ## [Celestrak](https://celestrak.org)