const express = require('express');
const groceryApi = require('../api/groceryApi')
const recipesApi = require('../api/recipesApi')
const accountApi = require('../api/accountApi')
const router = express.Router()

router
    .route('/grocery')
    .get((req,res) => {
        groceryApi.listAllLists()
            .then(list => {
                res.render('grocery/lists', { list })
            })
    })

router
    .route('/grocery/:acctId/new-grocery-form')
    .get((req,res) => {
        accountApi.getAccountById(req.params.acctId)
            .then(account => {
                res.render('grocery/new-grocery-form', { account })
            })
    })
    .post((req,res) => {
        let listData = {
            name: req.body.name,
            list: req.body.list,
            acctId: req.params.acctId
        }
        groceryApi.newGroceryList(listData)
            .then(() => {
                res.redirect(`/accounts/${req.params.acctId}`)
            })
    })

router
    .route('/grocery/:listId/:acctId')
    .get((req,res) => {
        groceryApi.getListById(req.params.listId)
            .then(list => {
                res.render('grocery/list', { list })
            })
    })
    .delete((req,res) => {
        console.log(req.params.listId)
        groceryApi.deleteListById(req.params.listId)
            .then(() => {
                res.redirect(`/accounts/${req.params.acctId}`)
            })
    })

router
    .route('/grocery/:listId/:acctId/edit')
    .get((req,res) => {
        groceryApi.getListById(req.params.listId)
            .then(list => {
                res.render('grocery/edit-list-form', { list })
            })
    })
    .put((req,res) => {
        groceryApi.getListById(req.params.listId)
            .then(list => {
                let updatedList = {
                    name: req.body.name,
                    list: req.body.list,
                    acctId: req.params.acctId
                }
                groceryApi.updateList(list,updatedList)
                    .then(() => {
                        res.redirect(`/accounts/${list.acctId}`)
                    }) 
            })

    })

router
    .route('/grocery/update')
    .put((req,res) => {

        let newItems = req.body.item
        let lists = req.body.list

        groceryApi.getListById(lists)
        .then(list => {
            let newArray = []

            if(list.list !== null )
            for(let i = 0; i < list.list.length; i++){
                newArray.push(list.list[i])
            }

            if(typeof newItems === 'object' ) {
                for(let i = 0; i < newItems.length; i++) {
                    newArray.push(newItems[i])
                } 
            } else {
                newArray.push(newItems)
            }

            let listUpdate = {
                list: newArray
            }
            groceryApi.updateList(list,listUpdate)
                .then(() => {
                    res.redirect(`/accounts/${list.acctId}`)
                })
        })
})



module.exports = router;
