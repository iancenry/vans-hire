import Home from "./Home";
import About from "./About";
import Vans from "./Vans/Vans";
import VanDetail from "./Vans/VanDetail";
import Dashboard from "./Host/Dashboard"
import Income from "./Host/Income"
import Reviews from "./Host/Reviews"
import HostVans from "./Host/HostVans";
import HostVanDetail from "./Host/HostVanDetail";
import HostVanInfo from "./Host/HostVanInfo"
import HostVanPhotos from "./Host/HostVanPhotos"
import HostVanPricing from "./Host/HostVanPricing"
import NotFound from "./NotFound"
import { vansLoader } from "./Vans/Vans";
import { vanDetailLoader } from "./Vans/VanDetail";
import { hostVansLoader } from "./Host/HostVans";
import { hostVanDetailLoader } from "./Host/HostVanDetail";
import Login from "./Login";
import { loginLoader, action } from "./Login";

export {
  Home, About, Vans, VanDetail, Dashboard, Income, Reviews, HostVans, HostVanDetail,
  HostVanInfo, HostVanPhotos, HostVanPricing, NotFound,
  vansLoader, vanDetailLoader, hostVansLoader, hostVanDetailLoader, Login ,loginLoader, action
};
