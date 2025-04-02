import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import List from "../../Components/List/List";
import Selector from "../../Components/Selector/Selector";
import Button from "../../Components/Button/Button";
import { API_KEY, API_URL } from "../../App";
import "./Details.css";
import Carousel from "../../Components/Carousel/Carousel";
import {
  ColorOption,
  PhoneDetails,
  StorageOption,
  ListElement,
  SelectedPhone,
} from "../../types";

type DetailProps = {
  addItem: (selectedItem: SelectedPhone) => void;
};

const Details = (props: DetailProps) => {
  const [phone, setPhone] = useState<PhoneDetails>();
  const [selectedStorage, setSelectedStorage] = useState<number | undefined>();
  const [selectedColor, setSelectedColor] = useState<number | undefined>();
  const params = useParams();

  const getPhone = async () => {
    try {
      const response = await fetch(`${API_URL}/${params.phoneId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error(`Error al obtener los teléfonos`);
      }

      const jsonData = await response.json();
      setPhone(jsonData);
    } catch (error) {
      console.error("Error al obtener los teléfonos");
    }
  };

  useEffect(() => {
    getPhone();
  }, [params.phoneId]);

  function getSpecificationsList() {
    const specificationsList: ListElement[] = [];

    if (phone) {
      specificationsList.push({ title: "brand", description: phone.brand });
      specificationsList.push({ title: "name", description: phone.name });
      specificationsList.push({
        title: "description",
        description: phone.description,
      });

      Object.entries(phone.specs).forEach(([key, value]) =>
        specificationsList.push({ title: key, description: value })
      );
    }

    return specificationsList;
  }

  return phone ? (
    <div className="details-container">
      <div className="details-body">
        <div className="details-info-container">
          <img
            className="details-image"
            alt="Details phone image"
            src={
              selectedColor
                ? phone.colorOptions[selectedColor].imageUrl
                : phone.colorOptions[0].imageUrl
            }
          />
          <div className="details-info">
            <div className="details-info-header">
              <div className="details-infor-title" aria-label="details-title">
                {phone.name}
              </div>
              <div className="details-infor-price">
                {`From ${
                  selectedStorage
                    ? phone.storageOptions[selectedStorage].price
                    : phone.basePrice
                } EUR`}
              </div>
            </div>
            <div className="details-selectors">
              {phone.storageOptions && (
                <Selector
                  label={"Storage ¿How much space do you need?"}
                  options={phone.storageOptions.map(
                    (option: StorageOption, index: number) => (
                      <Button
                        value={option.capacity}
                        key={`${option.capacity}-${option.price}-${index}`}
                        selectorButton
                        selected={index === selectedStorage}
                        onClick={() => setSelectedStorage(index)}
                      />
                    )
                  )}
                />
              )}
              {phone.colorOptions && (
                <div className="details-color-selector">
                  <Selector
                    label={"Color. Pick your favourite"}
                    options={phone.colorOptions.map(
                      (option: ColorOption, index: number) => (
                        <Button
                          colorButton
                          ariaLabel={`color-button-${option.hexCode}`}
                          key={`${option.hexCode}-${option.name}-${index}`}
                          customStyle={{ background: option.hexCode }}
                          selected={index === selectedColor}
                          onClick={() => setSelectedColor(index)}
                        />
                      )
                    )}
                    addGap
                  />
                  {selectedColor !== undefined &&
                    selectedColor >= 0 &&
                    phone.colorOptions[selectedColor].name}
                </div>
              )}
            </div>
            <Button
              value="Add"
              disabled={
                isNaN(selectedColor ?? NaN) || isNaN(selectedStorage ?? NaN)
              }
              onClick={() =>
                props.addItem({
                  ...phone,
                  selectedColor: phone.colorOptions[selectedColor ?? 0],
                  selectedStorage: phone.storageOptions[selectedStorage ?? 0],
                })
              }
              primary
            />
          </div>
        </div>

        <List title="Specifications" list={getSpecificationsList()} />
      </div>
      <Carousel title="Similar Items" elements={phone.similarProducts} />
    </div>
  ) : (
    <></>
  );
};

export default Details;
