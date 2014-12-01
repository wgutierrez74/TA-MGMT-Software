//profile spec.js

describe ('Ta Hub profile page', function(){

	beforeEach(function() {
		browser.get('http://localhost:3000/#!/settings');
	});

	it('should be able to edit the application', function(){
		element(by.id('profileEdit')).click();
	});

	it('should be able to type in the application fields', function(){
		element(by.id('profileEdit')).click();
		element(by.model('user.firstName')).clear();
		element(by.model('user.firstName')).sendKeys('Harvey');
		element(by.model('user.lastName')).clear();
		element(by.model('user.lastName')).sendKeys('Dent');
		element(by.model('user.email')).clear();
		element(by.model('user.email')).sendKeys('IamTheNight@batcave.com');
		element(by.model('user.username')).clear();
		element(by.model('user.username')).sendKeys('TwoFace');
		element(by.model('user.gpa')).clear();
		element(by.model('user.gpa')).sendKeys('3.8');
		element(by.model('user.abilities')).clear();
		element(by.model('user.abilities')).sendKeys('District Attorney');
		element(by.model('user.advisor')).clear();
		element(by.model('user.advisor')).sendKeys('Joe Kerr');
		element(by.model('user.researchField')).clear();
		element(by.model('user.researchField')).sendKeys('Vigilante Justice');
		element(by.model('user.course1')).clear();
		element(by.model('user.course1')).sendKeys('CEN 3031');
		element(by.model('user.course2')).clear();
		element(by.model('user.course2')).sendKeys('COP 4600');
		element(by.model('user.course3')).clear();
		element(by.model('user.course3')).sendKeys('CDA 3101');
		element(by.model('user.course4')).clear();
		element(by.model('user.course4')).sendKeys('COP 3503');
		element(by.id('profileSave')).click();
	});
	
	it('should be able to be cancelled', function(){
		element(by.id('profileEdit')).click();
		element(by.id('profileCancel')).click();
	});

	it('should be able to reach Change Password page and say nevermind', function(){
		element(by.id('changePasswordButton')).click();
		element(by.model('passwordDetails.currentPassword')).sendKeys('batcave12');
		element(by.model('passwordDetails.newPassword')).sendKeys('twoFace12');
		element(by.model('passwordDetails.verifyPassword')).sendKeys('twoFace12');
		element(by.id('cancelPassword')).click();
		
	});

	it('should not change password if they dont match', function(){
		element(by.id('changePasswordButton')).click();
		element(by.model('passwordDetails.currentPassword')).sendKeys('batcave12');
		element(by.model('passwordDetails.newPassword')).sendKeys('twoFace12');
		element(by.model('passwordDetails.verifyPassword')).sendKeys('twoFace13');
		element(by.id('savePassword')).click();

	});

	it('should not change password if the original is wrong', function(){
		element(by.id('changePasswordButton')).click();
		element(by.model('passwordDetails.currentPassword')).sendKeys('batcave14');
		element(by.model('passwordDetails.newPassword')).sendKeys('twoFace12');
		element(by.model('passwordDetails.verifyPassword')).sendKeys('twoFace12');
		element(by.id('savePassword')).click();

	});

	it('should be able to reach Change Password page and have it function', function(){
		element(by.id('changePasswordButton')).click();
		element(by.model('passwordDetails.currentPassword')).sendKeys('batcave12');
		element(by.model('passwordDetails.newPassword')).sendKeys('batcave12');
		element(by.model('passwordDetails.verifyPassword')).sendKeys('batcave12');
		element(by.id('savePassword')).click();

	});

	it('should be able to sign out', function(){
		element(by.id('signOutButton')).click();
		element(by.id('loginButton')).click();
		element(by.model('credentials.username')).sendKeys('Batman');
		element(by.model('credentials.password')).sendKeys('batcave12');
		element(by.id('loginSubmit')).click();
		element(by.id('loginCancel')).click();
	});

});