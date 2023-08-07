/* Context: The company that you work for suspects that credit card distributors have been mailing out cards that have invalid numbers.
In this project, you have the role of a clerk who checks if credit cards are valid. Every other clerk currently checks using pencil and
paper, but you’ll be optimizing the verification process using your knowledge of functions and loops to handle multiple credit cards at
a time. Unlike the other clerks, you can spend the rest of your time relaxing! */

// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];


const cardChecker = inputId => {
  let cardDigit = inputId.length - 2 //iterate through the digits of the credit card number in reverse order, starting from the second-to-last digit.
  let checkSum = 0
  let lenCheck = inputId.length % 2 // checks for odd or even number
  let len2 = lenCheck === 1 ? 0 : 1;

  while (cardDigit != -1) {
    const checkFormula = ((inputId[cardDigit] * 2) < 9) ? inputId[cardDigit] * 2 : ((inputId[cardDigit] * 2) - 9)

    if (cardDigit % 2 === lenCheck){
      checkSum += checkFormula
      cardDigit --
    } else if (cardDigit % 2 === len2) {
      checkSum += inputId[cardDigit]
      cardDigit --
    }
  } if (cardDigit === -1) {
      checkSum += inputId[inputId.length - 1]
      return checkSum % 10 === 0 ? 'Valid number.' : 'Invalid number.. '

  }
}

const getCompany = list => {
  switch (list[0]) {
    case 3:
      return 'Amex'
    case 4:
      return 'Visa'
    case 5:
      return 'Mastercard'
    case 6:
      return 'Discover'
    default:
      return 'Unknown company'
  }
}

const checker = (input, num) => {
  let counter = 1
  let companies = ['Companies with invalid numbers:']

  while (counter < num + 1) {
    console.log('Card: ' + counter)
    let inputId = eval(input + counter)
    let results = cardChecker(inputId, num)
    if (results === 'Invalid number.. ' && companies.includes(getCompany(inputId)) != true) {
      companies.push(getCompany(inputId))
    } else {
      getCompany(inputId)
    }
    console.log(getCompany(inputId))
    console.log(results)
    console.log(`Number: ${inputId}`)
    console.log('-------------------------------------->')
    console.log('')
    counter += 1;

  } if (counter === num + 1) {
    console.log(companies)
    return console.log('Check complete...')
  }
}

checker('invalid', 5)



/* 

// Alternative Solution: 

function validateCred(array) {
    const digits = [...array]; // Create a copy of the array to avoid mutation
    let isDoubled = false;
    let sum = 0;
  
    // Step 1: Starting from the farthest digit to the right, iterate to the left
    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = digits[i];
  
      // Step 2: Every other digit is doubled (the check digit is not doubled)
      if (isDoubled) {
        digit *= 2;
  
        // Step 2 continued: If the number is greater than 9 after doubling, subtract 9 from its value
        if (digit > 9) {
          digit -= 9;
        }
      }
  
      sum += digit;
      isDoubled = !isDoubled; // Toggle the isDoubled flag for every iteration
    }
  
    // Step 4: If the sum modulo 10 is 0, the number is valid; otherwise, it's invalid
    return sum % 10 === 0;
  };
  
  for (const creditCard of batch) {
    const isValid = validateCred(creditCard);
    console.log(isValid);
  };

  
  function findInvalidCards(cards) {
    const invalidCards = [];
  
    for (const card of cards) {
      if (!validateCred(card)) {
        invalidCards.push(card);
      }
    }
  
    return invalidCards;
  };
  
  const invalidCards = findInvalidCards(batch);
  console.log(invalidCards);
  
  // Checkpoint #5
  
  function idInvalidCardCompanies(invalidCards) {
    const companies = [];
  
      // Helper function to identify the company based on the first digit of the card number
  
    const identifyCompany = firstDigit => {
      switch (firstDigit) {
        case 3:
          return "Amex (American Express)";
        case 4:
          return "Visa";
        case 5:
          return "Mastercard";
        case 6:
          return "Discover";
        default:
          return "Company not found";
      }
    };
  
    for (const card of invalidCards) {
      const firstDigit = card[0];
      const company = identifyCompany(firstDigit);
      
      // Add the company to the list if it's not already present
  
      if (!companies.includes(company)) {
        companies.push(company);
      }
    }
  
    return companies;
  }
  
  const invalidCompanies = idInvalidCardCompanies(invalidCards);
  console.log(invalidCompanies);

*/

