let banks = JSON.parse(localStorage.getItem('banks'));

const div_banksWrapper = document.querySelector('.banks-wrapper');
const appWrapper = document.querySelector('.app-wrapper');
let count = 1;



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

    div_banksWrapper.append(div);
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

    div_banksWrapper.append(div_bank);
    div_bank.append(bankName);
    div_bank.append(interestRate);
    div_bank.append(maxLoan);
    div_bank.append(minDownPay);
    div_bank.append(loanTerm);

    deleteEditBankButtons(div_bank);
    count++;

}

function deleteEditBankButtons(div_bank) {
    let div = document.createElement('div');
    div.className = 'wrapperForButtons';

    let button_edit = document.createElement('button');
    let button_delete = document.createElement('button');

    button_edit.className = 'btn-edit';
    button_delete.className = 'btn-delete';

    let img_edit = document.createElement('img');
    let img_delete = document.createElement('img');

    img_edit.src = 'img/edit-icon.png';
    img_delete.src = 'img/delete-icon.png';

    button_edit.prepend(img_edit);
    button_delete.prepend(img_delete);

    div.append(button_delete);
    div.append(button_edit);
    div_bank.append(div);

    button_delete.addEventListener('click', deleteBank);
    button_edit.addEventListener('click', editBank);

}

function createBankButton () {
    const createButton = document.createElement('button');
    createButton.className = 'create-btn';
    createButton.innerText = 'Create bank';
    appWrapper.append(createButton);
    createButton.addEventListener('click', createBank);
}

function indexOfElement (elem) {
    let names = banks.map(el => el.bankName);
    return names.indexOf(elem);

}

function deleteBank(e) {
    const button = e.target;
    const div = button.parentElement.parentElement.parentElement;

    banks.splice(indexOfElement(div.firstChild.textContent), 1);
    localStorage.setItem('banks', JSON.stringify(banks));
    div.remove();
}

function createBank(e) {

    const div_bank = document.createElement('div');
    const boxForInputs = document.createElement('div');
    const divForButton = document.createElement('div');
    const bankName = document.createElement('span');
    const interestRate = document.createElement('span');
    const maxLoan = document.createElement('span');
    const minDownPay = document.createElement('span');
    const loanTerm = document.createElement('span');
    const inputName = document.createElement('input');
    const inputRate = document.createElement('input');
    const inputMaxLoan = document.createElement('input');
    const inputMinDownPay = document.createElement('input');
    const inputMinLoanTerm = document.createElement('input');
    const inputMaxLoanTerm = document.createElement('input');
    const saveButton = document.createElement('button');

    div_bank.className = 'bank';
    boxForInputs.className = 'boxForInputs';
    divForButton.className = 'wrapperForButtons';
    bankName.className = 'bankName';
    interestRate.className = 'interestRate';
    maxLoan.className = 'maxLoan';
    minDownPay.className = 'minDownPay';
    loanTerm.className = 'loanTerm';
    saveButton.className = 'save-btn';

    saveButton.textContent = 'Save';
    saveButton.addEventListener('click', saveBank);

    div_bank.id = 'createBank';
    inputName.id = 'inputNameCreate';
    inputRate.id = 'inputRateCreate';
    inputMaxLoan.id = 'inputMaxLoanCreate';
    inputMinDownPay.id = 'inputMinDownPayCreate';
    inputMinLoanTerm.id = 'inputMinLoanTermCreate';
    inputMaxLoanTerm.id = 'inputMaxLoanTermCreate';

    bankName.append(inputName);
    interestRate.append(inputRate);
    maxLoan.append(inputMaxLoan);
    minDownPay.append(inputMinDownPay);
    divForButton.append(saveButton);
    loanTerm.append(inputMinLoanTerm, inputMaxLoanTerm);

    div_bank.append(bankName, interestRate, maxLoan, minDownPay, loanTerm, divForButton);
    boxForInputs.append(div_bank);
    div_banksWrapper.insertAdjacentElement('afterend', boxForInputs);
}

