import { LightningElement, wire } from 'lwc';

import getContactList from '@salesforce/apex/contactComponentController.getContactList';

export default class contactComponentController extends LightningElement {
    @wire(getContactList) contacts;
}

