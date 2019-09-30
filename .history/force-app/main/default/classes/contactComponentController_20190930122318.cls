public with sharing class contactComponentController {
     
     @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList() {
        System.debug('test');
        return [SELECT Id, FirstName, LastName, Title, Phone, Email FROM Contact ];
    }

    @AuraEnabled
    public static List<Contact> findContact(String searchKey) {
        String key = '%' + searchKey + '%';
        return [SELECT FirstName FROM Contact WHERE Name LIKE :key LIMIT 5];
    }

    @AuraEnabled
    public static void createContact(Contact contact){
        try {
            insert contact;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
}
