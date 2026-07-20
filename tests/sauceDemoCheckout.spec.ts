import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

const checkoutScenarios = [
  {
    username: 'standard_user',
    password: 'secret_sauce',
    product: {
      name: 'Sauce Labs Backpack',
      slug: 'sauce-labs-backpack',
    },
    customer: {
      firstName: 'Ada',
      lastName: 'Lovelace',
      postalCode: '10001',
    },
    summary: {
      paymentInformation: 'SauceCard #31337',
      shippingInformation: 'Free Pony Express Delivery!',
      total: 'Total: $32.39',
    },
  },
];

for (const scenario of checkoutScenarios) {
  test(`complete checkout and logout as ${scenario.username}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await test.step('log in successfully', async () => {
      await loginPage.goto();
      await loginPage.login(scenario.username, scenario.password);
      await inventoryPage.expectInventoryPage();
    });

    await test.step('add the product and verify the cart', async () => {
      await inventoryPage.addProductToCart(scenario.product.slug);
      await inventoryPage.expectCartItemCount(1);
      await inventoryPage.openCart();
      await cartPage.expectProductInCart(scenario.product.name);
    });

    await test.step('enter checkout information', async () => {
      await cartPage.checkout();
      await checkoutPage.fillCustomerInformation(scenario.customer);
    });

    await test.step('verify the order summary', async () => {
      await checkoutPage.expectOrderSummary({
        productName: scenario.product.name,
        ...scenario.summary,
      });
    });

    await test.step('finish the order and verify confirmation', async () => {
      await checkoutPage.finishOrder();
      await checkoutPage.expectSuccessfulOrder();
    });

    await test.step('return home and log out', async () => {
      await checkoutPage.backToProducts();
      await inventoryPage.expectInventoryPage();
      await inventoryPage.logout();
      await loginPage.expectLoginPage();
    });
  });
}
