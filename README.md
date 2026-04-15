# pw_edu

**pw_edu** is an automation testing framework built with Playwright and TypeScript. This project focuses on implementing the Page Object Model (POM) pattern for scalable and maintainable web testing.

## Installation

Use the [npm](https://www.npmjs.com/) package manager to set up the project.

```bash
# Clone the repository
git clone [https://github.com/vladsapun/pw_edu.git](https://github.com/vladsapun/pw_edu.git)
```
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

## Usage

```# Run all tests in headless mode
npm test 

# Run tests in interactive UI mode
npm run ui

# Run tests in a specific browser (e.g., Chromium)
npx playwright test --project=chromium

# View the latest HTML report
npx playwright show-report
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)