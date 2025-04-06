import { expect } from '@playwright/test';
import { test } from "../pages/base";
import { validUser } from '../test-data/user';

test.describe('Login Page', () => {

    test.beforeEach(async ({ loginPage }) => {
        
        await loginPage.goto();
      });

    const username = validUser[0].username;
    const password = validUser[0].password;
    test('TC001:User Login and Book Table Successfully', async ({ loginPage }) => {
    
        await loginPage.fillUserPass(username, password);
        await loginPage.clickLoginButton();
        await loginPage.clickReserveLink();

        await loginPage.selectTomorrowDate();
        await loginPage.selectTime();
        
        await loginPage.selectGuest();
        await loginPage.clickSubmitButton();

        expect(await loginPage.GetErrorMessage()).toContain("การจองเสร็จสมบูรณ");

    });
});

