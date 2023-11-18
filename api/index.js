const  express = require('express')
const cors = require('cors')
const User = require("./models/User.js")
const app = express()
const Item = require('./models/item.js')
const bcrypt = require("bcryptjs")
const multer =  require("multer")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const cookieParser = require('cookie-parser')
const bcryptSalt = bcrypt.genSaltSync(10)
const mongoose = require("mongoose")
const fs = require('fs')
const { isStringObject } = require('util/types')
const UserModel = require('./models/User.js')
const { Console } = require('console')
const Saved = require('./models/saved.js')
const uploadImage = require('./controllers/uploadImage.js')
const jwtSecret = "sgfdahgsdgueryagrysjhd62"
const MongoClient = require('mongodb').MongoClient
const port = 5000
app.use(cookieParser())
app.use(express.json({limit:'25mb'}))
app.use(express.urlencoded({extended: true, limit:'25mb'}))
app.use('/uploads', express.static(__dirname + "/uploads"))
app.use(express.json())
app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}))



main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.Mongo_Url, {useNewUrlParser:true});
  
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  }


app.post("/register", async(req,res) => {
    const {name,email,password, pfp,} = req.body

    try{
        const userDoc = await User.create({
            name,
            email,
            pfp,
            password:bcrypt.hashSync(password, bcryptSalt),
        
        })
        res.json(userDoc)  
    }
    catch(e){
        res.status(422).json(e)
    }
    
})



app.post("/login",async (req,res)=>{
    const {email, password} = req.body;
   const userDoc = await User.findOne({email})
   if(userDoc){
    const passOk = bcrypt.compareSync(password, userDoc.password)
    if(passOk){
jwt.sign({email:userDoc.email,
    pfp:userDoc.pfp,
     id:userDoc._id,
    name:userDoc.name}, jwtSecret,{},(err,token)=>{
    if(err) throw err;
    res.cookie('token', token).json(userDoc)
})
       
       }
       else{
        res.status(422).json("pass not ok")
       }
   }
   else{
    res.json("not found")
   }
})

app.post('/post-item', (req,res)=>{
    const {token} = req.cookies
    const {title, description, type
        ,photos, condition, address,price, currency, PhoneNumber} = req.body
    jwt.verify(token, jwtSecret, {}, async(err,userData)=>{
                try{
                    const item = await Item.create({
                        owner:userData.id,
                        title,
                         description,
                        type
                        ,photos,
                         condition,
                          address,
                          price,
                          currency,
                          PhoneNumber
                    })

                    res.json(item)
                } 
                catch(err){
                    res.json(err)
                }
                    
                })
})

app.post('/upload', (req,res) =>{
    uploadImage(req.body.image).then(url => res.json(url)).catch(err => res.status(500).json(err))
    
    })



app.post('/uploadImage', (req,res) =>{
uploadImage(req.body.image).then(url => res.json(url)).catch(err => res.status(500).json(err))

})

app.get('/posted', (req,res)=>{
    const {token} = req.cookies
    jwt.verify(token, jwtSecret, {}, async(err,userData)=>{
        const {id} = userData
        res.json(await Item.find({owner:id}))}
    )

})

app.get('/account/posted/:id', async (req,res)=>{
    const {id} = req.params
    res.json(await Item.findById(id))

})

app.put('/update',async (req,res)=>{
  const {title, description, type, id
        ,photos, condition, address,price, currency,PhoneNumber,} = req.body
    const itemDoc = await Item.findById(id)
        const {token} = req.cookies
        jwt.verify(token, jwtSecret, {}, async(err,userData)=>{
if (err) throw err

if (userData.id === itemDoc.owner.toString()){
              await itemDoc.set({title, description, type
                     ,photos, condition, address,
                     price, currency,PhoneNumber,})
               await itemDoc.save()
                res.json(itemDoc)
            }

        })

})

app.post('/delete', async(req,res)=>{
   const {sold} = req.body
    await Item.deleteOne({id:sold})
     res.json("SOLD!!!")
   
})


app.get('/all-items', async (req,res)=>{
    res.json(await Item.find())
})


app.get('/single/:id', async (req,res)=>{
   const {id} = req.params
   const theItem = await Item.findById(id)
   const theUser = await User.findById(theItem.owner) 
   res.json({theItem, theUser})
})

app.post('/to-save/:id', async(req,res)=>{
    const {token} = req.cookies
    const {id} = req.params
    const alredySaved =await Saved.find({Saveditem:id})
    
    jwt.verify(token, jwtSecret, {}, async(err,userData)=>{
        try{
             
            const savedDoc = await Saved.create({
                owner:userData.id,
                Saveditem:id            
            })
            res.json(savedDoc)  
        }

        catch(err){
                
        }    })
   
    })


