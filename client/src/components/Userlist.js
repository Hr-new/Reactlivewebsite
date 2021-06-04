import React, { useState, useRef } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom'
import Select from 'react-select'



const Userlist = ({ posts, loading }) => {
  // alert(posts);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [userList, setUserList] = useState([]);
  const [warehouseList, setWarehouseList] = useState([]);
  const [warehouseId, setwarehouseId] = useState("");
  const txtname = useRef('');
  const txtage = useRef('')
  const txtcountry = useRef('')
  const txtemail = useRef('')
  const txtusername = useRef('')
  const txtrole = useRef('')
  const [users, setUsers] = useState([])
  const options = [
    { value: 'ABC', label: 'ABC' },
    { value: 'xyz', label: 'xyz' },

  ]
  const history = useHistory()

  if (loading) {
    return <h2>No record Found</h2>;
  }

  const deleteUser = (id) => {


    Axios.delete(`http://localhost:3001/deleteu/${id}`).then((response) => { });

  };
  const BlockUser = (id, active) => {
    // alert(active)
    // alert(id)
    Axios.put("http://localhost:3001/block", { id: id, active: active }).then((response) => { });
    if (active)
      alert('Now user is Block')
    else
      alert('Now user is UnBlock')



  };
  const AssignWarehouse = (id) => {
    // alert(warehouseId)
    if (warehouseId != '') {
      // alert(warehouseId)
      Axios.put("http://localhost:3001/warehouse", { warehouseId: warehouseId, id: id }).then(
        (response) => {
          console.log(response.data)
          alert('Warehouse Assign to user')
          // history.push('/Login');
        }
      );
    }
  };

  const getuser = (id) => {
    // alert(id)

    Axios.post("http://localhost:3001/getuser", { id: id }).then((response) => {
      setUserList(response.data);
      txtname.current.value = response.data[0].name
      txtage.current.value = response.data[0].age
      txtcountry.current.value = response.data[0].country
      txtusername.current.value = response.data[0].username
      txtemail.current.value = response.data[0].email

      txtrole.current.value = response.data[0].role

      console.log(response.data)
    });

  };
  const getwarehouse = (id) => {
    Axios.post("http://localhost:3001/getuser", { id: id }).then((response) => {
      setWarehouseList(response.data);

      txtname.current.value = response.data[0].name
      // console.log(response.data)

    });
  };
  const updateUserRole = (id) => {


    Axios.put("http://localhost:3001/update", { name: txtname.current.value, age: txtage.current.value, country: txtcountry.current.value, username: txtusername.current.value, email: txtemail.current.value, role: txtrole.current.value, id: id }).then(
      (response) => {
        setUserList(
          userList.map((val) => {
            return val.id == id
              ? {
                id: val.id,
                name: name,
                age: age,
                country: country,
                username: username,
                email:email,
                password: password,
                role: role
              }
              : val;
          })

        );
        history.push('/Main')
      }

    );


  };
  return (

    <table class="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Age</th>
          <th scope="col">Country</th>
          <th scope="col">Username</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col" >Action</th>

        </tr>
      </thead>

      <tbody>
        {userList.map((val, key) => {
          return (
            <tr>

              <td>
                <input
                  type="text"
                  placeholder="Name"
                  ref={txtname}
                  style={{ height: '30px', width: '100px' }}

                /></td>
              <td>
                <input
                  type="text"
                  placeholder="Age"
                  ref={txtage}
                  style={{ height: '30px', width: '100px' }}

                /></td>
              <td>
                <input
                  type="text"
                  placeholder="Country"
                  ref={txtcountry}
                  style={{ height: '30px', width: '100px' }}

                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder={val.username}
                  ref={txtusername}
                  style={{ height: '30px', width: '100px' }}

                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder={val.email}
                  ref={txtemail}
                  style={{ height: '30px', width: '100px' }}

                />
              </td>


              <td>
                <input
                  type="text"
                  placeholder="Role"
                  ref={txtrole}
                  style={{ height: '30px', width: '100px' }}

                />
              </td>

              <td><button style={{ height: '35px', width: '70px' }} class="btn btn-primary"
                onClick={() => {
                  updateUserRole(val.userId);
                }}>Save</button> </td>

            </tr>
          );
        })}
        {warehouseList.map((val, key) => {
          return (

            <tr>

              <td>
                <input
                  type="text"
                  placeholder="Name"
                  ref={txtname}
                  style={{ height: '50px', width: '100px' }}
                 /></td>
              <td>
                <div style={{ width: '150px' }}>
                  <Select options={options} onChange={(e) => {
                    setwarehouseId(e.value);
                  }} />

                </div>
                {/* <input
                  type="text"
                  placeHolder="WarehouseName"
                  style={{ height: '30px', width: '100px' }}
                  onChange={(event) => {
                    setwarehouseId(event.target.value);
                  }}
                /> */}
              </td>
              <td>
                <button  style={{ height: '50px', width: '150px' }} class="btn btn-primary"
                  onClick={() => {
                    AssignWarehouse(val.userId);
                  }}
                  >
                  AssignWarehouse
                </button>
              </td>

            </tr>
          );
        })}

        {posts.map(post => (

          <tr>

            <td>{post.name}</td>
            <td>{post.age}</td>
            <td>{post.country}</td>
            <td>{post.username}</td>
            <td>{post.email}</td>
            <td>{post.role}</td>

            <td>
              <button class="btn btn-primary" style={{ height: '35px', width: '70px' }} onClick={() => {
                const confirmBox = window.confirm("Do you really want to Delete this User?")
                if (confirmBox === true) {
                  deleteUser(post.userId)
                }
              }}>Delete</button>
            
              <button class="btn btn-primary" style={{ height: '35px', width: '70px',marginLeft:'10px' }}
                onClick={() => {
                  const confirmBox = window.confirm("Do you really want to Do this?")
                  if (confirmBox === true) {
                    BlockUser(post.userId, post.active)
                  }
                }}>{post.active ? "Block" : "Unblock"}</button>
           
                <button class="btn btn-primary" style={{ height: '35px', width: '70px',marginLeft:'10px' }}
                onClick={() => {
                  getuser(post.userId)

                }}>Edit</button>
               
               <button class="btn btn-primary" style={{ height: '35px', width: '160px',marginLeft:'10px' , marginTop: '10px'}}
                onClick={() => {
                  getwarehouse(post.userId)

                }}>AssignWarehouse</button>
            </td>
          </tr>

        ))}
      </tbody>
    </table>
  );
};

export default Userlist;