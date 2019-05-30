// spec.js
describe('Caso de uso 6', function() {
    it('Consultar bloques que forman la blockchain', function() {
      browser.waitForAngularEnabled(false);
      browser.get('http://156.35.163.141:8090/bloques');
  
      expect(browser.getTitle()).toEqual('Antonio Blockchain Dashboard');
      expect(element(by.id('timeline')).getText()).toEqual('Todos los bloques');
    });

    it('Consultar una transaccion de la blockchain', function() {
      browser.waitForAngularEnabled(false);
      browser.get('http://156.35.163.141:8090/buscar');
  
      element(by.id('txid')).sendKeys('e9c862446dbab024f04a8806fce0d40fb0e5a73090cdfde0651a623b51cc2e98');
      element(by.id('buscarBt')).click();

      expect(element(by.tagName('h6')).getText()).toBe('TxId: e9c862446dbab024f04a8806fce0d40fb0e5a73090cdfde0651a623b51cc2e98');
    });

    it('Consultar una transaccion no existente de la blockchain', function() {
      browser.waitForAngularEnabled(false);
      browser.get('http://156.35.163.141:8090/buscar');
  
      element(by.id('txid')).sendKeys('e9c862446dbab024f0');
      element(by.id('buscarBt')).click();

      expect(element(by.css('.error')).getText()).toBe('500');
    });

    it('Ver informacion general de la blockchain', function() {
      browser.waitForAngularEnabled(false);
      browser.get('http://156.35.163.141:8090/buscar');
  
      element(by.id('txid')).sendKeys('e9c862446dbab024f04a8806fce0d40fb0e5a73090cdfde0651a623b51cc2e98');
      element(by.id('buscarBt')).click();

      expect(element(by.tagName('h6')).getText()).toBe('TxId: e9c862446dbab024f04a8806fce0d40fb0e5a73090cdfde0651a623b51cc2e98');
    });
  });