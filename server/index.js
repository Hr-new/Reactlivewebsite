// mongoose require for MongoDb connection
const mongoose=require('mongoose');
const crypto=require('crypto')
// const authenticte=require('./middleware/Authenticate');
const nodemailer = require('nodemailer')
// Sequelize=require('sequelize')
const jwt=require('jsonwebtoken')



const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const dotenv=require('dotenv');

dotenv.config({path:"./config.env"})

// MOngoDB connection String
const DB=process.env.DATABASE

// MOngoDB Connection
// mongoose.connect(DB,{
//   useNewUrlParser:true,
//   useCreateIndex:true,
//   useUnifiedTopology:true,
//   useFindAndModify:false
// }).then(()=>{
//   console.log('Connection successfully')
// }).catch((err)=>{
//   console.log('error')
// })

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const multer = require("multer");
const path = require("path");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();
//get data from front end and convert it into object so you can send json data as to front end
app.use(express.json());

//apply cors policy
app.use(
  cors({
    origin: ["http://localhost:3000", "http://192.168.0.138:3000","https://hr-new.github.io"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

//set cookies
app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expire:new Date(Date.now()+1800),
      httpOnly:true
    },
  })
);

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "LoginSystem",
});


// storage engine 

const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100000
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
})

const Authenticate=async (req,res,next)=>{
    
  try{

      const token=req.cookies.jwttoken;
      
      if(token)
      {
      const verifytoken=jwt.verify(token,process.env.TOKEN_SECRET);
      // console.log(verifytoken)
      
      db.query("Select * from user where userId=?", [verifytoken],
      (err,result)=>{
          if(err)
          {
              throw new Error('user not found')
          }
          else{
              // console.log(result[0])
          // console.log(result[0].userId)
          // req.token=token;
          req.rootuser=result[0];
          // req.userId=result[0].userId
          next();
          }

      });
      
    }
    else{
      throw new Error('Provide jwt token')
    }
      
   }
  catch(err){
      res.status(401).send('Unautherised')
      // console.log(err)

  }

}

app.post("/profile", Authenticate,(req, res) => {
  // console.log(req.rootuser.userId)
  const id = req.body.id;

  db.query("SELECT * FROM user WHERE userId=?", id, (err, result) => {
    if (err) {
      console.log(err);
    }
    else {
      res.send(result);
    }
  });
});


app.use('/profile', express.static('upload/images'));

//Here MiddleWare is 2nd argument
app.post("/upload", upload.single('profile'), (req, res) => {
  const id = req.body.user_id;
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const pi = req.file.filename;

  db.query(
    "UPDATE user SET name=?,age=?,country=?,Profile_image=? WHERE userId =?",
    [name, age, country, pi, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(result.data)
        // console.log(req.file.filename)
        // res.send(result);
        res.send(pi);
      }
    }
  );

})

function errHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    res.json({
      success: 0,
      message: err.message
    })
  }
}
app.use(errHandler)
app.post("/AddProduct", (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;
  const location = req.body.location;
  const stock = req.body.stock;
  db.query(
    "SELECT Id from warehouse WHERE name=?", location, (err, result) => {
      if (err) {
        console.log(err)
      }
      else {
        // console.log(result)
        const id = result[0]['Id']
        db.query(
          "INSERT INTO product (Name,Description,Purchase_prise,stock,warehouseId) VALUES (?,?,?,?,?)",
          [name, description, price, stock, id],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              // console.log(res)
              res.send("Values Inserted");
            }
          }
        );

      }
    }
  );


});


app.put("/UpdateProduct", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;
  const warehouseId = req.body.location;
  const stock = req.body.stock;
  // console.log(id)
  db.query("Select Id FROM warehouse WHERE name=?",warehouseId,(err,result)=>{
    if(err)
    {
      console.log(err);
      
    }
    else{
            
      db.query( "UPDATE  product SET Name=?,Description=?,Purchase_prise=?,warehouseId=?,stock=? WHERE Id=?",
      [name, description, price, result[0]['Id'], stock, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          // console.log(res)
          res.send("Values Inserted");
        }
      }
    );}
  })
  

});


app.post("/stock", (req, res) => {
  const id = req.body.id;


  // const id = 3;
  // console.log(id)
  db.query("SELECT warehouseId FROM user WHERE userId =?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      db.query("SELECT w.name as WarehouseName,p.Id,p.Name,Description,Purchase_prise,Stock FROM product p join warehouse w on w.Id=warehouseId Where warehouseId=?", result[0]['warehouseId'], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
    }
  });
});

app.get("/viewstock/", (req, res) => {
  db.query("SELECT Id,name,sum(stock) as Total from product group by name", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }

  });
});

