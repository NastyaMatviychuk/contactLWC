public with sharing class contactComponentController {
     
     @AuraEnabled(cacheable=true)
    public static List<Contact> getContactListAsc() {
        return [SELECT Id, Name, Title, Phone, Email FROM Contact Order by Name ASC LIMIT 100];
    }
    // @AuraEnabled(cacheable=true)
    // public static List<Contact> getContactListDesc() {
    //     return [SELECT Id, Name, Title, Phone, Email FROM Contact Order by Name DESC LIMIT 100];
    // }
    public contactComponentController() {

    }

}
