import { LightningElement, wire, track, api } from 'lwc';
import getContactList from '@salesforce/apex/contactComponentController.getContactList';
import findContact from '@salesforce/apex/contactComponentController.findContact';

// import Contact from '@salesforce/schema/Contact';
// import NAME_FIELD from '@salesforce/schema/Contact.Name';
// import ID_FIELD from '@salesforce/schema/Contact.Id';
 //import { updateRecord } from 'lightning/uiRecordApi';
// import { refreshApex } from '@salesforce/apex';

        const COLS = [
            { label: 'Name', fieldName: 'Name', editable: true, sortable: true },
            { label: 'Title', fieldName: 'Title', sortable: true },
            { label: 'Phone', fieldName: 'Phone', type: 'phone', sortable: true },
            { label: 'Email', fieldName: 'Email', type: 'email'}
        ];
            const DELAY = 300;
      
export default class DatatableUpdateExample extends LightningElement {
    @track searchKey = '';

    @wire(findContact, { searchKey: '$searchKey' })
    contacts;


    @track error;
    @track columns = COLS;
    @track sortBy;
    @track sortDirection;
    @track draftValues;
    @track loadMoreStatus;
    @api objectApiName;
    @api totalNumberOfRows;
    
    

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

    handleKeyChange(event) {
        window.clearTimeout(this.delayTimeout);
        const searchKey = event.target.value;
        this.delayTimeout = setTimeout(() => {  
            this.searchKey = searchKey
        }, DELAY);
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

    loadMore (event) {
        event.target.isLoading = true;
        this.loadMoreStatus = 'Loading';
        fetchData(50)
            .then((data) => {
                if (data.length >= this.totalNumberOfRows) {
                    event.target.enableInfiniteLoading = false;
                    this.loadMoreStatus = 'No more data to load';
                } else {
                    const currentData = this.data;
                    const newData = currentData.concat(data);
                    this.data = newData;
                    this.loadMoreStatus = '';
                }
                event.target.isLoading = false;
            });
    }
    // handleSave(event) {
    //     const fields = {};
    //     fields[ID_FIELD.fieldApiName] = event.detail.draftValues[0].Id;
    //     fields[NAME_FIELD.fieldApiName] = event.detail.draftValues[0].Name;
    //     const recordInput = {fields};
    //     updateRecord(recordInput)
    //     .then(() => {
    //         this.dispatchEvent(
    //             new ShowToastEvent({
    //                 title: 'Success',
    //                 message: 'Contact updated',
    //                 variant: 'success'
    //             })
    //         );

    //         this.draftValues = [];

    //         return refreshApex(this.contact);
    //     }).catch(error => {
    //         this.dispatchEvent(
    //             new ShowToastEvent({
    //                 title: 'Error creating record',
    //                 message: error.body.message,
    //                 variant: 'error'
    //             })
    //         );
    //     });
    // }



}
    

    


    
    
    
    