app.post("/WarehouseStock", (req, res) => {
  const name = req.body.warehousename
  // const name = 'ABC'
  // console.log(name)
  db.query("SELECT Id from warehouse WHERE name=? ", name, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const id = result[0]['Id']
      db.query("SELECT Id,name,stock as Total from product WHERE warehouseId= ?", id, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          // console.log(result);
          res.send(result);
        }

      });
    }

  });
});


app.post("/warehousedetails", (req, res) => {
  // const id = 3; 
  const id = req.body.id;

  db.query("SELECT warehouseId FROM user WHERE userId =?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      db.query("SELECT * FROM warehouse WHERE Id =?", result[0]['warehouseId'], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
    }
  });
});

app.put("/Addstock", (req, res) => {
  const name = req.body.name;
  let stock = req.body.stock;

  console.log(name)
  console.log(stock)
  db.query("SELECT * FROM product WHERE Name =?", name, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      stock = result[0]['stock'] + Number(stock);
      // console(newstock)
      db.query("UPDATE product SET stock=? WHERE Id =?", [stock, result[0]['Id']], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
    }
  });

});
app.post("/RequestStock", (req, res) => {

  const warehousename = req.body.warehousename;
  const productname = req.body.productname;
  const productdescription = req.body.productdescription;
  const productprice = req.body.productprice;
  const stock = req.body.stock;
  const id = req.body.id;

  // console.log(warehousename,productname,stock,id)

  db.query("SELECT name FROM user WHERE userId =?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      requestby = result[0]['name']
      console.log(requestby)
      db.query("Insert into request values(?,?,?,?,?,?,?,?)", [null, warehousename, productname, productdescription, productprice, stock, requestby, null], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
    }
  });

});
app.get("/request",Authenticate, (req, res) => {
  // console.log('fds')
  db.query("SELECT * FROM request Where status is null", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(result)
      res.send(result);
    }
  });
});

app.put("/acceptRequest/:id", (req, res) => {
  const id = req.params.id;
  // console.log(id)

    db.query("UPDATE  request  SET status=1 WHERE Id=?",
    [id], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        db.query("SELECT * FROM request Where Id=?", [id], (err, result) => {
          if (err) {
            
            console.log(err);
          } else {
            
            const name = result[0]['productname'];
            const description = result[0]['productdescription'];
            const price = result[0]['Purchase_prise'];
            const wname = result[0]['warehousename'];
            const stock = result[0]['stock'];
            
            
            db.query("SELECT Id FROM warehouse Where name=?", [wname], (err, result) => {
              if (err) {
                console.log(err);
              } else {
                const id = result[0]['Id'];
                

                db.query(
                  "INSERT INTO product (Name,Description,Purchase_prise,stock,warehouseId) VALUES (?,?,?,?,?)",
                  [name, description, price, stock, id],
                  (err, result) => {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log('f9')
                      // console.log(res)
                      res.send("Values Inserted");
                    }
                  }
                );
                // res.send(result);
              }
            });

            // res.send(result);
          }
        });
      }
    });
  
});

app.put("/rejectRequest/:id", (req, res) => {
  const id = req.params.id;
  db.query("UPDATE  request  SET status=0 WHERE Id=?",
    [id], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.put("/Deletestock", (req, res) => {
  const name = req.body.name;
  let stock = req.body.stock;

  // console.log(id)
  db.query("SELECT * FROM product WHERE Name =?", name, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      stock = result[0]['stock'] - Number(stock);
      // console(newstock)
      db.query("UPDATE product SET stock=? WHERE Id =?", [stock, result[0]['Id']], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
    }
  });

});


app.post("/register", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const username = req.body.username;
  const password = req.body.password;
  const role = req.body.role;
  const email=req.body.email;

db.query("SELECT email FROM user WHERE email=? " ,[email], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if(result.length>0){res.status(200).send({ message: 'Duplicate Email' });}
      else{
        bcrypt.hash(password, saltRounds, (err, hash) => {
          if (err) {
            console.log(err);
          }
      
          db.query(
            "INSERT INTO user (name,age,country,username, password,email,role,active) VALUES (?,?,?,?,?,?,?,1)",
            [name, age, country, username, hash,email, role],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
      
                res.send("Values Inserted");
              }
            }
          );
        });

      }
      
    }
    });
  
  
 
});

app.get("/product", (req, res) => {
  db.query("SELECT w.name as WarehouseName, p.Id, p.Name,Description,Purchase_prise,stock \
  FROM product p join warehouse w on warehouseId=w.id;", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/getuser", (req, res) => {
  const id = req.body.id;
  // id=3
  // select w.name
  // from warehouse w join user u on u.warehouseId=w.Id  
  // where userId=3"
  db.query("SELECT * FROM user WHERE userId=?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(result)
      res.send(result);
    }
  });
});

