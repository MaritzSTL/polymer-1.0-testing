# Polymer 1.0 Testing

## Overview

* [Purpose of This Overview](#purpose-of-this-overview "Purpose of This Overview")
* [What This Overview Does Not Cover](#what-this-overview-does-not-cover "What This Overview Does Not Cover")
* [What You Should Already Know Before Starting](#what-you-should-already-know-before-starting "What You Should Already Know Before Starting")
* [Overview Prerequisite Setup](#overview-prerequisite-setup "Overview Prerequisite Setup")
* [Crash Course Overview](#crash-course-overview "Crash Course Overview")
* [Acronyms](#acronyms "Acronyms")
* [Resources](#resources "Resources")

## Purpose of This Overview

* The purpose of this overview is to learn the basics of Polymer 1.0 Testing using Mocha, Sinon, and Chai.
* Separation of Concerns (the following items are broken up as much as possible for clarity).
  * Mocha, Sinon, Chai
  * Web Component Tester
  * Configuration
  * HTML Imports
  * How to Test Things
  * When to Test With Certain Things

##### [back to top](#javascript-testing "Home")

---

## What This Overview Does Not Cover

This Polymer 1.0 Testing overview simply covers the basics of testing using Mocha, Sinon, Chai in relation to Polymer 1.0 web-components.

* Remote cloud testing services (e.g. [Sauce Labs](https://saucelabs.com "Sauce Labs"))
* Selenium automation (e.g. [Cross browser testing](https://www.seleniumhq.org "Selenium"))
* Appium automation (e.g. [Mobile device testing](http://appium.io "Appium"))
* Continuous testing (e.g. [Karma](https://karma-runner.github.io "Karma"), [Travis CI](https://travis-ci.org "Travis CI"))
* Continuous inspection (e.g. [SonarQube](https://www.sonarqube.org "SonarQube"))
* Automation test services (e.g. [TestCraft](https://www.testcraft.io "TestCraft"), [Leapwork](https://www.leapwork.com "Leapwork"))
* Please see the internal Maritz [Sauce Labs Orientation](https://github.com/MaritzSTL/sauce-labs-orientation "Sauce Labs Orientation") for more information on test automation.
* Extensive Web Component Tester Configuration
* Shady DOM & Shadow Dom Web Component Query Parameters [Polymer Polyfill Settings](https://polymer-library.polymer-project.org/2.0/docs/polyfills#settings "Polymer Polyfill Settings")
* Extensive Debugging Techniques
* Open Web Components [Robust Web Component Test Resources](https://open-wc.org/recommendations/testing.html#setup "open-wc")
  * This looks really interesting and worth looking into for a robust library of web component test helpers.
  * However, some of the great things here may only be applicable to Polymer 3.0 or JS imports.
  * [Open Web Component Test Examples](https://open-wc.org/recommendations/testing.html#example-tests "Test Examples")

##### [back to top](#javascript-testing "Home")

---

## What You Should Already Know Before Starting

* This overview presumes you have a basic understanding of the following

  * bower package management
  * npm package management
  * Plain JavaScript
  * Polymer 1.0

##### [back to top](#javascript-testing "Home")

---

## Overview Prerequisite Setup

* The necessary dependencies for this Polymer 1.0 Testing overview repository have already been installed.
* Martitz *auto-app-hyundai* should already have the necessary bower and npm installation.
* If you are working in your own project referencing the examples here, make sure you have Mocha, Sinon, and Chai installed as dev dependencies in your project's package.json file.
* Inspect the dev dependencies section of your project's package.json file to verify installation.  If they're already installed you can skip this step.  Otherwise, you can update them accordingly.
  * Install `npm install mocha sinon chai --save-dev`
  * Update `npm update mocha sinon chai --save-dev`
* More information about what these dependencies are and why you need them will be provided in the **Crash Course Overview** section.
* Dependencies for this repository have already been installed.  However, if you are using VSCode, you will need to install the following extensions to take advantage of the [Test Explorer UI](#test-explorer-ui) VSCode extension.

##### [back to top](#javascript-testing "Home")

---

### Test Explorer UI

![Alt](images/test-explorer-ui-icon.png "Test Explorer UI")

* Test Explorer UI is only compatible for Visual Studio Code users.  Robust IDE's like WebStorm offer built in test runner support.
* Test explorer UI is not compatible with testing Polymer 1.0 web-components (HTML imports).
* Make sure the extensions you install are from publisher *Holger Benl* as the configuration is setup explicitly for this publisher's set of extensions.  You can run the following commands via VSCode to make certain you have installed the correct extensions.

  [Test Explorer UI](https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-test-explorer "Test Explorer UI")  (base extension)

  `code --install-extension hbenl.vscode-test-explorer`

  [Mocha Test Runner](https://marketplace.visualstudio.com/items?itemName=cstechnologies.vscode-mocha-test-runner "Mocha Test Runner")

  `code --install-extension hbenl.vscode-mocha-test-adapter`

* Add the following configuration lines to your `settings.json` (create one if it does not already exist).
* Every test file in this overview will simply be named `test.js`.
  ```json
  {
    "mochaExplorer.mochaPath": ".test-explorer-ui-transpiler.js",
    "mochaExplorer.files": ".test_explorer_ui_transpilation/**/test.js",
    "testExplorer.codeLens": true,
    "testExplorer.errorDecoration": false,
    "testExplorer.gutterDecoration": true
  }
  ```
##### [back to Overview Prerequisite Setup](#overview-prerequisite-setup "Overview Prerequisite Setup")

---

##### [back to top](#javascript-testing "Home")

---

## Crash Course Overview

##### [back to top](#javascript-testing "Home")

| Frequently Asked Question                                            | Quick Summary                                                          | Reference
|----------------------------------------------------------------------|------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| What is Mocha?                                                       | Testing framework.                                                     | [Mocha](https://mochajs.org "Mocha")
| What is Sinon?                                                       | Test double library for spies, stubs and mocks.                        | [Sinon](https://sinonjs.org "SinonJS")
| What is Chai?                                                        | Assertion library.                                                     | [Chai](https://www.chaijs.com/api "Chai")
| What is Jasmine?                                                     | Testing framework.                                                     | [Jasmine](https://jasmine.github.io/ "Jasmine")
| What is the difference between Mocha and Jasmine?                    | Mocha relies on Sinon for test doubles.                                | [Mocha vs. Jasmine](https://en.wikipedia.org/wiki/Jasmine_(JavaScript_testing_framework)#cite_note-11 "Mocha vs. Jasmine")
| What is a `describe` hook?                                           | Describes the purpose of your test suite.                              | [`describe` hook](https://mochajs.org/#getting-started "describe hook")
| What is a test suite?                                                | A suite is a test.html file containing describe(s)                     | [Test Suite Example](https://mochajs.org/#--file-file "Test Suite Example")
| Why are Mocha arrow lambda functions discouraged?                    | Lambdas block access to the **this.Mocha** context.                    | [Avoiding Arrow Lambdas `()=>`](https://mochajs.org/#arrow-functions "Avoiding Arrow Lambdas")
| What if we are already using lambda functions?                       | We lose IDE Mocha context help during test development.                | [More Reason to Avoid Lambdas](https://github.com/meteor/tutorials/issues/87 "More Reason to Avoid Lambdas")
| What is a `beforeEach` hook?                                         | Executes code before every single test.                                | [`beforeEach` hook](https://mochajs.org/#root-level-hooks "beforeEach hook")
| What is a `afterEach` hook?                                          | Executes code after every single test.                                 | [`afterEach` hook](https://mochajs.org/#root-level-hooks "afterEach hook")
| What is a subject under test (sut)?                                  | Code being tested by a specific test(s)                                | [Subject Under Test](https://en.wikipedia.org/wiki/System_under_test "Subject Under Test")
| What types of assertions can I make?                                 | `assert` or `expect` most cases should suffice.                        | [Expect Styles](https://www.chaijs.com/api/bdd "Expectations"), [Assert Styles](https://www.chaijs.com/api/assert "Assertions")
| How do I run a single suite or test?                                 | `describe.only('Some single suite to run'` or `it.only(`               | [Run a Single Test](https://github.com/mochajs/mocha/blob/f9c650c34455d1f3ec2fbdd89fedcf392f618ced/test/only/bdd.spec.js#L4 "Run a Single Test")
| How do I ignore or skip a single test?                               | `xit('Some single test being ignored or skipped',`                     | [Skip or Ignore a Single Test](https://github.com/mochajs/mocha/blob/f9c650c34455d1f3ec2fbdd89fedcf392f618ced/test/integration/fixtures/pending/skip-shorthand.fixture.js#L6 "Skip or Ignore a Single Test")
| What is a test double?                                               | A test double is also referred to as a stub, mock, spy fake, or dummy. | [Test Double](https://en.wikipedia.org/wiki/Test_double "Test Double")
| What is a collaborator object?                                       | An object that works with another object to accomplish its goals.      | [Collaborator Object](https://learntdd.in/concepts.html#collaborator "Collaborator Object")
| What is a sandbox?                                                   | A test double wrapper that wraps the entire object.                    | [Sinon Sandboxes](https://sinonjs.org/releases/latest/sandbox "Sinon Sandboxes")
| What is web-component-tester?                                        | Browser and CLI web component test runner.                             | [Web Component Tester](https://github.com/Polymer/tools/tree/master/packages/web-component-tester "Web Component Tester")
| What is a `test-fixture`?                                            | Creates a web-component sut for testing.                               | [`</test-fixture>` template](https://www.webcomponents.org/element/@polymer/test-fixture "Test Fixture")

<br/>
<br/>

| Frequently Asked Question                                            | Examples                                                                                                                                                                     | Reference
|----------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------
| What is the difference between a unit test and integration test?     | [Difference Between a Unit Test and an Integration Test](#difference-between-a-unit-test-and-an-integration-test "Difference Between a Unit Test and an Integration Test")   | [What Is the Difference Between a Unit Test and Integration Test?](https://www.guru99.com/unit-test-vs-integration-test.html "What Is the Difference Between a Unit Test and Integration Test?")
| What are the differences between a stub, mock, spy, fake, and dummy? | [Test Double Usage Conditions](#test-double-usage-conditions "Test Double Usage Conditions")                                                                                 | [Test Double Differences](https://sinonjs.org/releases/latest "Test Double Differences")
| How do I apply argument matching?                                    |                                                                                                                                                                              | [Sinon Argument Matchers](https://sinonjs.org/releases/latest/matchers "Sinon Argument Matchers")
| How do I test an asynchronous method?                                |                                                                                                                                                                              | [Mocha Asynchronous Testing](https://mochajs.org/#asynchronous-code "Mocha Asynchronous Testing")
| How do I test promises?                                              |                                                                                                                                                                              | [Mocha Promise Testing (resolve, reject)](https://sinonjs.org/releases/latest/stubs/#stubresolvesvalue "Mocha Promise (resolve, reject) Testing")
| How do I mock an API call?                                           |                                                                                                                                                                              | [Sinon Request Fakes](https://sinonjs.org/releases/latest/fake-xhr-and-server "Sinon Request Fakes")
| How do I test the order of method calls?                             |                                                                                                                                                                              | [Sinon Assertions (Asserting Call Order)](https://sinonjs.org/releases/latest/assertions/#sinonassertcallorderspy1-spy2- "Sinon Assertions (Asserting Call Order)")
| How do I manipulate a callback function?                             |                                                                                                                                                                              | [Sinon Replacing Callback Functions](https://sinonjs.org/releases/latest/sandbox/#sandboxreplaceobject-property-replacement "Sinon Replacing Callback Functions")
| What is the `wct.config.json` file?                                  | [Local `wct.config.json` File](./wct.config.json "Example")                                                                                                                  | [WCT Config Documentation](https://github.com/Polymer/tools/tree/master/packages/web-component-tester#configuration "Configuration Snippet")
| How do I run tests in the browser?                                   | [Running Tests From the Browser](#running-tests-from-the-browser "Running Tests From the Browser")                                                                           | [Polymer 1.0 Documentation](https://polymer-library.polymer-project.org/1.0/docs/tools/tests#run-tests-interactively "Browser Ran Tests")
| How do I run tests from the command-line?                            | [Running Tests From the Command Line](#running-tests-from-the-command-line "Running Tests From the Command Line")                                                            | Same As [Running Tests From the Browser](#running-tests-from-the-browser "Running Tests From the Browser")
| How do I debug tests?                                                | Same As [Running Tests From the Browser](#running-tests-from-the-browser "Running Tests From the Browser")                                                                   | By running tests in the browser (Polymer 1.0).
| How do I add a new HTML test file?                                   | [Adding a New test.html File](#adding-a-new-test.html-file "Adding a New test.html File")                                                                                    | [Loading Suites `WCT.loadSuites([]);`](https://polymer-library.polymer-project.org/1.0/docs/tools/tests#test-sets "Loading Suites")
| How do I test multiple different browsers locally?                   | [How Do I Test Multiple Different Browsers Locally?](#how-do-i-test-multiple-different-browsers-locally? "How Do I Test Multiple Different Browsers Locally?")               | [Launch Pad Resource](https://github.com/bitovi/launchpad "Launch Pad Resource")
| Are there any Polymer online community site(s)?                      | [Resources](#resources) section for additional information.                                                                                                                  | [Polymer Slack Channel](https://polymer.slack.com "Polymer Slack Channel") is an excellent Polymer community resource.

##### [back to top](#javascript-testing "Home")

---

### Test Double Usage Conditions

| Test Double | Usage Condition                                                                                       | Sinon Syntax
|-------------|-------------------------------------------------------------------------------------------------------|----------------------------------------------------------
| Dummy       | An anonymous stub object for parameter fulfillment.                                                   | `var` stub = `sinon`.`stub`();
| Fake        | When we need to records arguments, values, and exceptions thrown (if any) for collaborators.          | `var` fake = `sinon`.`fake`.`returns`(` `"`apple pie`");
| Stub        | When we need to control a method's behavior from a test to force the code down a specific path.       | `var` stub = `sinon`.`stub`(`object`,` `"`method`");
| Spy         | When the behavior of the spied-on function is not under test, you can use an anonymous function spy.  | `var` spy = `sinon`.`spy`(`object`,` `"`method`");
| Mock        | When we **only** need to control what a collaborator returns **but** verify it's input arguments.     | `var` mock = `sinon`.`mock`(`obj`);


##### [back to Crash Course Overview](#crash-course-overview "Crash Course Overview")

---


### Difference Between a Unit Test and an Integration Test

*Unit tests don't need a database or network connection to pass.*

| Unit Test                                                                                                                            | Integration Test
|--------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------
| The idea behind Unit Testing is to test each part of the program and show that the individual parts are correct.                     | The idea behind Integration Testing is to combine modules in the application and test as a group to see that they are working fine.
| It is kind of White Box Testing.                                                                                                     | It is kind of Black Box Testing.
| It can be performed at any time.                                                                                                     | It usually carried out after Unit Testing and before System Testing.
| Unit Testing tests only the functionality of the units themselves and may not catch integration errors, or other system-wide issues. | Integrating testing may detect errors when modules are integrated to build the overall system.
| It starts from the module specification.                                                                                             | It starts from the interface specification.
| It pays attention to the behavior of single modules.                                                                                 | It pays attention to integration among modules.
| Unit test does not verify whether your code works with external dependencies correctly.                                              | Integration tests verifies that your code works with external dependencies correctly.
| It is usually executed by developer.                                                                                                 | It is usually executed by test team.
| Finding errors are easy.                                                                                                             | Finding errors are difficult.
| Maintenance of unit test is cheap.                                                                                                   | Maintenance of integration test is expensive.

##### [back to Crash Course Overview](#crash-course-overview "Crash Course Overview")

---

### Running Tests From the Browser

1. Run `npm run start`
2. Paste the following line in your desired browser to test.
    * e.g. `localhost:8080/test/ci-page-home_test.html`

##### [back to Crash Course Overview](#crash-course-overview "Crash Course Overview")

---

### Running Tests From the Command Line

| Command                                                                                                  | Description                                        |
|----------------------------------------------------------------------------------------------------------|----------------------------------------------------|
| `wct --expanded --configFile .\wct.config.json`                                                          | Runs all tests.                                    |
| `wct --expanded --configFile .\wct.config.json .\test\your-test-file_test.html`                          | Runs specified test class.                         |
| `wct --expanded --configFile .\wct.config.json --job-name 'My Job Name'`                                 | Runs all tests with specified job name.            |
| `wct --expanded --configFile .\wct.config.json --job-name 'My Job Name' .\test\your-test-file_test.html` | Runs specified test class with specified job name. |
| `wct --help`                                                                                             | Web component tester help menu commands.           |
| `polymer test`                                                                                           | Polymer web component tester command.              |
| `polymer --help`                                                                                         | Polymer test help menu commands.                   |

##### [back to Crash Course Overview](#crash-course-overview "Crash Course Overview")

---

### Adding a New test.html File

1. Create your new test file in the project's test folder.
2. Add the following basic scaffolding minimum content your test file.
    * Include basic entry test to test the existence of the element.
    * Make sure your HTML import scripts are as fully qualified as possible (there have been known timing issues otherwise).
      * `../bower_components/webcomponentsjs/webcomponents-lite.js`
      * `../bower_components/web-component-tester/browser.js`
    * Ensure you are using functions and not lambdas ([Avoiding Arrow Lambdas `()=>`](https://mochajs.org/#arrow-functions "Avoiding Arrow Lambdas"))

```html
<!doctype html>
<html>

<head>
  <title>your-test-file test</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, minimum-scale=1.0, initial-scale=1, user-scalable=yes">
  <script src="../bower_components/webcomponentsjs/webcomponents-lite.js"></script>
  <script src="../bower_components/web-component-tester/browser.js"></script>

  <link rel="import" href="../your-directory/your-test-file_test.html">
</head>

<body>
  <test-fixture id="basic">
    <template>
      <your-test-file></your-test-file>
    </template>
  </test-fixture>

  <script>
    describe('your-test-file', function() {
      let _testElement;

      beforeEach(function() {
        _testElement = fixture('basic');
      });

      it('instantiating the element works', function() {
        expect(_testElement.root).to.exist;
        expect(_testElement.localName).to.equal('your-test-file');
        expect(Polymer.DomModule.import(_testElement.localName)).to.exist;
      });
    });
  </script>
</body>
</html>
```

3. Add the name of your test WCT.loadSuites array.

```html
<script>
  WCT.loadSuites([
    'your-test-file_test.html'
  ]);
</script>
```

4. Add your additional tests accordingly.

```html
<script>
  describe('your-test-file', function() {
    let _testElement;

    beforeEach(function() {
      _testElement = fixture('basic');
    });

    it('instantiating the element works', function() {
      expect(_testElement.root).to.exist;
      expect(_testElement.localName).to.equal('your-test-file');
      expect(Polymer.DomModule.import(_testElement.localName)).to.exist;
    });

    describe('someMethod()', function() {
      it('does something', function() {
      });
      it('then does something else', function() {
      });
    });
  });
</script>
```

##### [back to Crash Course Overview](#crash-course-overview "Crash Course Overview")

---

### How Do I Test Multiple Different Browsers Locally?

1. Set the following key value pairs as **System** environment variables for your desired installed browsers.

2. For Windows machine users, see [How to set Windows environment variables](#how-to-set-Windows-environment-variables).

    * Critical note for Windows users
        * Make sure all the following values are entered, then move their positions all the way to the top of environment variable path list. Windows will traverse through all environment variables when searching for appropriate key value pair matches.  This has been known to take three to five minutes to begin test runs if the environment variables are not immediately found at the top of the environment variable path list. Environment variables can be repositioned when entered as a **Path** environment variable.  This is only necessary when running tests locally via command line when Sauce Labs is disabled.
        * Only provide the key value pairs for browsers that you actually have installed.
        * Your path to the installation of course may vary.

    | Key                                          | Value                                                           |
    |----------------------------------------------|-----------------------------------------------------------------|
    | `LAUNCHPAD_BROWSERS`                         | chrome, edge, firefox, ie, opera                                |
    | `LAUNCHPAD_CHROME`                           | C:\Program Files\Google\Chrome\Application\chrome.exe           |
    | `LAUNCHPAD_EDGE`                             | C:\Windows\SystemApps\Microsoft.MicrosoftEdge\MicrosoftEdge.exe |
    | `LAUNCHPAD_FIREFOX`                          | C:\Program Files\Mozilla Firefox\firefox.exe                    |
    | `LAUNCHPAD_IE`                               | C:\Windows\explorer.exe                                         |
    | `LAUNCHPAD_OPERA`                            | C:\Program Files\Opera\00.0.0000.00\opera.exe                   |

3. For Mac OS/Linux machine users:
    * Please install your environment variables accordingly.
    * Mac OS/Linux users don't have to worry about the position(s) of the environment variables.

##### [back to Crash Course Overview](#crash-course-overview "Crash Course Overview")

---

### How to set Windows environment variables

1. Click **Start** on the task bar.
2. For **Search programs and fields**, enter Environment Variables.
3. Click **Edit the environment variables**.  This will open the **System Properties** dialog.
4. Click **Environment Variables**.  This will open the **Environment Variables** dialog.
5. In the **System variables** section, click **New**.
6. This will open the **New System Variable** dialog.
7. For **Variable name**, enter `LAUNCHPAD_BROWSERS`.
8. For **Variable value**, enter your installed list of browsers (e.g. chrome, edge, firefox, ie, opera).
9. Click OK.
10. Repeat 4 - 8 to add the remaining applicable key value pairs.

##### [back to How Do I Test Multiple Different Browsers Locally?](#how-do-i-test-multiple-different-browsers-locally? "How Do I Test Multiple Different Browsers Locally?")

---

## Acronyms

| Acronym |                                    |
|---------|------------------------------------|
| api     | Application Programming Interface  |
| bdd     | Behavior Driven Development        |
| cli     | Command Line Interface             |
| cmd     | Command                            |
| dev     | Development                        |
| html    | Hypertext Markup Language          |
| ide     | Integrated Development Environment |
| js      | JavaScript                         |
| npm     | Node Package Manager               |
| sut     | Subject Under Test                 |
| tdd     | Test Driven Development            |
| ui      | User Interface                     |
| url     | Universal Resource Locator         |
| vscode  | Visual Studio Code                 |
| wct     | Web Component Tester               |

##### [back to top](#javascript-testing "Home")

---

## Resources

| Name                                                                 | Resource
|----------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Appium automation                                                    | [Mobile device testing](http://appium.io "Appium")
| Are there any Polymer online community site(s)?                      | [Polymer Slack Channel](https://polymer.slack.com "Polymer Slack Channel") is an excellent Polymer community resource.
| Automation test services                                             | [TestCraft](https://www.testcraft.io "TestCraft"), [Leapwork](https://www.leapwork.com "Leapwork")
| Chai                                                                 | [Chai](https://www.chaijs.com/api "Chai")
| Continuous testing                                                   | [Karma](https://karma-runner.github.io "Karma"), [Travis CI](https://travis-ci.org "Travis CI")
| How do I add a new HTML test file?                                   | [Loading Suites `WCT.loadSuites([]);`](https://polymer-library.polymer-project.org/1.0/docs/tools/tests#test-sets "Loading Suites")
| How do I apply argument matching?                                    | [Sinon Argument Matchers](https://sinonjs.org/releases/latest/matchers "Sinon Argument Matchers")
| How do I ignore or skip a single test?                               | [Skip or Ignore a Single Test](https://github.com/mochajs/mocha/blob/f9c650c34455d1f3ec2fbdd89fedcf392f618ced/test/integration/fixtures/pending/skip-shorthand.fixture.js#L6 "Skip or Ignore a Single Test")
| How do I manipulate a callback function?                             | [Sinon Replacing Callback Functions](https://sinonjs.org/releases/latest/sandbox/#sandboxreplaceobject-property-replacement "Sinon Replacing Callback Functions")
| How do I mock an API call?                                           | [Sinon Request Fakes](https://sinonjs.org/releases/latest/fake-xhr-and-server "Sinon Request Fakes")
| How do I run a single suite or test?                                 | [Run a Single Test](https://github.com/mochajs/mocha/blob/f9c650c34455d1f3ec2fbdd89fedcf392f618ced/test/only/bdd.spec.js#L4 "Run a Single Test")
| How do I run tests in the browser?                                   | [Polymer 1.0 Documentation](https://polymer-library.polymer-project.org/1.0/docs/tools/tests#run-tests-interactively "Browser Ran Tests")
| How do I test an asynchronous method?                                | [Mocha Asynchronous Testing](https://mochajs.org/#asynchronous-code "Mocha Asynchronous Testing")
| How do I test multiple different browsers locally?                   | [Launch Pad Resource](https://github.com/bitovi/launchpad "Launch Pad Resource")
| How do I test promises?                                              | [Mocha Promise Testing (resolve, reject)](https://sinonjs.org/releases/latest/stubs/#stubresolvesvalue "Mocha Promise (resolve, reject) Testing")
| How do I test the order of method calls?                             | [Sinon Assertions (Asserting Call Order)](https://sinonjs.org/releases/latest/assertions/#sinonassertcallorderspy1-spy2- "Sinon Assertions (Asserting Call Order)")
| Jasmine                                                              | [Jasmine](https://jasmine.github.io/ "Jasmine")
| Maritz Sauce Labs Orientation                                        | [Sauce Labs Orientation](https://github.com/MaritzSTL/sauce-labs-orientation "Sauce Labs Orientation")
| Mocha                                                                | [Mocha](https://mochajs.org "Mocha")
| Open Web Components                                                  | [Robust Web Component Test Resources](https://open-wc.org/recommendations/testing.html#setup "open-wc")
| Open Web Components Test Examples                                    | [Open Web Component Test Examples](https://open-wc.org/recommendations/testing.html#example-tests "Test Examples")
| Polymer 1.0 Library                                                  | [Polymer 1.0 Library](https://polymer-library.polymer-project.org/1.0/docs/devguide/feature-overview "Polymer 1.0 Library")
| Polymer Project                                                      | [Polymer Project](https://www.polymer-project.org/ "Polymer Project")
| Remote cloud testing services                                        | [Sauce Labs](https://saucelabs.com "Sauce Labs")
| Selenium automation                                                  | [Cross browser testing](https://www.seleniumhq.org "Selenium")
| Shady DOM & Shadow Dom Web Component Query Parameters                | [Polymer Polyfill Settings](https://polymer-library.polymer-project.org/2.0/docs/polyfills#settings "Polymer Polyfill Settings")
| Sinon                                                                | [Sinon](https://sinonjs.org "SinonJS")
| What are the differences between a stub, mock, spy, fake, and dummy? | [Test Double Differences](https://sinonjs.org/releases/latest "Test Double Differences")
| What if we are already using lambda functions?                       | [More Reason to Avoid Lambdas](https://github.com/meteor/tutorials/issues/87 "More Reason to Avoid Lambdas")
| What is a `afterEach` hook?                                          | [`afterEach` hook](https://mochajs.org/#root-level-hooks "afterEach hook")
| What is a `beforeEach` hook?                                         | [`beforeEach` hook](https://mochajs.org/#root-level-hooks "beforeEach hook")
| What is a `describe` hook?                                           | [`describe` hook](https://mochajs.org/#getting-started "describe hook")
| What is a `test-fixture`?                                            | [`</test-fixture>` template](https://www.webcomponents.org/element/@polymer/test-fixture "Test Fixture")
| What is a collaborator object?                                       | [Collaborator Object](https://learntdd.in/concepts.html#collaborator "Collaborator Object")
| What is a sandbox?                                                   | [Sinon Sandboxes](https://sinonjs.org/releases/latest/sandbox "Sinon Sandboxes")
| What is a subject under test (sut)?                                  | [Subject Under Test](https://en.wikipedia.org/wiki/System_under_test "Subject Under Test")
| What is a test double?                                               | [Test Double](https://en.wikipedia.org/wiki/Test_double "Test Double")
| What is a test suite?                                                | [Test Suite Example](https://mochajs.org/#--file-file "Test Suite Example")
| What is the `wct.config.json` file?                                  | [WCT Config Documentation](https://github.com/Polymer/tools/tree/master/packages/web-component-tester#configuration "Configuration Snippet")
| What is the difference between a unit test and integration test?     | [What Is the Difference Between a Unit Test and Integration Test?](https://www.guru99.com/unit-test-vs-integration-test.html "What Is the Difference Between a Unit Test and Integration Test?")
| What is the difference between Mocha and Jasmine?                    | [Mocha vs. Jasmine](https://en.wikipedia.org/wiki/Jasmine_(JavaScript_testing_framework)#cite_note-11 "Mocha vs. Jasmine")
| What is web-component-tester?                                        | [Web Component Tester](https://github.com/Polymer/tools/tree/master/packages/web-component-tester "Web Component Tester")
| What types of assertions can I make?                                 | [Expect Styles](https://www.chaijs.com/api/bdd "Expectations"), [Assert Styles](https://www.chaijs.com/api/assert "Assertions")
| Why are Mocha arrow lambda functions discouraged?                    | [Avoiding Arrow Lambdas `()=>`](https://mochajs.org/#arrow-functions "Avoiding Arrow Lambdas")

##### [back to top](#javascript-testing "Home")