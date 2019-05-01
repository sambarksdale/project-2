const express = require('express');
const accountApi = require('../api/accountApi')
const recipiesApi = require('../api/recipiesApi')
const groceryApi = require('../api/groceryApi')

const router = express.Router();

router
    .route('/accounts/new-account-form')
    .get((req,res) => {
        res.render('accounts/new-account-form');
    })

router
    .route('/accounts')
    .get((req,res) => {
        accountApi.getAllAccounts()
            .then(accounts => {
                res.render("accounts/accounts", {accounts});
            }) 
    })
    .post((req,res) => {
        accountApi.newAccount(req.body)
            .then(() => {
                res.redirect('/accounts');
            })
    })
    
router
    .route('/accounts/:id')
    .get((req,res) => {
        accountApi.getAccountById(req.params.id)
            .then(account => {
                recipiesApi.getRecipiesByAccountId(account._id)
                    .then(recipies => {
                        groceryApi.getGroceryListsByAccountId(account._id)
                            .then(lists => {
                                account.lists = lists;
                                account.recipies = recipies;
                                res.render('accounts/account', { account })
                            })
                        // account.recipies = recipies;
                        // res.render('accounts/account', { account })
                    })
            })
    })
    .delete((req,res) => {
        accountApi.deleteAccountById(req.params.id)
            .then(() => {
                res.redirect('/accounts')
            })
    })
    .put((req,res) => {
        accountApi.getAccountById(req.params.id)
            .then(account => {
                // console.log(account)
                // console.log(req.body)
                accountApi.editAccount(account,req.body)
                    .then(() => {
                        res.redirect(`/accounts/${account._id}`)
                    })
            })
    })

router
    .route('/accounts/:id/edit')
    .get((req,res) => {
        accountApi.getAccountById(req.params.id)
            .then(account => {
                res.render('accounts/edit-account-form', { account })
            })
})



module.exports = router;
