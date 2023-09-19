class SampleAppPage {
  constructor() {
    this.vehicleDataTab = 'a#entervehicledata';
    this.insurantDataTab = 'a#enterinsurantdata';
    this.productDataTab = 'a#enterproductdata';
    this.priceOptionTab = 'a#selectpriceoption';
    this.sendQuoteTab = 'a#sendquote';
    this.selectedInsurance = 'span#selectedinsurance';
    this.successMessage = 'div.sweet-alert h2';
  }

  visit() {
    cy.visit('/101/app.php');
  }

  clickAutomobileInsuranceLink() {
    cy.get('.main-navigation .menu-item > #nav_automobile').click();
  }

  verifyInsuranceTypeText(text) {
    cy.get(this.selectedInsurance).should('have.text', text);
  }

  verifyRequiredFieldsExists(tabName) {
    const tabId = tabName.replace(/\s/g, '').toLowerCase();
    cy.get(`a#${tabId} span.counter.zero`).should('exist');
  }

  fillOutVehicleData(make, enginePerformance, dateOfManufacture, seats, fuel, listPrice, mileage) {
    // cy.get(this.vehicleDataTab).click();
    cy.get('select#make').select(make);
    cy.get('input#engineperformance').type(enginePerformance);
    cy.get('input#dateofmanufacture').type(dateOfManufacture);
    cy.get('select#numberofseats').select(seats);
    cy.get('select#fuel').select(fuel);
    cy.get('input#listprice').type(listPrice);
    cy.get('input#annualmileage').type(mileage);
  }

  fillOutInsurantData(firstName, lastName, birthdate, country, zipcode, occupation) {
    // cy.get(this.insurantDataTab).click();
    cy.get('input#firstname').type(firstName);
    cy.get('input#lastname').type(lastName);
    cy.get('input#birthdate').type(birthdate);
    cy.get('select#country').select(country);
    cy.get('input#zipcode').type(zipcode);
    cy.get('select#occupation').select(occupation);
    cy.get('input#skydiving').click({ force: true });
  }
  
  fillOutProductData(startDate, insuranceSum, meritRating, damageInsurance, euroProtection, courtesyCar) {
    cy.get('input#startdate').type(startDate);
    cy.get('select#insurancesum').select(insuranceSum);
    cy.get('select#meritrating').select(meritRating);
    cy.get('select#damageinsurance').select(damageInsurance);
    cy.get(`input#${euroProtection}`).click({ force: true });
    cy.get('select#courtesycar').select(courtesyCar);
  }

  selectPriceOption(option) {
    cy.get(`input#${option}`).click({ force: true });
  }

  fillQuoteForm(email, username, password) {
    cy.get('input#email').type(email);
    cy.get('input#username').type(username);
    cy.get('input#password').type(password);
    cy.get('input#confirmpassword').type(password);
  }

  clickButtonByText(selector, buttonText) {
    cy.get(selector)
      .contains(buttonText)
      .should('be.visible')
      .click();
  }

  nextStepOrSendForm(tabName, buttonName) {
    if (tabName === 'Send Quote') {
      cy.intercept('POST', '/101/tcpdf/pdfs/quote.php').as('sendForm');

      cy.on('uncaught:exception', (err, runnable) => {
        return false;
      });

      this.clickButtonByText('section[style="display: block;"] [id="sendemail"]', `« ${buttonName} »`);

      cy.wait('@sendForm', { timeout: 10000 }).should((xhr) => {
        expect(xhr.response.statusCode).to.equal(200);
      });
    } else {
      this.clickButtonByText('section[style="display: block;"] [class*="next"]', `${buttonName} »`);
    }
  }

  verifySuccessMessage(message) {
    cy.get(this.successMessage).should('contain', message);
  }
}

export default SampleAppPage;
