import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface PrivateRouteProps {
  children: ReactNode;
  roles?: string[]; // اختیاری: برای کنترل دسترسی بر اساس نقش کاربر
  redirectTo?: string; // اختیاری: مسیر ریدایرکت در صورت عدم دسترسی
}

const PrivateRoute = ({ 
  children, 
  roles = [], 
  redirectTo = '/login' 
}: PrivateRouteProps) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  // اگر کاربر لاگین نکرده باشد
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // اگر نقش خاصی تعیین شده و کاربر آن نقش را ندارد
  if (roles.length > 0 && (!user || !roles.includes(user.role))) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  // اگر همه چیز درست بود، children را رندر کن
  return <>{children}</>;
};

export default PrivateRoute;