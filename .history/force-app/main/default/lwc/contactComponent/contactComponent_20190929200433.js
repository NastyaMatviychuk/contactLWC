import { LightningElement, wire, track, api } from 'lwc';
import getContactList from '@salesforce/apex/contactComponentController.getContactList';
//import findContact from '@salesforce/apex/contactComponentController.findContact';
//import updateContact from '@salesforce/apex/contactComponentController.updateContact';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
//import Contact from '@salesforce/schema/Contact';
import { updateRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
import NAME_FIELD from '@salesforce/schema/Contact.Name';
import ID_FIELD from '@salesforce/schema/Contact.Id';


        const COLS = [
            { label: 'Name', fieldName: 'Name', sortable: true, editable: true },
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

    // loadMore (event) {
    //     event.target.isLoading = true;
    //     this.loadMoreStatus = 'Loading';
    //     fetchData(50)
    //         .then((data) => {
    //             if (data.length >= this.totalNumberOfRows) {
    //                 event.target.enableInfiniteLoading = false;
    //                 this.loadMoreStatus = 'No more data to load';
    //             } else {
    //                 const currentData = this.data;
    //                 const newData = currentData.concat(data);
    //                 this.data = newData;
    //                 this.loadMoreStatus = '';
    //             }
    //             event.target.isLoading = false;
    //         });
    // }
    // handleSave(event) {
    //         const recordInputs =  event.detail.draftValues.slice().map(draft => {
    //             const fields = Object.assign({}, draft);
    //             return { fields };
    //         });
    
    //         const promises = recordInputs.map(recordInput => updateRecord(recordInput));
    //         Promise.all(promises).then(contacts => {
    //             this.dispatchEvent(
    //              new ShowToastEvent({
    //                 title: 'Success',
    //                 message: 'Contacts updated',
    //                 variant: 'success'
    //                 })
    //             );
    //          // Clear all draft values
    //             this.draftValues = [];
    
    //          // Display fresh data in the datatable
    //             return refreshApex(this.contact);
    //         }).catch(error => {
    //             this.dispatchEvent(
    //                 new ShowToastEvent({
    //                     title: 'Error creating record',
    //                     message: error.body.message,
    //                     variant: 'error'
    //                 }))
    //         });
    //     }    



    
    handleChange(event){
        if (!event.target.value) {
            event.target.reportValidity();
            this.disabled = true;
        }
        else {
            this.disabled = false;
        }
    }
     handleSave(event) {
        const allValid = [...event.detail.querySelector('lightning-datatable')]
        .reduce((validSoFar, inputFields) => {
            inputFields.reportValidity();
            return validSoFar && inputFields.checkValidity();
        }, true);
        
        //!!!!!!!!
        if (allValid) {
            const fields = {};
        fields[ID_FIELD.fieldApiName] = event.contactId;
        fields[NAME_FIELD.fieldApiName] = event.detail.querySelector("lightning-datatable.[fieldName='Name']").value;
        //fields[NAME_FIELD.fieldApiName] = this.template.querySelector("[data-field='LastName']").value;
        
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

            return refreshApex(this.contacts);
        }).catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        });
     }else {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Something is wrong',
                message: 'Check your input and try again.',
                variant: 'error'
            })
            );
        }
    }
}
    



    

    


    
    
    
    

