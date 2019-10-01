public with sharing class contactComponentController {
     
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList() {
        return [SELECT Id, FirstName, LastName, Title, Phone, Email FROM Contact ];
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> findContact(String searchKey) {
        String key = '%' + searchKey + '%';
        List<Contact> searchedContact = new List<Contact>([SELECT Id, FirstName FROM Contact WHERE FirstName LIKE :key LIMIT 5]);
            if(searchedContact.isEmpty()){
                throw new AuraHandledException('No Found..');
            }
        return searchedContact;
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
