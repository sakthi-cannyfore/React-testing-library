import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUsers, fetchUser, DeleteUser } from "../redux/features/usersSlice";

export default function HandleReduxform() {
  const dispatch = useDispatch();

  const { data, loading } = useSelector((state) => state.users);

  const [form, setForm] = useState({
    firstName: "",
    email: "",
  });

  // initial fetch users

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  //   const HandleOnchange = (e) => {
  //     const { name, value } = e.target;

  //     setForm({
  //       ...form,
  //       [name]: value,
  //     });
  //   };

  const HandelSubmit = () => {
    dispatch(addUsers(form));
    setForm({ firstName: "", email: "" });
  };

  return (
    <div>
      <input
        type="text"
        name="firstName"
        placeholder="enter the name "
        value={form.firstName}
        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
      />
      <input
        type="email"
        name="email"
        placeholder="enter the email "
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <button onClick={HandelSubmit}>Add</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        data.map((item, index) => (
          <>
            <div key={index}>
              <div>
                <h1>
                  {item.firstName}- {item.email}
                </h1>
              </div>
            </div>

            <button onClick={() => dispatch(DeleteUser(item.id))}>
              delete
            </button>
          </>
        ))
      )}
    </div>
  );
}
