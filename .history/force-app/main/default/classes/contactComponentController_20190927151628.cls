public with sharing class contactComponentController {
     
     @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList() {
        return [SELECT Id, Name, Title, Phone, Email FROM Contact LIMIT 15];
    }
    @AuraEnabled(cacheable=true)
    public static List<Contact> findContact(String key) {
        String key = '%' + key + '%';
        return [SELECT Id, Name, Title, Phone, Email, Picture__c 
        FROM Contact WHERE Name LIKE :key AND Picture__c != null LIMIT 10];
    }
}
