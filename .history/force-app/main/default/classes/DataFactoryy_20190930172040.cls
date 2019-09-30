public class DataFactoryy {

    public DataFactoryy() {

    }

    // public static void createContacts(Integer i){
    //     List<Contact> listContact = new List<Contact>();
    //     for(Integer y = 0 ; y <= i; y++ ){
    //         Contact contact = new Contact();
    //         contact.LastName = 'LastName' + i;
    //         contact.FirstName = 'FirstName' + i;
    //         listContact.add(contact);
    //     }
    //     insert listContact;
    // }

    public static List<Contact> getContactss(Integer amount){
    List<Contact> listContact = new List<Contact>();
        for(Integer y = 0 ; y <= amount; y++ ){
            Contact contact = new Contact();
            contact.LastName = 'LastName' + amount;
            contact.FirstName = 'FirstName' + amount;
            listContact.add(contact);
        }
    return listContact;
    }
}
