# Playwright MCP – SauceDemo Test Automation

This project was created as part of a Software Testing Academy assignment to demonstrate AI-assisted test automation with Playwright MCP. The test code and project structure were generated through prompts rather than written manually.

The project automates login and end-to-end checkout scenarios for [SauceDemo](https://www.saucedemo.com/) using Playwright, TypeScript, the Page Object Model, and a data-driven testing approach.

## Assignment Objectives

- Configure and use Playwright MCP in a new Playwright project.
- Generate all test code through prompts.
- Apply the Page Object Model for clear separation of page interactions.
- Use data-driven testing for positive and negative login scenarios.
- Validate a complete purchase and checkout workflow.

## Automated Scenarios

### 1. Data-Driven Login Testing

The login test:

- Opens the SauceDemo website.
- Runs against all available SauceDemo users using a data-driven approach.
- Covers both successful and unsuccessful login scenarios.
- Verifies access to the inventory page for valid users.
- Verifies the appropriate error message when login is unsuccessful.

### 2. End-to-End Checkout

The checkout test:

- Logs in as `standard_user` and verifies successful authentication.
- Adds a product to the cart and confirms that it was added.
- Proceeds to checkout and enters the required customer information.
- Verifies that payment information, shipping information, and the price total are displayed.
- Completes the order and verifies both success messages.
- Returns to the inventory page and confirms successful navigation.
- Signs out and verifies redirection to the login page.


## Design and Approach

### Page Object Model

Page-specific locators and actions are organized into reusable page classes:

- `LoginPage` – authentication actions and login validation.
- `InventoryPage` – inventory, product selection, navigation, and sign-out actions.
- `CartPage` – cart content and checkout navigation.
- `CheckoutPage` – customer details, order overview, totals, and order completion.

### Data-Driven Testing

The login test uses a shared collection of user data to execute positive and negative scenarios consistently without duplicating test logic.

### Playwright MCP Workflow

The MCP server is configured in `.vscode/mcp.json`. The assignment requirements and prompt context are stored in `testContext/instructionsForBothTests.txt`. Playwright MCP was used to explore the application and generate the test project from the supplied instructions.

MCP is required for the AI-assisted generation workflow, but the completed Playwright tests can run independently from the command line.

## Technologies and Concepts

- TypeScript
- Playwright Test
- Playwright MCP
- Node.js
- Page Object Model
- Data-driven testing
- End-to-end testing
- AI-assisted test automation

## Purpose

This project demonstrates the use of prompts and Playwright MCP to generate structured, maintainable test automation while applying standard testing practices such as reusable page objects, data-driven coverage, and end-to-end validation.
