public with sharing class contactComponentController {
     
     @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList() {
        return [SELECT Id, Name, Title, Phone, Email FROM Contact  LIMIT 10];
    }
    public contactComponentController() {

    }

}
