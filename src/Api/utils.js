import { message } from "antd";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";

const image_hosting_key = import.meta.env.VITE_IMGBB_API_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


export const imageUpload = async imageData => {

    const formData = new FormData();
    formData.append('image', imageData)

    const { data } = await axios.post(image_hosting_api, formData);

    return data.data.display_url;

}


export const saveUser = async (user) => {
    const userInfo = {
        name: user?.displayName,
        email: user?.email,
        photo: user?.photoURL
    }
    const { data } = await axios.post(`${import.meta.env.VITE_server_url}/users`, userInfo);
    return data;
}

export const handleDelete = (id) => {
    console.log(id);
    confirmAlert({
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this task?',
        buttons: [
            {
                label: 'Yes',
                onClick: async () => {
                    try {
                        const res = await axios.delete(`http://localhost:5000/todos/${id}`);
                        if (res.data.deletedCount > 0) {
                            // refetch(); // Refetch data after deletion
                            message.success('Task deleted successfully!');
                        }
                    } catch (error) {
                        console.error('Error deleting task:', error);
                        message.error('Failed to delete task. Please try again.');
                    }
                },
            },
            {
                label: 'No',
            },
        ],
    });
};
