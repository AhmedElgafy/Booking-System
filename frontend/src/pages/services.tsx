import { Link } from "react-router-dom";
import Services from "../components/pages/home/services";

function ServicesPage() {
  return (
    <section>
      <Link
        to={"/services/add"}
        className="ml-auto w-fit block rounded-md bg-gray-300 p-[5px_16px] cursor-pointer hover:bg-gray-400"
      >
        add service
      </Link>
      <Services />
    </section>
  );
}

export default ServicesPage;
