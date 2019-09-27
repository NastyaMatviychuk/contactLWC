public with sharing class contactComponentController {
     
     @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList() {
        return [SELECT Id, Name, Title, Phone, Email FROM Contact Order by Name ASC LIMIT 100];
    }
    public contactComponentController() {

    }

}
