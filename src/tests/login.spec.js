import { expect } from '@playwright/test';
import { test } from "../pages/base";
import { validUser } from '../test-data/user';

test.describe('Login Page', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
      });

    const username = validUser[0].username;
    const password = validUser[0].password;
    test('TC001:Valid User Login', async ({ loginPage }) => {
    
        await loginPage.fillUserPass(username, password);
        await loginPage.clickLoginButton();
        // const title = await page.title();
        // expect(title).toBe('Reservation Mock');
        await loginPage.clickReserveLink();

        await loginPage.selectTomorrowDate();
        await loginPage.selectTime();
        
        await loginPage.selectGuest();
        await loginPage.clickSubmitButton();

        expect(await loginPage.GetErrorMessage()).toContain("การจองเสร็จสมบูรณ");

    });
});

