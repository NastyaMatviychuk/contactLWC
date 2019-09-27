@isTest
public class controllerTestClass{

    public  @IsTest
    static void ComponentControllerTest(){
        
        Test.startTest();
        contactComponentController.getContactList();
        Test.stopTest();
        
    }
} 
