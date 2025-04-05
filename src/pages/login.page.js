import { Page } from "@playwright/test";
import path from 'path';

export class LoginPage {
    baseurl = "file://" + path.normalize(path.resolve("src/rest-reservation-mock.html"));
  

  locatorusername = "#username";
  locatoruserpass = "#password";

  locatorbuttonLogin = 'button[type="submit"]:text("Login")';

  locatorSubmit = 'button[type="submit"]:text("Submit Reservation")';

  locatorLinkReserve = 'a[href="#reserve"]';

  locatorSelectGuests = 'select[name="guests"]';
  locatorSelectTime = 'input[type="time"]';

  locatormessageError = '#confirmationMessage';


  /**
   *
   * @param {Page} page
   */

  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(this.baseurl);
  }

  async fillUserPass(username, password) {
    await this.page.locator(this.locatorusername).fill(username);
    await this.page.locator(this.locatoruserpass).fill(password);
  }

  async clickLoginButton() {
    await this.page.click(this.locatorbuttonLogin);
  }

  async clickReserveLink() {
    await this.page.click(this.locatorLinkReserve);
  }

  //select date tomorrow
  async selectTomorrowDate() {
    const today = new Date();
    today.setDate(today.getDate() + 1);
  
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
  
    const tomorrowDate = `${yyyy}-${mm}-${dd}`; // ✅ Correct format: YYYY-MM-DD
    console.log(tomorrowDate);
  
    await this.page.locator('#date').fill(tomorrowDate); // ✅ This will now work
  }
  
    async clickSubmitButton() {
        await this.page.click(this.locatorSubmit);
    }

    async selectTime() {
        const time = '18:00'; 
        await this.page.fill(this.locatorSelectTime, time);
    }

    async selectGuest(){
        await this.page.selectOption(this.locatorSelectGuests, '2');
    }

    async GetErrorMessage() {
        try {
          return (
            (await this.page
              .locator(this.locatormessageError)
              .textContent({ timeout: 1000 })) || ""
          );
        } catch (error) {
          return "";
        }
      }
    
    


}
