import { LightningElement, track } from 'lwc';
export default class contactComponent extends LightningElement {
    @track greeting = 'World';
    changeHandler(event) {
        this.greeting = event.target.value;
    }
}