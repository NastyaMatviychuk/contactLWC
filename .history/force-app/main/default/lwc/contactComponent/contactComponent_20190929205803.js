import { LightningElement, wire, track, api } from 'lwc';
import getContactList from '@salesforce/apex/contactComponentController.getContactList';
//import findContact from '@salesforce/apex/contactComponentController.findContact';
//import updateContact from '@salesforce/apex/contactComponentController.updateContact';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
//import Contact from '@salesforce/schema/Contact';
import { updateRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
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

    // @track loadMoreStatus;
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
        fields[NAME_FIELD.fieldApiName] = event.detail.draftValues[0].Name;
        
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
}