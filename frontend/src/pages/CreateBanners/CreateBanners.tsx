import { BannerList } from "@/components/Banners/BannerList/BannerList";
import { BannerUpload } from "@/components/Banners/BannerUpload/BannerUpload";


function CreateBanners() {
  return <div>
  <BannerUpload />
  <BannerList />
  </div>;
}

export default CreateBanners;
