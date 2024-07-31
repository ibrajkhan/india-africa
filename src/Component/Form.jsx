import { useForm, Controller } from "react-hook-form";
import { useRef, useEffect, useState } from "react";
import "./Form.css";
import miceLogo from "../assets/Image/mice-logo.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker.css";
import cio1 from "../assets/Image/cio1.jpg";
import { Last } from "react-bootstrap/esm/PageItem";

const Form = () => {
  const MySwal = withReactContent(Swal);
  const [dateError, setDateError] = useState("");

  const form = useRef();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      startDate: null,
      endDate: null,
      totalDays: 0,
    },
  });

  const watchAllFields = watch();
  const watchStartDate = watch("startDate");
  const [loading, setLoading] = useState(false);
  // DatePicker also Correct

  // const calculateDateDifference = (startDate, endDate) => {
  //   if (!startDate || !endDate) return "0";
  //   const start = new Date(startDate).setHours(0, 0, 0, 0);
  //   const end = new Date(endDate).setHours(0, 0, 0, 0);
  //   const timeDifference = end - start;

  //   if (timeDifference === 0) return "1";

  //   const daysDifference = timeDifference / (1000 * 3600 * 24);
  //   return Math.floor(daysDifference).toString();
  // };

  const calculateDateDifference = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;

    if (startDate == endDate) return 1;
    const timeDifference = endDate.getTime() - startDate.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    return Math.floor(daysDifference).toString();
  };
  const startDate = watch("startDate");
  const endDate = watch("endDate");

  useEffect(() => {
    const totalDays = calculateDateDifference(startDate, endDate);
    if (startDate && endDate && startDate > endDate) {
      setValue("totalDays", 0);
      setDateError("Start date cannot be greater than end date");
    } else {
      setDateError("");
      setValue("totalDays", totalDays);
    }
  }, [startDate, endDate, setValue]);

  // useEffect(() => {
  //   if (startDate && endDate) {
  //     if (startDate > endDate) {
  //       setValue("totalDays", 0);
  //       setError("endDate", {
  //         type: "manual",
  //         message: "Start date cannot be greater than end date",
  //       });
  //     } else {
  //       clearErrors("endDate");
  //       const totalDays = calculateDateDifference(startDate, endDate);
  //       setValue("totalDays", totalDays);
  //     }
  //   }
  // }, [startDate, endDate, setValue, setError, clearErrors]);

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      startDate: data.startDate
        ? data.startDate.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : null,
      endDate: data.endDate
        ? data.endDate.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : null,
    };

    const googleSheetData = {
      Title: data.title,
      FirstName: data.firstName,
      LastName: data.lastName,
      Organisation: data.organisation,
      Email: data.email,
      AlEmail: data.AlEmail,
      City: data.city,
      State: data.state,
      Country: data.country,
      PostalCode: data.postalCode,
      Phone: data.phone,
      Hotel: data.hotel,
      RoomCategory: data.roomCategory,
      startDate: formattedData.startDate,
      endDate: formattedData.endDate,
      TotalDays: data.totalDays,
      TotalRooms: data.totalRooms,
      RoomType: data.roomType,
      Tranportation: data.transportation,
      FlightDetails: data.flightDetails,
    };

    //  sheetbd;
    setLoading(true);
    fetch(import.meta.env.VITE_BOOKING_REQUESTDB, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: [googleSheetData],
      }),
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
        console.log(data);
        MySwal.fire({
          icon: "success",
          title:
            'Thank you for submitting your information. Please note that this is just the request form and *cannot be treated as a "Confirmation of Services"*. Our team will connect with you soon to take this forward!',
        });
        setTimeout(() => {
          setLoading(false);
          reset();
        }, 1000);
      })
      .catch((error) => {
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: "Try after some time",
        });
        console.error("Error fetching data:", error);
        setTimeout(() => {
          setLoading(false);
          reset();
        }, 1000 * 2);
        console.error("Error:", error);
      });

    // console.log(formattedData);
    // console.log(form.current, "Current Form");

    // MySwal.fire({
    //   icon: "success",
    //   title:
    //     'Thank you for submitting your information. Please note that this is just the request form and *cannot be treated as a "Confirmation of Services"*. Our team will connect with you soon to take this forward!',
    //   time: 4000,
    // });

    //   Google App Script
    // event.preventDefault();
    // fetch(
    //   "https://script.google.com/macros/s/AKfycbxpms8NqIngLOfNTZK73BYQfBPwVRoK2GI6AstRiPtuRuEswWzqAfCS7XIgqHPm46Nj/exec",
    //   {
    //     method: "POST",
    //     body: JSON.stringify(formattedData),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (data.status === "success") {
    //       alert("Form submitted successfully");
    //     } else {
    //       alert("Form submission failed");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //     alert("Form submission failed");
    //   });

    // emailjs
    //   .sendForm(
    //     import.meta.env.VITE_SERVICE_ID,
    //     import.meta.env.VITE_HOTEL_TEMPLATE,
    //     form.current,
    //     import.meta.env.VITE_PUBLIC_KEY
    //   )
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    // MySwal.fire({
    //   icon: "error",
    //   title: "Failed to Submit",
    //   time: 1000,
    // });
    //     console.log(err);
    //   });

    // const googleSheetData = {
    //   Title: data.title,
    //   First_Name: data.firstName,
    //   Last_Name: data.lastName,
    //   Organisation: data.organisation,
    //   Email: data.email,
    //   Alternative_Email: data.alEmail,
    //   City: data.city,
    //   State: data.state,
    //   Country: data.country,
    //   Postal_Code: data.postalCode,
    //   Phone: data.phone,
    //   Passport_No_Non_Indian: data.passportNoNonIndian,
    //   Passport_Issue_Date: data.passportDateIssueNonIndian,
    //   Passport_Issue_Place: data.passportIssuePlace,
    //   Passport_Expiry_Date: data.passportExpiryDateNonIndian,
    //   Hotel: data.hotel,
    //   Room_Category: data.roomCategory,
    //   Arrival_Date: data.arrivalDate,
    //   Departure_Date: data.departureDate,
    //   Number_Of_Nights: data.totalNights,
    //   No_of_Rooms: data.totalRooms,
    //   Type_of_Rooms: data.roomType,
    // };
    // console.log(googleSheetData, "Gsheet");

    // axios
    //   .post(import.meta.env.VITE_HOTEL_REQUEST, googleSheetData)
    //   .then((response) => {
    //     console.log(response);
    //     reset();
    //   });
    // reset();
  };

  // https://script.google.com/macros/s/AKfycbxpms8NqIngLOfNTZK73BYQfBPwVRoK2GI6AstRiPtuRuEswWzqAfCS7XIgqHPm46Nj/exec

  const deluxeLuxury = ["Superior Room", "Deluxe room"];
  const Standard = ["Standard Room"];
  const excutive = ["Excutive Room"];

  let type = null;

  if (watchAllFields.hotel === "Taj_Palace") {
    type = deluxeLuxury;
  } else if (watchAllFields.hotel === "Le_Meridien") {
    type = excutive;
  } else if (watchAllFields.hotel === "Andaz") {
    type = Standard;
  } else if (watchAllFields.hotel === "The_Grand") {
    type = Standard;
  } else if (watchAllFields.hotel === "Royal_Plaza") {
    type = Standard;
  }

  return (
    <main>
      {/* <LazyLoadImage src={cio1} /> */}
      <div className="form main_text">
        <div className="form_input">
          <form
            name="B20_Contact_Form"
            method="post"
            ref={form}
            onSubmit={handleSubmit(onSubmit)}>
            <h3 className="room_reservation_text" id="bookingText">
              Room And Transport Reservation Request Form
            </h3>
            <div
              className="main_form"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
              }}>
              <label htmlFor="title">
                Title: <span className="required_field">*</span>
              </label>

              <select
                id="title"
                name="title"
                {...register("title", {
                  required: "Select title from list",
                })}>
                <option value="">Title</option>
                <option value="Prof.">Prof.</option>
                <option value="Dr.">Dr.</option>
                <option value="Mr.">Mr.</option>
                <option value="Ms.">Ms.</option>
                <option value="Mrs.">Mrs.</option>
              </select>
              {errors.title && (
                <span className="errorMsg">{errors.title.message}</span>
              )}
              <br />
              <br />
              <label htmlFor="first">
                First Name: <span className="required_field">*</span>
              </label>

              <input
                type="text"
                id="first"
                placeholder="First Name"
                name="firstName"
                {...register("firstName", {
                  required: "First name is required.",
                  pattern: {
                    value: /^[a-zA-Z ]*$/,
                    message: "Enter Valid Name",
                  },
                  minLength: {
                    value: 3,
                    message: "Name should be at least 3 characters.",
                  },
                })}
              />
              {errors.firstName && (
                <span className="errorMsg">{errors.firstName.message}</span>
              )}
              <br />
              <br />
              <label htmlFor="last">
                Last Name: <span className="required_field">*</span>
              </label>

              <input
                type="text"
                id="last"
                placeholder="Last Name"
                name="lastName"
                {...register("lastName", {
                  required: "Last name is required.",
                  pattern: {
                    value: /^[a-zA-Z ]*$/,
                    message: "Enter Valid Name",
                  },
                })}
              />
              {errors.lastName && (
                <span className="errorMsg">{errors.lastName.message}</span>
              )}
              <br />
              <br />
              <label htmlFor="org">Organization / Institue:</label>

              <input
                type="text"
                id="org"
                placeholder="Organization"
                name="organisation"
                {...register("organisation")}
              />
              {/* {errors.organisation && (
                  <p className="errorMsg">{errors.organisation.message}</p>
                )} */}
              <br />
              <br />
              <label htmlFor="email">
                Email: <span className="required_field">*</span>
              </label>

              <input
                type="email"
                id="email"
                placeholder="Enter Your Email"
                name="email"
                {...register("email", {
                  required: "Email is required.",
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Enter valid Email Id",
                  },
                })}
              />
              {errors.email && (
                <span className="errorMsg">{errors.email.message}</span>
              )}
              <br />
              <br />
              <label htmlFor="alEmail">Alternate Email:</label>

              <input
                type="email"
                id="alEmail"
                placeholder="Enter Your Alternate Email"
                name="alEmail"
                {...register("alEmail")}
              />
              <br />
              <br />
              <label htmlFor="city">
                City: <span className="required_field">*</span>
              </label>

              <input
                type="text"
                id="city"
                placeholder="City"
                name="city"
                {...register("city", {
                  required: "City is required.",
                  pattern: {
                    value: /^[a-zA-Z ]*$/,
                    message: "Enter Valid City",
                  },
                  minLength: {
                    value: 3,
                    message: "City should be at-least 3 characters.",
                  },
                })}
              />
              {errors.city && (
                <span className="errorMsg">{errors.city.message}</span>
              )}
              <br />
              <br />
              <label htmlFor="state">
                State: <span className="required_field">*</span>
              </label>

              <input
                type="text"
                id="state"
                placeholder="State"
                name="state"
                {...register("state", {
                  required: "State is required.",
                  pattern: {
                    value: /^[a-zA-Z ]*$/,
                    message: "Enter Valid State",
                  },
                  minLength: {
                    value: 3,
                    message: "State should be at-least 3 characters.",
                  },
                })}
              />
              {errors.state && (
                <span className="errorMsg">{errors.state.message}</span>
              )}
              <br />
              <br />
              <label htmlFor="country">
                Country: <span className="required_field">*</span>
              </label>

              <select
                id="country"
                name="country"
                {...register("country", {
                  required: "Select country from list",
                })}>
                <option value="">Select</option>
                <option value="Afghanistan">Afghanistan</option>
                <option value="Åland Islands">Åland Islands</option>
                <option value="Albania">Albania</option>
                <option value="Algeria">Algeria</option>
                <option value="American Samoa">American Samoa</option>
                <option value="Andorra">Andorra</option>
                <option value="Angola">Angola</option>
                <option value="Anguilla">Anguilla</option>
                <option value="Antarctica">Antarctica</option>
                <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                <option value="Argentina">Argentina</option>
                <option value="Armenia">Armenia</option>
                <option value="Aruba">Aruba</option>
                <option value="Australia">Australia</option>
                <option value="Austria">Austria</option>
                <option value="Azerbaijan">Azerbaijan</option>
                <option value="Bahamas">Bahamas</option>
                <option value="Bahrain">Bahrain</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="Barbados">Barbados</option>
                <option value="Belarus">Belarus</option>
                <option value="Belgium">Belgium</option>
                <option value="Belize">Belize</option>
                <option value="Benin">Benin</option>
                <option value="Bermuda">Bermuda</option>
                <option value="Bhutan">Bhutan</option>
                <option value="Bolivia">Bolivia</option>
                <option value="Bosnia and Herzegovina">
                  Bosnia and Herzegovina
                </option>
                <option value="Botswana">Botswana</option>
                <option value="Bouvet Island">Bouvet Island</option>
                <option value="Brazil">Brazil</option>
                <option value="British Indian Ocean Territory">
                  British Indian Ocean Territory
                </option>
                <option value="Brunei Darussalam">Brunei Darussalam</option>
                <option value="Bulgaria">Bulgaria</option>
                <option value="Burkina Faso">Burkina Faso</option>
                <option value="Burundi">Burundi</option>
                <option value="Cambodia">Cambodia</option>
                <option value="Cameroon">Cameroon</option>
                <option value="Canada">Canada</option>
                <option value="Cape Verde">Cape Verde</option>
                <option value="Cayman Islands">Cayman Islands</option>
                <option value="Central African Republic">
                  Central African Republic
                </option>
                <option value="Chad">Chad</option>
                <option value="Chile">Chile</option>
                <option value="China">China</option>
                <option value="Christmas Island">Christmas Island</option>
                <option value="Cocos (Keeling) Islands">
                  Cocos (Keeling) Islands
                </option>
                <option value="Colombia">Colombia</option>
                <option value="Comoros">Comoros</option>
                <option value="Congo">Congo</option>
                <option value="Congo, The Democratic Republic of The">
                  Congo, The Democratic Republic of The
                </option>
                <option value="Cook Islands">Cook Islands</option>
                <option value="Costa Rica">Costa Rica</option>
                <option value="Cote D'ivoire">Cote D' ivoire</option>
                <option value="Croatia">Croatia</option>
                <option value="Cuba">Cuba</option>
                <option value="Cyprus">Cyprus</option>
                <option value="Czech Republic">Czech Republic</option>
                <option value="Denmark">Denmark</option>
                <option value="Djibouti">Djibouti</option>
                <option value="Dominica">Dominica</option>
                <option value="Dominican Republic">Dominican Republic</option>
                <option value="Ecuador">Ecuador</option>
                <option value="Egypt">Egypt</option>
                <option value="El Salvador">El Salvador</option>
                <option value="Equatorial Guinea">Equatorial Guinea</option>
                <option value="Eritrea">Eritrea</option>
                <option value="Estonia">Estonia</option>
                <option value="Ethiopia">Ethiopia</option>
                <option value="Falkland Islands (Malvinas)">
                  Falkland Islands (Malvinas)
                </option>
                <option value="Faroe Islands">Faroe Islands</option>
                <option value="Fiji">Fiji</option>
                <option value="Finland">Finland</option>
                <option value="France">France</option>
                <option value="French Guiana">French Guiana</option>
                <option value="French Polynesia">French Polynesia</option>
                <option value="French Southern Territories">
                  French Southern Territories
                </option>
                <option value="Gabon">Gabon</option>
                <option value="Gambia">Gambia</option>
                <option value="Georgia">Georgia</option>
                <option value="Germany">Germany</option>
                <option value="Ghana">Ghana</option>
                <option value="Gibraltar">Gibraltar</option>
                <option value="Greece">Greece</option>
                <option value="Greenland">Greenland</option>
                <option value="Grenada">Grenada</option>
                <option value="Guadeloupe">Guadeloupe</option>
                <option value="Guam">Guam</option>
                <option value="Guatemala">Guatemala</option>
                <option value="Guernsey">Guernsey</option>
                <option value="Guinea">Guinea</option>
                <option value="Guinea-bissau">Guinea-bissau</option>
                <option value="Guyana">Guyana</option>
                <option value="Haiti">Haiti</option>
                <option value="Heard Island and Mcdonald Islands">
                  Heard Island and Mcdonald Islands
                </option>
                <option value="Holy See (Vatican City State)">
                  Holy See (Vatican City State)
                </option>
                <option value="Honduras">Honduras</option>
                <option value="Hong Kong">Hong Kong</option>
                <option value="Hungary">Hungary</option>
                <option value="Iceland">Iceland</option>
                <option value="India">India</option>
                <option value="Indonesia">Indonesia</option>
                <option value="Iran, Islamic Republic of">
                  Iran, Islamic Republic of
                </option>
                <option value="Iraq">Iraq</option>
                <option value="Ireland">Ireland</option>
                <option value="Isle of Man">Isle of Man</option>
                <option value="Israel">Israel</option>
                <option value="Italy">Italy</option>
                <option value="Jamaica">Jamaica</option>
                <option value="Japan">Japan</option>
                <option value="Jersey">Jersey</option>
                <option value="Jordan">Jordan</option>
                <option value="Kazakhstan">Kazakhstan</option>
                <option value="Kenya">Kenya</option>
                <option value="Kiribati">Kiribati</option>
                <option value="Korea, Democratic People's Republic of">
                  Korea, Democratic People's Republic of
                </option>
                <option value="Korea, Republic of">Korea, Republic of</option>
                <option value="Kuwait">Kuwait</option>
                <option value="Kyrgyzstan">Kyrgyzstan</option>
                <option value="Lao People's Democratic Republic">
                  Lao People's Democratic Republic
                </option>
                <option value="Latvia">Latvia</option>
                <option value="Lebanon">Lebanon</option>
                <option value="Lesotho">Lesotho</option>
                <option value="Liberia">Liberia</option>
                <option value="Libyan Arab Jamahiriya">
                  Libyan Arab Jamahiriya
                </option>
                <option value="Liechtenstein">Liechtenstein</option>
                <option value="Lithuania">Lithuania</option>
                <option value="Luxembourg">Luxembourg</option>
                <option value="Macao">Macao</option>
                <option value="Macedonia, The Former Yugoslav Republic of">
                  Macedonia, The Former Yugoslav Republic of
                </option>
                <option value="Madagascar">Madagascar</option>
                <option value="Malawi">Malawi</option>
                <option value="Malaysia">Malaysia</option>
                <option value="Maldives">Maldives</option>
                <option value="Mali">Mali</option>
                <option value="Malta">Malta</option>
                <option value="Marshall Islands">Marshall Islands</option>
                <option value="Martinique">Martinique</option>
                <option value="Mauritania">Mauritania</option>
                <option value="Mauritius">Mauritius</option>
                <option value="Mayotte">Mayotte</option>
                <option value="Mexico">Mexico</option>
                <option value="Micronesia, Federated States of">
                  Micronesia, Federated States of
                </option>
                <option value="Moldova, Republic of">
                  Moldova, Republic of
                </option>
                <option value="Monaco">Monaco</option>
                <option value="Mongolia">Mongolia</option>
                <option value="Montenegro">Montenegro</option>
                <option value="Montserrat">Montserrat</option>
                <option value="Morocco">Morocco</option>
                <option value="Mozambique">Mozambique</option>
                <option value="Myanmar">Myanmar</option>
                <option value="Namibia">Namibia</option>
                <option value="Nauru">Nauru</option>
                <option value="Nepal">Nepal</option>
                <option value="Netherlands">Netherlands</option>
                <option value="Netherlands Antilles">
                  Netherlands Antilles
                </option>
                <option value="New Caledonia">New Caledonia</option>
                <option value="New Zealand">New Zealand</option>
                <option value="Nicaragua">Nicaragua</option>
                <option value="Niger">Niger</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Niue">Niue</option>
                <option value="Norfolk Island">Norfolk Island</option>
                <option value="Northern Mariana Islands">
                  Northern Mariana Islands
                </option>
                <option value="Norway">Norway</option>
                <option value="Oman">Oman</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Palau">Palau</option>
                <option value="Palestinian Territory, Occupied">
                  Palestinian Territory, Occupied
                </option>
                <option value="Panama">Panama</option>
                <option value="Papua New Guinea">Papua New Guinea</option>
                <option value="Paraguay">Paraguay</option>
                <option value="Peru">Peru</option>
                <option value="Philippines">Philippines</option>
                <option value="Pitcairn">Pitcairn</option>
                <option value="Poland">Poland</option>
                <option value="Portugal">Portugal</option>
                <option value="Puerto Rico">Puerto Rico</option>
                <option value="Qatar">Qatar</option>
                <option value="Reunion">Reunion</option>
                <option value="Romania">Romania</option>
                <option value="Russian Federation">Russian Federation</option>
                <option value="Rwanda">Rwanda</option>
                <option value="Saint Helena">Saint Helena</option>
                <option value="Saint Kitts and Nevis">
                  Saint Kitts and Nevis
                </option>
                <option value="Saint Lucia">Saint Lucia</option>
                <option value="Saint Pierre and Miquelon">
                  Saint Pierre and Miquelon
                </option>
                <option value="Saint Vincent and The Grenadines">
                  Saint Vincent and The Grenadines
                </option>
                <option value="Samoa">Samoa</option>
                <option value="San Marino">San Marino</option>
                <option value="Sao Tome and Principe">
                  Sao Tome and Principe
                </option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="Senegal">Senegal</option>
                <option value="Serbia">Serbia</option>
                <option value="Seychelles">Seychelles</option>
                <option value="Sierra Leone">Sierra Leone</option>
                <option value="Singapore">Singapore</option>
                <option value="Slovakia">Slovakia</option>
                <option value="Slovenia">Slovenia</option>
                <option value="Solomon Islands">Solomon Islands</option>
                <option value="Somalia">Somalia</option>
                <option value="South Africa">South Africa</option>
                <option value="South Georgia and The South Sandwich Islands">
                  South Georgia and The South Sandwich Islands
                </option>
                <option value="Spain">Spain</option>
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="Sudan">Sudan</option>
                <option value="Suriname">Suriname</option>
                <option value="Svalbard and Jan Mayen">
                  Svalbard and Jan Mayen
                </option>
                <option value="Swaziland">Swaziland</option>
                <option value="Sweden">Sweden</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Syrian Arab Republic">
                  Syrian Arab Republic
                </option>
                <option value="Taiwan">Taiwan</option>
                <option value="Tajikistan">Tajikistan</option>
                <option value="Tanzania, United Republic of">
                  Tanzania, United Republic of
                </option>
                <option value="Thailand">Thailand</option>
                <option value="Timor-leste">Timor-leste</option>
                <option value="Togo">Togo</option>
                <option value="Tokelau">Tokelau</option>
                <option value="Tonga">Tonga</option>
                <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                <option value="Tunisia">Tunisia</option>
                <option value="Turkey">Turkey</option>
                <option value="Turkmenistan">Turkmenistan</option>
                <option value="Turks and Caicos Islands">
                  Turks and Caicos Islands
                </option>
                <option value="Tuvalu">Tuvalu</option>
                <option value="Uganda">Uganda</option>
                <option value="Ukraine">Ukraine</option>
                <option value="United Arab Emirates">
                  United Arab Emirates
                </option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
                <option value="United States Minor Outlying Islands">
                  United States Minor Outlying Islands
                </option>
                <option value="Uruguay">Uruguay</option>
                <option value="Uzbekistan">Uzbekistan</option>
                <option value="Vanuatu">Vanuatu</option>
                <option value="Venezuela">Venezuela</option>
                <option value="Viet Nam">Viet Nam</option>
                <option value="Virgin Islands, British">
                  Virgin Islands, British
                </option>
                <option value="Virgin Islands, U.S.">
                  Virgin Islands, U.S.
                </option>
                <option value="Wallis and Futuna">Wallis and Futuna</option>
                <option value="Western Sahara">Western Sahara</option>
                <option value="Yemen">Yemen</option>
                <option value="Zambia">Zambia</option>
                <option value="Zimbabwe">Zimbabwe</option>
              </select>
              {errors.country && (
                <span className="errorMsg">{errors.country.message}</span>
              )}
              <br />
              <br />
              <label htmlFor="zip">Zip/Postal Code</label>

              <input
                type="number"
                id="zip"
                placeholder="Zip"
                name="postalCode"
                {...register("postalCode")}
              />
              <br />
              <br />
              <label htmlFor="Phone">
                Phone: <span className="required_field">*</span>
              </label>

              <input
                type="tel"
                id="Phone"
                placeholder="Enter Phone No"
                name="phone"
                {...register("phone", {
                  required: "Phone is required.",
                  pattern: {
                    value:
                      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                    message: "Enter valid phone number",
                  },
                })}
              />
              {errors.phone && (
                <span className="errorMsg">{errors.phone.message}</span>
              )}
              <br />
              <br />
              <label htmlFor="category">
                Hotel:<span className="required_field">*</span>
              </label>

              <select
                id="category"
                name="hotel"
                {...register("hotel", {
                  required: "Select hotel from list",
                })}>
                <option value="">Select Hotel</option>
                <option value="Taj_Palace">Taj Palace</option>
                <option value="Le_Meridien">Le Meridien</option>
                <option value="Andaz">Andaz</option>
                <option value="The_Grand">The Grand</option>
                <option value="Royal_Plaza">Royal Plaza</option>
              </select>
              {errors.hotel && (
                <span className="errorMsg">{errors.hotel.message}</span>
              )}
              <br />
              <br />
              <label htmlFor="subcategory">Room Category: </label>

              <select
                id="subcategory"
                name="roomCategory"
                {...register("roomCategory", {
                  required: "Room category is required",
                })}>
                <option value="">Select Hotel First</option>

                {type &&
                  type.map((element, idx) => {
                    return (
                      <option key={idx} value={element}>
                        {element}
                      </option>
                    );
                  })}
              </select>
              {errors.roomCategory && (
                <span className="errorMsg">{errors.roomCategory.message}</span>
              )}
              <br />
              <br />
              {/* 
              <label htmlFor="arrival">
                Arrival Date: <span className="required_field">*</span>
              </label>
              <br />
              <input
                type="date"
                id="arrival"
                name="arrivalDate"
                {...register("arrivalDate", {
                  required: "Choose arival date",
                })}
              />
              {errors.arrivalDate && (
                <span className="errorMsg">{errors.arrivalDate.message}</span>
              )}
              <br />
              <br />
              <label htmlFor="departure">
                Departure Date: <span className="required_field">*</span>
              </label>
              <br />
              <input
                type="date"
                id="departure"
                name="departureDate"
                {...register("departureDate", {
                  required: "Choose departure date",
                })}
              />
              {errors.departureDate && (
                <span className="errorMsg">{errors.departureDate.message}</span>
              )}
              <br />
              <br /> */}

              <label htmlFor="startDate">Start Date</label>
              <Controller
                id="startDate"
                name="startDate"
                control={control}
                rules={{ required: "Start Date is required" }}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    className="full-width-datepicker"
                    dateFormat="d MMMM, yyyy"
                    placeholderText="Select Start Date"
                    onChange={(date) => field.onChange(date)}
                  />
                )}
              />

              {errors.startDate && (
                <span style={{ color: "red" }}>{errors.startDate.message}</span>
              )}
              <br />

              <label htmlFor="endDate">End Date</label>
              <Controller
                name="endDate"
                id="endDate"
                control={control}
                rules={{
                  required: "End Date is required",
                  validate: (value) => {
                    const startDate = watchStartDate;
                    return (
                      (startDate && value > startDate) ||
                      "End date must be after start date"
                    );
                  },
                }}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    placeholderText="Select End Date"
                    className="full-width-datepicker"
                    dateFormat="d MMMM, yyyy"
                    onChange={(date) => field.onChange(date)}
                    minDate={
                      watchStartDate
                        ? new Date(watchStartDate.getTime() + 86400000)
                        : null
                    } // Set minimum date to 1 day after start date
                  />
                )}
              />

              {errors.endDate && (
                <span className="errorMsg">{errors.endDate.message}</span>
              )}
              <br />

              {/* Previous Apply Date*/}
              {/* <label htmlFor="startDate">Start Date</label>

              <Controller
                id="startDate"
                name="startDate"
                control={control}
                rules={{ required: "Start Date is required" }}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    startDate={watchAllFields.startDate}
                    className="full-width-datepicker"
                    dateFormat="d MMMM, yyyy"
                    placeholderText="Select Start Date"
                    onChange={(date) => field.onChange(date)}
                  />
                )}
              />

              <br />
              {!watchAllFields.startDate && errors.startDate && (
                <span style={{ color: "red" }}>{errors.startDate.message}</span>
              )}
              <br />
              <label>End Date</label>

              <Controller
                name="endDate"
                id="datePicker"
                control={control}
                rules={{
                  required: "End Date is required",
                  validate: (value) =>
                    (value && value >= startDate) ||
                    "End date must be after start date",
                }}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    placeholderText="Select End Date"
                    id="datePicker"
                    className="full-width-datepicker"
                    dateFormat="d MMMM, yyyy"
                    onChange={(date) => field.onChange(date)}
                    minDate={watch("startDate")}
                  />
                )}
              />
              <br />
              {!watchAllFields.endDate && errors.endDate && (
                <span className="errorMsg">{errors.endDate.message}</span>
              )}

              <br /> */}
              <label>Total Days</label>
              <br />
              <Controller
                name="totalDays"
                control={control}
                render={({ field }) => <input {...field} readOnly />}
              />
              {dateError && <span style={{ color: "red" }}>{dateError}</span>}
              <br />

              <label htmlFor="count_room">
                No Of Rooms: <span className="required_field">*</span>
              </label>

              <select
                id="count_room"
                name="totalRooms"
                {...register("totalRooms", {
                  required: "Select no. of rooms",
                })}>
                <option value="">--No Of Rooms--</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              {errors.totalRooms && (
                <span className="errorMsg">{errors.totalRooms.message}</span>
              )}
              <br />
              <br />
              <label htmlFor="room_type">
                Type Of Rooms: <span className="required_field">*</span>
              </label>

              <select
                id="room_type"
                name="roomType"
                {...register("roomType", {
                  required: "Select room type",
                })}>
                <option value="">Select</option>
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Twin">Twin</option>
              </select>
              {errors.roomType && (
                <span className="errorMsg">{errors.roomType.message}</span>
              )}
              <br />
              <br />
              <label htmlFor="transportation">
                Transportation Required{" "}
                <span className="required_field">*</span>
              </label>

              <select
                id="transportation"
                name="transportation"
                {...register("transportation", {
                  required: "Select From List",
                })}>
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.transportation && (
                <span className="errorMsg">
                  {errors.transportation.message}
                </span>
              )}
              <br />
              <br />
              {watchAllFields.transportation == "Yes" && (
                <>
                  <label htmlFor="flightDetails">Flight Details</label>

                  <input
                    type="text"
                    id="flightDetails"
                    placeholder="Flight Details"
                    name="flightDetails"
                    {...register("flightDetails", {
                      required: "Pls Enter Your Flights Details",
                    })}
                  />
                  {errors.flightDetails && (
                    <span className="errorMsg">
                      {errors.flightDetails.message}
                    </span>
                  )}
                  <br />
                  <br />
                </>
              )}

              {/* <label htmlFor="amount">Total Amount:</label>
                <br />
                <input
                  type="number"
                  id="amount"
                  placeholder="Total Amount"
                  name="totalAmount"
                  {...register("totalAmount")}
                />

                <br />
                <br />
                <label htmlFor="gst">GST @ 18%: </label>
                <br />
                <input
                  type="number"
                  id="gst"
                  placeholder="GST No"
                  name="gst"
                  {...register("gst")}
                />

                <br />
                <br />
                <label htmlFor="total_amount">Total Payable Amount: </label>
                <br />
                <input
                  type="number"
                  id="total_amount"
                  placeholder="Total Payable"
                  name="totalPayable"
                  {...register("totalPayable")}
                />
                <br />
                <br /> */}
              <button type="submit" className="submit">
                {loading ? "submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="query">
        <div>
          <h3>Queries And Bookings</h3>
          <p className="same">For any queries and bookings</p>
          <p className="same">Contact</p>
          <p className="bold_query sarthak">Sarthak Khanna</p>
          <p className="same">
            <span className="bold_query">Mob: </span>
            <a href="tel:+918010404045" rel="noreferrer" target="_blank">
              +91 8010404045, +91 88000 03048
            </a>
          </p>
          <p className="same">
            <span className="bold_query"> Email:</span>
            <a
              href="mailto:groups@miceandmore.co.in"
              rel="noreferrer"
              target="_blank">
              {" "}
              groups@miceandmore.co.in
            </a>
          </p>
        </div>
      </div>
      <footer className="py-3">
        <div className="center_footer">
          <div className="footer_content">
            <p>Official Travel Partner</p>
            <LazyLoadImage src={miceLogo} alt="mice-logo" width="130px" />
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Form;
