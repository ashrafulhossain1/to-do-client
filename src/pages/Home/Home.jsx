
import Footer from "../../components/Footer/Footer";
import Category from "../../components/HomeComponents/Category";
import TaskHeading from "../../components/HomeComponents/TaskHeading";
import Navbar from "../../components/Navbar/Navbar";

const Home = () => {
    return (
        <div className="bg-gray-100">
            <div className="min-h-screen">
                <div className="bg-blue-900 ">
                    <Navbar></Navbar>
                </div>
                <div>
                    <TaskHeading></TaskHeading>
                </div>
                <div>
                    <Category></Category>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Home;