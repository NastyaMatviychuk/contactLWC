@IsTest
public class controllerTestClass{

   @TestSetup
    static void testSetup(){
        List<Contact> contactsList = DataFactoryy.getContactss(10);
        insert contactsList;
    }

    @IsTest
    public static void getContactTest(){
            Test.startTest();
            List<Contact> testList = contactComponentController.getContactList();
            System.assert(testList.size() > 0 , 'zbs');
            Test.stopTest();

    }

    @IsTest
    public static void createContactTest(){
        Test.startTest();
            contactComponentController.createContact(new Contact(FirstName = 'FirstName', LastName = 'lastName'));
            // System.assert(  Contact. , 'zbs');
        Test.stopTest();
    }

    @IsTest
    public static void findContactTest(){
        Test.startTest();
    }

    
} 
