import { Container, Row, Col } from "react-bootstrap";
import "./Main.css";
import Table from "react-bootstrap/Table";

const Main = () => {
  return (
    <>
      <Container>
        <Row className="accomodation pt-5">
          <Col>
            <h1 className="text-center">Accommodation </h1>
            <p className="para pt-3">
              We have negotiated special discounted rates for accommodation at
              various categories of hotels, ranging from 5 star to 4 star hotels
              during the upcoming India Africa Conclave 2024. Being the highly
              sold out dates, especially hotels near to the venue, may we advise
              you to book your accommodation at the earliest, as all the rooms
              are being sold on first come first serve basis. Accommodation can
              be booked at a hotel of your choice from below mentioned options.
              Kindly write to us as per details mentioned below for your
              queries.
            </p>
          </Col>
        </Row>

        <div className="table pt-5">
          <div className="container table-responsive">
            <table className="table table-bordered table-hover custom-table ">
              <thead>
                <tr>
                  <th scope="col">Hotel</th>
                  <th scope="col">Area</th>
                  <th scope="col">Category</th>
                  <th scope="col">Distance from Venue (Kms)</th>
                  <th scope="col">
                    <th scope="col">Distance from Airport (Kms)</th>
                  </th>
                  <th scope="col">Single Occupancy (INR)</th>
                  <th scope="col">Single Occupancy (USD)</th>
                  <th scope="col">Double Occupancy</th>
                  <th scope="col">Double Occupancy (USD)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Taj Palace</th>
                  <td>Central Delhi</td>
                  <td>5 Star</td>
                  <td>00</td>
                  <td>17</td>
                  <td>13500</td>
                  <td>163</td>
                  <td>1500</td>
                  <td>181</td>
                </tr>
                <tr>
                  <th scope="row">Le Méridien</th>
                  <td>Central Delhi</td>
                  <td>5 Star</td>
                  <td> 08</td>
                  <td>24</td>
                  <td>16600</td>
                  <td>200</td>
                  <td>1800</td>
                  <td>217</td>
                </tr>
                <tr>
                  <th scope="row">Andaz</th>
                  <td>Aerocity Delhi</td>
                  <td>5 Star</td>
                  <td>15</td>
                  <td>06</td>
                  <td>17430</td>
                  <td>210</td>
                  <td>19000</td>
                  <td>229</td>
                </tr>
                <tr>
                  <th scope="row">The Grand</th>
                  <td>South Delhi</td>
                  <td>5 Star</td>
                  <td>10</td>
                  <td>16</td>
                  <td>14525</td>
                  <td>175</td>
                  <td>16000</td>
                  <td>193</td>
                </tr>

                <tr>
                  <th scope="row">Royal Plaza</th>
                  <td>Central Delhi</td>
                  <td>4 Star</td>
                  <td>08</td>
                  <td>21</td>
                  <td>10375</td>
                  <td>125</td>
                  <td>11750</td>
                  <td>142</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Container>
      <div className="termConditions py-5 my-5">
        <Container>
          <Row>
            <Col>
              <h2>Term and Conditions</h2>
              <ul className="orderList pt-3">
                <li>
                  {" "}
                  All Hotel room rates are on per room / per night basis.
                </li>
                <li>
                  {" "}
                  The hotel room special rates are valid for India-Africa
                  conference booking only.
                </li>
                <li>
                  {" "}
                  Incase of any increase in tax amount by the Government, the
                  revised tax amount will be applicable and will be payable by
                  the guest
                </li>
                <li>
                  {" "}
                  The room shall be confirmed upon receipt of full advance
                  payment
                </li>
                <li>
                  {" "}
                  Given rates are exclusive of Airport Transfers, Tips, Laundry,
                  Meals not mentioned, Room Service, Mini bar, phone bills & any
                  other services not mentioned.
                </li>
                <li>
                  {" "}
                  The booking should be guaranteed by 100% advance towards the
                  room booked.
                </li>
                <li>
                  {" "}
                  3% bank charges will be applicable if paying by Credit Card.
                </li>
                <li>18% GST will be additional on the total billing</li>
              </ul>
              <h2 className="pt-5">Cancellation Policy</h2>
              <ul>
                <li>
                  Cancellations received less than 45 days prior to check in
                  date: Full retention (no refund will be made)
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>

      <h2 className="transortation text-center pb-4">
        Special Transportation Fare
      </h2>
      <div className="table">
        <div className="container table-responsive">
          <table className="table table-bordered table-hover custom-table">
            <thead>
              <tr>
                <th scope="col">Car</th>
                <th scope="col">Car Type</th>
                <th scope="col">Local City Run (40 KM & 4Hours) INR</th>
                <th scope="col">Local City Run (40 KM & 4Hours) USD</th>
                <th scope="col">Local City Run (80 KM & 8Hours) INR</th>
                <th scope="col">Local City Run (80 KM & 8Hours) USD</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Suzuki D'zire - 4 Seater</th>
                <td>SEDAN</td>
                <td>1125</td>
                <td>14</td>
                <td>1680</td>
                <td>20</td>
              </tr>
              <tr>
                <th scope="row">Toyota Camry - Hybrid - 4 Seater</th>
                <td>SEDAN</td>
                <td>3750</td>
                <td>46</td>
                <td>5100</td>
                <td>52</td>
              </tr>

              <tr>
                <th scope="row">Toyota Innova Crysta</th>
                <td>SUV/MUV/4WD VANS</td>
                <td>1875</td>
                <td>23</td>
                <td>2760</td>
                <td>34</td>
              </tr>

              <tr>
                <th scope="row">Isuzu MU 7</th>
                <td>SUV/MUV/4WD VANS</td>
                <td>2250</td>
                <td>27</td>
                <td>3600</td>
                <td>44</td>
              </tr>
              <tr>
                <th scope="row">Toyota Hycross</th>
                <td>SUV/MUV/4WD VANS</td>
                <td>2437.5</td>
                <td>30</td>
                <td>3600</td>
                <td>44</td>
              </tr>
              <tr>
                <th scope="row">Toyota Fortuner / KIA Carnival</th>
                <td>SUV/MUV/4WD VANS</td>
                <td>3750</td>
                <td>46</td>
                <td>5400</td>
                <td>66</td>
              </tr>

              <tr>
                <th scope="row">Mercedes GLE 250</th>
                <td>SUV/MUV/4WD VANS</td>

                <td>8125</td>
                <td>99</td>
                <td>12000</td>
                <td>146</td>
              </tr>
              <tr>
                <th scope="row">Mercedes GLS 350</th>
                <td>SUV/MUV/4WD VANS</td>

                <td>10000</td>
                <td>122</td>
                <td>15600</td>
                <td>190</td>
              </tr>
              <tr>
                <th scope="row">Mercedes GLS 450</th>
                <td>SUV/MUV/4WD VANS</td>
                <td>13750</td>
                <td>168</td>
                <td>21600</td>
                <td>263</td>
              </tr>

              <tr>
                <th scope="row">Toyota Commuter / Foton - 9 Seater</th>
                <td>SUV/MUV/4WD VANS</td>

                <td>5625</td>
                <td>69</td>
                <td>9000</td>
                <td>110</td>
              </tr>
              <tr>
                <th scope="row">Mercedes Benz VIANO / V220</th>
                <td>SUV/MUV/4WD VANS</td>

                <td>8750</td>
                <td>107</td>
                <td>12000</td>
                <td>146</td>
              </tr>
              <tr>
                <th scope="row">Toyota Vellfire</th>
                <td>SUV/MUV/4WD VANS</td>
                <td>11250</td>
                <td>137</td>
                <td>18000</td>
                <td>220</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Main;
