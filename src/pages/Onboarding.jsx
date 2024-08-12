import React from "react";
import sideImg from "../assets/side-img.png";
import Logo from "../assets/Logo (3).png";
import IconE from "../assets/Email (2).png";
import IconC from "../assets/Contact.png";
import IconCa from "../assets/calender.png";
import Select from "react-select";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileUploader } from "react-drag-drop-files";

const options = [
  { value: "Dr. Sarah Safari", label: "Dr. Sarah Safari" },
  { value: "Dr. Ava Williams", label: "Dr. Ava Williams" },
  { value: "Dr. Adam Smith", label: "Dr. Adam Smith" },
];
const fileTypes = ["JPG", "PNG", "GIF"];

const Onboarding = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [file, setFile] = useState(null);
  const [checkboxes, setCheckboxes] = useState({
    consentTreatment: false,
    consentInfo: false,
    agreePrivacyPolicy: false,
  });

  const navigate = useNavigate();

  const handleChange = (file) => {
    setFile(file);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxes((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const canSubmit =
    Object.values(checkboxes).filter((checked) => checked).length >= 2;

  const handleVerify = () => {
    if (canSubmit) {
      // Handle the form submission
      console.log("Form submitted!");
      navigate("/appointment");
    } else {
      console.log("Please check at least two checkboxes before submitting.");
    }
  };

  return (
    <div className="relative">
      <div className="bg-black w-full h-[2480px] flex">
        <div className="flex-grow text-white">
          <div className="pl-[112px] ">
            <img src={Logo} alt="" className="pt-[40px]" />
            <div className="pt-[70px]">
              <h1 className=" text-white font-bold text-2xl  ">Welcome 👋</h1>
              <p className="text-[#ABB8C4] text-[14px]">
                Let us know more about yourself
              </p>
              <h1 className="pt-[40px] text-2xl font-bold">
                Personal Information
              </h1>
            </div>
            <label className="w-[496px] pt-[40px] flex gap-[8px] flex-col">
              <p className="text-[#ABB8C4] font-normal">Full name </p>
              <div className="w-[860px] border-[#363A3D] p-2 rounded-lg border gap-[8px] flex items-center">
                <input
                  required={true}
                  type="text"
                  className="outline-none  text-white bg-[#ffffff00] "
                  placeholder="ex: Adam"
                />
              </div>
            </label>
            <div className="flex gap-[18px]">
              <label className="w-[418px] pt-[20px] flex gap-[8px] flex-col">
                <p className="text-[#ABB8C4] font-normal">Email address </p>
                <div className="w-full border-[#363A3D] p-2 rounded-lg border gap-[8px] flex items-center">
                  <img src={IconE} className="text-[#bfc5d0d3]" />
                  <input
                    required={true}
                    type="text"
                    className="outline-none text-white bg-[#ffffff00] "
                    placeholder="adrian@jsmastery.pr"
                  />
                </div>
              </label>

              <label className="w-[418px] pt-[20px] flex gap-[8px] flex-col">
                <p className="text-[#ABB8C4] font-normal">Phone number</p>
                <div className="w-full border-[#363A3D] p-2 rounded-lg border gap-[8px] flex items-center">
                  <img src={IconC} className="text-[#bfc5d0d3]" alt="icon" />
                  <input
                    type="text"
                    inputMode="numeric"
                    className="outline-none text-white bg-[#ffffff00]"
                    placeholder="+00 0342 0453 34"
                  />
                </div>
              </label>
            </div>

            <div className="flex gap-[18px]">
              <label className="w-[418px] pt-[20px] flex gap-[8px] flex-col">
                <p className="text-[#ABB8C4] font-normal">Date of birth </p>
                <div className="w-full border-[#363A3D] p-2 rounded-lg border gap-[8px] flex items-center">
                  <img src={IconCa} className="text-[#bfc5d0d3]" />
                  <input
                    required={true}
                    type="date"
                    className="outline-none text-white bg-[#ffffff00] "
                    placeholder="Select your birth date"
                  />
                </div>
              </label>
              <label className="w-[117px] pt-[20px] flex gap-[8px] flex-col">
                <p className="text-[#ABB8C4] font-normal">Gender </p>
                <div className="flex justify-between">
                  <div className="flex gap-4 w-full border-[#363A3D] p-2 rounded-lg border  ">
                    <label className="mt-[2px]">
                      <input
                        required={true}
                        type="checkbox"
                        className="outline-none   text-white bg-[#ffffff00] "
                        placeholder=""
                      />
                    </label>
                    <p>Male</p>
                  </div>

                  <div className="flex gap-4 w-full border-[#363A3D] p-2 rounded-lg border ml- ">
                    <label className="mt-[2px]">
                      <input
                        required={true}
                        type="checkbox"
                        className="outline-none   text-white bg-[#ffffff00] "
                        placeholder=""
                      />
                    </label>
                    <p>Female</p>
                  </div>

                  <div className="flex gap-4 w-full border-[#363A3D] p-2 rounded-lg border ">
                    <label className="mt-[2px]">
                      <input
                        required={true}
                        type="checkbox"
                        className="outline-none   text-white bg-[#ffffff00] "
                        placeholder=""
                      />
                    </label>
                    <p>Other</p>
                  </div>
                </div>
              </label>
            </div>

            <div className="flex gap-[18px]">
              <label className="w-[418px] pt-[20px] flex gap-[8px] flex-col">
                <p className="text-[#ABB8C4] font-normal">Address </p>
                <div className="w-full border-[#363A3D] p-2 rounded-lg border gap-[8px] flex items-center">
                  <input
                    required={true}
                    type="text"
                    className="outline-none text-white bg-[#ffffff00] "
                    placeholder="ex: 14 street, New York, NY - 5101"
                  />
                </div>
              </label>

              <label className="w-[418px] pt-[20px] flex gap-[8px] flex-col">
                <p className="text-[#ABB8C4] font-normal">Occupation</p>
                <div className="w-full border-[#363A3D] p-2 rounded-lg border gap-[8px] flex items-center">
                  <input
                    type="text"
                    inputMode="text"
                    className="outline-none text-white bg-[#ffffff00]"
                    placeholder="Software Engineer"
                  />
                </div>
              </label>
            </div>

            <div className="flex gap-[18px]">
              <label className="w-[418px] pt-[20px] flex gap-[8px] flex-col">
                <p className="text-[#ABB8C4] font-normal">
                  Emergency contact name{" "}
                </p>
                <div className="w-full border-[#363A3D] p-2 rounded-lg border gap-[8px] flex items-center">
                  <input
                    required={true}
                    type="text"
                    className="outline-none text-white bg-[#ffffff00] "
                    placeholder="Guardian’s name"
                  />
                </div>
              </label>

              <label className="w-[418px] pt-[20px] flex gap-[8px] flex-col">
                <p className="text-[#ABB8C4] font-normal">Phone number</p>
                <div className="w-full border-[#363A3D] p-2 rounded-lg border gap-[8px] flex items-center">
                  <img src={IconC} className="text-[#bfc5d0d3]" alt="icon" />
                  <input
                    type="text"
                    inputMode="numeric"
                    className="outline-none text-white bg-[#ffffff00]"
                    placeholder="+00 0342 0453 34"
                  />
                </div>
              </label>
            </div>
            <h1 className="pt-[60px] text-2xl font-bold">
              Medical Information
            </h1>
            <label className="w-[496px] pt-[40px] flex gap-[8px] flex-col">
              <p className="text-[#ABB8C4] font-normal">
                Primary care physician{" "}
              </p>
              <div className="w-[860px] border-[#363A3D] p-2 rounded-lg border gap-[8px] flex items-center">
                {/*<input
                  required={true}
                  type="text"
                  className="outline-none  text-white bg-[#ffffff00] "
                  placeholder="ex: Adam"
                /> */}
                <Select
                  defaultValue={selectedOption}
                  onChange={setSelectedOption}
                  options={options}
                />
              </div>
            </label>

            <div className="flex gap-[18px]">
              <label className="w-[418px] pt-[20px] flex gap-[8px] flex-col">
                <p className="text-[#ABB8C4] font-normal">
                  Insurance provider{" "}
                </p>
                <div className="w-full border-[#363A3D] p-2 rounded-lg border gap-[8px] flex items-center">
                  <input
                    required={true}
                    type="text"
                    className="outline-none text-white bg-[#ffffff00] "
                    placeholder="ex: BlueCross"
                  />
                </div>
              </label>

              <label className="w-[418px] pt-[20px] flex gap-[8px] flex-col">
                <p className="text-[#ABB8C4] font-normal">
                  Insurance policy number
                </p>
                <div className="w-full border-[#363A3D] p-2 rounded-lg border gap-[8px] flex items-center">
                  <input
                    type="text"
                    inputMode="text"
                    className="outline-none text-white bg-[#ffffff00]"
                    placeholder="ex: ABC1234567"
                  />
                </div>
              </label>
            </div>

            <div className="flex gap-[18px]">
              <label className="w-[418px] pt-[20px] flex gap-[8px] flex-col">
                <p className="text-[#ABB8C4] font-normal">Allergies (if any)</p>
                <div className="w-full  h-[96px] border-[#363A3D] p-2 rounded-lg border gap-[8px] flex items-center">
                  <input
                    required={true}
                    type="text"
                    className="outline-none text-white bg-[#ffffff00] "
                    placeholder="ex: Peanuts, Penicillin, Pollen"
                  />
                </div>
              </label>

              <label className="w-[418px] pt-[20px] flex gap-[8px] flex-col">
                <p className="text-[#ABB8C4] font-normal">
                  Current medications
                </p>
                <div className="w-full h-[96px] border-[#363A3D] p-2 rounded-lg border gap-[8px] flex items-center">
                  <input
                    type="text"
                    inputMode="text"
                    className="outline-none text-white bg-[#ffffff00]"
                    placeholder="ex: Ibuprofen 200mg, Levothyroxine 50mcg"
                  />
                </div>
              </label>
            </div>

            <div className="flex gap-[18px]">
              <label className="w-[418px] pt-[20px] flex gap-[8px] flex-col">
                <p className="text-[#ABB8C4] font-normal">
                  Family medical history (if relevant)
                </p>
                <div className="w-full  h-[96px] border-[#363A3D] p-2 rounded-lg border gap-[8px] flex items-center">
                  <input
                    required={true}
                    type="text"
                    className="outline-none text-white bg-[#ffffff00] "
                    placeholder="ex: Mother had breast cancer"
                  />
                </div>
              </label>

              <label className="w-[418px] pt-[20px] flex gap-[8px] flex-col">
                <p className="text-[#ABB8C4] font-normal">
                  Past medical history
                </p>
                <div className="w-full h-[96px] border-[#363A3D] p-2 rounded-lg border gap-[8px] flex items-center">
                  <input
                    type="text"
                    inputMode="text"
                    className="outline-none text-white bg-[#ffffff00]"
                    placeholder="ex: Asthma diagnosis in childhood"
                  />
                </div>
              </label>
            </div>
            <h1 className="pt-[60px] text-2xl font-bold">
              Identification and Verfication
            </h1>
            <label className="w-[496px] pt-[40px] flex gap-[8px] flex-col">
              <p className="text-[#ABB8C4] font-normal">Identification type</p>
              <div className="w-[860px] border-[#363A3D] p-2 rounded-lg border gap-[8px] flex items-center">
                <input
                  required={true}
                  type="text"
                  className="outline-none  text-white bg-[#ffffff00] "
                  placeholder="Birth Certificate"
                />
              </div>
            </label>

            <label className="w-[496px] pt-[40px] flex gap-[8px] flex-col">
              <p className="text-[#ABB8C4] font-normal">
                Identification Number
              </p>
              <div className="w-[860px] border-[#363A3D] p-2 rounded-lg border gap-[8px] flex items-center">
                <input
                  required={true}
                  type="text"
                  className="outline-none  text-white bg-[#ffffff00] "
                  placeholder="ex 1234567"
                />
              </div>
            </label>
            <label className="w-[860px]  pt-[40px] flex gap-[8px] flex-col">
              <p className="text-[#ABB8C4] font-normal">
                Scanned Copy of Identification Document
              </p>
              <div className=" w-full h-[134px] items-center  border  border-dashed border-blue-700 rounded-sm flex justify-center ">
                <FileUploader
                  handleChange={handleChange}
                  name="file"
                  types={fileTypes}
                  classes="   items-center justify-center"
                />
              </div>
            </label>

            <h1 className="pt-[60px] text-2xl font-bold">
              Consent and Privacy
            </h1>
            <div className="flex gap-6 pt-[32px]">
              <label className="mt-[2px]">
                <input
                  required={true}
                  type="checkbox"
                  name="consentTreatment"
                  checked={checkboxes.consentTreatment}
                  onChange={handleCheckboxChange}
                  className="outline-none text-white bg-[#ffffff00]"
                />
              </label>
              <p className="text-[#ABB8C4]">
                I consent to receive treatment for my health condition.
              </p>
            </div>
            <div className="flex gap-6 pt-[32px]">
              <label className="mt-[2px]">
                <input
                  required={true}
                  type="checkbox"
                  name="consentInfo"
                  checked={checkboxes.consentInfo}
                  onChange={handleCheckboxChange}
                  className="outline-none text-white bg-[#ffffff00]"
                />
              </label>
              <p className="text-[#ABB8C4]">
                I consent to the use and disclosure of my health information for
                treatment purposes.
              </p>
            </div>
            <div className="flex gap-6 pt-[32px]">
              <label className="mt-[2px]">
                <input
                  required={true}
                  type="checkbox"
                  name="agreePrivacyPolicy"
                  checked={checkboxes.agreePrivacyPolicy}
                  onChange={handleCheckboxChange}
                  className="outline-none text-white bg-[#ffffff00]"
                />
              </label>
              <p className="text-[#ABB8C4]">
                I acknowledge that I have reviewed and agree to the privacy
                policy.
              </p>
            </div>
            <button
              onClick={handleVerify}
              disabled={!canSubmit}
              className={`w-[58vw] mt-[150px] p-2 rounded-lg border-[#24AE7C] border gap-[8px] text-[18px] ${
                canSubmit
                  ? "bg-[#24AE7C] text-white"
                  : "bg-[#7b9c90] text-white"
              }`}
            >
              Submit and continue
            </button>
          </div>
        </div>
        <img
          src={sideImg}
          className="h-[1098px] fixed right-0 top-0 object-cover "
          alt="Side"
        />
      </div>
    </div>
  );
};

export default Onboarding;
