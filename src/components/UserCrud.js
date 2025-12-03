import { useState } from "react";

export default function UserCrud() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    maritalStatus: "",
    description: "",
  });

  const [users, setUsers] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.age ||
      !form.gender ||
      !form.maritalStatus ||
      !form.description
    ) {
      alert("Please fill all details");
      return;
    }

    if (editIndex !== null) {
      const updated = [...users];
      updated[editIndex] = form;
      setUsers(updated);
      setEditIndex(null);
      alert("User updated successfully");
    } else {
      setUsers([...users, form]);
      alert("Form submitted successfully");
    }

    setForm({
      name: "",
      email: "",
      phone: "",
      age: "",
      gender: "",
      maritalStatus: "",
      description: "",
    });
  };

  const handleEdit = (index) => {
    setForm(users[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1>User Registration Form</h1>

      <input
        placeholder="Enter Name"
        name="name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        placeholder="Enter Email"
        name="email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        placeholder="Enter Phone"
        name="phone"
        value={form.phone}
        onChange={handleChange}
      />
      <input
        placeholder="Enter Age"
        name="age"
        value={form.age}
        onChange={handleChange}
      />

      <div>
        <label>Gender:</label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={form.gender === "Male"}
            onChange={handleChange}
          />
          Male
        </label>

        <label>
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={form.gender === "Female"}
            onChange={handleChange}
          />
          Female
        </label>
      </div>

      <div>
        <label>Marital Status:</label>

        <label>
          <input
            type="checkbox"
            name="maritalStatus"
            value="Single"
            checked={form.maritalStatus === "Single"}
            onChange={handleChange}
          />
          Single
        </label>

        <label>
          <input
            type="checkbox"
            name="maritalStatus"
            value="Married"
            checked={form.maritalStatus === "Married"}
            onChange={handleChange}
          />
          Married
        </label>
      </div>

      <textarea
        placeholder="Description"
        name="description"
        value={form.description}
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>
        {editIndex !== null ? "Update" : "Submit"}
      </button>

      <h2>User List</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.name} | {user.email} | {user.phone} | {user.age} |{" "}
            {user.gender} | {user.maritalStatus} | {user.description}
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
