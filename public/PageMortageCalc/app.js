let banks = JSON.parse(localStorage.getItem('banks'))

const divListBanks = document.querySelector('.list-banks');
let count = 1;

let select = document.getElementById('banks')
const sum = document.getElementById('sum');
const minPay = document.getElementById('min-pay');
const years = document.getElementById('years');

const divSum = document.querySelector('.sum');
const divMinPay = document.querySelector('.min-pay');
const divYears = document.querySelector('.years');

for (let i = 0; i < banks.length; i++) {
    const option = document.createElement('option');
    option.text = `${banks[i].bankName}`;
    select.append(option);
}

createHat();

for (let i = 0; i < banks.length; i++) {
    getBank(i);
}

let index = select.selectedIndex;
let obj = banks[index];

function validateInput (parent, child, color, text, spanId) {
    child.style.borderColor = color;

    let spn = document.getElementById(spanId);
    if (parent.contains(spn)) {
        spn.innerText = text;
        spn.style.color = color;
    }
    else {
        let spn = document.createElement('span');
        const br = document.createElement('br');
        spn.id = spanId;
        spn.innerText = text;
        spn.style.color = color;
        parent.append(br, spn);
    }
}

function deleteMessage (parent, spanId) {

    if (parent.contains(spanId)) {
        const spn = document.getElementById(spanId);
        spn.remove();
    }
}

function validateSum () {

    let boo = false;
    if (Number(sum.value) > obj.maxLoan) {
        validateInput(divSum, sum, 'red', 'Impossible value for selected bank', 'spn-1');

    }
    else {
        validateInput(divSum, sum, 'green', 'All good', 'spn-1');
        boo = true;
    }

    return boo;

}

function validateMinPay () {
    let boo = false;
    if (Number(minPay.value) < obj.minDownPay || Number(minPay.value) > 99) {
        validateInput(divMinPay, minPay, 'red', 'Impossible value for selected bank', 'spn-2');

    }
    else {
        validateInput(divMinPay, minPay, 'green', 'All good', 'spn-2');
        boo = true;
    }
    return boo;
}

function validateYears () {

    let boo = false;
    if (Number(years.value) > obj.maxLoanTerm || Number(years.value) < obj.minLoanTerm) {
        validateInput(divYears, years, 'red', 'Impossible value for selected bank', 'spn-3');

    }
    else {
        validateInput(divYears, years, 'green', 'All good', 'spn-3');
        boo = true;
    }
    return boo;
}

function checkForm () {
    let boo = false;
    if (validateSum() && validateMinPay() && validateYears()) boo = true;
    return boo;
}

function changeIndex () {
    index = select.selectedIndex;
    obj = banks[index];
    validateSum();
    validateMinPay();
    validateYears();
}

function monthlyPayment (interRate, numberOfPayments, sumLoan) {
    debugger;
    let percent = (Number(minPay.value) / 100);
    sumLoan = sumLoan - (sumLoan * percent);
    interRate = interRate / 100;
    numberOfPayments = numberOfPayments * 12;
    let numerator = sumLoan * (interRate / 12) * Math.pow((interRate/12 + 1), numberOfPayments);
    let denominator = Math.pow((interRate/12 + 1), numberOfPayments) - 1;
    let result = Number.parseFloat((numerator / denominator).toString()).toFixed(2);
    result = Number(result);
    let overpayment = (result * numberOfPayments) - sumLoan;
    overpayment = Number.parseFloat(overpayment.toString()).toFixed(2);
    overpayment = Number(overpayment);
    return [result, overpayment];

}

function createContainerForResult () {
    let boxRes = document.getElementById('box-result');
    if (document.body.contains(boxRes)) boxRes.remove();

    let div = document.createElement('div');
    div.id = 'box-result';
    let p1 = document.createElement('p');
    let p2 = document.createElement('p');
    div.append(p1, p2);
    const formBox = document.querySelector('.form-box');
    formBox.after(div);
    let result = monthlyPayment(obj.interestRate, Number(years.value), Number(sum.value));
    p1.innerText = `Monthly payment: ${result[0].toString()}`;
    p2.innerText = `Overpayment on a loan: ${result[1].toString()}`;

}

function createHat() {

    const div = document.createElement('div');
    const bankName = document.createElement('span');
    const interestRate = document.createElement('span');
    const maxLoan = document.createElement('span');
    const minDownPay = document.createElement('span');
    const loanTerm = document.createElement('span');

    div.className = 'hat';
    bankName.className = 'bankName';
    interestRate.className = 'interestRate';
    maxLoan.className = 'maxLoan';
    minDownPay.className = 'minDownPay';
    loanTerm.className = 'loanTerm';

    bankName.innerText = 'Bank name';
    interestRate.innerText = 'Interest rate';
    maxLoan.innerText = 'Maximum loan';
    minDownPay.innerText = 'Minimum down payment';
    loanTerm.innerText = 'Loan term';

    divListBanks.append(div);
    div.append(bankName);
    div.append(interestRate);
    div.append(maxLoan);
    div.append(minDownPay);
    div.append(loanTerm);
}

function getBank(index) {

    const div_bank = document.createElement('div');
    const bankName = document.createElement('span');
    const interestRate = document.createElement('span');
    const maxLoan = document.createElement('span');
    const minDownPay = document.createElement('span');
    const loanTerm = document.createElement('span');

    div_bank.className = 'bank';
    bankName.className = 'bankName';
    interestRate.className = 'interestRate';
    maxLoan.className = 'maxLoan';
    minDownPay.className = 'minDownPay';
    loanTerm.className = 'loanTerm';

    div_bank.id = count.toString();

    bankName.innerText = `${banks[index].bankName}`;
    interestRate.innerText = `${banks[index].interestRate} %`;
    maxLoan.innerText = `${banks[index].maxLoan} UAH`;
    minDownPay.innerText = `${banks[index].minDownPay} %`;
    loanTerm.innerText = `from ${banks[index].minLoanTerm} to ${banks[index].maxLoanTerm} years`;

    divListBanks.append(div_bank);
    div_bank.append(bankName);
    div_bank.append(interestRate);
    div_bank.append(maxLoan);
    div_bank.append(minDownPay);
    div_bank.append(loanTerm);

    count++;

}

function calculate () {
    event.preventDefault();
    if(checkForm()) {
        createContainerForResult();
    }
}




