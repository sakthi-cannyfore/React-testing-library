import react, { useState } from "react";
import { useEffect } from "react";

export default function FetchUsersApi() {
  const [data, setData] = useState([]);

  let url = `https://jsonplaceholder.typicode.com/users`;

  useEffect(() => {
    const fetchApi = async () => {
      await fetch(url)
        .then((res) => res.json())
        .then((data) => setData(data));
    };
    fetchApi();
  }, []);
  console.log(data);

  return (
    <div>
      {data.length > 0 ? (
        data.map((item) => (
          <div key={item.id}>
            <h1>{item.name}</h1>
            <h1>{item.email}</h1>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
