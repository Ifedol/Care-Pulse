import React, { useState } from "react";
import Logo from "../assets/Logo (3).png";
import Image from "../assets/bg-img (2).png";
import IconN from "../assets/Person.png";
import IconE from "../assets/Email (2).png";
import IconC from "../assets/Contact.png";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [verify, setVerify] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleVerify = () => {
    navigate("/onboarding");
  };

  return (
    <div className=" relative">
      <div className="bg-black w-full h-[100vh] ">
        <img
          src={Image}
          alt=""
          className="fixed h-full w-[720px] object-cover object-center top-0 right-0 rounded-2xl"
        />
        <div className="pl-[110px] ">
          <img src={Logo} alt="" className="pt-[40px]" />
          <div className="pt-[70px]">
            <h1 className=" text-white font-bold text-2xl  ">Hi there, ....</h1>
            <p className="text-[#ABB8C4] text-2">
              Get Started with Appointments.
            </p>
          </div>
          <label className="w-[496px] pt-[40px] flex gap-[8px] flex-col">
            <p className="text-[#ABB8C4] font-normal">Full name </p>
            <div className="w-full border-[#84DCF53D] p-2 rounded-lg border gap-[8px] flex items-center">
              <img src={IconN} className="text-[#bfc5d0d3]" />
              <input
                required={true}
                type="text"
                className="outline-none  text-white bg-[#ffffff00] "
                placeholder="Adrian Hajdin"
              />
            </div>
          </label>

          <label className="w-[496px] pt-[20px] flex gap-[8px] flex-col">
            <p className="text-[#ABB8C4] font-normal">Email address </p>
            <div className="w-full border-[#84DCF53D] p-2 rounded-lg border gap-[8px] flex items-center">
              <img src={IconE} className="text-[#bfc5d0d3]" />
              <input
                required={true}
                type="text"
                className="outline-none text-white bg-[#ffffff00] "
                placeholder="adrian@jsmastery.pr"
              />
            </div>
          </label>

          <label className="w-[496px] pt-[20px] flex gap-[8px] flex-col">
            <p className="text-[#ABB8C4] font-normal">Phone number</p>
            <div className="w-full border-[#84DCF53D] p-2 rounded-lg border gap-[8px] flex items-center">
              <img src={IconC} className="text-[#bfc5d0d3]" alt="icon" />
              <input
                type="text"
                inputMode="numeric"
                className="outline-none text-white bg-[#ffffff00]"
                placeholder="+00 0342 0453 34"
              />
            </div>

            <button
              onClick={() => document.getElementById("my_modal_4").showModal()}
              className="w-[496px] mt-[20px]  p-2 rounded-lg border-[#24AE7C] border gap-[8px]  bg-[#24AE7C] text-white"
            >
              Get Started
            </button>
          </label>

          <div className=" text-gray-500 mt-[70px]">
            &copy; {new Date().getFullYear()} CarePulse.
          </div>
        </div>
      </div>

      <dialog id="my_modal_4" className="modal ">
        <div className="modal-box bg-[#1A1D21F5]  w-11/12 max-w-[650px]  min-h-[300px]">
          <h3 className=" text-2xl text-white">Verify OTP</h3>
          <p
            className="py-4 text-[15px] text-[#ABB8C4]
"
          >
            Please enter the OTP sent to your registered mobile number.
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
            Verify
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

export default Login;
