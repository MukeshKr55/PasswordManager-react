import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ url: "", username: "", password: "" });
  const [passwordData, setPasswordData] = useState([]);
  const [checkEmpty, setCheckEmpty] = useState(false);
  const [isEditing, setIsEditing] = useState({ status: false, id: "" });

  useEffect(() => {
    let passwords = JSON.parse(localStorage.getItem("passwords"));
    passwords && setPasswordData(passwords);
  }, []);

  const savePasswordDetails = () => {
    if (form.url === "" || form.username === "" || form.password === "") {
      return setCheckEmpty(true);
    }

    let updatedPasswordData = passwordData;
    if (isEditing.status) {
      const removedItem = passwordData.filter(
        (data) => isEditing.id !== data.id
      );
      updatedPasswordData = removedItem;
      setIsEditing({ status: false, id: "" });
    }
    setCheckEmpty(false);
    const temp = [...updatedPasswordData, { ...form, id: uuidv4() }];
    setPasswordData(temp);
    localStorage.setItem("passwords", JSON.stringify(temp));
    setForm({ url: "", username: "", password: "" });
    setShowPassword(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast("Copied 🎉", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const deleteData = (key) => {
    const filteredItem = passwordData.filter((data) => data.id !== key);
    setPasswordData(filteredItem);
    localStorage.setItem("passwords", JSON.stringify(filteredItem));
  };
  const editData = (key) => {
    const filteredItem = passwordData.filter((data) => data.id === key)[0];
    setForm(filteredItem);
    setIsEditing({ status: true, id: filteredItem.id });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className="md:container mx-auto lg:px-28 lg:py-24 md:px-20 md::py-18 px-4 py-6 min-h-[90.3vh]">
        <h1 className="text-4xl lg:text-5xl flex font-bold justify-center items-center">
          <span className="text-orange-700">Pass</span>
          <lord-icon
            src="https://cdn.lordicon.com/stxfyhky.json"
            trigger="loop"
            state="loop-cycle"
            colors="primary:#b4b4b4,secondary:#1b1091"
            style={{ width: "4rem", height: "4rem" }}
          ></lord-icon>
          <span className="text-green-700">Man</span>
        </h1>
        <p className="text-center text-lg font-semibold text-gray-500">
          Your own Password Manager
        </p>
        <div className="flex flex-col p-4 gap-6">
          <input
            onChange={handleChange}
            placeholder="Enter Website URL"
            type="text"
            value={form.url}
            name="url"
            className="rounded-full px-4 py-1 outline-none border border-purple-300 focus:border-2 focus:border-purple-500 "
          />
          <div className="flex flex-col md:flex-row gap-6 lg:gap-12 justify-between">
            <input
              onChange={handleChange}
              placeholder="Enter Username"
              className="w-full rounded-full px-4 py-1 outline-none border border-purple-300 focus:border-2 focus:border-purple-500"
              type="text"
              name="username"
              value={form.username}
            />
            <div className="relative w-full">
              <input
                onChange={handleChange}
                placeholder="Enter Password"
                className="w-full rounded-full px-4 py-1 outline-none border border-purple-300 focus:border-2 focus:border-purple-500"
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
              />
              <span
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-1 top-0.5 cursor-pointer"
              >
                {showPassword ? (
                  <lord-icon
                    src="https://cdn.lordicon.com/kkiecexg.json"
                    trigger="click"
                    stroke="bold"
                    state="hover-look-around"
                  ></lord-icon>
                ) : (
                  <lord-icon
                    src="https://cdn.lordicon.com/kkiecexg.json"
                    trigger="click"
                    stroke="bold"
                    state="hover-lashes"
                  ></lord-icon>
                )}
              </span>
            </div>
          </div>
          {checkEmpty && (
            <p className="text-center text-red-600 text-sm font-semibold">
              Please fill all fields!
            </p>
          )}
          <button
            onClick={savePasswordDetails}
            className="w-fit mx-auto gap-1 flex justify-center bg-opacity-50 items-center border border-purple-400 font-semibold bg-purple-100 hover:bg-purple-100 rounded-full px-3 py-1"
          >
            <lord-icon
              src="https://cdn.lordicon.com/rcgrnzji.json"
              trigger="hover"
              stroke="bold"
            ></lord-icon>
            Save
          </button>
        </div>
        {/* ----------------------- Displaying Details ----------------------- */}
        <div className="mt-8">
          <h1 className="font-bold text-2xl mb-2">Your Passwords</h1>
          {passwordData.length === 0 ? (
            <p className="text-xl font-semibold text-gray-500 text-center mt-10">
              No passwords to show
            </p>
          ) : (
            <table className="table-auto w-full overflow-hidden rounded-lg">
              <thead className="bg-purple-200 ">
                <tr className="border-2 border-b-gray-400">
                  <th className="py-2 ">Website</th>
                  <th className="py-2 ">Username</th>
                  <th className="py-2 ">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-purple-100 bg-opacity-50">
                {passwordData.map((data, key) => (
                  <tr key={key} className="border-b border-b-gray-300 ">
                    <td className="text-center min-w-20 py-1 underline w-1/5">
                      <a href={data.url}>{data.url}</a>
                    </td>
                    <td className="min-w-20 py-1 md:px-2">
                      <div className="flex justify-center items-center relative ">
                        <input
                          disabled
                          type="text"
                          value={data.username}
                          className="bg-white border border-purple-300 rounded-md px-2 py-1 w-full"
                        />
                        <div className="absolute right-0 top-[0.1px] rounded-full ">
                          <lord-icon
                            onClick={() => copyText(data.username)}
                            src="https://cdn.lordicon.com/wbhsvvnv.json"
                            trigger="click"
                            style={{
                              cursor: "pointer",
                              width: "2rem",
                              height: "2rem",
                            }}
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className=" min-w-20 py-1 md:px-2">
                      <div className="flex justify-center items-center relative ">
                        <input
                          onClick={() => {
                            this.type = "text";
                          }}
                          disabled
                          type="password"
                          value={data.password}
                          className="bg-white border border-purple-300 rounded-md px-2 py-1 w-full"
                        />
                        <div className="absolute right-0 top-[0.1px]">
                          <lord-icon
                            onClick={() => copyText(data.username)}
                            src="https://cdn.lordicon.com/wbhsvvnv.json"
                            trigger="click"
                            style={{
                              cursor: "pointer",
                              width: "2rem",
                              height: "2rem",
                            }}
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="min-w-20 py-1 ">
                      <div className="flex justify-center items-center gap-1">
                        <lord-icon
                          onClick={() => editData(data.id)}
                          src="https://cdn.lordicon.com/oqaajvyl.json"
                          trigger="hover"
                          state="hover-line"
                          style={{
                            cursor: "pointer",
                            width: "1.7rem",
                            height: "1.7rem",
                          }}
                          delay="1500"
                        ></lord-icon>
                        <lord-icon
                          onClick={() => deleteData(data.id)}
                          src="https://cdn.lordicon.com/vlnvqvew.json"
                          trigger="hover"
                          style={{
                            cursor: "pointer",
                            width: "1.7rem",
                            height: "1.7rem",
                          }}
                        ></lord-icon>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
