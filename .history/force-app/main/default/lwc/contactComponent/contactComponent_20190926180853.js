import { LightningElement, wire, track } from 'lwc';
import getContactList from '@salesforce/apex/contactComponentController.getContactList';

//import NAME_FIELD from '@salesforce/schema/Contact.Name';
//import ID_FIELD from '@salesforce/schema/Contact.Id';
// import { updateRecord } from 'lightning/uiRecordApi';
// import { refreshApex } from '@salesforce/apex';

const COLS = [
    { label: 'Name', fieldName: 'Name', editable: false, sortable: true },
    { label: 'Title', fieldName: 'Title' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Email', fieldName: 'Email', type: 'email' }
];
export default class DatatableUpdateExample extends LightningElement {

    @track error;
    @track columns = COLS;
    @track sortBy;
    @track sortDirection;

    @wire(getContactList)
    contact;

    columnSorting(event) {
        var fieldName = event.detail.name;
        var sortDirection = event.detail.asc;
        this.sortedBy = fieldName;//event.detail.name;
        this.sortedDirection = sortDirection;//= event.detail.asc;
        this.sortData(event.detail.name, event.detail.asc);
    }
    sortData(fieldname, direction) {
        let parseData = JSON.parse(JSON.stringify(this.data));
        let keyValue = (a) => {
            return a[fieldname];
        };
        let isReverse = direction === 'asc' ? 1: -1;

        // sorting here 
        parseData.sort((x, y) => {
            x = keyValue(x) ? keyValue(x) : ''; 
            y = keyValue(y) ? keyValue(y) : '';
            return isReverse * ((x > y) - (y > x));
        });

        this.data = parseData;
    }


}
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
    
    

