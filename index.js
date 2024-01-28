const inquirer = require('inquirer');
const fs = require('fs');

/*
Info that I need to pull from the user:
- Project Title
- Description
- Table of Contents
- Installation
- Usage information
- License
- Contributing
- Tests
- Questions
*/

inquirer
  .prompt([
    {
      type: 'input',
      name: 'projectTitle',
      message: 'What would you like to name your project?',
    },
    {
        type: 'input',
        name: 'description',
        message: 'Please enter a brief description of your project.',
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Please enter installation instructions for your project.',
    },
    {
        type: 'input',
        name: 'usageInfo',
        message: 'Please enter usage information for your project.',
    },
    {
        type: 'list',
        name: 'license',
        message: 'Please select a license for your project.',
        choices: ['MIT', 'Apache', 'GPL', 'BSD', 'Mozilla', 'None'],
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'Please enter contribution guidelines for your project.',
    },
    {
        type: 'input',
        name: 'test',
        message: 'Please enter test instructions for your project.',
    },
  ])
  .then((data) => {
    generateMarkdown(data);
  });


const generateMarkdown = (data) => {
    fs.writeFile(`README.md`, JSON.stringify(data, null, '\t'), (err) =>
        err ? console.log(err) : console.log('Success!')
    );
    fs.appendFile(`README.md`, `\n# ${data.projectTitle}\n\n`, (err) =>
        err ? console.log(err) : console.log('Success!')
    );
    fs.appendFile(`README.md`, `## Description\n${data.description}\n\n`, (err) =>
        err ? console.log(err) : console.log('Success!')
    );
    fs.appendFile(`README.md`, `## Table of Contents\n`, (err) =>
        err ? console.log(err) : console.log('Success!')
    );
}

const generateTableOfContents = (data) => {
    if(data.installation) {
        fs.appendFile(`README.md`, `- [Installation](#installation)\n`, (err) =>
            err ? console.log(err) : console.log('Success!')
        );
    }
    
}

const generateLicense = (license, badge) => {
    switch (license) {
        case 'MIT':
            return badge ? `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)` : `MIT License`;
        case 'Apache':
            return badge ? `[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)` : `Apache License 2.0`;
        case 'GPL':
            return badge ? `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)` : `GNU GPL v3 License`;
        case 'BSD':
            return badge ? `[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)` : `BSD 3-Clause License`;
        case 'Mozilla':
            return badge ? `[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)` : `Mozilla Public License 2.0`;
        case 'None':
            return `None`;
    }
}