app.post("/getproduct", (req, res) => {
  const id = req.body.id;
  // id=3
  // select w.name as WarehouseName
  // from warehouse w join user u on u.warehouseId=w.Id  
  // where userId=3"
  db.query("  SELECT w.name as WarehouseName, p.Id, p.Name,Description,Purchase_prise,stock \
  FROM product p join warehouse w on warehouseId=w.id WHERE p.Id=?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(result)
      res.send(result);
    }
  });
});



app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;


  db.query("DELETE FROM product WHERE Id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


app.get("/login", (req, res) => {
  if (req.session.user) {
    // console.log(req.session.user[0].userId)
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

// Genereate Jwt token and store in database table
function generateAccessToken(result) {
  
  let token=jwt.sign(result[0].userId, process.env.TOKEN_SECRET);
  db.query("UPDATE user set jwttoken=? where userId=?",[token,result[0].userId],
  (err,result)=>{
    if(err)
    {
      console.log(err)
    }
  });
  
  return token;
}

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  
  // console.log(require('crypto').randomBytes(64).toString('hex'))
  db.query(
    "SELECT * FROM user WHERE username = ? and active=1;",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      else{
      // console.log(result)
      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            req.session.user = result;
            // console.log(req.session.user)

            // console.log(req.session.user);
            const token= generateAccessToken(result);
            // console.log(token)
            res.cookie("jwttoken",token,{
              expire:new Date(Date.now()+1800),
              httpOnly:true

            });
            // console.log(token)
            res.send(result);
          } else {
            res.send({ message: "Wrong username/password combination!" });
          }
        });
      } else {
        res.send({ message: "User doesn't exist or USer is Block by Admin" });
      }
    }
    }
  );
});

app.get("/user", (req, res) => {
  // console.log(req.session.user)
  db.query("SELECT * FROM user WHERE username !='admin'", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(result)
      // res.json({'result':result})
      res.send(result);
    }
  });
});

app.get("/detail", (req, res) => {
  db.query("SELECT count(userId) as TotalUser FROM user WHERE username !='admin'", (err, result1) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(result)
      db.query("SELECT count(Id) As TotalRequest from request WHERE status is null", (err, result2) => {
        if (err) {
          console.log(err);
        } else {
          // console.log(result)
          db.query("SELECT count(name) As TotalProduct from product", (err, result) => {
            if (err) {
              console.log(err);
            } else {
              // console.log(result)
              // console.log(result1)
              // console.log(result2)
              res.json({'TotalProduct':result[0],'TotalUSer':result1[0],'TotalRequest':result2[0]})
              
            }
          });
        }
      });

    }
  });
});

app.post("/detailuser", (req, res) => {
  
  const id = req.body.id;
  console.log(id)
  db.query("SELECT warehouseId FROM user WHERE userId =?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      db.query("SELECT count(p.name)as TotalProduct FROM product p join warehouse w on w.Id=warehouseId Where warehouseId=?", result[0]['warehouseId'], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.json({'TotalProduct':result[0]})
          
        }
      });
    }
  });
});

app.get("/warehouse", (req, res) => {
  db.query("SELECT Name FROM warehouse ", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(result)
      res.send(result);
    }
  });
});

// passing parameter in get method
app.get('/userfd',(req,res)=>{
  const id=req.query.id
  res.send('dfd')
}
);



app.put("/warehouse", (req, res) => {
  const id = req.body.id;
  const name = req.body.warehouseId;
  // console.log(id)

  db.query("Select Id from warehouse where name=?", [name], (err, result) => {
    if (err) {
      console.log(err);
      // res.send(err)
    } else {
      // console.log(result[0])
      db.query("UPDATE user SET warehouseId=?  WHERE userId = ?", [result[0]['Id'], id], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
    }


  });

});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const username = req.body.username;
  const email = req.body.email;
  const role = req.body.role;
  // console.log(role);
  db.query(
    "UPDATE user SET name=?,age=?,country=?,username=?,email=?,role =? WHERE userId =?",
    [name, age, country, username, email,role, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(role);
        res.send(result);
      }
    }
  );
});

app.post("/Resetpassword", (req, res) => {
  const id = req.body.userid;

  // const confirmpassword = req.body.confirmpassword;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    console.log(hash);
    db.query(
      "UPDATE user SET password=? WHERE userId =?",
      [hash,id],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(401).json('no user exists in db to update');
        } else {
          console.log("password updated")
          res.status(200).send({ message: 'password updated' });
          
        }
      }
    );
  });
});

app.delete("/deleteu/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  db.query("DELETE FROM user WHERE userId = ?", id, (err, result) => {
    if (err) {

      console.log(err);
    } else {
      console.log('hello');
      res.send(result);
    }
  });
});

