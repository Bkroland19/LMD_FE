import React, { useEffect, useState } from 'react';
import ChartOne from '../../../components/ChartOne';
import ChartThree from '../../../components/ChartThree';
import ChartTwo from '../../../components/ChartTwo';
import CustomCard from '../../../components/CustomCard';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { addCondoms, getCondoms, getUnits } from '../../../api/apiRequests';
import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import CustomInput from '../../../common/input';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
// import { createUser } from '../../../api/createUserApi';
import { displayErrorMessage, displaySuccessMessage } from '../../../components/toast/Toast';
import { useDispatch } from 'react-redux';
import CustomSelect from '../../../common/select';
import CondomItemDataTable from '../../../components/CondomItem';


const CondomDashboard = () => {
  const dispatch = useDispatch()
  const [category, setCategory] = useState()
  const [brand, setBrand] = useState()
  const [type, setType] = useState()
  const [unit, setUnits] = useState()
  const [data, setData] = useState()
  const [size, setSize] = useState<SizeType>('large'); // default is 'middle'
  const [modalOpen, setModalOpen] = useState(false);
  const [unitData, setUnitData] = useState([])
  const [total, setTotal] = useState()


  const condomsQuery = useQuery({
    queryKey: ["condom"],
    queryFn: () => getCondoms(),
  })

  // const rolesQuery = useQuery({
  //   queryKey: ["roles"],
  //   queryFn: () => getRoles()
  // })


  const unitsQuery = useQuery({
    queryKey: ["unit"],
    queryFn: () => getUnits(),
  })

  useEffect(() => {
    if (unitsQuery.isSuccess) {
      setUnitData(unitsQuery.data)
    }
  }, [unitsQuery.isSuccess, unitsQuery.data]);

  useEffect(() => {
    if (condomsQuery.isSuccess) {
      setData(condomsQuery.data)
    }
  }, [condomsQuery.isSuccess, condomsQuery.data]);



  const handleInputChange = (setState: (arg0: any) => void) => (event: { target: { value: any; }; }) => {
    setState(event.target.value)
    console.log(event.target.value)
  }




  const queryClient = useQueryClient()
  const createPostMutation = useMutation({
    mutationFn: addCondoms,
    onSuccess: (data: any) => {
      queryClient.setQueryData(["condom"], data)
      queryClient.invalidateQueries(["condom"], { exact: true })
      console.log(data)
      if (data.code == "401") {
        displayErrorMessage(`${data.message}`)
      }
      if (data.code == "201") {
        setModalOpen(false)
        displaySuccessMessage("Condom created");
      }
    }
  })


  const createCondom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createPostMutation.mutate({
      category: category,
      brand: brand,
      unit_of_measure_id: unit,
      type: type

    })
  }

  const genderData = [
    { name: 'male' },
    { name: 'female' },
  ];
  console.log(unitData)



  const downloadExcel = () => {
    const workbook = XLSX.utils.book_new();
    //@ts-ignore
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelFile = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelFile], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'data.xlsx');
  };


  return (
    <>
      <div>
        <div className='flex justify-between items-center bg-red-700 p-4 z-99999 '>
          <div><h3 className='text-lg font-bold'>Condom Managment</h3></div>
          <div style={{ background: '' }} className='flex justify-center items-center space-x-4'>
            <div>
              <Button
                style={{ backgroundColor: '#1C2434', color: 'white' }}

                onClick={() => setModalOpen(true)} type="primary" icon={< PlusOutlined rev={undefined} />} size={size}>
                Add Condom
              </Button>

            </div>

            <div>
              <Button type="primary"
                style={{ backgroundColor: '#1C2434', color: 'white' }}

                icon={<DownloadOutlined />} size={size} onClick={downloadExcel}>
                Export Excel
              </Button>
            </div>

          </div>
        </div>

        <div className="col-span-12 xl:col-span-8 mt-10" >

          <CondomItemDataTable data={data} />


        </div>

        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          {/* <ChartOne />
                    <ChartTwo />
                    <ChartThree />
                    <MapOne /> */}
        </div>
      </div>

      <Modal
        title="Create User Modal"
        centered
        open={modalOpen}
        onOk={createCondom}
        onCancel={() => setModalOpen(false)}
        width={1000}
        zIndex={10000000}
      >
        <form className='grid grid-cols-2 gap-2'>
          <CustomInput onChange={handleInputChange(setCategory)} value='category' placeholder='Enter Category' label='Category' type='text' name="firstname" />
          {/* <CustomInput onChange={handleInputChange(setType)} value='type' placeholder='Enter type' label='Type' type='text' name="lastname" /> */}
          <CustomInput onChange={handleInputChange(setBrand)} value='brand' placeholder='Enter brand' label='Brand' type='text' name="email" />
          <CustomSelect options={unitData} onChange={handleInputChange(setUnits)} value='unit' label='Units of Measure' name="units" />

          <CustomSelect options={genderData} onChange={handleInputChange(setType)} value='type' label='Type' name="type" />

        </form>
      </Modal>

    </>
  );
};

export default CondomDashboard;
