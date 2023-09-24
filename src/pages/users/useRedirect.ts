import { useNavigate } from 'react-router-dom';

export const useRedirect = () => {
  const navigate = useNavigate();
  const baseUrl = '/customers';

  const goListCustomer = () => {
    navigate(baseUrl);
  };

  const goCreateCustomer = () => {
    navigate(`${baseUrl}/create`);
  };

  const goUpdateCustomer = (id: string) => {
    navigate(`${baseUrl}/${id}/edit`);
  };

  return {
    goListCustomer,
    goCreateCustomer,
    goUpdateCustomer,
  };
};
