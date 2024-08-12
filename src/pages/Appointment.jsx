import React from "react";
import picture from "../assets/side-img2.png";
import Logo from "../assets/Logo (3).png";
import search from "../assets/search (2).png";
import IconCa from "../assets/calender.png";
import OtpInput from "react-otp-input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Appointment = () => {
  const [verify, setVerify] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleVerify = () => {
    navigate("/next");
  };
  return (
    <div className="relative">
      <div className="bg-black w-full h-[100vh]">
        <div className="flex-grow">
          <div className="pl-[112px] ">
            <img src={Logo} alt="" className="pt-[40px]" />
            <div className="pt-[70px]">
              <h1 className=" text-white font-bold text-2xl  ">Hey there 👋</h1>
              <p className="text-[#ABB8C4] text-[14px]">
                Request a new appointment in 10 seconds
              </p>

              <label className="w-[860px] pt-[40px] flex gap-[8px] flex-col">
                <p className="text-[#ABB8C4] font-normal">Doctor </p>
                <div className="w-full border-[#84DCF53D] p-2 rounded-lg border gap-[8px] flex items-center">
                  <img src={search} className="text-[#bfc5d0d3]" />
                  <input
                    required={true}
                    type="text"
                    className="outline-none  text-white bg-[#ffffff00] "
                    placeholder=" Dr Adrian Hajdin"
                  />
                </div>
              </label>
              <div className="flex gap-[18px]">
                <label className="w-[418px] pt-[20px] flex gap-[8px] flex-col">
                  <p className="text-[#ABB8C4] font-normal">
                    Reason for appointment
                  </p>
                  <div className="w-full  h-[96px] border-[#363A3D] p-2 rounded-lg border gap-[8px] flex items-center">
                    <input
                      required={true}
                      type="text"
                      className="outline-none text-white bg-[#ffffff00] "
                      placeholder="ex: Annual montly check-up"
                    />
                  </div>
                </label>

                <label className="w-[418px] pt-[20px] flex gap-[8px] flex-col">
                  <p className="text-[#ABB8C4] font-normal">
                    Additional comments/notes
                  </p>
                  <div className="w-full h-[96px] border-[#363A3D] p-2 rounded-lg border gap-[8px] flex items-center">
                    <input
                      type="text"
                      inputMode="text"
                      className="outline-none text-white bg-[#ffffff00]"
                      placeholder="ex: Prefer afternoon appointments, if possible"
                    />
                  </div>
                </label>
              </div>
              <label className="w-[418px] pt-[20px] flex gap-[8px] flex-col">
                <p className="text-[#ABB8C4] font-normal">
                  Expected appointment date{" "}
                </p>
                <div className="w-[860px] border-[#363A3D] p-2 rounded-lg border gap-[8px] flex items-center">
                  <img src={IconCa} className="text-[#bfc5d0d3]" />
                  <input
                    required={true}
                    type="date"
                    className="outline-none text-white bg-[#ffffff00] "
                    placeholder="Select your appointment date"
                  />
                </div>
              </label>
              <button
                onClick={() =>
                  document.getElementById("my_modal_4").showModal()
                }
                className="w-[58vw] mt-[50px]   p-2 rounded-lg border-[#24AE7C] border gap-[8px] text-[18px]  bg-[#24AE7C] text-white"
              >
                Submit and continue
              </button>
            </div>
          </div>
        </div>
        <img
          src={picture}
          className="fixed h-full  object-cover  top-0 right-0 "
          alt="Side"
        />
      </div>
      <dialog id="my_modal_4" className="modal ">
        <div className="modal-box bg-[#1A1D21F5]  w-11/12 max-w-[650px]  min-h-[300px]">
          <h3 className=" text-2xl text-white">Access Verification</h3>
          <p
            className="py-4 text-[15px] text-[#ABB8C4]
"
          >
            To access the admin page, please enter the passkey.....
          </p>

          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            containerStyle={" pt-10 p-0 gap-x-[18px] flex  items-center"}
            inputStyle={
              " !size-[80px] text-[#24AE7C] text-[48px] bg-black   text-center border-t border-solid border-[#24AE7C] rounded-md"
            }
            renderInput={(props) => <input className="" {...props} />}
          />
          <button
            onClick={handleVerify}
            className="w-[40vw] mt-[50px]   p-2 rounded-lg border-[#24AE7C] border gap-[8px] text-[18px]  bg-[#24AE7C] text-white"
          >
            Enter admin panel
          </button>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white pt-4">
              ✕
            </button>
          </form>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Appointment;
