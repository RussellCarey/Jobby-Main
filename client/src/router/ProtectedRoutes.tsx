import { useContext } from "react";
import { Outlet, Navigate, useParams } from "react-router-dom";
import Cookie from "js-cookie";
import AuthContext from "../context/auth/AuthContext";

export const IsLoggedInRoute = () => {
  return Cookie.get("jwt") ? <Outlet /> : <Navigate to="/" />;
};

export const HasProjectRoute = () => {
  const { projectid } = useParams();
  const { userState } = useContext(AuthContext);

  if (!userState) return <Navigate to="/" />;

  // If state has project, let it through!
  const hasProject = userState.projects.filter((p: any) => +p.id === +projectid!).length > 0;

  return hasProject ? <Outlet /> : <Navigate to="/" />;
};
