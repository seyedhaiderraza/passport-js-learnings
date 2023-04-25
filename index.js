const express = require('express')

const app = new express()

const middleware1 = (req, res, next) => {
    console.log('i am middleware1');
    const errorObj = new Error('this is error')
    req.customProperty({})
    next(errorObj)
}

const errorHandler = (errorObj, req, res, next) => {
    //  in any middleware if 4 args defined then first arg is error
    //this is how expres identifies it as erorhandler
    res.json({ error: errorObj })
    res.send()
}
app.use(middleware1)
app.get('/', (req, res, next) => {

    res.send('hello world123')
})

app.use(errorHandler)

app.listen(3000)