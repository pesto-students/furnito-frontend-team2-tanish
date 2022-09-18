import { useParams } from "react-router-dom";
import FooterComponent from "../../components/layout/footer/footer.component";
import HeaderComponent from "../../features/product/components/header.component";
import CategoriesPages from "../categories/categories.page";
import sofa_main from "../../assets/images/sofa_main.png";
import sofa_main_sm from "../../assets/images/sofa_main_sm.png";

export default function SofaPage() {
  const { name } = useParams();
  return (
    <>
      <HeaderComponent />
      <CategoriesPages name={name} main={sofa_main} sm={sofa_main_sm} />
      <FooterComponent />
    </>
  );
}
