import MyForm from '@/components/core/form';
import { useEffect, useState } from 'react';
import { apiGeListSeedingUsers } from '@/api/users/api';
const SelectUsers = ({ ...props }) => {
  const [listUsers, setListUser] = useState([{ label: '', value: '' }]);
  const _apiGeListUsers= async () => {
    try {
      const res = (await apiGeListSeedingUsers({
        pageNumber: '1',
        pageSize: '1000',
        sort: '',
        sortOrder: 'desc',
        search: ''
      })) as any;
      const names: string[] = res.results.data.map(
        (item: { name: string }) => item.name
      );
      const ids: string[] = res.results.data.map(
        (item: { id: string }) => item.id
      );

      const objectNames = names.map((name, index) => ({
        label: name,
        value: ids[index],
      }));

      setListUser(objectNames);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    _apiGeListUsers();
  }, []);
  return (
    <>
      <MyForm.Item
        options={listUsers}
        label="User Seeding"
        {...props}
        name="userID"
        type="select"
      />
    </>
  );
};

export default SelectUsers;
