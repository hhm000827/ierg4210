import { memo } from "react";
import { useNavigate } from "react-router-dom";

const NoPage = () => {
  const navigate = useNavigate();
  let redirectToHome = () => {
    setTimeout(() => navigate("/", { replace: true }), "2000");
  };

  return (
    <>
      <p className="text-slate-500 text-center">Sorry, this page doesn't exist. Returning to Home Page automatically</p>
      {redirectToHome()}
    </>
  );
};

export default memo(NoPage);
