import React, { useEffect, useState } from "react";
import "./Home.css";
import { API_KEY, API_URL } from "../../App";
import Card from "../../Components/Card/Card";
import { useNavigate } from "react-router";
import { Phone } from "../../types";

const Home = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const getPhones = async (search = "", limit = 20, offset = 0) => {
    try {
      const params = new URLSearchParams({
        search,
        limit: limit.toString(),
        offset: offset.toString(),
      });

      const response = await fetch(`${API_URL}?${params.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const jsonData = await response.json();
      setPhones(jsonData);
    } catch (error) {
      console.error("Error al obtener los teléfonos:", error);
    }
  };

  useEffect(() => {
    getPhones();
  }, []);

  return (
    <div className="home-container">
      <div className="search-container">
        <input
          aria-label="textfield"
          type="textfield"
          placeholder="Search for smartphones..."
          className="input-search"
          value={searchValue}
          onChange={(e) => {
            getPhones(e.target.value);
            setSearchValue(e.target.value);
          }}
        />
        <div className="results">
          {`${phones.length} ${phones.length === 1 ? "PHONE" : "PHONES"}`}
        </div>
      </div>

      <div className="phone-list">
        {phones &&
          phones.map((phone: Phone, index: number) => (
            <Card
              phone={phone}
              key={`${phone.id}-${index}`}
              onClick={() => navigate(`/details/${phone.id}`)}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
