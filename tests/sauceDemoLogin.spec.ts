import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test('SauceDemo login scenarios for all users', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();

  const usernames = await loginPage.getUsernames();
  const password = await loginPage.getPassword();

  expect(usernames).toEqual([
    'standard_user',
    'locked_out_user',
    'problem_user',
    'performance_glitch_user',
    'error_user',
    'visual_user',
  ]);
  expect(password).toBeTruthy();

  for (const username of usernames) {
    await test.step(`login as ${username}`, async () => {
      await loginPage.goto();
      await loginPage.login(username, password);

      if (username === 'locked_out_user') {
        await expect(loginPage.errorMessage).toHaveText(
          'Epic sadface: Sorry, this user has been locked out.',
        );
        await expect(page).toHaveURL('https://www.saucedemo.com/');
      } else {
        await inventoryPage.expectInventoryPage();
      }
    });
  }
});
