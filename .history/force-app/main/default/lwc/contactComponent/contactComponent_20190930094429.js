import { LightningElement, wire, track, api } from 'lwc';
import getContactList from '@salesforce/apex/contactComponentController.getContactList';
//import createContact from '@salesforce/apex/contactComponentController.createContact';
//import updateContact from '@salesforce/apex/contactComponentController.updateContact';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import { createRecord } from 'lightning/uiRecordApi';
import { updateRecord } from 'lightning/uiRecordApi';

import { refreshApex } from '@salesforce/apex';
//!!!!!!!!!!
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import TITLE_FIELD from '@salesforce/schema/Contact.Title';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import ID_FIELD from '@salesforce/schema/Contact.Id';


        const COLS = [
            { label: 'First Name', fieldName: 'FirstName', sortable: true, editable: true },
            { label: 'Last Name', fieldName: 'LastName', sortable: true, editable: true },
            { label: 'Title', fieldName: 'Title', sortable: true },
            { label: 'Phone', fieldName: 'Phone', type: 'phone', sortable: true },
            { label: 'Email', fieldName: 'Email', type: 'email'}
        ];
            //const DELAY = 300;
      
export default class DatatableUpdateExample extends LightningElement {
    
    @track searchKey = '';
    @track sortBy;
    @track sortDirection;

    @track error;
    @track columns = COLS;
    @track draftValues = [];

    @track contactId;
    @api objectApiName;
    // @api totalNumberOfRows;
    
    

    @wire(getContactList)
    contacts(result) {
        if (result.data) {
            this.data = result.data;
            this.error = undefined;

        } else if (result.error) {
            this.error = result.error;
            this.data = undefined;
        }
    }

    // @wire(findContact, { searchKey: '$searchKey' })
    //     contacts;
    //     searchData(event){
    //         // const searchKey = event.target.value;
    //          this.searchKey = event.detail.searchKey ;
    // }

    // searchData(event) {
    //     window.clearTimeout(this.delayTimeout);
    //     const searchKey = event.target.value;
    //     this.delayTimeout = setTimeout(() => {  
    //         this.searchKey = searchKey;
    //     }, DELAY);
    // }
//---------------------------------M O D A L    B O X    
@track openmodel = false;
    openmodal() {
        this.openmodel = true
    }
    closeModal() {
        this.openmodel = false
    } 
//---------------------------------S O R T
sortHendler(event) {
    this.sortBy = event.detail.fieldName;
    this.sortDirection = event.detail.sortDirection;
    this.sortData(event.detail.fieldName, event.detail.sortDirection);
}

sortData(fieldname, direction) {
    let parseData = JSON.parse(JSON.stringify(this.data));
        let keyValue = (a) => {
    return a[fieldname];
};

let isReverse = direction === 'asc' ? 1: -1;

parseData.sort((x, y) => {
    x = keyValue(x) ? keyValue(x) : ''; 
    y = keyValue(y) ? keyValue(y) : '';

return isReverse * ((x > y) - (y > x));
});

this.data = parseData;

}
//------------------------------  L O A D   M O R E 

//----------------------------------U P D A T E 
    handleSave(event) {

        const fields = {};
        fields[ID_FIELD.fieldApiName] = event.detail.draftValues[0].Id;
        fields[FIRSTNAME_FIELD.fieldApiName] = event.detail.draftValues[0].FirstName;
        fields[LASTNAME_FIELD.fieldApiName] = event.detail.draftValues[0].LastName;
        
        const recordInput = {fields};

        updateRecord(recordInput)
        .then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Contact updated',
                    variant: 'success'
                })
            );
            this.draftValues = [];
            return refreshApex(this.contact);
        }).catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        });
    }
//--------------------------C R E A T E   N E W

    firstname = '';
    lastname = '';
    title = '';
    phone = '';
    email = '';

    handleFirsrNameChange(event) {
        this.contactId = undefined;
        this.firstname = event.target.value;
    }
 
    handleLastNameChange(event){
        this.contactId = undefined;
       this.lastname = event.target.value;
    }
    handleTitleChange(event) {
        this.title = event.target.value;
    }
 
    handlePhoneChange(event){
       this.phone = event.target.value;
    }
    handleEmaillChange(event){
        this.email = event.target.value;
    }

    createContact() {
        const fields = {};
        fields[FIRSTNAME_FIELD.fieldApiName] = this.firstname;
        fields[LASTNAME_FIELD.fieldApiName] =this.lastname;
        fields[TITLE_FIELD.fieldApiName] =this.title;
        fields[PHONE_FIELD.fieldApiName] =this.phone;
        fields[EMAIL_FIELD.fieldApiName] =this.email;


        const recordInput = { apiName: CONTACT_OBJECT.objectApiName, fields };

        createRecord(recordInput)
            .then(contact => {
                this.contactId = contact.id;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Contact created',
                        variant: 'success'
                    })
                );
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.reduceErrors(error).join(', '),
                        variant: 'error'
                    })
                );
            });
            this.closeModal();
    }
}