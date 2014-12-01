//spec.js

describe('angularjs homepage', function() {

	beforeEach(function() {
		browser.get('http://localhost:3000/#!/');
	});

	it('should have a title', function(){
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
		element(by.id('registerButton')).click();
		element(by.model('credentials.username')).sendKeys('Batman');
		element(by.model('credentials.password')).sendKeys('batcave12');
		element(by.model('credentials.firstName')).sendKeys('Bruce');
		element(by.model('credentials.lastName')).sendKeys('Wayne');
		element(by.id('registerCancel')).click();

	});

	it('should not allow a register without a password', function(){
		element(by.id('registerButton')).click();
		element(by.model('credentials.username')).sendKeys('Batman');
		element(by.model('credentials.firstName')).sendKeys('Bruce');
		element(by.model('credentials.lastName')).sendKeys('Wayne');
		element(by.id('registerSubmit')).click();
		element(by.id('registerCancel')).click();


	});

	it('should not allow a register without a username', function(){
		element(by.id('registerButton')).click();
		element(by.model('credentials.password')).sendKeys('batcave12');	
		element(by.model('credentials.firstName')).sendKeys('Bruce');
		element(by.model('credentials.lastName')).sendKeys('Wayne');
		element(by.id('registerSubmit')).click();
		element(by.id('registerCancel')).click();

	});

	it('should not allow a register without a First Name', function(){
		element(by.id('registerButton')).click();
		element(by.model('credentials.username')).sendKeys('Batman');
		element(by.model('credentials.password')).sendKeys('batcave12');	
		element(by.model('credentials.lastName')).sendKeys('Wayne');
		element(by.id('registerSubmit')).click();
		element(by.id('registerCancel')).click();
	});

	it('should not allow a register without a Last Name', function(){
		element(by.id('registerButton')).click();
		element(by.model('credentials.username')).sendKeys('Batman');
		element(by.model('credentials.password')).sendKeys('batcave12');
		element(by.model('credentials.firstName')).sendKeys('Bruce');	
		element(by.id('registerSubmit')).click();
		element(by.id('registerCancel')).click();
	});

	it('should not allow a register with a short password', function(){
		element(by.id('registerButton')).click();
		element(by.model('credentials.username')).sendKeys('Batman');
		element(by.model('credentials.password')).sendKeys('bat');
		element(by.model('credentials.firstName')).sendKeys('Bruce');
		element(by.model('credentials.lastName')).sendKeys('Wayne');
		element(by.id('registerSubmit')).click();
		element(by.id('registerCancel')).click();
	});

	it('should allow users to cancel the login process', function(){
		element(by.id('loginButton')).click();
		element(by.id('loginCancel')).click();
	});

	it('should not allow users access without proper credentials', function(){
		element(by.id('loginButton')).click();
		element(by.id('loginSubmit')).click();
	}); 

	it('should login users properly when information is correct', function(){
		element(by.id('loginButton')).click();
		element(by.model('credentials.username')).sendKeys('Batman');
		element(by.model('credentials.password')).sendKeys('batcave12');
		element(by.id('loginSubmit')).click();
		element(by.id('loginCancel')).click();
	});


});