import { ROUTES } from "@/shared/model/routes";
import { Outlet, redirect } from "react-router-dom";
import { useSession } from "@/shared/model/session";
import { Navigate } from "react-router-dom";

export function ProtectedRoute() {
  const { session } = useSession()

  if (!session) {
    return <Navigate to={ROUTES.LOGIN} />
  }

  return <Outlet />
}

export async function protectedLoader() {
  await new Promise((resolve) => setTimeout(resolve, 100))

  const storedToken = localStorage.getItem("token")
  if (!storedToken) {
    return redirect(ROUTES.LOGIN)
  }

  const token = await useSession.getState().refreshToken()
  if (!token) {
    return redirect(ROUTES.LOGIN)
  }

  return null
}
