# Akiflow Test Automation Framework

A comprehensive end-to-end test automation framework for the Akiflow web application using Playwright with TypeScript, implementing the Page Object Model pattern.

## 🚀 Features

- **Page Object Model (POM)** architecture for maintainable test code
- **Comprehensive test coverage** for all Akiflow features
- **Robust element location strategies** with fallback mechanisms
- **Automatic screenshot capture** for debugging and documentation
- **Retry mechanisms** for flaky elements and network issues
- **Detailed logging** and test step tracking
- **Cross-browser testing** support (Chrome, Firefox, Safari)
- **Headless and headed** browser modes
- **Video recording** and trace capture for failed tests

## 📁 Project Structure

```
akiflow-playwright-tests/
├── pages/                    # Page Object Model classes
│   ├── BasePage.ts          # Base page with common methods
│   ├── LoginPage.ts         # Login page interactions
│   └── DashboardPage.ts     # Dashboard and navigation
├── tests/                   # Test specifications
│   ├── login.spec.ts        # Login flow tests
│   └── dashboard.spec.ts    # Dashboard functionality tests
├── fixtures/                # Test data and configurations
│   └── testData.ts          # Test data interfaces and sample data
├── utils/                   # Utility functions
│   └── testUtils.ts         # Common test utilities and helpers
├── screenshots/             # Test screenshots (auto-generated)
├── videos/                  # Test recordings (auto-generated)
├── traces/                  # Test traces (auto-generated)
├── test-results/            # Test execution results
├── package.json             # Project dependencies and scripts
├── playwright.config.ts     # Playwright configuration
├── tsconfig.json            # TypeScript configuration
├── cursor.env.json          # Environment configuration
├── global-setup.ts          # Global test setup
├── global-teardown.ts       # Global test cleanup
└── README.md                # This file
```

## 🛠️ Prerequisites

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd akiflow-playwright-tests
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npm run install:browsers
   ```



## 🧪 Running Tests

### Basic Test Execution

```bash
# Run all tests
npm test

# Run tests in headed mode (visible browser)
npm run test:headed

# Run tests with UI mode
npm run test:ui

# Run tests in debug mode
npm run test:debug
```

### Specific Test Suites

```bash
# Run only login tests
npx playwright test tests/login.spec.ts

# Run only dashboard tests
npx playwright test tests/dashboard.spec.ts

# Run tests with specific browser
npx playwright test --project=chromium
```

### Test Reports

```bash
# View HTML test report
npm run test:report

# Generate JUnit report
npx playwright test --reporter=junit
```

## 🔧 Configuration

### Playwright Configuration (`playwright.config.ts`)

- **Browser projects**: Chrome, MS Edge, Safari
- **Test timeouts**: Configurable per test and global
- **Screenshots**: Captured on failure and manually
- **Videos**: Recorded for failed tests
- **Traces**: Captured for debugging

### Environment Configuration (`cursor.env.json`)

```json
{
  "AKIFLOW_BASE_URL": "https://web.akiflow.com",
  "AKIFLOW_EMAIL": "your-email@example.com",
  "AKIFLOW_CONFIRMATION_CODE": "your-confirmation-code",
  "TEST_TIMEOUT": 30000,
  "NAVIGATION_TIMEOUT": 10000,
  "SCREENSHOT_PATH": "./screenshots",
  "VIDEO_PATH": "./videos",
  "TRACE_PATH": "./traces"
}
```

## 📋 Test Coverage

### Login Tests
- ✅ Login page display and validation
- ✅ Email input functionality
- ✅ Confirmation code flow
- ✅ Error handling for invalid inputs
- ✅ Network error resilience

### Dashboard Tests
- ✅ Dashboard loading and verification
- ✅ Navigation to all major sections:
  - Inbox
  - Schedule
  - Tasks
  - Projects
  - Calendar
  - Settings
  - Integrations
  - Help
  - AI Bot (Aki)
  - Focus Mode
  - Time Blocking
  - Teams
- ✅ Dashboard statistics display
- ✅ Quick Add functionality
- ✅ Navigation state persistence

### Planned Test Coverage
- Task Management (CRUD operations)
- Project Management
- Time Blocking functionality
- Focus Mode and Focus Timer
- Calendar and Event Management
- AI Bot interactions
- Settings and Preferences
- Integration configurations

## 🏗️ Architecture

### Page Object Model (POM)

Each page in the application has a corresponding Page Object class:

```typescript
export class LoginPage extends BasePage {
  private emailInput: Locator;
  private continueButton: Locator;
  
  async enterEmail(email: string): Promise<void> {
    await this.waitForElement(this.emailInput);
    await this.fillWithRetry(this.emailInput, email);
  }
}
```

### Base Page Class

Common functionality shared across all pages:

```typescript
export class BasePage {
  async waitForElement(locator: Locator, timeout = 10000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }
  
