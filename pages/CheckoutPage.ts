import { Page, Locator, expect } from '@playwright/test';

export type CustomerInformation = {
  firstName: string;
  lastName: string;
  postalCode: string;
};

export type OrderSummary = {
  productName: string;
  paymentInformation: string;
  shippingInformation: string;
  total: string;
};

export class CheckoutPage {
  readonly page: Page;
  readonly title: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly paymentLabel: Locator;
  readonly paymentValue: Locator;
  readonly shippingLabel: Locator;
  readonly shippingValue: Locator;
  readonly priceTotalLabel: Locator;
  readonly total: Locator;
  readonly finishButton: Locator;
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly backToProductsButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.paymentLabel = page.locator('[data-test="payment-info-label"]');
    this.paymentValue = page.locator('[data-test="payment-info-value"]');
    this.shippingLabel = page.locator('[data-test="shipping-info-label"]');
    this.shippingValue = page.locator('[data-test="shipping-info-value"]');
    this.priceTotalLabel = page.locator('[data-test="total-info-label"]');
    this.total = page.locator('[data-test="total-label"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.completeText = page.locator('[data-test="complete-text"]');
    this.backToProductsButton = page.locator('[data-test="back-to-products"]');
  }

  async fillCustomerInformation(customer: CustomerInformation) {
    await expect(this.page).toHaveURL(/\/checkout-step-one\.html$/);
    await expect(this.title).toHaveText('Checkout: Your Information');
    await this.firstNameInput.fill(customer.firstName);
    await this.lastNameInput.fill(customer.lastName);
    await this.postalCodeInput.fill(customer.postalCode);
    await this.continueButton.click();
  }

  async expectOrderSummary(summary: OrderSummary) {
    await expect(this.page).toHaveURL(/\/checkout-step-two\.html$/);
    await expect(this.title).toHaveText('Checkout: Overview');
    await expect(this.page.locator('[data-test="inventory-item-name"]')).toHaveText(
      summary.productName,
    );
    await expect(this.paymentLabel).toHaveText('Payment Information:');
    await expect(this.paymentValue).toHaveText(summary.paymentInformation);
    await expect(this.shippingLabel).toHaveText('Shipping Information:');
    await expect(this.shippingValue).toHaveText(summary.shippingInformation);
    await expect(this.priceTotalLabel).toHaveText('Price Total');
    await expect(this.total).toHaveText(summary.total);
  }

  async finishOrder() {
    await this.finishButton.click();
  }

  async expectSuccessfulOrder() {
    await expect(this.page).toHaveURL(/\/checkout-complete\.html$/);
    await expect(this.title).toHaveText('Checkout: Complete!');
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
    await expect(this.completeText).toHaveText(
      'Your order has been dispatched, and will arrive just as fast as the pony can get there!',
    );
  }

  async backToProducts() {
    await this.backToProductsButton.click();
  }
}
