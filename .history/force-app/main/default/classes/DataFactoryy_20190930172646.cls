public class DataFactoryy {

    public DataFactoryy() {

    }
    
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
