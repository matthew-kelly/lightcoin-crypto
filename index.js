class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }
  get balance() {
    let balance = 0;
    this.transactions.forEach((item) => {
      balance += item.value;
    })
    return balance;
  }
  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if (this.isAllowed()) {
      this.time = new Date();
      this.account.addTransaction(this);
    } else {
      return false;
    }
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
  isAllowed() {
    return true;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }

  isAllowed() {
    if (this.account.balance - this.amount >= 0) {
      return true;
    } else {
      return false;
    }
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("snow-patrol");
console.log('Starting Balance:', myAccount.balance);
t0 = new Withdrawal(10.00, myAccount);
t0.commit();

t1 = new Deposit(100.00, myAccount);
t1.commit();

t2 = new Withdrawal(10.00, myAccount);
t2.commit();

t3 = new Deposit(110.00, myAccount);
t3.commit();
console.log('Ending Balance:', myAccount.balance);

console.log('transaction history: ', myAccount.transactions);
