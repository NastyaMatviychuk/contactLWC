import { LightningElement, wire, track } from 'lwc';
import getContactList from '@salesforce/apex/contactComponentController.getContactList';
//import NAME_FIELD from '@salesforce/schema/Contact.Name';
//import ID_FIELD from '@salesforce/schema/Contact.Id';
// import { updateRecord } from 'lightning/uiRecordApi';
// import { refreshApex } from '@salesforce/apex';

const COLS = [
    { label: 'Name', fieldName: 'Name', editable: true },
    { label: 'Title', fieldName: 'Title' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Email', fieldName: 'Email', type: 'email' }
];
export default class DatatableUpdateExample extends LightningElement {

    @track error;
    @track columns = COLS;
    @track draftValues = [];

    @wire(getContactList)
    contact;
                    
    //for update feilds
    // handleSave(event) {

    //     const fields = {};
    //     fields[ID_FIELD.fieldApiName] = event.detail.draftValues[0].Id;
    //     fields[NAME_FIELD.fieldApiName] = event.detail.draftValues[0].Name;
        // const recordInput = {fields};
        // updateRecord(recordInput)
        // .then(() => {
        //     this.dispatchEvent(
        //         new ShowToastEvent({
        //             title: 'Success',
        //             message: 'Contact updated',
        //             variant: 'success'
        //         })
        //     );

        //     this.draftValues = [];

        //     return refreshApex(this.contact);
        // }).catch(error => {
        //     this.dispatchEvent(
        //         new ShowToastEvent({
        //             title: 'Error creating record',
        //             message: error.body.message,
        //             variant: 'error'
        //         })
        //     );
        // });
    }
    

