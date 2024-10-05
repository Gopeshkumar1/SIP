import { LightningElement } from 'lwc';

export default class Sipcal extends LightningElement {
    monthlyInvestment = '';
    annualInterestRate = '';
    years = '';
    result = '';

    // Handle input changes
    handleInput(event) {
        const { name, value } = event.target;
        this[name] = value; // Dynamically assign values based on input names
    }

    // Handle calculation and reset
    handleCalculation() {
        if (this.isValidInput()) {
            this.calculateSIP();
        } else {
            this.result = 'Invalid input. Please check your values.';
        }
    }

    handleReset() {
        this.resetFields();
    }

    // SIP Calculation logic
    calculateSIP() {
        const P = parseFloat(this.monthlyInvestment);
        const annualRate = parseFloat(this.annualInterestRate) / 100;
        const r = annualRate / 12;
        const n = parseFloat(this.years) * 12;

        // SIP Future Value Calculation
        const futureValue = P * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
        this.result = futureValue.toFixed(2);
    }

    // Input validation
    isValidInput() {
        return (
            this.monthlyInvestment > 0 &&
            this.annualInterestRate > 0 &&
            this.years > 0
        );
    }

    // Reset all fields
    resetFields() {
        this.monthlyInvestment = '';
        this.annualInterestRate = '';
        this.years = '';
        this.result = '';
        this.template.querySelector('form').reset(); // Resetting the form elements
    }
}