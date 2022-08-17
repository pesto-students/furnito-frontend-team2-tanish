import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux/hooks";
import { verifyJwt } from "../../features/auth/auth-slice";

function PrivateRouteComponent({ page }: { page: JSX.Element }) {
  const { isSuccess, isAuthenticated, jwt } = useAppSelector(
    (state) => state.auth,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!jwt || !jwt?.token) return;
    dispatch(verifyJwt(jwt.token));
  }, [jwt, isSuccess, dispatch]);

  return isAuthenticated ? page : <Navigate replace to="/login" />;
}

export default PrivateRouteComponent;
