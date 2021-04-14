//receive clientKey (result of payment intent) from backend

//collect credit card info through credit card form
//send credit card info to paymongo
const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      //get private key from server
      Authorization: `Basic ${private_key}`
    },
    body: JSON.stringify({
      data: {
        attributes: {
          details: {card_number: '4343434343434345', exp_month: 12, exp_year: 30, cvc: '123'},
          type: 'card'
        }
      }
    })
  }
  async function resp() {
    let url = "https://api.paymongo.com/v1/payment_methods"
    let response = await fetch(url, options)
    let json = await response.json()
    return json
}
resp().then(resp => {
    console.log(resp)
}).catch(err => console.error(err))















//------------------------------------ FLOWCHART ------------------------------------
//send order info to backend
//backend posts a payment intent to paymongo [PAYMENT INTENT]
//paymongo returns a client key to backend
//backend sends client key to frontend
    //client key will be used to attach a payment method to the payment intent
//customer provides payment info
//front end posts payment method to paymongo    [PAYMENT METHOD]
//paymongo returns payment method id to front end
//front end posts payment intent attach to paymongo [ATTACH TO PAYMENT INTENT]
        //paymongo processes payment attempt
//if non 3DS: paymongo returns payment status