app.get('/saved',async (req,res)=>{
    const {token} = req.cookies
    var SavedItemId =[]
    let item = ''
    jwt.verify(token, jwtSecret, {}, async(err,userData)=>{
    if(err) throw err
        const {id} = userData
       const savedDoc = await Saved.find({owner:id})
       savedDoc.forEach(element => { 
        SavedItemId.push(element.Saveditem)    
       });
       SavedItemId.filter(element => {element == element})
       let savedItems = SavedItemId.map( async element => {
         await Item.findById(element)
        })
        res.json(savedItems)
    })
    
})

app.post('/edit-profile',async (req,res)=>{
    const {email,name, pfp, id, password} = req.body
          const {token} = req.cookies
          const userDoc = await User.findById(id)
          jwt.verify(token, jwtSecret, {}, async(err,userData)=>{
  if (err) throw err
  if(password){
                await userDoc.set({email,name, pfp,password:bcrypt.hashSync(password, bcryptSalt)})
                 await userDoc.save()
                  res.json(userDoc)
  }
          })
  
  })
  
app.get('/:subpage', async(req,res)=>{
    const {subpage} = req.params
    res.json(await Item.find({condition:subpage}))
})

app.post('/search/:tosearch', async (req,res)=>{
    const {tosearch} = req.params
    res.json(await Item.find({title:tosearch}))
})

app.post("/uploadMultipleImages", (req, res) => {
    uploadImage
      .uploadMultipleImages(req.body.images)
      .then((urls) => res.send(urls))
      .catch((err) => res.status(500).send(err));
  });











// app.post('/login', async(req,res)=>{
//   const {email, password} = req.body
//   const userDoc = await User.findOne({email})
//   if(userDoc){
//     const passOk = bcrypt.compareSync(password, userDoc.password)
//   }
//   if(passOk){
//     jwt.sign({email:userDoc.email,
//          id:userDoc._id,
//         name:userDoc.name}, jwtSecret,{},(err,token)=>{
//         if(err) throw err;
//         res.cookie('token', token).json(userDoc)
//     })
// }
//     else{
//  res.status(422).json("pass not ok")
// }


//   })
// app.get('/profile', (req,res)=>{
//     const {token} = req.cookies
//     if(token){
//         jwt.verify(token, jwtSecret, {}, async(err,userData)=>{
//             if (err) throw err
//             const {name , email,_id} = await User.findById(userData.id)
//            res.json({name , email,_id})
//         })

//     }
//     else{
//         res.json(null)
//     }

//     app.post('/logout', (req,res)=> {
//         res.cookie('token','').json(true)
//     })
// })

// app.post('/upload-by-link', async (req,res)=>{
//     const {link} = req.body
//     const newName = Date.now() + ".jpg"
//     await imageDownloader.image({
//         url: link,
//         dest: __dirname + 'uploads'
//     })
//     res.json(newName)
// })
//
// app.post('/places', (req,res)=>{
//     const {token} = req.cookies
//     const {title, address, photos:addedPhotos,
//         description, perks, extraInfo,price,
//         checkIn, checkOut, maxGuests} = req.body

//     jwt.verify(token, jwtSecret, {}, async(err,userData)=>{
//         if (err) throw err
//        const placeDoc = await place.create({
//         owner:userData.id,title, address, addedPhotos,
//         description, perks, extraInfo,
//         checkIn, checkOut, maxGuests,price}
//         )
//     })
//     res.json(placeDoc)
      
// })
// app.get('/user-places', (req,res)=>{
//     const {token} = req.cookies
//     jwt.verify(token, jwtSecret, {}, async(err,userData)=>{
 
//     const {id} = userData
//     res.json(await place.find({owner:id }))
// })
// })
// app.get('/places/:id', async (req,res)=>{
// const {id} =req.params
// res.json(await place.findById(id))
// })

// app.put('/places',async (res,req)=>{ 
//     const {token} = req.cookies
//     const  {id,title, address, addedPhotos,
//         description, perks, extraInfo,
//         checkIn, checkOut, maxGuests, price} = req.body
//         const placeDoc = await place.findById(id)
//         jwt.verify(token, jwtSecret, {}, async(err,userData)=>{
//         if (err) throw err
//         if (userData.id === placeDoc.owner.toString()){
//             await placeDoc.set({title, address, photos:addedPhotos,
//                 description, perks, extraInfo,
//                 checkIn, checkOut, maxGuests,price               
//             })
//            }
// })
// await placeDoc.save()
// res.json('ok')
// })


// app.get('/places', async (req,res)=>{
    
//     res.json(await place.find())
// })


app.listen(port, () => console.log(`Example app listening on port ${port}'`))
