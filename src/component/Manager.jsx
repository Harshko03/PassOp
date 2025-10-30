import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from 'uuid';


function Manager() {
  const ref = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {
  
    if (ref.current.src.includes("icons/closed-eye.png")) {
      ref.current.src = "icons/eye.png";
    } else {
      ref.current.src = "icons/closed-eye.png";
    }
  };

  const savePassword = () => {
    if(form.site.length >3 && form.username.length > 3 && form.password.length >3 ){
    setPasswordArray([...passwordArray, {...form, id: uuidv4()}]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]));
    console.log(...passwordArray, form);
    setform({site:"",username: "",password:""})
    
    toast('Password Saved!', {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",

});
    }
    else{
 toast('Error Password Not Saved !');
    }
  };
   const deletePassword = (id) => {
     toast('Password Deleted!', {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",

});
  
    let c = confirm("Do you want to delete this password")
if(c){
     setPasswordArray(passwordArray.filter(item=>item.id!==id));
    localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)));
    
}
  };
 const editPassword = (id) => {
   
  
    setform(passwordArray.filter(i=>i.id===id)[0])
    setPasswordArray(passwordArray.filter(item=>item.id!==id));
    // localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]));
    // console.log(...passwordArray, form);
  };

  const copyText = (text) => {
    toast('Copied To Clipboard!', {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",

});
    navigator.clipboard.writeText(text);
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
       
      />
      <div
        className="absolute top-0 z-[-2] h-screen w-screen rotate-180 
      transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"
      ></div>

      <div className="p-3 md:p-0 md:mycontainer min-h-[84.8vh]">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-500"> &lt;</span>
          <span>Pass</span>
          <span className="text-green-500">Op/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your Personal Password manager
        </p>
        <div className="text-white flex flex-col p-4 gap-8 items-center">
          <input
            onChange={handleChange}
            value={form.site}
            className="rounded-full border border-green-500 w-full text-black p-4 py-1"
            placeholder="Enter Website URL"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              onChange={handleChange}
              value={form.username}
              className="rounded-full border border-green-500 w-full text-black p-4 py-1"
              placeholder="Enter Username"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                onChange={handleChange}
                value={form.password}
                className="rounded-full border border-green-500 w-full text-black p-4 py-1"
                placeholder="Enter Password"
                type="text"
                name="password"
                id="password"
              />
              <span
                className="absolute right-1 top-[4px] text-black cursor-pointer "
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={26}
                  src="/icons/eye.png"
                  alt="open eye"
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="text-black flex gap-2 justify-center items-center bg-green-500 rounded-full px-8 py-2 w-fit border border-green-900 hover:bg-green-600"
          >
            <lord-icon
              src="https://cdn.lordicon.com/efxgwrkc.json"
              trigger="hover"
            ></lord-icon>
            Save Password
          </button>
        </div>

        <div className="passwords">
          <h2 className="text-2xl font-bold py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords To Show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md mb-10 overflow-hidden">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                   <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center">
                          <span>
                            <a href={item.site} target="_blank">
                              {item.site}
                            </a>
                          </span>
                          <div
                            className="lordiconcopy size=7 cursor-pointer"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center">
                          <span>{item.username}</span>
                          <div
                            className="lordiconcopy size=7 cursor-pointer"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center">
                          <span>{item.password}</span>
                          <div
                            className="lordiconcopy size=7 cursor-pointer"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                       <td className="py-2 border justify-center border-white text-center">
                       <span className="cursor-pointer mx-1" onClick={()=>{editPassword(item.id)}} >
                       
                        <lord-icon
                              style={{
                                width: "25px",height: "25px",paddingTop: "3px",paddingLeft: "3px",}}
                              src="https://cdn.lordicon.com/gwlusjdu.json"
                              trigger="hover"
                            ></lord-icon></span> 
                             <span className="cursor-pointer mx-1" onClick={()=>{deletePassword(item.id)}}>
                       
                        <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/skkahier.json"
                              trigger="hover"
                            ></lord-icon></span> 
                      
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default Manager;
