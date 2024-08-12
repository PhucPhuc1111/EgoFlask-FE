import Logo from "../../public/images/Logo.png";
import Search from "../../public/icons/Search.svg";
import Cart from "../../public/icons/Cart.svg";
import Account from "../../public/icons/Account.svg";
import { useState } from "react";

export const Header = () => {
  const [isActive, setIsActive] = useState("");

  const handleClick = (section: string) => {
    setIsActive(section);
  };

  return (
    <header>
      <div
        className="top-bar"
        style={{
          height: "37px",
          background: "#0055C3",
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Miễn phí vận chuyển cho đơn hàng trên 1.000.000 VND
      </div>
      <div
        className="nav-bar"
        style={{
          maxWidth: "1425px",
          height: "45px",
          margin: "7px auto 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <ul
          className="menu"
          style={{
            listStyle: "none",
            padding: 0,
            display: "flex",
            gap: "50px",
            fontWeight: "500",
          }}
        >
          <li>
            <a
              href="#!"
              onClick={() => handleClick("home")}
              className={`text-black ${
                isActive === "home" ? "text-[#0255C3]" : "hover:text-[#0255C3]"
              } active:text-[#0255C3]`}
            >
              Trang chủ
            </a>
          </li>
          <li>
            <a
              href="#!"
              onClick={() => handleClick("products")}
              className={`text-black ${
                isActive === "products"
                  ? "text-[#0255C3]"
                  : "hover:text-[#0255C3]"
              } active:text-[#0255C3]`}
            >
              Sản phẩm
            </a>
          </li>
          <li>
            <a
              href="#!"
              onClick={() => handleClick("design")}
              className={`text-black ${
                isActive === "design"
                  ? "text-[#0255C3]"
                  : "hover:text-[#0255C3]"
              } active:text-[#0255C3]`}
            >
              Thiết kế
            </a>
          </li>
          <li>
            <a
              href="#!"
              onClick={() => handleClick("contact")}
              className={`text-black ${
                isActive === "contact"
                  ? "text-[#0255C3]"
                  : "hover:text-[#0255C3]"
              } active:text-[#0255C3]`}
            >
              Liên hệ
            </a>
          </li>
        </ul>
        <img
          src={Logo}
          alt="Logo"
          className="logo"
          style={{ width: "157px", objectFit: "contain", marginRight: "280px" }}
        />
        <div
          className="nav-act"
          style={{ display: "flex", gap: "16px", width: "120px" }}
        >
          <img src={Search} alt="" />
          <img src={Account} alt="" />
          <img src={Cart} alt="" />
        </div>
      </div>
    </header>
  );
};
