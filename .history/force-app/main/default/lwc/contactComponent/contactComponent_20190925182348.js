import { LightningElement, track } from 'lwc';
import fetchDataHelper from './fetchDataHelper';

const columns = [
    { label: 'Name', fieldName: 'name' },
    { label: 'Title', fieldName: 'title', type: 'text' },
    { label: 'Phone', fieldName: 'phone', type: 'phone' },
    { label: 'Email', fieldName: 'email', type: 'email' },
];

export default class BasicDatatable extends LightningElement {
    @track data = [];
    @track columns = columns;

    async connectedCallback() {
        const data = await fetchDataHelper({ amountOfRecords: 100 });
        this.data = data;
    }
}