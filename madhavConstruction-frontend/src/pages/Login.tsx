import React, { useRef, useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send, Check, LogIn, Loader, InfoIcon, ChevronLeft, UserCircle2Icon, UserIcon, KeyRoundIcon } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import MoreSection from '../components/MoreSection';
import { Building2, Ruler, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from "../service/auth"; // ✅ centralized API
import { useAuth } from "@/Auth/AuthContext"; // ✅ global auth state
import { MoonLoader } from 'react-spinners';
import { IconCaretLeft, IconCaretLeftFilled, IconChevronLeft, IconCircleChevronLeftFilled, IconFaceId, IconInfoCircle, IconInfoCircleFilled, IconKeyFilled, IconSettings, IconSettings2, IconSettingsFilled, IconUserFilled } from '@tabler/icons-react';
import { InfoTooltip } from '@/components/InfoTooltip';

// loginsliding//////////////////////////////

const SlideToLogin: React.FC<{ loading, onLogin: () => void }> = ({ onLogin, loading }) => {
  const [isSliding, setIsSliding] = useState(false);
  const [slideX, setSlideX] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const startSlide = () => setIsSliding(true);

  const endSlide = () => {
    if (!isSliding) return;
    setIsSliding(false);

    const sliderWidth = sliderRef.current?.offsetWidth || 0;
    if (slideX > sliderWidth * 0.7) {
      // ✅ Successful slide
      setSlideX(sliderWidth - 48); // snap to end
      onLogin();
    } else {
      // ❌ Reset
      setSlideX(0);
    }
  };

  const moveSlide = (clientX: number) => {
    if (!isSliding) return;
    const slider = sliderRef.current;
    if (!slider) return;

    const rect = slider.getBoundingClientRect();
    const newX = Math.min(Math.max(0, clientX - rect.left - 24), rect.width - 48);
    setSlideX(newX);
  };

  // Mouse handlers
  const handleMouseDown = () => startSlide();
  const handleMouseUp = () => endSlide();
  const handleMouseMove = (e: React.MouseEvent) => moveSlide(e.clientX);

  // Touch handlers
  const handleTouchStart = () => startSlide();
  const handleTouchEnd = () => endSlide();
  const handleTouchMove = (e: React.TouchEvent) => moveSlide(e.touches[0].clientX);

  return (
    <div
      ref={sliderRef}
      className="relative w-full h-12 bg-white rounded-xl justify-center flex items-center cursor-pointer select-none overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Sliding knob */}

      <div
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        className="absolute top-1 left-1 w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold shadow-sm transition-transform"
        style={{ transform: `translateX(${slideX}px)` }}
      >
        {loading ? (<MoonLoader speedMultiplier={3} color='white' size={20} />) : <>➜</>}
      </div>


      {/* Label */}
      <div className="w-full animate-pulse  text-center text-blue-900 font-medium text-xs pointer-events-none">
        {slideX > 30 ? "Keep sliding..." : "Slide to Login"}
      </div>
    </div>
  );
};


const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth(); // ✅ global auth hook

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await loginUser(username, password);
      if (data.status === "logged-in") {
        setIsLoggedIn(true); // ✅ update global state
        navigate("/dashboard"); // ✅ go to dashboard
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-0 w-full h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center block md:hidden"
        style={{ backgroundImage: "url('images/bglogin1.webp')" }}
      />
      <div
        className="absolute inset-0 z-0 bg-cover bg-center md:block hidden"
        style={{ backgroundImage: "url('images/bglogin.webp')" }}
      />



      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col w-full h-full justify-between items-center md:items-start">
        <div className="flex flex-col w-full mt-8  md:pt-16">
          <div className="flex w-full justify-center items-center bg-blue-950 p-3 gap-1 text-center text-md text-gray-100">
            <p className="items-center text-sm font-light"> Welcome to Pannel</p>
            <p className="items-center text-blue-500 font-bold"> Madhav Construction</p>
          </div>
          <div className="flex flex-row gap-1 items-center p-1 px-2">
            <IconCircleChevronLeftFilled className='text-yellow-500' stroke={2} onClick={() => navigate(-1)} size={25} />
            <span className="font-semibold">Admin Login</span>
          </div>
        </div>

        <AnimatedSection animation="fade-in">
          <div className="flex flex-col w-full md:my-16 md:mx-32 justify-center items-center">
            <div className="text-2xl text-white my-6 flex flex-row w-fit font-bold items-center">
              Admin Login
              <div className="flex flex-col font-black bg-yellow-400 rounded-md text-red-600 ml-1 p-1 items-baseline text-[10px] leading-none">
                Madhav <span className="text-black font-normal">Construction</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col w-full">
                {error && (
                  <p className="text-red-200 mb-4 w-full p-2 items-center text-center rounded-xl bg-red-800 ">
                    {error}
                  </p>
                )}
                <div className="flex flex-row items-center text-white gap-1">
                  <IconFaceId stroke={2} size={20} />
                  <label htmlFor="name" className="block font-bold mb-1">
                    UserID
                  </label>
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full px-4 font-regular placeholder:font-light p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                  placeholder="UserId"
                />
              </div>

              <div className="w-full flex flex-col">
                <div className="flex flex-row gap-1">
                  <div className="flex items-center flex-row gap-1 text-white">
                    <IconKeyFilled size={18} />
                    <label htmlFor="phone" className="block font-bold mb-1">
                      Password
                    </label>
                  </div>
                  <div className="items-center text-center justify-center">
                    <InfoTooltip message="Don't share your password with anyone else. If your facing any problem in login please contact our developer team." />
                  </div>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4  font-regular placeholder:font-light placeholder:italic p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                  placeholder="Password"
                />
              </div>

              <div className="w-full justify-center flex items-center">
                <div className="w-full">
                  <SlideToLogin loading={loading} onLogin={handleLogin} />
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <div className="relative md:w-1/2 p-4 text-center text-[12px] md:text-[10px] font-regular text-black">
          <p>
            <span className="text-gray-950 font-semibold">
              Only authorized personnel are allowed to access this system.
            </span>{" "}
            Unauthorized access or misuse is strictly prohibited and may result in
            disciplinary or legal action. Do not share your login credentials with
            anyone.
            <span className="text-red-700 font-semibold">
              For security, your account may be logged out automatically after 1 hour.
            </span>{" "}
            By logging in, you agree to use this system responsibly and only for
            authorized business purposes.
          </p>
        </div>
      </div>
    </div>

  );
};

export default Login