  async takeScreenshot(name: string): Promise<string> {
    // Screenshot implementation
  }
}
```

### Test Utilities

Helper functions for common test operations:

```typescript
export class TestUtils {
  async findElementWithRetry(selectors: string[]): Promise<Locator | null> {
    // Multiple selector fallback strategy
  }
  
  async clickElementWithFallback(primarySelector: string, fallbackSelectors: string[]): Promise<boolean> {
    // Robust element clicking with fallbacks
  }
}
```

## 🔍 Element Location Strategies

The framework uses multiple strategies to locate elements:

1. **Primary selectors**: Specific, reliable selectors
2. **Fallback selectors**: Alternative locators if primary fails
3. **Retry mechanisms**: Multiple attempts with different strategies
4. **Dynamic waiting**: Wait for elements to be visible/attached

### Selector Examples

```typescript
// Multiple selector strategies
this.emailInput = this.page.locator('input[type="email"], input[name="email"], [data-testid="email-input"]');

// Fallback approach
await this.findElementWithRetry([
  'button:has-text("Continue")',
  '[data-testid="continue-button"]',
  '.continue-btn'
]);
```

## 📸 Screenshots and Debugging

### Automatic Screenshots

- **On test failure**: Automatic capture
- **Manual capture**: `await testUtils.takeScreenshot('description')`
- **Test step logging**: Each step is logged with timestamp

### Debug Information

```typescript
testUtils.logTestStep('Testing login functionality');
testUtils.logError('Login failed', error);
```

## 🚨 Error Handling

### Retry Mechanisms

- **Element location**: Multiple selector strategies
- **Click operations**: Retry with different approaches
- **Input operations**: Fallback strategies for form filling

### Error Recovery

- **Network issues**: Graceful timeout handling
- **Element not found**: Alternative locator strategies
- **Page load failures**: Retry mechanisms

## 🔄 Continuous Integration

### CI/CD Integration

```yaml
# Example GitHub Actions workflow
- name: Run Playwright Tests
  run: |
    npm ci
    npm run install:browsers
    npm test
```

### Test Reports

- **HTML reports**: Interactive test results
- **JUnit reports**: CI/CD integration
- **JSON reports**: Programmatic access to results

## 📚 Best Practices

### Test Design

1. **Independent tests**: Each test should be self-contained
2. **Clear naming**: Descriptive test names and step descriptions
3. **Proper assertions**: Verify expected outcomes
4. **Error handling**: Graceful failure handling

### Code Organization

1. **Page Objects**: Encapsulate page-specific logic
2. **Test Data**: Centralize test data in fixtures
3. **Utilities**: Reusable helper functions
4. **Configuration**: Environment-specific settings

### Maintenance

1. **Regular updates**: Keep dependencies current
2. **Selector maintenance**: Update locators as UI changes
3. **Test review**: Regular test case review and updates
4. **Documentation**: Keep README and code comments current

## 🐛 Troubleshooting

### Common Issues

1. **Element not found**: Check selector strategies and page state
2. **Test timeouts**: Adjust timeout values in configuration
3. **Browser issues**: Verify browser installation and compatibility
4. **Network problems**: Check connectivity and firewall settings

### Debug Commands

```bash
# Run tests with debug output
npm run test:debug

# Generate trace files
npx playwright test --trace=on

# View test results
npm run test:report
```

## 📈 Performance

### Optimization Tips

1. **Parallel execution**: Tests run in parallel by default
2. **Browser reuse**: Context sharing between tests
3. **Efficient selectors**: Use specific, reliable locators
4. **Minimal waits**: Only wait when necessary

### Monitoring

- **Test execution time**: Track test performance
- **Resource usage**: Monitor memory and CPU usage
- **Failure patterns**: Identify flaky tests and optimize

## 🤝 Contributing

### Development Workflow

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/new-test`
3. **Write tests**: Follow existing patterns and conventions
4. **Run tests**: Ensure all tests pass
5. **Submit pull request**: Include description of changes

### Code Standards

- **TypeScript**: Use strict typing
- **ESLint**: Follow linting rules
- **Documentation**: Include JSDoc comments
- **Testing**: Maintain test coverage

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

### Getting Help

1. **Documentation**: Check this README and inline code comments
2. **Issues**: Report bugs and feature requests via GitHub Issues
3. **Discussions**: Use GitHub Discussions for questions and ideas

### Resources

- [Playwright Documentation](https://playwright.dev/)
- [Akiflow Feature Guide](https://how-to-use-guide.akiflow.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Note**: This framework is designed for testing the Akiflow web application. Ensure you have proper authorization to test the application and follow responsible testing practices.






