import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import SampleAppPage from '../../../support/pages/sampleappPage';
import { startDatetwoMonthsFromNow } from '../../../support/utils/util';

const sampleAppPage = new SampleAppPage();

Given('I am on the Sample App Automobile Insurance page', () => {
  sampleAppPage.visit();
  sampleAppPage.clickAutomobileInsuranceLink();
  sampleAppPage.verifyInsuranceTypeText('Automobile Insurance');
});

When('I fill out the {string} form and click {string}', (tabName, buttonName) => {
  if (tabName === "Enter Vehicle Data") {

    sampleAppPage.fillOutVehicleData('BMW', '110', '07/07/2021', '5', 'Gas', '1000', '20000');

  } else if (tabName === 'Enter Insurant Data') {

    sampleAppPage.fillOutInsurantData('Luiz', 'Araujo', '07/25/2000', 'Brazil', '50710180', 'Employee');

  } else if (tabName === 'Enter Product Data') {

    sampleAppPage.fillOutProductData(startDatetwoMonthsFromNow(), '5.000.000,00', 'Bonus 1', 'Partial Coverage', 'EuroProtection', 'Yes');

  } else if (tabName === 'Select Price Option') {

    sampleAppPage.selectPriceOption('selectgold');

  } else if (tabName === 'Send Quote') {

    sampleAppPage.fillQuoteForm('nathan.henry.aragao@gmapst.com', 'luiz12345', 'aqhZGTa0Tt');

  }

  // Verifica se todos os campos obrigatórios foram preenchidos
  sampleAppPage.verifyRequiredFieldsExists(tabName);

  // Envia o formulário ou avança para a próxima etapa, dependendo da guia atual.
  sampleAppPage.nextStepOrSendForm(tabName, buttonName);

});

Then('I should see the message {string}', (message) => {
  sampleAppPage.verifySuccessMessage(message);
});
