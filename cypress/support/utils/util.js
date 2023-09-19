export const getTabById = (tabName) => {
    const tabId = tabName.replace(/\s/g, '').toLowerCase();
    return cy.get(`#${tabId}`);
  };

export const getElementById = (id) => {
    return cy.get(`[id="${id}"]`);
  };

export const startDatetwoMonthsFromNow = () => {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + 2);
  
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const year = currentDate.getFullYear();
  
    const formattedDate = `${month}/${day}/${year}`;
    
    return formattedDate;
  };