app.put("/block", (req, res) => {
  const id = req.body.id;
  const active = req.body.active;
  // console.log(active)
  // console.log(id)
  if (active) {
    db.query("UPDATE user SET active=0  WHERE userId = ?", id, (err, result) => {
      if (err) {

        console.log(err);
      } else {
        res.send(result);
      }
    });
  }
  else {
    db.query("UPDATE user SET active=1  WHERE userId = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {

        res.send(result);
      }
    });
  }
});

//Send link to Reset Password

app.post('/forgotPassword', (req, res) => {
  if (req.body.email === '') {
    res.status(400).send('email required');
  }
  const email=req.body.email
 
  db.query("SELECT userId FROM user WHERE email = ? " ,email, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(result)
      if(result.length==0){
          console.error('email not in database');
          res.status(403).send('email not in db');
      }
      else{
        const token = crypto.randomBytes(20).toString('hex');
        const expire=Date.now() + 3600000;
        db.query("UPDATE user SET resetPasswordToken=?,resetPasswordExpire=? WHERE email = ? ", [token,expire,email], (err, result) => {
          if (err) {
            console.log(err);
          } else {
            // result.status(200).json({'result':result})
          const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
          // host: 'smtp.mailtrap.io',
          // port: 2525,
          // auth: {
          //   user: "cf49e4d8055c19",
          //   pass: "eb7e295f527f54",
          // },
          auth:{
            user:`${process.env.EMAIL_ADDRESS}`,
            pass:`${process.env.EMAIL_PASSWORD}`
          },
        });
  
        const mailOptions = {
          from: `${process.env.EMAIL_ADDRESS}`,
          to:email,
          subject: 'Link To Reset Password',
          html:`
            <p>You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n</p>
            <p>Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n</p>
            
            <h5>click in this http://localhost:3000/reset/${token} to reset password</h5>
            <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`
        };
  
        console.log('sending mail with link http://localhost:3000/reset/'+token);
  
        transporter.sendMail(mailOptions, (err, response) => {
          if (err) {
            console.error('there was an error: ', err);
          } else {
            console.log('here is the res: ', response);
            res.status(200).json('recovery email sent');
          }
        });
      }
    });
      }

    }
  });
  
      
  });

//Verify link is valid or not

app.get('/reset', (req, res) => {
  const token=req.query.resetPasswordToken;
  const n=Date.now();


  db.query("SELECT * FROM user WHERE resetPasswordToken = ?  and  resetPasswordExpire > ?" ,[token,n], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(result.userId)
      if (result.length==0)
      {
        console.error('password reset link is invalid or has expired');
        res.status(403).send('password reset link is invalid or has expired');
      }
      else{
        // console.log(result[0]['username'])
        res.status(200).send({
                username: result[0]['username'],
                message: 'password reset link a-ok',
              });
      }
    
  }
  });
  
});

//Update Password

app.put('/updatePasswordViaEmail', (req, res) => {
  const username=req.body.username;
  const resetPasswordToken=req.body.resetPasswordToken;
  const n=Date.now();


  db.query("SELECT * FROM user WHERE username=? and resetPasswordToken = ?  and  resetPasswordExpire > ?" ,[username,resetPasswordToken,n], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result)
      if (result.length==0)
      {
        console.error('password reset link is invalid or has expired');
        res.status(403).send('password reset link is invalid or has expired');
      }
      else if (result.length != 0){
        console.log('user exists in db');
        const password=req.body.password;
        // console.log(result[0]['username'])
        
        bcrypt.hash(password, saltRounds, (err, hash) => {
          if (err) {
            console.log(err);
          }
      
          // console.log(hash);
          db.query(
            "UPDATE user SET password=?,resetPasswordToken=?, resetPasswordExpire=? WHERE username =?",
            [hash,null,null,username],
            (err, result) => {
              if (err) {
                console.log(err);
                res.status(401).json('no user exists in db to update');
              } else {
                console.log("password updated")
                res.status(200).send({ message: 'password updated' });
                
              }
            }
          );
        });
        // res.status(200).send({
        //         username: result[0]['username'],
        //         message: 'password reset link a-ok',
        //       });
      }
      
      else {
        console.error('no user exists in db to update');
        res.status(401).json('no user exists in db to update');
      }
    }
    
  });
});



app.get('/profilejwt',Authenticate,(req,res)=>{
  console.log('hello')
  res.send(req.rootuser)

});

app.get('/logout',(req,res)=>{
  // console.log('dsf')
  res.clearCookie('jwttoken',{path:'/'});
  res.clearCookie('userId',{path:'/'});
  res.status(200).send('User Logout')
});



app.listen(3001, () => {
  console.log("running server");
});
