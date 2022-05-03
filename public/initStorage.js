

function initStorage() {
  const banks = localStorage.getItem('banks');
  

let initialBanks = [
  {
      bankName: "Укрсиббанк",
      interestRate: 10,
      maxLoan: 2000000,
      minDownPay: 10,
      minLoanTerm: 1,
      maxLoanTerm: 15
  },
  {
      bankName: "Приватбанк",
      interestRate: 7,
      maxLoan: 2500000,
      minDownPay: 15,
      minLoanTerm: 1,
      maxLoanTerm: 20
  },
  {
      bankName: "Альфабанк",
      interestRate: 11,
      maxLoan: 2400000,
      minDownPay: 25,
      minLoanTerm: 1.5,
      maxLoanTerm: 25
  }
]
  if (!banks){
    localStorage.setItem('banks', JSON.stringify(initialBanks));
  }
}