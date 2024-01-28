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
    {
        type: 'input',
        name: 'github',
        message: 'Please enter your GitHub username.',
    },
    {
        type: 'input',
        name: 'email',
        message: 'Please enter your email address.',
    }
  ])
  .then((data) => {
    generateMarkdown(data);
  });


const generateMarkdown = (data) => {

    const title = data.projectTitle;
    const desc = data.description;
    const installation = data.installation.trim();
    const usageInfo = data.usageInfo.trim();
    const license = data.license;
    const contributing = data.contributing.trim();
    const test = data.test.trim();
    const github = data.github.trim();
    const email = data.email.trim();


    fs.writeFile(`README.md`, (`# ${title}\n\n`), (err) =>err ? console.log(err) : console.log('Created file!'));
    if (license !== 'None') {
        fs.appendFile(`README.md`, `${generateLicense(license, true)}\n\n`, (err) => err ? console.log(err) : console.log('Added badge!'));
    }
    fs.appendFile(`README.md`, `## Description\n${desc}\n\n`, (err) =>
        err ? console.log(err) : console.log('Added description!')
    );
    fs.appendFile(`README.md`, `## Table of Contents\n`, (err) =>  
        err ? console.log(err) : console.log('Added table of contents!')
    );
        if(installation) {
            fs.appendFile(`README.md`, `- [Installation](#installation)\n`, (err) =>
                err ? console.log(err) : console.log('Success!')
            );
        }
        if(usageInfo) {
            fs.appendFile(`README.md`, `- [Usage](#usage)\n`, (err) =>
                err ? console.log(err) : console.log('Success!')
            );
        }
        if(license !== 'None') {
            fs.appendFile(`README.md`, `- [License](#license)\n`, (err) =>
                err ? console.log(err) : console.log('Success!')
            );
        }
        if(data.contributing.trim()) {
            fs.appendFile(`README.md`, `- [Contributing](#contributing)\n`, (err) =>
                err ? console.log(err) : console.log('Success!')
            );
        }
        if(data.test.trim()) {
            fs.appendFile(`README.md`, `- [Tests](#tests)\n`, (err) =>
                err ? console.log(err) : console.log('Success!')
            );
        }
        if(data.github.trim() || data.email.trim()) {
            fs.appendFile(`README.md`, `- [Questions](#questions)\n`, (err) =>
                err ? console.log(err) : console.log('Success!')
            );
        }
        fs.appendFile('README.md', `\n\n`, (err) => 
            err ? console.log(err) : console.log('Success!')
        );
    if (installation) {
        fs.appendFile(`README.md`, `## Installation\n${installation}\n\n`, (err) =>
            err ? console.log(err) : console.log('Added installation!')
        );
    };
    if (usageInfo) {
        fs.appendFile(`README.md`, `## Usage\n${usageInfo}\n\n`, (err) =>
            err ? console.log(err) : console.log('Added usage info!')
        );
    };
    if (license) {
        fs.appendFile(`README.md`, `## License\nThis project is licensed under the terms of the ${generateLicense(license, false)}.\n\n`, (err) =>
            err ? console.log(err) : console.log('Added license!')
        );
    };
    if (contributing) {
        fs.appendFile(`README.md`, `## Contributing\n${contributing}\n\n`, (err) =>
            err ? console.log(err) : console.log('Added contribution guidelines!')
        );
    };
    if (test) {
        fs.appendFile(`README.md`, `## Tests\n${test}\n\n`, (err) =>
            err ? console.log(err) : console.log('Added test instructions!')
        );
    };
    if (github || email) {
        fs.appendFile(`README.md`, `## Questions\n`, (err) => err ? console.log(err) : console.log('Added questions!'));
        if (github) {
            fs.appendFile(`README.md`, `GitHub: https://github.com/${github}.\n`, (err) => err ? console.log(err) : console.log('Added GitHub!'));   
        }
        if (email) {
            fs.appendFile(`README.md`, `\nPlease direct any questions to my email: [${email}](mailto:${email}).\n`, (err) => err ? console.log(err) : console.log('Added email!'));
        }
    };
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
