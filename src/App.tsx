import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from './pages/Authentication/SignIn';
import Loader from './common/Loader';
import JSMDashboard from "./pages/JMS/Dashboard/Dashboard"
import CondomDashboard from './pages/MOH/CondomManagment';
import AdminDashboard from './pages/MOH/AdminDashboard';
import CondomInventory from './pages/MOH/CondomInventory';
import HotspotDashboard from './pages/MOH/HotspotManagement';

import FocalPerson from './pages/DCFP/FocalPerson'
import HotSpotView from './pages/DCFP/HotSpotView';
import CondomMgt from './pages/DCFP/CondomMgt';
import MyOrders from './pages/DCFP/MyOrders';
import CondomUploadEvidence from './pages/DCFP/CondomUploadEvidence';


import FocalPersonH from './pages/Hotspot-Manager/FocalPersonH'
import HotSpotViewH from './pages/Hotspot-Manager/HotSpotViewH';
import CondomMgtH from './pages/Hotspot-Manager/CondomMgtH';
import MyOrdersH from './pages/Hotspot-Manager/MyOrdersH';
import CondomUploadEvidenceH from './pages/Hotspot-Manager/CondomUploadEvidenceH';
import DeliveryHome from "./pages/Delivery-Agent/DeliveryHome"

import Dashboard from './pages/storeInCharge/Dashboard';
import DashboardJms from './pages/JMS/Dashboard/Dashboard';
import AgentsUI from './pages/JMS/Dashboard/AgentsUI';
import Collapsible from './pages/JMS/Collapsible';
import DataGridTable from './pages/datagrid/DataGridTable';
import Procured from './pages/MOH/Procured';
const Calendar = lazy(() => import('./pages/Calendar'));
// const Chart = lazy(() => import('./pages/Chart'));
// const FormElements = lazy(() => import('./pages/Form/FormElements'));
const FormLayout = lazy(() => import('./pages/Form/FormLayout'));
const Profile = lazy(() => import('./pages/Profile'));
const Settings = lazy(() => import('./pages/Settings'));
// const Tables = lazy(() => import('./pages/Tables'));
const Alerts = lazy(() => import('./pages/UiElements/Alerts'));
const Buttons = lazy(() => import('./pages/UiElements/Buttons'));
const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));
const MohDashboard = lazy(() => import('./pages/MOH/Dashboard/Dashboard'));


function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route index element={<SignIn />} />

        <Route element={<DefaultLayout />}>
            <Route path="/condom/managment" element={<CondomDashboard />} />
            <Route path="/condom/managmenth" element={<CondomMgt />} />
            <Route path="/condom/stock" element={<CondomInventory />} />
            <Route path="/condom/stockh" element={<CondomInventory />} />
          <Route path="/moh/create-hotspot" element={<HotspotDashboard />} />
            <Route path='/hotspotview' element={<HotSpotView />} />
          
            <Route path='/focaldashboard' element={<FocalPerson />} />
            <Route path='/focaldashboardh' element={<FocalPersonH />} />
          <Route path="/moh" element={<MohDashboard />} />
          <Route path="/nms/dashboard" element={<MohDashboard />} />
          <Route path="/moh/admin/userManagment" element={<AdminDashboard />} />
            <Route path="/condom/dfcp" element={<CondomMgt />} />
            <Route path="/condom/dfcph" element={<CondomMgtH />} />
            <Route path="/dfcp/condom/orders" element={<MyOrders />} />
            <Route path="/dfcp/condom/ordersh" element={<MyOrdersH />} />
            <Route path="/dfcp/condom/evidence" element={<CondomUploadEvidence />} />
            <Route path="/dfcp/condom/evidenceh" element={<CondomUploadEvidenceH />} />
          <Route path='/storeincharge' element={<Dashboard />} />
          <Route path='/jms' element={<DashboardJms />} />
          <Route path='/jms/agentui' element={<AgentsUI />} />
          <Route path="/other/condom" element={<DataGridTable />} />
          <Route path='/jms/mgt/condom' element={<Collapsible />} />
            <Route path='/moh/procured' element={<Procured />} />
            <Route path='/delivery/home' element={<DeliveryHome />} />


          {/* <Route
            path="/calendar"
            element={
              <Suspense fallback={<Loader />}>
                <Calendar />
              </Suspense>
            }
          />
          <Route
            path="/profile"
            element={
              <Suspense fallback={<Loader />}>
                <Profile />
              </Suspense>
            }
          />
          <Route
            path="/forms/form-layout"
            element={
              <Suspense fallback={<Loader />}>
                <FormLayout />
              </Suspense>
            }
          />
          <Route
            path="/ui/alerts"
            element={
              <Suspense fallback={<Loader />}>
                <Alerts />
              </Suspense>
            }
          />
          <Route
            path="/ui/buttons"
            element={
              <Suspense fallback={<Loader />}>
                <Buttons />
              </Suspense>
            }
          /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