function editBank(e) {

    const img = e.target;
    const div = img.parentElement.parentElement.parentElement;

    const div_bank = document.createElement('div');
    const divForInputs = document.createElement('div');
    const divForButton = document.createElement('div');

    const inputName = document.createElement('input');
    const inputRate = document.createElement('input');
    const inputMaxLoan = document.createElement('input');
    const inputMinDownPay = document.createElement('input');
    const inputMinLoanTerm = document.createElement('input');
    const inputMaxLoanTerm = document.createElement('input');

    const bankNameSpan = document.createElement('span');
    const interestRate = document.createElement('span');
    const maxLoan = document.createElement('span');
    const minDownPay = document.createElement('span');

    div_bank.id = div.id;
    inputName.id = 'inputName';
    inputRate.id = 'inputRate';
    inputMaxLoan.id = 'inputMaxLoan';
    inputMinDownPay.id = 'inputMinDownPay';
    inputMinLoanTerm.id = 'inputMinLoanTerm';
    inputMaxLoanTerm.id = 'inputMaxLoanTerm';

    div_bank.className = 'bank';
    divForInputs.className = 'loanTerm';
    divForButton.className = 'wrapperForButtons';

    bankNameSpan.className = 'bankName';
    interestRate.className = 'interestRate';
    maxLoan.className = 'maxLoan';
    minDownPay.className = 'minDownPay';

    const saveButton = document.createElement('button');
    saveButton.className = 'save-btn';
    saveButton.innerText = 'Save';
    saveButton.addEventListener('click',  saveEditBank);

    let index = indexOfElement(div.firstChild.textContent);

    inputName.value = banks[index].bankName;
    inputRate.value = banks[index].interestRate;
    inputMaxLoan.value = banks[index].maxLoan;
    inputMinDownPay.value = banks[index].minDownPay;
    inputMinLoanTerm.value = banks[index].minLoanTerm;
    inputMaxLoanTerm.value = banks[index].maxLoanTerm;


    bankNameSpan.append(inputName);
    interestRate.append(inputRate);
    maxLoan.append(inputMaxLoan);
    minDownPay.append(inputMinDownPay);
    divForInputs.append(inputMinLoanTerm, inputMaxLoanTerm);
    divForButton.append(saveButton);
    div_bank.append(bankNameSpan, interestRate, maxLoan, minDownPay, divForInputs, divForButton);
    div.before(div_bank);
    div.remove();

    function saveEditBank (e) {
        let bank = {
            bankName: '',
            interestRate: 0,
            maxLoan: 0,
            minDownPay: 0,
            minLoanTerm: 0,
            maxLoanTerm: 0
        }

        const button = e.target;
        const div = button.parentElement.parentElement;
        const bankName = document.getElementById('inputName');
        const interestRate = document.getElementById('inputRate');
        const maxLoan = document.getElementById('inputMaxLoan');
        const minDownPay = document.getElementById('inputMinDownPay');
        const minLoanTerm = document.getElementById('inputMinLoanTerm');
        const maxLoanTerm = document.getElementById('inputMaxLoanTerm');

        bank.bankName = bankName.value;
        bank.interestRate = interestRate.value;
        bank.maxLoan = maxLoan.value;
        bank.minDownPay = minDownPay.value;
        bank.minLoanTerm = minLoanTerm.value;
        bank.maxLoanTerm = maxLoanTerm.value;
        banks.splice(index, 1);
        banks.push(bank);
        div.remove();
        getBank(banks.length - 1);
        localStorage.setItem('banks', JSON.stringify(banks));
    }
}



function saveBank(e) {
    let bank = {
        bankName: '',
        interestRate: 0,
        maxLoan: 0,
        minDownPay: 0,
        minLoanTerm: 0,
        maxLoanTerm: 0
    }

    let div = e.target.parentElement.parentElement;
    const bankName = document.getElementById('inputNameCreate');
    const interestRate = document.getElementById('inputRateCreate');
    const maxLoan = document.getElementById('inputMaxLoanCreate');
    const minDownPay = document.getElementById('inputMinDownPayCreate');
    const minLoanTerm = document.getElementById('inputMinLoanTermCreate');
    const maxLoanTerm = document.getElementById('inputMaxLoanTermCreate');

    bank.bankName = bankName.value;
    bank.interestRate = interestRate.value;
    bank.maxLoan = maxLoan.value;
    bank.minDownPay = minDownPay.value;
    bank.minLoanTerm = minLoanTerm.value;
    bank.maxLoanTerm = maxLoanTerm.value;

    banks.push(bank);
    localStorage.setItem('banks', JSON.stringify(banks));
    div.remove();
    getBank(banks.length - 1);
}

createHat();

for (let i = 0; i < banks.length; i++) {
    getBank(i);
}

createBankButton();














