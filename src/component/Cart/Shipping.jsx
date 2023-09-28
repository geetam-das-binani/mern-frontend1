import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingDetails } from "../../actions/cartActions";
import "./Shipping.css";
import Metadata from "../layout/Metadata";
import PinDropIcon from "@mui/icons-material/PinDrop";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";
import PhoneIcon from "@mui/icons-material/Phone";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import { Country, State } from "country-state-city";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckoutSteps from "../Cart/CheckoutSteps";
import {useNavigate} from 'react-router-dom'
export default function Shipping() {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { shippingInfo } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [pincode, setPincode] = useState(shippingInfo.pincode);
  const [country, setCountry] = useState(shippingInfo.country);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();
    if (phoneNo.length < 10 || phoneNo.length > 10) {
      toast.warn("Phone Number should be 10 digits long");
      return;
    }
    saveShippingDetails(dispatch, {
      address,
      city,
      state,
      phoneNo,
      country,
      pincode,
    });
    navigate('/order/confirm')
  };

  return (
    <Fragment>
      <Metadata title="Shipping Details" />
      <CheckoutSteps activeStep={0} />
      <div className="shipping__container">
        <div className="shipping__box">
          <h2 className="shipping__heading">Shipping Details</h2>
          <form
            className="shipping__form"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="Address"
                required
                value={address ?? ""}
                onChange={({ target }) => setAddress(target.value)}
              />
            </div>
            <div>
              <LocationCityIcon />
              <input
                type="text"
                placeholder="City"
                required
                value={city ?? ""}
                onChange={({ target }) => setCity(target.value)}
              />
            </div>{" "}
            <div>
              <PinDropIcon />
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pincode ?? ""}
                onChange={({ target }) => setPincode(target.value)}
              />
            </div>{" "}
            <div>
              <PhoneIcon />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo ?? ""}
                onChange={({ target }) => setPhoneNo(target.value)}
              />
            </div>{" "}
            <div>
              <PublicIcon />
              <select
                required
                value={country ?? ""}
                onChange={({ target }) => setCountry(target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map(({ isoCode, name }) => {
                    return (
                      <option key={isoCode} value={isoCode}>
                        {name}
                      </option>
                    );
                  })}
              </select>
            </div>
            {country && (
              <div>
                <TransferWithinAStationIcon />
                <select
                  required
                  value={state ?? ""}
                  onChange={({ target }) => setState(target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map(
                      ({ isoCode, name }) => {
                        return (
                          <option value={isoCode} key={isoCode}>
                            {name}
                          </option>
                        );
                      }
                    )}
                </select>
              </div>
            )}
            <input
              type="submit"
              className="shipping__btn"
              value="Continue"
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
      <ToastContainer />
    </Fragment>
  );
}
