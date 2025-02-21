import Navbar from "../../components/Navbar/Navbar";

const Home = () => {
    return (
        <div>
            <div className="bg-gradient-to-r from-blue-800 to-purple-600">
                <Navbar></Navbar>
            </div>
            <h1 className="text-red-500 text-5xl">Home</h1>
        </div>
    );
};

export default Home;