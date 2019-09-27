public with sharing class contactComponentController {
     
     @AuraEnabled(cacheable=true)
    public static List<Contact> getContactListAsc() {
        return [SELECT Id, Name, Title, Phone, Email FROM Contact LIMIT 100];
    }
    
    public contactComponentController() {

    }

}
