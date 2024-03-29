const express = require('express')
const path = require('path')
const  app = express()
const port = 4000

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.use(express.urlencoded())
app.use(express.static('assets'))

var contactList = [ {
        name: "arpit",
        phone: "7488552785"
    }
]

app.get('/' , (req,res) => {
    return res.render('home',{
    title : "Arpit's contact",
    contact_list : contactList
})
    
})

app.get('/practice',(req,res) => {
    return res.render('practice',{
        title:'playground'
    })
})

app.get('/delete-contact',(req,res) => {
    let phone = req.query.phone
    let contactIndex = contactList.findIndex(contact => contact.phone == phone)

    if(contactIndex != -1){
        contactList.splice(contactIndex,1)
    }
    return res.redirect('back')

})

app.post('/create_contact', (req,res) => {
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // })
    contactList.push(req.body)
    // return res.redirect('/')
    return res.redirect('back')
})

app.listen(port,(err) => {
    if (err){
        console.log("Error on activatig server",err)
    }
    console.log("Server is running on port:",port)
})