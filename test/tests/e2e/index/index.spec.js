//spec.js

describe('angularjs homepage', function() {
	it('should have a title', function(){
		browser.get('http://localhost:3000/#!/');

		expect(browser.getTitle()).toEqual('TA Hub');
	});

	it('should click first button and fill in info then login', function(){
		element(by.id('registerButton')).click();
		element(by.model('credentials.username')).sendKeys('Batman');
		element(by.model('credentials.password')).sendKeys('batcave12');
		element(by.model('credentials.firstName')).sendKeys('Bruce');
		element(by.model('credentials.lastName')).sendKeys('Wayne');
		element(by.id('registerSubmit')).click();
	});

	it('should be able to cancel the register process', function(){
		browser.get('http://localhost:3000/#!/')
		element(by.id('registerButton')).click();
		element(by.model('credentials.username')).sendKeys('Batman');
		element(by.model('credentials.password')).sendKeys('batcave12');
		element(by.model('credentials.firstName')).sendKeys('Bruce');
		element(by.model('credentials.lastName')).sendKeys('Wayne');
		element(by.id('registerCancel')).click();

	});

	it('should be able to show registration errors', function(){
		element(by.id('registerButton')).click();
		element(by.model('credentials.username')).sendKeys('Batman');
		element(by.model('credentials.password')).sendKeys('batcave12');
		element(by.model('credentials.firstName')).sendKeys('Bruce');
		element(by.id('registerSubmit')).click();
		element(by.id('registerCancel')).click();
		element(by.id('registerButton')).click();
		element(by.model('credentials.username')).sendKeys('Batman');
		element(by.model('credentials.password')).sendKeys('bat');
		element(by.model('credentials.firstName')).sendKeys('Bruce');
		element(by.model('credentials.lastName')).sendKeys('Wayne');
		element(by.id('registerSubmit')).click();
		element(by.id('registerCancel')).click();
	})


});