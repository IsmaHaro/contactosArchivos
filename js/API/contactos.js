var cn = {
	onSuccess: function(contact) {
		alert("Guardado");
	},
	onError: function(contactError) {
		alert("Error = " + contactError.code);
	},
	createContact: function(n, t, m){
		// create a new contact object
		var contact = navigator.contacts.create();
		contact.displayName = n;
		contact.nickname = n;

		// populate some fields
		var name = new ContactName();
		name.givenName = n;
		name.familyName = "Prueba";
		contact.name = name;
		
		//Generar Teléfonos
		var phones = [];
		phones[0] = new ContactField("home",t,false);
		phones[1] = new ContactField("work","1234567890",true);
		contact.phoneNumbers = phones;
		
		//Generar Correos Electrónicos
		var mails = [];
		mails[0] = new ContactField("personal", m, true);
		mails[1] = new ContactField("work", "exe@prueba.com", false);
		contact.emails = mails;

		// save to device
		contact.save(cn.onSuccess,cn.onError);
	},
	onFound: function(contacts){
		var res = "";
		for(i=0;i<contacts.length;i++){
			res += '<li><a href="tel:'+contacts[i].phoneNumbers[0].value+'">'+contacts[i].displayName + '</a></li>';
		}
		$('#cMostrar').html(res);
	},
	findContacts: function(){
		// find all contacts with 'Bob' in any name field
		var options      = new ContactFindOptions();
		options.filter   = "Prueba";
		options.multiple = true;
		/*options.desiredFields = [navigator.contacts.fieldType.id,navigator.contacts.fieldType.name,navigator.contacts.fieldType.phoneNumbers];*/
		var fields       = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
		navigator.contacts.find(fields, cn.onFound, cn.onError, options);
	}
};