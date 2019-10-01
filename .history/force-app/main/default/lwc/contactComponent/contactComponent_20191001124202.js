import { LightningElement, wire, track, api } from 'lwc';
import getContactList from '@salesforce/apex/contactComponentController.getContactList';
import createContact from '@salesforce/apex/contactComponentController.createContact';
import findContact from '@salesforce/apex/contactComponentController.findContact';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

// import { createRecord } from 'lightning/uiRecordApi';
import { updateRecord } from 'lightning/uiRecordApi';

import { refreshApex } from '@salesforce/apex';
//!!!!!!!!!!
//import CONTACT_OBJECT from '@salesforce/schema/Contact';
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
    
    
    @track sortBy;
    @track sortDirection;

    @track error;
    @track columns = COLS;
    @track draftValues = [];

    @track contactId;
    @api objectApiName;
    @track searchData;

    @track data;
    @track errorMsg = '';
    strSearchAccName = '';

    handleContactSearchName(event) {
        this.strSearchAccName = event.detail.value;
    }

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

//---------------------------------M O D A L    B O X    
@track openmodel = false;
    openmodal() {
        this.openmodel = true;
        window.console.log('it work');
    }
    closeModal() {
        this.openmodel = false;
    } 

//---------------------------------S E A R C H
handleSearch() {
    if(!this.strSearchAccName) {
        this.errorMsg = 'Please enter contact name to search.';
        this.data = undefined;
        return;
    }

    findContact({searchKey : this.strSearchAccName})
    .then(result => {
        result.forEach((record) => {
            record.AccName = '/' + record.Id;
        });

        this.data = result;
        
    })
    .catch(error => {
        this.data = undefined;
        window.console.log('error =====> '+JSON.stringify(error));
        if(error) {
            this.errorMsg = error.body.message;
        }
    })  
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

    @track contactData = {
        FirstName : FIRSTNAME_FIELD,
        LastName : LASTNAME_FIELD,
        Title : TITLE_FIELD,
        Phone : PHONE_FIELD,
        Email : EMAIL_FIELD
    };

    handleFirstNameChange(event) {
        this.contactData.FirstName = event.target.value;
    }
 
    handleLastNameChange(event){
       this.contactData.LastName = event.target.value;
    }
    handleTitleChange(event) {
        this.contactData.Title = event.target.value;
    }
 
    handlePhoneChange(event){
       this.contactData.Phone = event.target.value;
    }
    handleEmaillChange(event){
        this.contactData.Email = event.target.value;
    }

    createContact() {
        createContact({contact  : this.contactData})
        .then(result => {
            this.contactData = {};
            window.console.log('result ===> ' + result);
            this.dispatchEvent(new ShowToastEvent({
                title: 'Success!!',
                message: 'Contact created Successfully',
                variant: 'success'
            }),);
        })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
            this.closeModal();
    }
}