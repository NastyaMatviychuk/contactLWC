public with sharing class contactComponentController {
     
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList() {
        return [SELECT Id, FirstName, LastName, Title, Phone, Email FROM Contact ];
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> findContact(String searchKey) {
        searchKey = '%' + searchKey + '%';
        List<Contact> searchedContact = new List<Contact>([SELECT Id, FirstName FROM Contact WHERE FirstName LIKE :searchKey LIMIT 5]);
            if(searchedContact.isEmpty()){
                throw new AuraHandledException('Contact no found..');
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
