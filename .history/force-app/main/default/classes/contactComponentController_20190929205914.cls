public with sharing class contactComponentController {
     
     @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList() {
        System.debug('test');
        return [SELECT Id, FirstName, LastName, Title, Phone, Email FROM Contact LIMIT 25];
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> findContact(String searchKey) {
        String key = '%' + searchKey + '%';
        return [SELECT  Name
        FROM Contact WHERE Name LIKE :key LIMIT 5];
    }
    
}
