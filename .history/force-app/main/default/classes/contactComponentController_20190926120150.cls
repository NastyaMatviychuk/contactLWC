public with sharing class contactComponentController {
     
     @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList() {
        return [SELECT Id, Name, Title, Phone, Email, Picture__c FROM Contact WHERE Picture__c != null LIMIT 10];
    }
    public contactComponentController() {

    }

}
