// Classes
class Budget {
    constructor(budget) {
        this.budget = Number( budget );
        this.budgetLeft = this.budget;
    }
    // Subtract list item amount from the budget
    subtractFromBudget(amount) {
        return this.budgetLeft -= amount;
    }
}

// All things HTML
class HTML {

    // Insert the budget when the user submits it
    inserBudget(amount) {
        
        //Insert into HTML
        budgetTotal.innerHTML = `${amount}`;
        budgetLeft.innerHTML = `${amount}`;
    }

    // Displays a message (correct or invalid)
    printMessage(message, className) {
        const messageWrapper =  document.createElement('div');
        messageWrapper.classList.add('text-center', 'alert', className);
        messageWrapper.appendChild(document.createTextNode(message));

        //Insert into HTML
        document.querySelector('.primary').insertBefore(messageWrapper, addExpenseForm);

        //Clear the error
        setTimeout(function() {
            document.querySelector('.primary .alert').remove();

            //Optionally you can choose to reset the whole form if there is an
            
            //addExpenseForm.reset();
        }, 3000);
    }

    //Displays the expenes from the form into the list
    addExpenseToList(name, amount) {
        const expensesList = document.querySelector('#expenses ul');

        //Create the list of expenses
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';

        //Create the template
        li.innerHTML = `
        ${name}
        <span class='badge badge-primary badge-pill'>$${amount}</span>
        `;

        //Insert into HTML
        expensesList.appendChild(li);
    }
    trackBudget(amount) {
        const budgetLeftInDollars = budget.subtractFromBudget(amount);
        budgetLeft.innerHTML = `${budgetLeftInDollars}`;

        //Alert when budget gets low
        if( (budget.budget / 4) > budgetLeftInDollars) {
            budgetLeft.parentElement.parentElement.classList.remove('alert-success', 'alert-warning');
            budgetLeft.parentElement.parentElement.classList.add('alert-danger');
        } else if( (budget.budget / 2) > budgetLeftInDollars) { 
            budgetLeft.parentElement.parentElement.classList.remove('alert-success');
            budgetLeft.parentElement.parentElement.classList.add('alert-warning');

        }

        setTimeout(function() {
            addExpenseForm.reset()
        }, 2000);
    }

}
// Variables
const addExpenseForm = document.querySelector('#add-expense'),
        budgetTotal = document.querySelector('span#total'),
        budgetLeft = document.querySelector('span#left');

let budget, userBudget;


const html = new HTML();


//Event Listeners
eventListeners();
function eventListeners() {

    //App Init
    document.addEventListener('DOMContentLoaded', function() {
        //Ask for the weekly budget
        userBudget = prompt('What\'s your budget for this week?');

        //Validate userBudget
        if(userBudget === null || userBudget === '' || isNaN(userBudget) === true || userBudget === '0' || userBudget < 0) {
            window.location.reload();
        } else {
            // If budget is valid, then instantiate the budget clasee
            budget = new Budget(userBudget);

            // Instantiate the HTML class
            html.inserBudget(budget.budget);
        }
    });
    addExpenseForm.addEventListener('submit', function(e) {
        e.preventDefault(); 

        
        //When expense is added
        const expenseName = document.querySelector('#expense').value;
        const amount = document.querySelector('#amount').value;

        if(expenseName === '' || amount === '') {
            html.printMessage('There was an error, all fields are mandatory', 'alert-danger');
            } else {
                //Add the expenses into the list
                html.addExpenseToList(expenseName, amount);
                html.trackBudget(amount);
                html.printMessage('Budget item added...', 'alert-success');            }
    });
}