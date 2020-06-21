const express = require("express");
const ıyzıpay = express.Router();
const cors = require("cors");
var Iyzipay = require('iyzipay');


  ıyzıpay.use(cors());
  ıyzıpay.post('/iyzipay', (req, res) => {
  console.log(req.body.amount)
    var iyzipay = new Iyzipay({
        apiKey: 'sandbox-P2LvuO1os3XB5ZtTZgIS3JdLCDQYhWFR',
        secretKey: 'sandbox-5E3Ro5wVe07WbgQ48VfZyEiINZ29egyE',
        uri: 'https://sandbox-api.iyzipay.com'
    });
    var request = {
        locale: Iyzipay.LOCALE.TR,
        conversationId: '123456789',
        price: req.body.amount,
        paidPrice: req.body.amount,
        currency: Iyzipay.CURRENCY.TRY,
        installment: '1',
        basketId: 'B67832',
        paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
        paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
        paymentCard: {
            cardHolderName: req.body.cartowner_name,
            cardNumber: req.body.cart_numbers,
            expireMonth: req.body.cart_month,
            expireYear:req.body.cart_year,
            cvc: req.body.cvv,
            registerCard: '0'
        },
        buyer: {
            id: 'BY789',
            name: 'John',
            surname: 'Doe',
            gsmNumber: '+905350000000',
            email: 'email@email.com',
            identityNumber: '74300864791',
            lastLoginDate: '2015-10-05 12:43:35',
            registrationDate: '2013-04-21 15:12:09',
            registrationAddress: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
            ip: '85.34.78.112',
            city: 'Istanbul',
            country: 'Turkey',
            zipCode: '34732'
        },
        shippingAddress: {
            contactName: 'Jane Doe',
            city: 'Istanbul',
            country: 'Turkey',
            address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
            zipCode: '34742'
        },
        billingAddress: {
            contactName: 'Jane Doe',
            city: 'Istanbul',
            country: 'Turkey',
            address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
            zipCode: '34742'
        },
        basketItems: [
            {
                id: 'BI101',
                name: 'Binocular',
                category1: 'Collectibles',
                category2: 'Accessories',
                itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price: req.body.amount
            }
        ]
    };
    
    iyzipay.payment.create(request, function (err, result) {
       res.json(result)
       console.log(result)
    }) 
  });
  
module.exports = ıyzıpay;
