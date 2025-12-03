import React, { useEffect } from "react";
import { useRef } from "react";
export default function Test() {
  const inputref = useRef(null);

  const [formDate, setForm] = React.useState({
    name: "",
    email: "",
  });

  const [editIndex, setEdtIndex] = React.useState(null);

  const [data, setDate] = React.useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...formDate,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      let updated = [...data];
      updated[editIndex] = formDate;
      setDate(updated);
      setEdtIndex(null);
    } else {
      setDate([...data, formDate]);
      console.log(data);
    }

    setForm({ name: " ", email: " " });
    inputref.current?.focus();
  };

  const handleEdit = (index) => {
    setForm(data[index]);
    setEdtIndex(index);
  };

  const HandleDelete = (ind) => {
    setDate((prev) => prev.filter((_, i) => i !== ind));
  };

  useEffect(() => {
    inputref.current?.focus();
  }, []);

  return (
    <>
      <form>
        <input
          type="text"
          placeholder="Enter the name"
          value={formDate?.name}
          name="name"
          ref={inputref}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Enter the email"
          value={formDate?.email}
          name="email"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>submit</button>
      </form>

      {data?.map((item, index) => (
        <div key={index}>
          <ul>
            <li>
              {item.name} || {item.email}
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => HandleDelete(index)}>delete</button>
            </li>
          </ul>
        </div>
      ))}
    </>
  );
}
