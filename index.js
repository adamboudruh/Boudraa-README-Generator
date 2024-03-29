const inquirer = require('inquirer');
const fs = require('fs'); //Imports inquirer and fs packages

inquirer
  .prompt([ //Prompts user for all the necessary information to generate a README about their project
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
    const title = data.projectTitle;
    const desc = data.description;
    const installation = data.installation.trim();
    const usageInfo = data.usageInfo.trim();
    const license = data.license;
    const contributing = data.contributing.trim();
    const test = data.test.trim();
    const github = data.github.trim();
    const email = data.email.trim(); 
    //Assigns all the user's input to easier variables
    //Trim removes any extra spaces to prevent empty variables from being truthy

    const licenseLink = generateLicense(license, true);
    const licenseString = generateLicense(license, false);

    fs.writeFile(`README.md`, (`
# ${title}\n
${licenseLink}\n\n
## Description\n${desc}\n\n
## Table of Contents\n
- [Installation](#installation)\n
- [Usage](#usage)\n
- [License](#license)\n
- [Contributing](#contributing)\n
- [Tests](#tests)\n
- [Questions](#questions)\n\n\n
## Installation\n${installation}\n\n
## Usage\n${usageInfo}\n\n
## License\nThis project is licensed under the terms of the ${licenseString}.\n\n
## Contributing\n${contributing}\n\n
## Tests\n${test}\n\n
## Questions\n
GitHub: https://github.com/${github}.\n
Please direct any questions to my email: [${email}](mailto:${email}).\n
    `), (err) =>err ? console.log(err) : console.log('Success!')); //Creates the README file and adds the title, description, table of contents, installation, usage, license, contributing, tests, and questions sections.
});

const generateLicense = (license, badge) => { //This function generates the license name or badge depending on the option selected.
    switch (license) {
        case 'MIT':
            return badge ? '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)' : `MIT License`;
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
