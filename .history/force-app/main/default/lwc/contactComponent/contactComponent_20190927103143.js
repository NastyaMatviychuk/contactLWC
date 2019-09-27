import { LightningElement, wire, track } from 'lwc';
import getContactList from '@salesforce/apex/contactComponentController.getContactList';

//import NAME_FIELD from '@salesforce/schema/Contact.Name';
//import ID_FIELD from '@salesforce/schema/Contact.Id';
// import { updateRecord } from 'lightning/uiRecordApi';
//import { refreshApex } from '@salesforce/apex';

const COLS = [
    { label: 'Name', fieldName: 'Name', editable: false, sortable: true },
    { label: 'Title', fieldName: 'Title', sortable: true },
    { label: 'Phone', fieldName: 'Phone', type: 'phone', sortable: true },
    { label: 'Email', fieldName: 'Email', type: 'email'}
];
             
export default class DatatableUpdateExample extends LightningElement {

    @track error;
    @track columns = COLS;
    @track sortBy;
    @track sortDirection;

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

    handleSortdata(event) {
        // field name
        this.sortBy = event.detail.fieldName;

        // sort direction
        this.sortDirection = event.detail.sortDirection;

        // calling sortdata function to sort the data based on direction and selected field
        this.sortData(event.detail.fieldName, event.detail.sortDirection);
    }

    sortData(fieldname, direction) {
        // serialize the data before calling sort function
        let parseData = JSON.parse(JSON.stringify(this.data));

        // Return the value stored in the field
        let keyValue = (a) => {
            return a[fieldname];
        };

        // cheking reverse direction 
        let isReverse = direction === 'asc' ? 1: -1;

        // sorting data 
        parseData.sort((x, y) => {
            x = keyValue(x) ? keyValue(x) : ''; // handling null values
            y = keyValue(y) ? keyValue(y) : '';

            // sorting values based on direction
            return isReverse * ((x > y) - (y > x));
        });

        // set the sorted data to data table data
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
    
    

